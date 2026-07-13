const WORDS = [
  {fr:'bonjour', phon:'/bɔ̃.ʒuʁ/', en:'hello', zh:'你好', theme:'First contact', ex:'Bonjour, je m’appelle Léa.', tr:'Hello, my name is Léa.'},
  {fr:'merci', phon:'/mɛʁ.si/', en:'thank you', zh:'谢谢', theme:'First contact', ex:'Merci beaucoup !', tr:'Thank you very much!'},
  {fr:'au revoir', phon:'/o ʁə.vwaʁ/', en:'goodbye', zh:'再见', theme:'First contact', ex:'Au revoir et à demain.', tr:'Goodbye, see you tomorrow.'},
  {fr:'s’appeler', phon:'/sa.ple/', en:'to be called', zh:'叫作；名叫', theme:'Identity', ex:'Je m’appelle Camille.', tr:'My name is Camille.'},
  {fr:'habiter', phon:'/a.bi.te/', en:'to live', zh:'居住', theme:'Identity', ex:'J’habite à Auckland.', tr:'I live in Auckland.'},
  {fr:'parler', phon:'/paʁ.le/', en:'to speak', zh:'说；讲', theme:'Identity', ex:'Je parle un peu français.', tr:'I speak a little French.'},
  {fr:'aimer', phon:'/e.me/', en:'to like / love', zh:'喜欢；爱', theme:'Preferences', ex:'J’aime le café.', tr:'I like coffee.'},
  {fr:'détester', phon:'/de.tɛs.te/', en:'to dislike / hate', zh:'讨厌', theme:'Preferences', ex:'Je déteste attendre.', tr:'I hate waiting.'},
  {fr:'la famille', phon:'/la fa.mij/', en:'family', zh:'家庭；家人', theme:'People', ex:'Ma famille habite en Chine.', tr:'My family lives in China.'},
  {fr:'un ami', phon:'/œ̃.na.mi/', en:'a friend', zh:'朋友（男性）', theme:'People', ex:'C’est un ami français.', tr:'He is a French friend.'},
  {fr:'une amie', phon:'/y.na.mi/', en:'a friend', zh:'朋友（女性）', theme:'People', ex:'Elle est mon amie.', tr:'She is my friend.'},
  {fr:'le travail', phon:'/lə tʁa.vaj/', en:'work', zh:'工作', theme:'Daily life', ex:'Je commence le travail à neuf heures.', tr:'I start work at nine.'},
  {fr:'les études', phon:'/le.z‿e.tyd/', en:'studies', zh:'学业；学习', theme:'Daily life', ex:'Mes études sont intéressantes.', tr:'My studies are interesting.'},
  {fr:'manger', phon:'/mɑ̃.ʒe/', en:'to eat', zh:'吃', theme:'Food', ex:'On mange à midi.', tr:'We eat at noon.'},
  {fr:'boire', phon:'/bwaʁ/', en:'to drink', zh:'喝', theme:'Food', ex:'Je bois de l’eau.', tr:'I drink water.'},
  {fr:'le pain', phon:'/lə pɛ̃/', en:'bread', zh:'面包', theme:'Food', ex:'Je prends du pain.', tr:'I’ll have some bread.'},
  {fr:'le fromage', phon:'/lə fʁɔ.maʒ/', en:'cheese', zh:'奶酪', theme:'Food', ex:'Ce fromage est excellent.', tr:'This cheese is excellent.'},
  {fr:'un café', phon:'/œ̃ ka.fe/', en:'a coffee / café', zh:'咖啡；咖啡馆', theme:'Food', ex:'Un café, s’il vous plaît.', tr:'A coffee, please.'},
  {fr:'combien', phon:'/kɔ̃.bjɛ̃/', en:'how much / how many', zh:'多少', theme:'Shopping', ex:'Combien ça coûte ?', tr:'How much does it cost?'},
  {fr:'acheter', phon:'/aʃ.te/', en:'to buy', zh:'购买', theme:'Shopping', ex:'Je vais acheter des légumes.', tr:'I’m going to buy vegetables.'},
  {fr:'payer', phon:'/pe.je/', en:'to pay', zh:'付款', theme:'Shopping', ex:'Je peux payer par carte ?', tr:'Can I pay by card?'},
  {fr:'cher', phon:'/ʃɛʁ/', en:'expensive', zh:'贵的', theme:'Shopping', ex:'C’est trop cher.', tr:'It is too expensive.'},
  {fr:'la ville', phon:'/la vil/', en:'city / town', zh:'城市', theme:'Places', ex:'C’est une ville calme.', tr:'It is a quiet city.'},
  {fr:'le quartier', phon:'/lə kaʁ.tje/', en:'neighbourhood', zh:'街区', theme:'Places', ex:'J’aime mon quartier.', tr:'I like my neighbourhood.'},
  {fr:'la rue', phon:'/la ʁy/', en:'street', zh:'街道', theme:'Places', ex:'La banque est dans cette rue.', tr:'The bank is on this street.'},
  {fr:'à gauche', phon:'/a ɡoʃ/', en:'to the left', zh:'向左；在左边', theme:'Directions', ex:'Tournez à gauche.', tr:'Turn left.'},
  {fr:'à droite', phon:'/a dʁwat/', en:'to the right', zh:'向右；在右边', theme:'Directions', ex:'Le métro est à droite.', tr:'The metro is on the right.'},
  {fr:'tout droit', phon:'/tu dʁwa/', en:'straight ahead', zh:'直走', theme:'Directions', ex:'Continuez tout droit.', tr:'Continue straight ahead.'},
  {fr:'prendre', phon:'/pʁɑ̃dʁ/', en:'to take', zh:'拿；乘坐', theme:'Transport', ex:'Je prends le bus.', tr:'I take the bus.'},
  {fr:'le train', phon:'/lə tʁɛ̃/', en:'train', zh:'火车', theme:'Transport', ex:'Le train part à huit heures.', tr:'The train leaves at eight.'},
  {fr:'aujourd’hui', phon:'/o.ʒuʁ.dɥi/', en:'today', zh:'今天', theme:'Time', ex:'Aujourd’hui, je travaille.', tr:'Today, I work.'},
  {fr:'demain', phon:'/də.mɛ̃/', en:'tomorrow', zh:'明天', theme:'Time', ex:'À demain !', tr:'See you tomorrow!'},
  {fr:'maintenant', phon:'/mɛ̃.tə.nɑ̃/', en:'now', zh:'现在', theme:'Time', ex:'Je suis libre maintenant.', tr:'I am free now.'},
  {fr:'souvent', phon:'/su.vɑ̃/', en:'often', zh:'经常', theme:'Routine', ex:'Je cuisine souvent.', tr:'I often cook.'},
  {fr:'toujours', phon:'/tu.ʒuʁ/', en:'always', zh:'总是', theme:'Routine', ex:'Elle arrive toujours tôt.', tr:'She always arrives early.'},
  {fr:'parfois', phon:'/paʁ.fwa/', en:'sometimes', zh:'有时', theme:'Routine', ex:'Je joue parfois au tennis.', tr:'I sometimes play tennis.'},
  {fr:'jamais', phon:'/ʒa.mɛ/', en:'never', zh:'从不', theme:'Routine', ex:'Je ne fume jamais.', tr:'I never smoke.'},
  {fr:'se lever', phon:'/sə lə.ve/', en:'to get up', zh:'起床', theme:'Routine', ex:'Je me lève à sept heures.', tr:'I get up at seven.'},
  {fr:'dormir', phon:'/dɔʁ.miʁ/', en:'to sleep', zh:'睡觉', theme:'Routine', ex:'Je dors huit heures.', tr:'I sleep for eight hours.'},
  {fr:'sortir', phon:'/sɔʁ.tiʁ/', en:'to go out', zh:'外出', theme:'Leisure', ex:'On sort ce soir ?', tr:'Shall we go out tonight?'},
  {fr:'le cinéma', phon:'/lə si.ne.ma/', en:'cinema', zh:'电影院；电影', theme:'Leisure', ex:'Je vais au cinéma.', tr:'I’m going to the cinema.'},
  {fr:'la musique', phon:'/la my.zik/', en:'music', zh:'音乐', theme:'Leisure', ex:'J’écoute de la musique.', tr:'I listen to music.'},
  {fr:'le sport', phon:'/lə spɔʁ/', en:'sport', zh:'运动', theme:'Leisure', ex:'Le sport me fait du bien.', tr:'Sport makes me feel good.'},
  {fr:'la maison', phon:'/la mɛ.zɔ̃/', en:'house / home', zh:'房子；家', theme:'Home', ex:'Je rentre à la maison.', tr:'I’m going home.'},
  {fr:'la cuisine', phon:'/la kɥi.zin/', en:'kitchen / cooking', zh:'厨房；烹饪', theme:'Home', ex:'La cuisine est lumineuse.', tr:'The kitchen is bright.'},
  {fr:'la chambre', phon:'/la ʃɑ̃bʁ/', en:'bedroom', zh:'卧室', theme:'Home', ex:'Ma chambre est petite.', tr:'My bedroom is small.'},
  {fr:'près de', phon:'/pʁɛ də/', en:'near', zh:'靠近', theme:'Location', ex:'J’habite près de l’université.', tr:'I live near the university.'},
  {fr:'loin de', phon:'/lwɛ̃ də/', en:'far from', zh:'远离', theme:'Location', ex:'La gare est loin d’ici.', tr:'The station is far from here.'},
  {fr:'beau', phon:'/bo/', en:'beautiful / handsome', zh:'漂亮的', theme:'Description', ex:'C’est un beau quartier.', tr:'It is a beautiful neighbourhood.'},
  {fr:'grand', phon:'/ɡʁɑ̃/', en:'big / tall', zh:'大的；高的', theme:'Description', ex:'L’appartement est grand.', tr:'The apartment is big.'},
  {fr:'petit', phon:'/pə.ti/', en:'small / short', zh:'小的；矮的', theme:'Description', ex:'Je voudrais un petit café.', tr:'I would like a small coffee.'},
  {fr:'sympa', phon:'/sɛ̃.pa/', en:'nice / friendly', zh:'友好的；不错的', theme:'Description', ex:'Le professeur est sympa.', tr:'The teacher is nice.'},
  {fr:'fatigué', phon:'/fa.ti.ɡe/', en:'tired', zh:'疲惫的', theme:'Health', ex:'Je suis fatiguée aujourd’hui.', tr:'I am tired today.'},
  {fr:'avoir mal', phon:'/a.vwaʁ mal/', en:'to be in pain', zh:'疼痛', theme:'Health', ex:'J’ai mal au dos.', tr:'My back hurts.'},
  {fr:'le médecin', phon:'/lə med.sɛ̃/', en:'doctor', zh:'医生', theme:'Health', ex:'Je vais chez le médecin.', tr:'I’m going to the doctor.'},
  {fr:'devoir', phon:'/də.vwaʁ/', en:'must / to have to', zh:'必须；应当', theme:'Advice', ex:'Tu dois te reposer.', tr:'You need to rest.'},
  {fr:'pouvoir', phon:'/pu.vwaʁ/', en:'can / to be able to', zh:'能够；可以', theme:'Useful verbs', ex:'Vous pouvez répéter ?', tr:'Can you repeat?'},
  {fr:'vouloir', phon:'/vu.lwaʁ/', en:'to want', zh:'想要', theme:'Useful verbs', ex:'Je voudrais réserver une table.', tr:'I would like to book a table.'},
  {fr:'venir', phon:'/və.niʁ/', en:'to come', zh:'来', theme:'Useful verbs', ex:'Tu viens avec nous ?', tr:'Are you coming with us?'},
  {fr:'aller', phon:'/a.le/', en:'to go', zh:'去', theme:'Useful verbs', ex:'Je vais à la bibliothèque.', tr:'I’m going to the library.'},
  {fr:'faire', phon:'/fɛʁ/', en:'to do / make', zh:'做；制作', theme:'Useful verbs', ex:'Je fais mes devoirs.', tr:'I do my homework.'},
  {fr:'comprendre', phon:'/kɔ̃.pʁɑ̃dʁ/', en:'to understand', zh:'理解', theme:'Classroom', ex:'Je ne comprends pas.', tr:'I don’t understand.'},
  {fr:'répéter', phon:'/ʁe.pe.te/', en:'to repeat', zh:'重复', theme:'Classroom', ex:'Pouvez-vous répéter ?', tr:'Can you repeat?'},
  {fr:'écrire', phon:'/e.kʁiʁ/', en:'to write', zh:'写', theme:'Classroom', ex:'Écrivez votre nom.', tr:'Write your name.'},
  {fr:'lire', phon:'/liʁ/', en:'to read', zh:'阅读', theme:'Classroom', ex:'Je lis un livre français.', tr:'I’m reading a French book.'},
  {fr:'apprendre', phon:'/a.pʁɑ̃dʁ/', en:'to learn', zh:'学习', theme:'Classroom', ex:'J’apprends cinq mots par jour.', tr:'I learn five words a day.'},
  {fr:'les vacances', phon:'/le va.kɑ̃s/', en:'holidays', zh:'假期', theme:'Travel', ex:'Bonnes vacances !', tr:'Have a good holiday!'},
  {fr:'réserver', phon:'/ʁe.zɛʁ.ve/', en:'to book / reserve', zh:'预订', theme:'Travel', ex:'Je voudrais réserver une chambre.', tr:'I would like to book a room.'},
  {fr:'le voyage', phon:'/lə vwa.jaʒ/', en:'trip / journey', zh:'旅行', theme:'Travel', ex:'Le voyage dure trois heures.', tr:'The journey takes three hours.'},
  {fr:'la plage', phon:'/la plaʒ/', en:'beach', zh:'海滩', theme:'Travel', ex:'La plage est magnifique.', tr:'The beach is beautiful.'},
  {fr:'la montagne', phon:'/la mɔ̃.taɲ/', en:'mountain', zh:'山', theme:'Travel', ex:'Nous marchons en montagne.', tr:'We hike in the mountains.'}
];

