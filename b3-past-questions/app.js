const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const key='stp-b3-revision-v1';let state={};try{state=JSON.parse(localStorage.getItem(key))||{}}catch{}
state.choices??={};state.notes??={};state.review??={};
let mode='mc',index=0,search='';
const save=()=>{try{localStorage.setItem(key,JSON.stringify(state))}catch{}};
const list=()=>mode==='mc'?MC:PAPERS;
function video(p){
if(!p.video)return '<p class="video-pending">Video solution awaiting upload. The written solution is available above.</p>';
return '<section class="video-solution"><h5>Video solution</h5><div class="video-content"><video controls playsinline preload="none" aria-label="Video solution'+(p.label?' for part '+esc(p.label):'')+'"><source src="'+esc(p.video)+'" type="video/mp4">Your browser cannot play this video. <a href="'+esc(p.video)+'">Open video</a></video><p>Use the player’s full-screen control to enlarge the working.</p></div></section>';
}
function answer(q,part){
const p=part||q,chosen=state.choices[q.id],attempted=!part&&chosen!==undefined;
return '<details class="check-answer" '+(attempted?'open':'')+'><summary>Answer and worked solution</summary><div class="feedback"><p class="answer-line"><b>'+esc(p.result)+'</b></p><div class="answer-work"><p>'+esc(p.work)+'</p></div>'+(p.check?'<p class="remember"><b>Check your answer:</b> '+esc(p.check)+'</p>':'')+video(p)+'</div></details>';
}
function renderNav(){
const qs=list();$('#counter').textContent=qs.length+' questions';
$('#question-list').innerHTML=qs.map((q,i)=>({q,i})).filter(({q})=>(q.title+' '+q.topic+' '+q.displayNumber).toLowerCase().includes(search)).map(({q,i})=>'<button class="nav-item '+(i===index?'selected ':'')+(state.review[q.id]?'reviewed':'')+'" data-nav="'+i+'" '+(i===index?'aria-current="true"':'')+'><span class="num">'+q.displayNumber+'</span><span class="nav-title">'+esc(q.title)+'</span></button>').join('')||'<p>No matching topics.</p>';
const done=qs.filter(q=>state.review[q.id]).length;$('#progress-text').textContent=done+' / '+qs.length;$('#progress-fill').style.width=(done/qs.length*100)+'%';
}
function render(){
renderNav();const q=list()[index];
let body='<article class="question-card"><div class="card-top"><span class="badge">'+esc(q.topic)+'</span><span class="qnumber">PAPER '+(mode==='mc'?'1A':'2')+' · Q'+q.displayNumber+'</span></div><h3>'+esc(q.title)+'</h3>';
if(mode==='mc'){
const selected=state.choices[q.id],attempted=selected!==undefined;
body+='<div class="stem">'+q.stem+'</div>'+(q.diagram?'<img class="question-diagram" src="'+esc(q.diagram)+'" alt="'+esc(q.diagramAlt)+'">':'')+(q.after?'<div class="stem">'+q.after+'</div>':'');
body+='<div class="options text-options">'+q.options.map((o,i)=>{
const cls=attempted?(i===q.answer?'correct':i===selected?'wrong':''):'';
return '<button class="option '+cls+(selected===i?' chosen':'')+'" aria-pressed="'+(selected===i)+'" data-choice="'+i+'"><span class="letter">'+['A','B','C','D'][i]+'</span><span class="option-text">'+o+'</span>'+(attempted&&i===q.answer?'<span class="flag" aria-label="Correct answer">✓</span>':attempted&&i===selected?'<span class="flag" aria-label="Incorrect answer">✕</span>':'')+'</button>'}).join('')+'</div>';
body+='<div class="note '+(attempted?(selected===q.answer?'correct-status':'incorrect-status'):'')+'" id="choice-status" role="status">'+(attempted?(selected===q.answer?'Correct.':'Not quite. The correct answer is '+['A','B','C','D'][q.answer]+'.'):'Choose an answer to check your thinking.')+'</div><details class="hint"><summary>Need a hint?</summary><p>'+esc(q.hint)+'</p></details>'+answer(q);
}else{
body+='<div class="stem">'+esc(q.intro)+'</div>';
body+=q.parts.map(p=>'<section class="written-part">'+(p.pre?'<p class="part-context">'+esc(p.pre)+'</p>':'')+'<div class="part-heading"><h4><b>'+esc(p.label)+'.</b> '+esc(p.title)+'</h4><span class="marks">['+p.marks+' '+(p.marks===1?'mark':'marks')+']</span></div><label class="response-label" for="'+p.id+'">Your working and answer</label><textarea id="'+p.id+'" data-note="'+p.id+'" placeholder="Write your working here…">'+esc(state.notes[p.id]||'')+'</textarea><details class="hint"><summary>Need a hint?</summary><p>'+esc(p.hint)+'</p></details>'+answer(q,p)+'</section>').join('');
}
body+='<div class="actions"><button id="review" class="primary" aria-pressed="'+!!state.review[q.id]+'">'+(state.review[q.id]?'Reviewed ✓':'Mark as reviewed')+'</button></div></article><div class="question-bottom"><button class="secondary" id="previous" '+(index===0?'disabled':'')+'>Previous question</button><button class="secondary" id="next" '+(index===list().length-1?'disabled':'')+'>Next question</button></div>';
$('#question').innerHTML=body;
}
$('#question-list').addEventListener('click',e=>{const b=e.target.closest('[data-nav]');if(b){index=Number(b.dataset.nav);render()}});
$('#question').addEventListener('click',e=>{
const b=e.target.closest('button');if(!b)return;
if(b.dataset.choice!==undefined){state.choices[list()[index].id]=Number(b.dataset.choice);save();render();$('#question').querySelector('[data-choice="'+b.dataset.choice+'"]')?.focus();return}
if(b.id==='review'){const q=list()[index];state.review[q.id]=!state.review[q.id];save();b.textContent=state.review[q.id]?'Reviewed ✓':'Mark as reviewed';b.setAttribute('aria-pressed',!!state.review[q.id]);renderNav();return}
if(b.id==='next'&&index<list().length-1){index++;render()}
if(b.id==='previous'&&index>0){index--;render()}
});
$('#question').addEventListener('input',e=>{if(e.target.dataset.note){state.notes[e.target.dataset.note]=e.target.value;save()}});
$('#search').addEventListener('input',e=>{search=e.target.value.toLowerCase();renderNav()});
for(const [id,m] of [['tab-mc','mc'],['tab-written','written']])$('#'+id).addEventListener('click',()=>{mode=m;index=0;search='';$('#search').value='';for(const [bid,bm] of [['tab-mc','mc'],['tab-written','written']]){$('#'+bid).classList.toggle('active',mode===bm);$('#'+bid).setAttribute('aria-pressed',mode===bm)}render()});
$('#reset').addEventListener('click',()=>{if(confirm('Clear your B.3 answers, notes and review progress on this browser?')){state={choices:{},notes:{},review:{}};save();render()}});
render();

