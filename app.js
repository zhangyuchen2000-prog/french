const WORDS = window.EDITO_WORDS || [];

const $ = s => document.querySelector(s);
const state = JSON.parse(localStorage.getItem('cinq-state') || '{}');
state.learned = state.learned || {};
state.batches = state.batches || {};
state.settings = state.settings || {showChinese:true, reminderTime:'19:00'};
let activeWord = null;
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

function dateKey(date = new Date()) { return date.toISOString().slice(0,10); }
function dayNumber(date = new Date()) {
  const start = new Date('2026-01-01T00:00:00');
  return Math.floor((new Date(date.getFullYear(), date.getMonth(), date.getDate()) - start) / 86400000);
}
function defaultWords(date = new Date()) {
  const start = ((dayNumber(date) % Math.ceil(WORDS.length / 5)) * 5) % WORDS.length;
  return Array.from({length:5}, (_,i) => WORDS[(start+i)%WORDS.length]);
}
function findSavedWord(id) {
  if (typeof id !== 'string') return null;
  if (id.includes('|')) {
    const [unit, ...parts] = id.split('|');
    const fr = parts.join('|');
    return WORDS.find(word => String(word.unit) === unit && word.fr === fr);
  }
  return WORDS.find(word => word.fr === id);
}
function todaysWords(date = new Date()) {
  const saved = state.batches[dateKey(date)];
  if (!saved || saved.length !== 5) return defaultWords(date);
  const restored = saved.map(findSavedWord).filter(Boolean);
  return restored.length === 5 ? restored : defaultWords(date);
}
state.seen = state.seen || {};
state.settings.unit = state.settings.unit || 'all';

function activePool() {
  const unit = state.settings.unit;
  return unit === 'all' ? WORDS : WORDS.filter(word => String(word.unit) === String(unit));
}
function randomWordsExcluding(currentWords) {
  const pool = activePool();
  const current = new Set(currentWords.map(word => `${word.unit}|${word.fr}`));
  const seenKey = state.settings.unit;
  let seen = new Set(state.seen[seenKey] || []);
  let preferred = pool.filter(word => !current.has(`${word.unit}|${word.fr}`) && !seen.has(`${word.unit}|${word.fr}`));
  if (preferred.length < 5) {
    seen = new Set();
    preferred = pool.filter(word => !current.has(`${word.unit}|${word.fr}`));
  }
  for (let i = preferred.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [preferred[i], preferred[j]] = [preferred[j], preferred[i]];
  }
  const next = preferred.slice(0, 5);
  state.seen[seenKey] = [...seen, ...next.map(word => `${word.unit}|${word.fr}`)];
  return next;
}
function showNewWords() {
  const next = randomWordsExcluding(todaysWords());
  state.batches[dateKey()] = next.map(word => `${word.unit}|${word.fr}`);
  save();
  render();
}
function save(){ localStorage.setItem('cinq-state', JSON.stringify(state)); }
function wordId(word){ return `${word.unit}|${word.fr}`; }
function isLearned(word, date = new Date()){ return (state.learned[dateKey(date)] || []).includes(wordId(word)); }
function learnedCount(date = new Date()){ return todaysWords(date).filter(w=>isLearned(w,date)).length; }

function render(){
  const today = new Date();
  $('#dateLabel').textContent = today.toLocaleDateString('en-NZ',{weekday:'long', day:'numeric', month:'long'});
  const words = todaysWords();
  $('#wordList').innerHTML = words.map((w,i)=>`
    <button class="word-card ${isLearned(w)?'learned':''}" data-word="${wordId(w).replace(/"/g,'&quot;')}">
      <span class="word-index">${String(i+1).padStart(2,'0')}</span>
      <span><span class="word-fr">${w.fr}</span><span class="word-en">${w.en}${state.settings.showChinese?' · '+w.zh:''}</span></span>
      <span class="check">${isLearned(w)?'✓':''}</span>
    </button>`).join('');
  const count = learnedCount();
  $('#progressText').textContent = `${count} / 5 learned`;
  $('#progressBar').style.width = `${count*20}%`;
  $('#streakCount').textContent = calculateStreak();
  renderWeek();
  document.querySelectorAll('.word-card').forEach(b=>b.addEventListener('click',()=>openWord(findSavedWord(b.dataset.word))));
}