const $ = s => document.querySelector(s);
const state = JSON.parse(localStorage.getItem('cinq-state') || '{}');
state.learned = state.learned || {};
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
function todaysWords(date = new Date()) {
  const start = ((dayNumber(date) % Math.ceil(WORDS.length / 5)) * 5) % WORDS.length;
  return Array.from({length:5}, (_,i) => WORDS[(start+i)%WORDS.length]);
}
function save(){ localStorage.setItem('cinq-state', JSON.stringify(state)); }
function isLearned(word, date = new Date()){ return (state.learned[dateKey(date)] || []).includes(word.fr); }
function learnedCount(date = new Date()){ return todaysWords(date).filter(w=>isLearned(w,date)).length; }

function render(){
  const today = new Date();
  $('#dateLabel').textContent = today.toLocaleDateString('en-NZ',{weekday:'long', day:'numeric', month:'long'});
  const words = todaysWords();
  $('#wordList').innerHTML = words.map((w,i)=>`
    <button class="word-card ${isLearned(w)?'learned':''}" data-word="${w.fr.replace(/"/g,'&quot;')}">
      <span class="word-index">${String(i+1).padStart(2,'0')}</span>
      <span><span class="word-fr">${w.fr}</span><span class="word-en">${w.en}${state.settings.showChinese?' · '+w.zh:''}</span></span>
      <span class="check">${isLearned(w)?'✓':''}</span>
    </button>`).join('');
  const count = learnedCount();
  $('#progressText').textContent = `${count} / 5 learned`;
  $('#progressBar').style.width = `${count*20}%`;
  $('#streakCount').textContent = calculateStreak();
  renderWeek();
  document.querySelectorAll('.word-card').forEach(b=>b.addEventListener('click',()=>openWord(WORDS.find(w=>w.fr===b.dataset.word))));
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
  activeWord=word; $('#dialogTheme').textContent=word.theme; $('#dialogFrench').textContent=word.fr; $('#dialogPhonetic').textContent=word.phon;
  $('#dialogMeaning').textContent=`${word.en}${state.settings.showChinese?' · '+word.zh:''}`;
  $('#dialogExample').textContent=word.ex; $('#dialogTranslation').textContent=word.tr;
  $('#learnBtn').textContent=isLearned(word)?'Learned ✓':'Mark as learned'; $('#wordDialog').showModal();
}
function toggleLearned(){
  const key=dateKey(); state.learned[key]=state.learned[key]||[];
  const idx=state.learned[key].indexOf(activeWord.fr);
  if(idx>=0) state.learned[key].splice(idx,1); else state.learned[key].push(activeWord.fr);
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
$('#quizBtn').addEventListener('click',startQuiz);
$('#reviewBtn').addEventListener('click',()=>{ const learned=todaysWords().find(w=>isLearned(w)) || todaysWords()[0]; openWord(learned); });
$('#settingsBtn').addEventListener('click',()=>{ $('#reminderTime').value=state.settings.reminderTime; $('#showChinese').checked=state.settings.showChinese; $('#settingsDialog').showModal(); });
$('#saveSettings').addEventListener('click',()=>{ state.settings.reminderTime=$('#reminderTime').value; state.settings.showChinese=$('#showChinese').checked; save(); render(); $('#settingsDialog').close(); });

if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js');
render();
