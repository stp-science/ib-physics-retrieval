'use strict';
const explanations = [
'<strong>1 / Incoming sunlight.</strong> The Sun emits a broad spectrum: ultraviolet, visible and infrared. Much visible light passes through the atmosphere. Radiation absorbed by the ground and oceans transfers energy to them and warms them. Some incoming radiation is also absorbed by the atmosphere.',
'<strong>2 / Reflection.</strong> Clouds, particles and the surface reflect some incoming sunlight back to space. Albedo is the fraction reflected. Reflection does not turn visible light into infrared; reflected sunlight remains solar radiation.',
'<strong>3 / Thermal emission.</strong> The warmed surface emits its own radiation, mainly long-wavelength infrared because its temperature is much lower than the Sun’s. Absorption followed by thermal emission is different from reflection.',
'<strong>4 / Infrared absorption.</strong> Greenhouse gases absorb particular wavelengths of outgoing infrared. A photon must match an allowed molecular energy transition. Infrared can excite molecular vibrations; collisions exchange energy with surrounding molecules.',
'<strong>5 / Atmospheric emission.</strong> The atmosphere emits infrared in all directions, including down towards the surface and up towards space. This is emission, not mirror reflection. Downward infrared supplies additional energy to the surface.',
'<strong>6 / Escape and balance.</strong> Some surface infrared escapes directly at wavelengths where the atmosphere absorbs weakly. The atmosphere also emits infrared to space. At equilibrium, total outgoing thermal power equals absorbed solar power. More greenhouse gases initially reduce outgoing power for a given temperature profile, causing warming.'
];
const buttons = [...document.querySelectorAll('[data-step]')];
const processes = [...document.querySelectorAll('[data-process]')];
function selectStep(index) {
 processes.forEach(el => el.classList.toggle('dim', index !== null && Number(el.dataset.process) !== index));
 buttons.forEach(el => el.setAttribute('aria-pressed', String(Number(el.dataset.step) === index)));
 document.getElementById('step-explanation').innerHTML = index === null ? '<strong>All processes shown.</strong> Follow the energy from the Sun to the surface, then follow Earth’s infrared into the atmosphere and out to space. Select a process to read more.' : explanations[index];
}
buttons.forEach(button => button.addEventListener('click', () => selectStep(Number(button.dataset.step))));
document.getElementById('show-all').addEventListener('click', () => selectStep(null));
selectStep(null);
document.getElementById('load-sim').addEventListener('click', function () {
 const iframe = document.createElement('iframe');
 iframe.src = 'https://phet.colorado.edu/sims/html/molecules-and-light/latest/molecules-and-light_all.html';
 iframe.title = 'PhET: Molecules and Light';
 iframe.allowFullscreen = true;
 document.getElementById('sim-container').replaceChildren(iframe);
 this.textContent = 'Simulation loaded'; this.disabled = true;
});
