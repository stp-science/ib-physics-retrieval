const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const key='stp-b3-revision-v1';let state={};try{state=JSON.parse(localStorage.getItem(key))||{}}catch{}
state.choices??={};state.notes??={};state.review??={};
let mode='mc',index=0,search='';
const save=()=>{try{localStorage.setItem(key,JSON.stringify(state))}catch{}};
const list=()=>mode==='mc'?MC:PAPERS;
const sourceLink=(q,videoPart)=>SOURCE+(videoPart?'#paper2:~:text='+encodeURIComponent('Video Solution '+q.number+videoPart):'#'+(mode==='mc'?'paper1':'paper2')+':~:text='+encodeURIComponent(q.anchor));
const video=(q,part)=>'<details class="video-solution"><summary>Video solution'+(part?' · '+esc(part.label):'')+'</summary><div class="video-content"><a class="video-link" href="'+sourceLink(q,part?.label)+'" target="_blank" rel="noopener">Watch on PaperPlainz</a><p>Paper '+(part?'2':'1')+' · Revision question '+q.displayNumber+(part?' · Part '+esc(part.label):'')+'. Open the matching video-solution section on PaperPlainz. Membership access is required.</p></div></details>';
function answer(q,part){const p=part||q;if(!p.result){const href=part?SOURCE+'#paper2:~:text='+encodeURIComponent('Answer '+q.number+part.label):sourceLink(q);return '<details class="check-answer"><summary>Check the answer on PaperPlainz</summary><div class="feedback"><p>The answer is available with the original question. Expand “Answer'+(part?' '+q.number+esc(part.label):'')+'” on PaperPlainz.</p><a class="primary" href="'+href+'" target="_blank" rel="noopener">Open answer on PaperPlainz</a>'+video(q,part)+'</div></details>';}return '<details class="check-answer"><summary>Reveal answer and working</summary><div class="feedback"><p class="answer-line"><b>'+esc(p.result)+'</b></p><div class="answer-work"><p>'+esc(p.work)+'</p></div>'+(p.check?'<p class="remember"><b>Check your answer:</b> '+esc(p.check)+'</p>':'')+video(q,part)+'</div></details>'}
function source(q){return '<div class="source-box"><p><b>Revision question '+q.displayNumber+' · Paper '+(mode==='mc'?'1':'2')+'</b></p><a href="'+sourceLink(q)+'" target="_blank" rel="noopener">Open question on PaperPlainz</a><small>Read the full question there, then return here to record your answer. The original wording, diagrams and videos stay on PaperPlainz.</small></div>'}
function renderNav(){
const qs=list();$('#counter').textContent=qs.length+' questions';
$('#question-list').innerHTML=qs.map((q,i)=>({q,i})).filter(({q})=>(q.title+' '+q.topic+' '+q.displayNumber).toLowerCase().includes(search)).map(({q,i})=>'<button class="nav-item '+(i===index?'selected ':'')+(state.review[q.id]?'reviewed':'')+'" data-nav="'+i+'" '+(i===index?'aria-current="true"':'')+'><span class="num">'+q.displayNumber+'</span><span class="nav-title">'+esc(q.title)+'</span></button>').join('')||'<p>No matching topics.</p>';
const done=qs.filter(q=>state.review[q.id]).length;$('#progress-text').textContent=done+' / '+qs.length;$('#progress-fill').style.width=(done/qs.length*100)+'%';
}
function render(){
renderNav();const q=list()[index];
let body='<article class="question-card"><div class="card-top"><span class="badge">'+esc(q.topic)+'</span><span class="qnumber">PAPER '+(mode==='mc'?'1A':'2')+' · Q'+q.displayNumber+'</span></div><h3>'+esc(q.title)+'</h3>';
if(mode==='written')body+='<p class="stem">'+esc(q.intro)+'</p>';
body+=source(q);
if(mode==='mc'){
body+='<p>Select your answer from the choices shown on PaperPlainz.</p><div class="options">'+['A','B','C','D'].map((l,i)=>'<button class="option '+(state.choices[q.id]===i?'chosen':'')+'" aria-pressed="'+(state.choices[q.id]===i)+'" data-choice="'+i+'" aria-label="Select answer '+l+'"><span class="letter">'+l+'</span></button>').join('')+'</div><div class="note" id="choice-status">'+(state.choices[q.id]===undefined?'No answer recorded yet.':'Your answer: '+['A','B','C','D'][state.choices[q.id]])+'</div><details class="hint"><summary>Need a hint?</summary><p>'+esc(q.hint)+'</p></details>'+answer(q);
}else{
body+=q.parts.map(p=>'<section class="written-part"><div class="part-heading"><h4><b>'+esc(p.label)+'.</b> '+esc(p.title)+'</h4>'+(p.marks?'<span class="marks">['+p.marks+' '+(p.marks===1?'mark':'marks')+']</span>':'')+'</div><label class="response-label" for="'+p.id+'">Your working and answer</label><textarea id="'+p.id+'" data-note="'+p.id+'" placeholder="Write your working here…">'+esc(state.notes[p.id]||'')+'</textarea><details class="hint"><summary>Need a hint?</summary><p>'+esc(p.hint)+'</p></details>'+answer(q,p)+'</section>').join('');
}
body+='<div class="actions"><button id="review" class="primary" aria-pressed="'+!!state.review[q.id]+'">'+(state.review[q.id]?'Reviewed ✓':'Mark as reviewed')+'</button></div></article><div class="question-bottom"><button class="secondary" id="previous" '+(index===0?'disabled':'')+'>Previous question</button><button class="secondary" id="next" '+(index===list().length-1?'disabled':'')+'>Next question</button></div>';
$('#question').innerHTML=body;
}
$('#question-list').addEventListener('click',e=>{const b=e.target.closest('[data-nav]');if(b){index=Number(b.dataset.nav);render()}});
$('#question').addEventListener('click',e=>{
const b=e.target.closest('button');if(!b)return;
if(b.dataset.choice!==undefined){const q=list()[index];state.choices[q.id]=Number(b.dataset.choice);save();$('#question').querySelectorAll('[data-choice]').forEach(btn=>{const chosen=btn===b;btn.classList.toggle('chosen',chosen);btn.setAttribute('aria-pressed',chosen)});$('#choice-status').textContent='Your answer: '+['A','B','C','D'][state.choices[q.id]];return}
if(b.id==='review'){const q=list()[index];state.review[q.id]=!state.review[q.id];save();b.textContent=state.review[q.id]?'Reviewed ✓':'Mark as reviewed';b.setAttribute('aria-pressed',!!state.review[q.id]);renderNav();return}
if(b.id==='next'&&index<list().length-1){index++;render()}
if(b.id==='previous'&&index>0){index--;render()}
});
$('#question').addEventListener('input',e=>{if(e.target.dataset.note){state.notes[e.target.dataset.note]=e.target.value;save()}});
$('#search').addEventListener('input',e=>{search=e.target.value.toLowerCase();renderNav()});
for(const [id,m] of [['tab-mc','mc'],['tab-written','written']])$('#'+id).addEventListener('click',()=>{mode=m;index=0;search='';$('#search').value='';for(const [bid,bm] of [['tab-mc','mc'],['tab-written','written']]){$('#'+bid).classList.toggle('active',mode===bm);$('#'+bid).setAttribute('aria-pressed',mode===bm)}render()});
$('#reset').addEventListener('click',()=>{if(confirm('Clear your B.3 answers, notes and review progress on this browser?')){state={choices:{},notes:{},review:{}};save();render()}});
render();