function calculateStreak(){
  let streak = 0, d = new Date();
  if(learnedCount(d)<5) d.setDate(d.getDate()-1);
  while(learnedCount(d)===5){ streak++; d.setDate(d.getDate()-1); }
  return streak;
}
function renderWeek(){
  const now = new Date(); const day = now.getDay(); const mondayOffset = day===0?-6:1-day;
  const monday = new Date(now); monday.setDate(now.getDate()+mondayOffset);
  let total=0, html='';
  for(let i=0;i<7;i++){
    const d=new Date(monday); d.setDate(monday.getDate()+i); const c=learnedCount(d); total+=c;
    html += `<div class="day-cell ${c===5?'complete':''}"><div class="day-name">${d.toLocaleDateString('en',{weekday:'short'}).slice(0,2)}</div><div class="day-count">${c}</div></div>`;
  }
  $('#weekGrid').innerHTML=html; $('#weekSummary').textContent=`${total} / 35`;
}
function openWord(word){
  activeWord=word; $('#dialogTheme').textContent=word.theme; $('#dialogFrench').textContent=word.fr;
  $('#dialogPhonetic').textContent=word.phon || word.source;
  $('#dialogMeaning').textContent=`${word.en}${state.settings.showChinese?' · '+word.zh:''}`;
  $('#dialogExample').textContent=word.ex; $('#dialogTranslation').textContent=word.tr;
  $('#learnBtn').textContent=isLearned(word)?'Learned ✓':'Mark as learned'; $('#wordDialog').showModal();
}
function toggleLearned(){
  const key=dateKey(); state.learned[key]=state.learned[key]||[];
  const id=wordId(activeWord);
  const idx=state.learned[key].indexOf(id);
  if(idx>=0) state.learned[key].splice(idx,1); else state.learned[key].push(id);
  save(); render(); $('#learnBtn').textContent=isLearned(activeWord)?'Learned ✓':'Mark as learned';
}
function speak(text){
  speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(text); u.lang='fr-FR'; u.rate=.82; speechSynthesis.speak(u);
}
function startQuiz(){ quizIndex=0; quizScore=0; quizAnswered=false; $('#quizDialog').showModal(); renderQuiz(); }
function renderQuiz(){
  const words=todaysWords();
  if(quizIndex>=words.length){
    $('#quizContent').innerHTML=`<h2>${quizScore} / 5</h2><p class="meaning">${quizScore===5?'Parfait. Today’s five are yours.':'Good work. Review the cards once more and try again.'}</p><button class="primary-btn" style="width:100%" onclick="document.querySelector('#quizDialog').close()">Finish</button>`; return;
  }
  const target=words[quizIndex]; const pool=WORDS.filter(w=>w.fr!==target.fr).sort(()=>Math.random()-.5).slice(0,3);
  const options=[target,...pool].sort(()=>Math.random()-.5);
  quizAnswered=false;
  $('#quizContent').innerHTML=`<p class="quiz-question">Which word means<br><strong>${target.en}${state.settings.showChinese?' · '+target.zh:''}</strong>?</p><div class="quiz-options">${options.map(o=>`<button class="quiz-option" data-answer="${o.fr.replace(/"/g,'&quot;')}">${o.fr}</button>`).join('')}</div><div class="quiz-footer"><span>${quizIndex+1} of 5</span><span>Score ${quizScore}</span></div>`;
  document.querySelectorAll('.quiz-option').forEach(btn=>btn.addEventListener('click',()=>{
    if(quizAnswered)return; quizAnswered=true;
    const correct=btn.dataset.answer===target.fr; if(correct) quizScore++;
    btn.classList.add(correct?'correct':'wrong');
    document.querySelectorAll('.quiz-option').forEach(x=>{if(x.dataset.answer===target.fr)x.classList.add('correct');});
    setTimeout(()=>{quizIndex++; renderQuiz();},850);
  }));
}

document.addEventListener('click', e=>{ if(e.target.dataset.close) document.getElementById(e.target.dataset.close).close(); });
$('#learnBtn').addEventListener('click',toggleLearned);
$('#speakBtn').addEventListener('click',()=>speak(activeWord.fr));
$('#shuffleBtn').addEventListener('click',showNewWords);
$('#quizBtn').addEventListener('click',startQuiz);
$('#reviewBtn').addEventListener('click',()=>{ const learned=todaysWords().find(w=>isLearned(w)) || todaysWords()[0]; openWord(learned); });
$('#settingsBtn').addEventListener('click',()=>{ $('#reminderTime').value=state.settings.reminderTime; $('#showChinese').checked=state.settings.showChinese; $('#unitFilter').value=state.settings.unit || 'all'; $('#settingsDialog').showModal(); });
$('#saveSettings').addEventListener('click',()=>{ 
  const oldUnit=state.settings.unit;
  state.settings.reminderTime=$('#reminderTime').value; 
  state.settings.showChinese=$('#showChinese').checked; 
  state.settings.unit=$('#unitFilter').value;
  if(oldUnit!==state.settings.unit){
    const next=randomWordsExcluding([]);
    state.batches[dateKey()]=next.map(word=>wordId(word));
  }
  save(); render(); $('#settingsDialog').close(); 
});

if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js');
render();
