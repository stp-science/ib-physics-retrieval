import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import {SEGMENTS,segmentForMode,earnedSpinMode,pendingSpinSegment,applySegment,remainingMs} from '../core.mjs';

test('recall retains every original wedge and does not mutate the wheel',()=>{
  const before=structuredClone(SEGMENTS);
  for(const s of SEGMENTS)assert.deepEqual(segmentForMode(s,'recall'),s);
  for(const s of SEGMENTS)segmentForMode(s,'challenge');
  assert.deepEqual(SEGMENTS,before);
});
test('challenge doubles every positive prize and displays its awarded value',()=>{
  for(const s of SEGMENTS.filter(s=>s.value>0)){
    const prize=segmentForMode(s,'challenge');
    assert.equal(prize.value,s.value*2);
    assert.equal(prize.label,'+'+new Intl.NumberFormat('en-NZ').format(s.value*2));
  }
  assert.equal(Math.max(...SEGMENTS.map(s=>segmentForMode(s,'challenge').value||0)),3000);
});
test('losses and multipliers stay identical in both modes',()=>{
  for(const s of SEGMENTS.filter(s=>s.value<0||s.multiplier)){
    assert.deepEqual(segmentForMode(s,'challenge'),s);
  }
  assert.equal(applySegment(-250,segmentForMode({multiplier:2,label:'×2'},'challenge')),-500);
});
test('the answer mode controls a spin even when current mode differs',()=>{
  const s={mode:'recall',history:[{mode:'challenge'}],pending:{index:1}};
  assert.equal(earnedSpinMode(s),'challenge');
  assert.equal(pendingSpinSegment(s).value,1000);
  s.mode='challenge';s.history=[{mode:'recall'}];
  assert.equal(pendingSpinSegment(s).value,500);
});
test('a stored pending mode survives refresh and remains authoritative',()=>{
  const s=JSON.parse(JSON.stringify({mode:'challenge',history:[{mode:'challenge'}],pending:{index:1,mode:'recall'}}));
  assert.equal(pendingSpinSegment(s).value,500);
});

const source=await fs.readFile(new URL('../game.mjs',import.meta.url),'utf8');
function context(){
  const nodes=new Map();
  const $=id=>{
    if(!nodes.has(id))nodes.set(id,{textContent:'',hidden:false,offsetWidth:1,style:{},classList:{add(){},remove(){}},replaceChildren(){},querySelector(){return {textContent:''}}});
    return nodes.get(id);
  };
  const state={phase:'spinning',mode:'recall',modeHistory:['challenge','recall'],score:0,correct:1,attempts:1,name:'Test',id:'test',history:[{id:'q',mode:'challenge'}],pending:{index:1,end:10,mode:'challenge'},deadline:100000};
  return vm.createContext({state,$,rotation:0,finishing:false,spinFrame:1,timerHandle:1,
    applySegment,pendingSpinSegment,remainingMs,format:n=>String(n),categoryLabel:()=> 'Mixed modes',roundCategory:()=> 'mixed',
    Date:{now:()=>1000},cancelAnimationFrame(){},clearInterval(){},drawWheel(){},updateScore(){},setSpin(){},tone(){},say(){},fanfare(){},celebrate(){},storeRound(){},finish(){},readRecords:()=>[],renderRecords(){},
    musicPlayer:{finishRound(){}},sessionStorage:{removeItem(){}},ACTIVE_KEY:'test',
    document:{body:{classList:{remove(){}}}},window:{scrollTo(){}},bank:new Map()
  });
}
test('normal spin settlement awards the doubled prize exactly once',()=>{
  const c=context();
  vm.runInContext(source.slice(source.indexOf('function settleSpin(){'),source.indexOf('function tick(){')),c);
  c.settleSpin();
  assert.equal(c.state.score,1000);assert.equal(c.state.history[0].spin,'+1,000');
  c.settleSpin();assert.equal(c.state.score,1000);
});
test('ending during a spin awards the same locked prize exactly once',()=>{
  const c=context();
  vm.runInContext(source.slice(source.indexOf('function finish('),source.indexOf('function renderRecords(')),c);
  c.finish(true);
  assert.equal(c.state.score,1000);assert.equal(c.state.phase,'results');
  c.finish(true);assert.equal(c.state.score,1000);
});
