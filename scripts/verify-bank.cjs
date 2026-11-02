const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'questions.js'), 'utf8'), context);
const { questions, topicMeta } = context.window.IB_PHYSICS_DATA;
assert.equal(questions.length, 1000);
assert.equal(questions.filter(q => q.level === 'SL').length, 664);
assert.equal(questions.filter(q => q.level === 'HL').length, 336);
assert.equal(new Set(questions.map(q => q.id)).size, 1000);
assert.equal(new Set(questions.map(q => q.question)).size, 1000);
assert.equal(topicMeta.length, 25);
for (const q of questions) {
  assert(q.question.trim() && q.answer.trim(), q.id);
  assert(topicMeta.some(t => t.name === q.topic), q.id);
  assert(!/NaN|Infinity|undefined|\b\d+(?:\.\d+)?e[+-]\d+/.test(q.question + q.answer), q.id);
  assert(!/State when .+\?|meant by (emitted|shown)/.test(q.question), q.id);
  if (topicMeta.find(t => t.name === q.topic).minimumLevel === 'HL') assert.equal(q.level, 'HL');
  const parts = [...q.question.matchAll(/(?:^|\n)\(([a-z])\)/g)].map(m => m[1]);
  for (const part of parts) assert(q.answer.includes(`(${part})`), `${q.id} missing answer part ${part}`);
  if (q.question.includes('\nA.')) {
    for (const letter of ['A', 'B', 'C', 'D']) assert(q.question.includes(`\n${letter}.`), q.id);
    assert(/^[ABCD]\./.test(q.answer), q.id);
  }
}
function find(fragment) {
  const q = questions.find(q => q.question.includes(fragment));
  assert(q, `Missing regression question: ${fragment}`);
  return q;
}
assert.match(find('work–energy theorem').answer, /change in kinetic energy/);
assert.match(find('parallax angle used').answer, /Half the total/);
assert.match(find('binding energy per nucleon.').answer, /not generally/);
assert.match(find('straight conducting rod of length').question, /mutually perpendicular/);
assert.match(find('sphere is in electrostatic equilibrium and its cavity').question, /contains no charge/);
assert.match(find('potential varies linearly').question, /linearly/);
assert.match(find('receding source when v').answer, /−v\/c/);
assert.match(find('90°. Calculate the work').answer, /= 0\.00 J/);
assert.match(find('angle 90° with the normal').answer, /= 0\.00 Wb/);
assert.match(find('best-fit gradient of 2.4').answer, /2\.4 ± 0\.3/);
assert.match(find('measured count rate of 180').answer, /6\.0 minutes/);
assert.match(find('constant pressure 2.0 × 10⁵').answer, /W = PΔV = 600 J/);
assert.match(find('constant pressure 2.0 × 10⁵').answer, /Q = 1500 J/);
assert.match(find('An event has x =').question, /parallel/);
for (const q of questions.filter(q => q.question.includes('signed components are'))) {
  const parse = str => Number(str.replace(/ × 10([⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g, (_, e) => 'e' + [...e].map(c => '⁻⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c) === 0 ? '-' : '⁻⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c) - 1).join('')));
  const components = [...q.question.matchAll(/(-?[\d.]+(?: × 10[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+)?) N C⁻¹/g)].map(m => parse(m[1]));
  const value = parse(q.answer.match(/E = (-?[\d.]+(?: × 10[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+)?)/)[1]);
  assert(Math.abs(value - components[0] - components[1]) <= Math.max(1e-12, Math.abs(value) * 0.005), q.id);
}
console.log('PASS: all 1,000 entries, SL/HL filters, unique IDs, subparts, MC options, notation and physics regressions.');

// Optional real DOM exercise; pass a local jsdom package path as the first argument.
if (process.argv[2]) {
  const { JSDOM } = require(process.argv[2]);
  const dom = new JSDOM(fs.readFileSync(path.join(root, 'index.html'), 'utf8'), {
    url: 'https://stp-science.github.io/ib-physics-retrieval/', runScripts: 'outside-only', pretendToBeVisual: true,
  });
  const w = dom.window;
  const errors = [];
  w.addEventListener('error', e => errors.push(e.message));
  w.eval(fs.readFileSync(path.join(root, 'questions.js'), 'utf8'));
  const all = [...w.IB_PHYSICS_DATA.questions];
  w.eval(fs.readFileSync(path.join(root, 'app.js'), 'utf8'));
  const select = w.document.querySelector('#course-level');
  select.value = 'HL';
  select.dispatchEvent(new w.Event('change'));
  for (const q of all) {
    w.IB_PHYSICS_DATA.questions.splice(0, w.IB_PHYSICS_DATA.questions.length, q);
    w.document.querySelector('#start-button').click();
    assert.equal(w.document.querySelector('#question-heading').textContent, q.question, q.id);
    w.document.querySelector('#reveal-button').click();
    assert.equal(w.document.querySelector('.answer-box p').textContent, q.answer, q.id);
    w.document.querySelector('#review-button').click();
    w.document.querySelector('#next-button').click();
    assert.equal(w.document.querySelector('.review-list strong').textContent, q.question, q.id);
    assert.equal(w.document.querySelector('.review-list span').textContent, q.answer, q.id);
  }
  assert.deepEqual(errors, []);
  dom.window.close();
  console.log('PASS: every question renders, reveals, self-marks and appears correctly in quiz review.');
}
