import test from 'node:test';
import assert from 'node:assert/strict';
import {changeRoundMode,roundCategory,categoryLabel} from '../mode-state.mjs';
import {QUESTIONS as recall} from '../questions.mjs';
import {QUESTIONS as challenge} from '../challenge-questions.mjs';

function round(phase='question') {
  return {
    mode:'challenge',modeHistory:['challenge'],phase,
    score:-250,deadline:123456789,correct:2,attempts:3,
    history:[{id:'paper1a-01',correct:false}],fairPlay:{warned:true},
    deck:['paper1a-01','paper1a-02'],index:0,choices:['A','B','C','D'],
    pending:null,rotation:8,
    modeProgress:{
      challenge:{deck:['paper1a-01','paper1a-02'],index:0,choices:null},
      recall:{deck:['recall-01','recall-02'],index:0,choices:null}
    }
  };
}
test('both original banks are retained with distinct IDs and valid choices',()=>{
  assert.equal(recall.length,60);assert.equal(challenge.length,60);
  assert.equal(new Set([...recall,...challenge].map(q=>q.id)).size,120);
  assert.ok(recall.every(q=>!q.formula));
  assert.ok(challenge.some(q=>q.formula));
  for(const q of [...recall,...challenge])assert.equal(new Set([q.a,...q.wrong]).size,4,q.id);
});
test('switching keeps score, deadline, attempts, history and guessing protection',()=>{
  const s=round(), before={score:s.score,deadline:s.deadline,attempts:s.attempts,correct:s.correct,history:structuredClone(s.history),fairPlay:structuredClone(s.fairPlay),rotation:s.rotation};
  assert.equal(changeRoundMode(s,'recall'),true);
  for(const [k,v] of Object.entries(before))assert.deepEqual(s[k],v,k);
  assert.equal(s.mode,'recall');assert.equal(s.phase,'question');assert.equal(s.index,0);
});
test('returning to an unanswered question restores its choices',()=>{
  const s=round(),original=[...s.choices];
  changeRoundMode(s,'recall');s.choices=['W','X','Y','Z'];
  changeRoundMode(s,'challenge');
  assert.equal(s.index,0);assert.deepEqual(s.choices,original);
});
test('switching after feedback advances past the answered question',()=>{
  const s=round('feedback');
  changeRoundMode(s,'recall');s.choices=['W','X','Y','Z'];
  changeRoundMode(s,'challenge');
  assert.equal(s.index,1);assert.equal(s.deck[s.index],'paper1a-02');assert.equal(s.choices,null);
});
for(const phase of ['spinReady','spinning','results']){
  test('cannot switch during '+phase,()=>{
    const s=round(phase),before=structuredClone(s);
    assert.equal(changeRoundMode(s,'recall'),false);assert.deepEqual(s,before);
  });
}
test('same or unknown mode does not alter the round',()=>{
  for(const target of ['challenge','unknown']){
    const s=round(),before=structuredClone(s);
    assert.equal(changeRoundMode(s,target),false);assert.deepEqual(s,before);
  }
});
test('an exhausted destination cannot reset the deck',()=>{
  const s=round();s.modeProgress.recall.index=2;const before=structuredClone(s);
  assert.equal(changeRoundMode(s,'recall'),false);assert.deepEqual(s,before);
});
test('mixed mode classification survives saving and reloading',()=>{
  const s=round();assert.equal(roundCategory(s),'challenge');
  changeRoundMode(s,'recall');changeRoundMode(s,'challenge');
  assert.equal(roundCategory(JSON.parse(JSON.stringify(s))),'mixed');
  assert.equal(categoryLabel(roundCategory(s)),'Mixed modes');
});
