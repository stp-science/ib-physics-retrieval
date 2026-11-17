'use strict';
const explanations = [
'<strong>1 / Incoming sunlight.</strong> Much visible sunlight passes through the atmosphere and is absorbed by the ground and oceans. Absorption transfers energy to the surface and warms it. Some incoming radiation is also absorbed in the atmosphere.',
'<strong>2 / Reflection from a cloud.</strong> This arrow starts at the cloud shown on the incoming path. Water droplets in the cloud reflect some sunlight back to space. Some sunlight also reaches the surface, where it may be absorbed or reflected. Reflection does not turn visible light into infrared.',
'<strong>3 / The surface emits infrared.</strong> After absorbing energy, the warm surface emits its own radiation. Because Earth is much cooler than the Sun, this is mainly long-wavelength infrared. This is emission, not sunlight bouncing back.',
'<strong>4 / What absorption does.</strong> An infrared photon with the right energy is absorbed by a greenhouse-gas molecule. The photon transfers its energy to the molecule: its atoms vibrate more, with bonds stretching or bending. Collisions can then transfer energy to nearby molecules and warm the air. Look at the vibrating molecule below.',
'<strong>5 / Infrared is emitted again.</strong> Molecules can emit infrared and lose energy. Emission can be in any direction: some infrared goes upwards and some goes back towards the surface, where it can be absorbed. This is not reflection from a mirror.',
'<strong>6 / Some infrared escapes.</strong> Not all infrared is absorbed. Some surface infrared travels directly to space. Infrared emitted upwards by the atmosphere also carries energy into space. Greenhouse gases make the surface warmer than it would otherwise be.'
];
const diagram = document.getElementById('energy-diagram');
if (diagram) {
 const buttons = [...document.querySelectorAll('[data-step]')];
 const processes = [...document.querySelectorAll('[data-process]')];
 function selectStep(index) {
  processes.forEach(el => el.classList.toggle('dim', index !== null && Number(el.dataset.process) !== index));
  buttons.forEach(el => el.setAttribute('aria-pressed', String(Number(el.dataset.step) === index)));
  diagram.classList.toggle('absorbing', index === 3);
  document.getElementById('step-explanation').innerHTML = index === null ? '<strong>All processes shown.</strong> Select each process to see where its arrow starts and what happens to the energy.' : explanations[index];
 }
 buttons.forEach(button => button.addEventListener('click', () => selectStep(Number(button.dataset.step))));
 document.getElementById('show-all').addEventListener('click', () => selectStep(null));
 selectStep(0);
}
const loadSim = document.getElementById('load-sim');
if (loadSim) loadSim.addEventListener('click', function () {
 const iframe = document.createElement('iframe');
 iframe.src = 'https://phet.colorado.edu/sims/html/molecules-and-light/latest/molecules-and-light_all.html';
 iframe.title = 'PhET: Molecules and Light'; iframe.allowFullscreen = true;
 document.getElementById('sim-container').replaceChildren(iframe);
 this.textContent = 'Simulation loaded'; this.disabled = true;
});
