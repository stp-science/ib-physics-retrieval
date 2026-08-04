(() => {
  "use strict";

  // IB Physics guide: first assessment 2025. Questions are original and
  // classified statement-by-statement as common SL/HL content or AHL content.
  const topicMeta = [
    ["A.1 Kinematics", "A. Space, time and motion", "SL"],
    ["A.2 Forces and momentum", "A. Space, time and motion", "SL"],
    ["A.3 Work, energy and power", "A. Space, time and motion", "SL"],
    ["A.4 Rigid body mechanics", "A. Space, time and motion", "HL"],
    ["A.5 Galilean and special relativity", "A. Space, time and motion", "HL"],
    ["B.1 Thermal energy transfers", "B. The particulate nature of matter", "SL"],
    ["B.2 Greenhouse effect", "B. The particulate nature of matter", "SL"],
    ["B.3 Gas laws", "B. The particulate nature of matter", "SL"],
    ["B.4 Thermodynamics", "B. The particulate nature of matter", "HL"],
    ["B.5 Current and circuits", "B. The particulate nature of matter", "SL"],
    ["C.1 Simple harmonic motion", "C. Wave behaviour", "SL"],
    ["C.2 Wave model", "C. Wave behaviour", "SL"],
    ["C.3 Wave phenomena", "C. Wave behaviour", "SL"],
    ["C.4 Standing waves and resonance", "C. Wave behaviour", "SL"],
    ["C.5 Doppler effect", "C. Wave behaviour", "SL"],
    ["D.1 Gravitational fields", "D. Fields", "SL"],
    ["D.2 Electric and magnetic fields", "D. Fields", "SL"],
    ["D.3 Motion in electromagnetic fields", "D. Fields", "SL"],
    ["D.4 Induction", "D. Fields", "HL"],
    ["E.1 Structure of the atom", "E. Nuclear and quantum physics", "SL"],
    ["E.2 Quantum physics", "E. Nuclear and quantum physics", "HL"],
    ["E.3 Radioactive decay", "E. Nuclear and quantum physics", "SL"],
    ["E.4 Fission", "E. Nuclear and quantum physics", "SL"],
    ["E.5 Fusion and stars", "E. Nuclear and quantum physics", "SL"],
    ["Skills in physics", "Tools and inquiry", "SL"],
  ].map(([name, theme, minimumLevel], index) => ({
    name,
    theme,
    minimumLevel,
    icon: name.slice(0, 1),
    colour: ["#7656c8", "#d97925", "#168eb2", "#2c9b69", "#b04475", "#52657a"][Math.floor(index / 5)] || "#52657a",
  }));

  const levelTargets = {
    "A.1 Kinematics": { SL: 48, HL: 0 },
    "A.2 Forces and momentum": { SL: 47, HL: 5 },
    "A.3 Work, energy and power": { SL: 43, HL: 0 },
    "A.4 Rigid body mechanics": { SL: 0, HL: 34 },
    "A.5 Galilean and special relativity": { SL: 0, HL: 39 },
    "B.1 Thermal energy transfers": { SL: 34, HL: 0 },
    "B.2 Greenhouse effect": { SL: 30, HL: 0 },
    "B.3 Gas laws": { SL: 34, HL: 0 },
    "B.4 Thermodynamics": { SL: 0, HL: 39 },
    "B.5 Current and circuits": { SL: 34, HL: 0 },
    "C.1 Simple harmonic motion": { SL: 20, HL: 19 },
    "C.2 Wave model": { SL: 26, HL: 0 },
    "C.3 Wave phenomena": { SL: 29, HL: 23 },
    "C.4 Standing waves and resonance": { SL: 30, HL: 0 },
    "C.5 Doppler effect": { SL: 16, HL: 10 },
    "D.1 Gravitational fields": { SL: 25, HL: 31 },
    "D.2 Electric and magnetic fields": { SL: 34, HL: 26 },
    "D.3 Motion in electromagnetic fields": { SL: 34, HL: 0 },
    "D.4 Induction": { SL: 0, HL: 34 },
    "E.1 Structure of the atom": { SL: 27, HL: 16 },
    "E.2 Quantum physics": { SL: 0, HL: 39 },
    "E.3 Radioactive decay": { SL: 35, HL: 21 },
    "E.4 Fission": { SL: 30, HL: 0 },
    "E.5 Fusion and stars": { SL: 34, HL: 0 },
    "Skills in physics": { SL: 54, HL: 0 },
  };

  const draft = [];
  const add = (topic, level, question, answer) => draft.push({ topic, level, subtopic: topic, question, answer });
  const many = (topic, level, pairs) => pairs.forEach(([question, answer]) => add(topic, level, question, answer));
  const sig = (value, figures = 3) => Number(value.toPrecision(figures)).toString();
  const pct = (value) => `${sig(value, 3)}%`;

  // A. Space, time and motion
  many("A.1 Kinematics", "SL", [
    ["Distinguish distance from displacement.", "Distance is total path length; displacement is the directed change in position."],
    ["Distinguish speed from velocity.", "Speed is scalar; velocity includes direction."],
    ["What is the position of a body?", "Its location relative to a chosen origin in a reference frame."],
    ["Define displacement.", "The change in position: final position minus initial position."],
    ["Define average velocity.", "Displacement divided by elapsed time."],
    ["Define average speed.", "Total distance travelled divided by elapsed time."],
    ["What is instantaneous velocity?", "Velocity at a particular instant; the gradient of the tangent to a position-time graph."],
    ["Define acceleration.", "Rate of change of velocity: a = Δv/Δt."],
    ["What does the gradient of a position-time graph represent?", "Velocity."],
    ["What does the gradient of a velocity-time graph represent?", "Acceleration."],
    ["What does signed area under a velocity-time graph represent?", "Displacement."],
    ["What is uniform acceleration?", "Acceleration that remains constant with time."],
    ["How does non-uniform acceleration appear on a velocity-time graph?", "As a changing gradient."],
    ["When may the constant-acceleration equations be used?", "Only when acceleration is uniform over the interval considered."],
    ["Describe horizontal motion of a projectile when fluid resistance is neglected.", "Horizontal velocity is constant because horizontal acceleration is zero."],
    ["Describe vertical motion of a projectile when fluid resistance is neglected.", "It has constant downward acceleration g."],
    ["At the highest point of a projectile, what are its vertical velocity and acceleration?", "Vertical velocity is momentarily zero; acceleration remains g downward."],
    ["What shape is a projectile trajectory when fluid resistance is absent?", "A parabola."],
    ["How does fluid resistance usually affect projectile range?", "It reduces the range."],
    ["Describe the main qualitative effects of fluid resistance on projectile motion.", "It reduces speed, range and usually maximum height; the trajectory is no longer symmetric or exactly parabolic, and acceleration depends on drag as well as gravity."],
    ["Define terminal speed.", "The constant speed reached when the resultant force becomes zero."],
  ]);
  [[120, 15], [450, 30], [72, 6], [1000, 40], [3.6, 2], [84, 7]].forEach(([distance, time]) =>
    add("A.1 Kinematics", "SL", `A body travels ${distance} m in ${time} s. Calculate its average speed.`, `Average speed = distance/time = ${sig(distance / time)} m s⁻¹.`));
  [[0, 12, 3], [5, 21, 4], [18, 2, 8], [10, 30, 5], [25, 5, 4], [-4, 8, 6]].forEach(([u, v, time]) =>
    add("A.1 Kinematics", "SL", `Velocity changes from ${u} m s⁻¹ to ${v} m s⁻¹ in ${time} s. Calculate the average acceleration.`, `a = (v-u)/t = ${sig((v - u) / time)} m s⁻².`));
  [[3, 2, 5], [12, -1.5, 4], [0, 9.8, 2], [20, -4, 3], [-5, 2, 6]].forEach(([u, a, time]) =>
    add("A.1 Kinematics", "SL", `An object starts at ${u} m s⁻¹ and accelerates at ${a} m s⁻² for ${time} s. Calculate its final velocity.`, `v = u + at = ${sig(u + a * time)} m s⁻¹.`));
  [[4, 16, 5], [20, 8, 3], [-2, 10, 4], [0, 24, 6], [15, 15, 7]].forEach(([u, v, time]) =>
    add("A.1 Kinematics", "SL", `Velocity changes uniformly from ${u} m s⁻¹ to ${v} m s⁻¹ in ${time} s. Calculate displacement.`, `s = ½(u+v)t = ${sig(0.5 * (u + v) * time)} m.`));
  [[20, 4], [45, 3], [12, 5]].forEach(([vx, time]) =>
    add("A.1 Kinematics", "SL", `A projectile has horizontal velocity ${vx} m s⁻¹ and is airborne for ${time} s. Neglect drag. Calculate its horizontal range.`, `Range = vₓt = ${sig(vx * time)} m.`));
  [[19.6], [14.7], [29.4]].forEach(([u]) =>
    add("A.1 Kinematics", "SL", `A ball is thrown vertically upward at ${u} m s⁻¹. Use g = 9.8 m s⁻². Calculate the time to maximum height.`, `At the top v = 0, so t = u/g = ${sig(u / 9.8)} s.`));

  many("A.2 Forces and momentum", "SL", [
    ["State Newton's first law.", "A body remains at rest or at constant velocity unless acted on by a resultant external force."],
    ["State Newton's second law for constant mass.", "The resultant force equals mass multiplied by acceleration: F = ma."],
    ["State Newton's third law.", "Interacting bodies exert forces on each other that are equal in magnitude and opposite in direction."],
    ["What should a free-body diagram show?", "All external forces acting on the chosen body or system."],
    ["What is the normal force?", "The component of contact force perpendicular to the surface."],
    ["State the limiting static-friction relation.", "Ff ≤ μsFN."],
    ["State the dynamic-friction relation.", "Ff = μdFN."],
    ["What is tension?", "A pulling contact force transmitted by a taut string, rope or cable."],
    ["State Hooke's law for the restoring force.", "FH = -kx; the minus sign shows that the force opposes displacement."],
    ["State Stokes' drag law for a small sphere.", "Fd = 6πηrv, opposite to the motion."],
    ["State the buoyancy equation.", "Fb = ρVg, where V is displaced-fluid volume."],
    ["Distinguish mass from weight.", "Mass measures inertia in kg; weight is gravitational force mg in N."],
    ["Give three field forces.", "Gravitational, electric and magnetic forces."],
    ["Define linear momentum.", "p = mv."],
    ["When is total linear momentum conserved?", "When the resultant external force on the system is zero."],
    ["Define impulse.", "Change in momentum: J = FΔt = Δp."],
    ["What does area under a force-time graph represent?", "Impulse, equal to the change in momentum."],
    ["Distinguish elastic from inelastic collisions.", "Kinetic energy is conserved in an elastic collision but not in an inelastic collision; momentum is conserved in both isolated systems."],
    ["How is momentum conserved in an explosion?", "The vector sum of momenta after the explosion equals the initial total momentum if external impulse is zero."],
    ["State centripetal acceleration in terms of speed and radius.", "a = v²/r, directed toward the centre."],
    ["Why does centripetal force do no work in uniform circular motion?", "It is perpendicular to the instantaneous velocity and displacement."],
    ["Relate linear speed and angular speed in circular motion.", "v = ωr."],
  ]);
  [[3, 4], [8, 2.5], [1200, 1.2], [0.4, 15], [65, -0.8]].forEach(([mass, acceleration]) =>
    add("A.2 Forces and momentum", "SL", `A ${mass} kg body has acceleration ${acceleration} m s⁻². Calculate the resultant force.`, `F = ma = ${sig(mass * acceleration)} N.`));
  [[2, 3], [5, 8], [0.4, 25], [1200, 12], [65, -7]].forEach(([mass, velocity]) =>
    add("A.2 Forces and momentum", "SL", `Calculate the momentum of a ${mass} kg body moving at ${velocity} m s⁻¹.`, `p = mv = ${sig(mass * velocity)} kg m s⁻¹.`));
  [[4, 6], [12, 3], [0.5, 20], [80, 2]].forEach(([force, time]) =>
    add("A.2 Forces and momentum", "SL", `A constant resultant force of ${force} N acts for ${time} s. Calculate the impulse.`, `J = FΔt = ${sig(force * time)} N s.`));
  [[120, 0.03], [80, -0.05], [250, 0.012], [35, 0.08]].forEach(([k, extension]) =>
    add("A.2 Forces and momentum", "SL", `A spring has k = ${k} N m⁻¹ and displacement ${extension} m. Calculate the restoring force, including its sign.`, `FH = -kx = ${sig(-k * extension)} N.`));
  [[0.35, 20], [0.6, 50], [0.25, 120]].forEach(([mu, normal]) =>
    add("A.2 Forces and momentum", "SL", `A sliding body has μd = ${mu} and normal force ${normal} N. Calculate dynamic friction.`, `Ff = μdFN = ${sig(mu * normal)} N.`));
  [[1000, 0.003], [800, 0.012]].forEach(([rho, volume]) =>
    add("A.2 Forces and momentum", "SL", `A body displaces ${volume} m³ of fluid of density ${rho} kg m⁻³. Use g = 9.8 m s⁻². Calculate buoyancy.`, `Fb = ρVg = ${sig(rho * volume * 9.8)} N.`));
  [[12, 3], [20, 5]].forEach(([speed, radius]) =>
    add("A.2 Forces and momentum", "SL", `A body moves in a circle at ${speed} m s⁻¹ with radius ${radius} m. Calculate centripetal acceleration.`, `a = v²/r = ${sig(speed * speed / radius)} m s⁻².`));
  many("A.2 Forces and momentum", "HL", [
    ["A 3.0 kg object moves east at 4.0 m s⁻¹ and a 4.0 kg object moves north at 3.0 m s⁻¹. Calculate the magnitude of their total momentum.", "The components are 12 kg m s⁻¹ east and 12 kg m s⁻¹ north, so |p| = √(12²+12²) = 17.0 kg m s⁻¹."],
    ["A stationary object explodes into fragments with momenta 6.0 kg m s⁻¹ east and 8.0 kg m s⁻¹ north. State the momentum of the third fragment.", "6.0 kg m s⁻¹ west and 8.0 kg m s⁻¹ south; its magnitude is 10.0 kg m s⁻¹."],
    ["Two pucks collide on frictionless ice. Initial total momentum is 5.0 kg m s⁻¹ east and 12 kg m s⁻¹ north. What is the final total momentum?", "The same vector: 5.0 kg m s⁻¹ east and 12 kg m s⁻¹ north."],
    ["A ball initially has momentum 10 kg m s⁻¹ east and leaves a collision with momentum 6 kg m s⁻¹ north. State its change in momentum.", "Δp = 6 kg m s⁻¹ north minus 10 kg m s⁻¹ east: components 10 west and 6 north."],
    ["Why must momentum components be conserved separately in a two-dimensional collision?", "Momentum is a vector, so conservation applies independently in each perpendicular direction."],
  ]);

  many("A.3 Work, energy and power", "SL", [
    ["State the principle of conservation of energy.", "Total energy remains constant in an isolated system, although it may change form."],
    ["Define work done by a force.", "Energy transferred when a force acts through a displacement."],
    ["What does a Sankey diagram represent?", "The amounts of energy transferred into useful and dissipated pathways."],
    ["State work done by a constant force at angle θ to displacement.", "W = Fs cos θ."],
    ["State the work-energy relation.", "Work done by the resultant force equals the change in the system's energy."],
    ["What makes up mechanical energy in this course?", "Translational kinetic, gravitational potential and elastic potential energy."],
    ["When is total mechanical energy conserved?", "When no frictional or other non-conservative forces do work."],
    ["State translational kinetic energy.", "Ek = ½mv² = p²/(2m)."],
    ["State the near-Earth change in gravitational potential energy.", "ΔEp = mgΔh."],
    ["State elastic potential energy in a Hookean spring.", "EH = ½k(Δx)²."],
    ["Define power.", "Rate of work done or energy transferred: P = ΔW/Δt."],
    ["State the power relation for a force parallel to velocity.", "P = Fv."],
    ["Define efficiency.", "Useful work or power output divided by total work or power input."],
    ["Define energy density of a fuel.", "Energy released per unit mass or, when specified, per unit volume."],
    ["How does friction affect mechanical energy?", "It transfers mechanical energy to internal energy, so mechanical energy decreases."],
    ["What does area under a force-displacement graph represent?", "Work done."],
    ["When does a non-zero force do zero work?", "When the displacement is perpendicular to the force."],
  ]);
  [[2, 4], [5, 10], [1200, 20], [0.25, 8], [70, 6]].forEach(([mass, speed]) =>
    add("A.3 Work, energy and power", "SL", `Calculate the kinetic energy of a ${mass} kg body moving at ${speed} m s⁻¹.`, `Ek = ½mv² = ${sig(0.5 * mass * speed * speed)} J.`));
  [[20, 5, 0], [40, 3, 60], [12, 8, 30], [100, 2, 90]].forEach(([force, distance, angle]) =>
    add("A.3 Work, energy and power", "SL", `A ${force} N force acts through ${distance} m at ${angle}° to the displacement. Calculate the work done.`, `W = Fs cos θ = ${sig(force * distance * Math.cos(angle * Math.PI / 180))} J.`));
  [[600, 20], [1500, 30], [72, 6], [9000, 45]].forEach(([energy, time]) =>
    add("A.3 Work, energy and power", "SL", `A device transfers ${energy} J in ${time} s. Calculate its power.`, `P = E/t = ${sig(energy / time)} W.`));
  [[80, 100], [450, 600], [1200, 1500], [36, 90]].forEach(([useful, input]) =>
    add("A.3 Work, energy and power", "SL", `A system receives ${input} J and transfers ${useful} J usefully. Calculate its efficiency.`, `η = useful/input = ${pct(100 * useful / input)}.`));
  [[2, 5], [75, 1.2], [0.4, 18], [1200, 0.25]].forEach(([mass, height]) =>
    add("A.3 Work, energy and power", "SL", `A ${mass} kg mass rises ${height} m near Earth. Use g = 9.8 m s⁻². Calculate ΔEp.`, `ΔEp = mgΔh = ${sig(mass * 9.8 * height)} J.`));
  [[200, 0.04], [35, 0.12], [500, 0.025], [80, 0.2], [1200, 0.01]].forEach(([k, extension]) =>
    add("A.3 Work, energy and power", "SL", `A spring of constant ${k} N m⁻¹ is extended ${extension} m. Calculate its elastic potential energy.`, `EH = ½kx² = ${sig(0.5 * k * extension * extension)} J.`));

  many("A.4 Rigid body mechanics", "HL", [
    ["Define torque about an axis.", "τ = Fr sin θ, with clockwise or counter-clockwise sense."],
    ["State the condition for rotational equilibrium.", "The resultant torque about the axis is zero."],
    ["What happens when a rigid body experiences a resultant torque?", "It has angular acceleration."],
    ["Define angular displacement.", "The angle through which a body rotates, measured in radians."],
    ["Define angular speed.", "Rate of change of angular displacement."],
    ["Define angular acceleration.", "Rate of change of angular speed."],
    ["On what does moment of inertia depend?", "The mass and its distribution about the chosen axis."],
    ["State moment of inertia for point masses.", "I = Σmr²."],
    ["State Newton's second law for rotation.", "τ = Iα."],
    ["Define angular momentum of a rigid body.", "L = Iω."],
    ["When is angular momentum conserved?", "When the resultant external torque is zero."],
    ["Define angular impulse.", "τΔt = ΔL = Δ(Iω)."],
    ["State rotational kinetic energy.", "Ek = ½Iω² = L²/(2I)."],
    ["What does rolling without slipping imply?", "The point of contact is instantaneously at rest and v = ωr."],
  ]);
  [[2, 5, 90], [0.4, 12, 30], [3, 1.5, 60], [0.2, 30, 45]].forEach(([r, force, angle]) =>
    add("A.4 Rigid body mechanics", "HL", `A force of ${force} N acts ${r} m from an axis at ${angle}° to the radius. Calculate torque magnitude.`, `τ = Fr sin θ = ${sig(force * r * Math.sin(angle * Math.PI / 180))} N m.`));
  [[2, 4], [0.5, 12], [3, 1.5], [1.2, 6]].forEach(([alpha, time]) =>
    add("A.4 Rigid body mechanics", "HL", `A body starts from rest with angular acceleration ${alpha} rad s⁻² for ${time} s. Calculate final angular speed.`, `ω = αt = ${sig(alpha * time)} rad s⁻¹.`));
  [[[2, 0.5], [3, 0.2]], [[1, 2], [4, 0.5]], [[0.4, 1.5], [0.6, 1.5]], [[5, 0.3], [2, 0.8]]].forEach((points) => {
    const value = points.reduce((sum, [mass, radius]) => sum + mass * radius * radius, 0);
    add("A.4 Rigid body mechanics", "HL", `Point masses ${points.map(([m, r]) => `${m} kg at ${r} m`).join(" and ")} rotate about an axis. Calculate their total moment of inertia.`, `I = Σmr² = ${sig(value)} kg m².`);
  });
  [[2, 4], [0.5, 12], [3, 5], [1.2, 20]].forEach(([inertia, omega]) =>
    add("A.4 Rigid body mechanics", "HL", `A body has I = ${inertia} kg m² and ω = ${omega} rad s⁻¹. Calculate rotational kinetic energy.`, `Ek = ½Iω² = ${sig(0.5 * inertia * omega * omega)} J.`));
  [[2, 4], [0.5, 12], [3, 5], [1.2, 20]].forEach(([inertia, omega]) =>
    add("A.4 Rigid body mechanics", "HL", `A body has I = ${inertia} kg m² and ω = ${omega} rad s⁻¹. Calculate angular momentum.`, `L = Iω = ${sig(inertia * omega)} kg m² s⁻¹.`));

  many("A.5 Galilean and special relativity", "HL", [
    ["What is an inertial reference frame?", "A non-accelerating frame in which Newton's laws have their usual form."],
    ["State Galilean relativity.", "Newton's laws are the same in all inertial reference frames."],
    ["State the Galilean position transformation.", "x′ = x - vt."],
    ["State the Galilean time transformation.", "t′ = t."],
    ["State the Galilean velocity-addition equation.", "u′ = u - v."],
    ["State the first postulate of special relativity.", "The laws of physics are the same in all inertial reference frames."],
    ["State the second postulate of special relativity.", "The speed of light in vacuum is the same for all inertial observers."],
    ["State the Lorentz factor.", "γ = 1/√(1-v²/c²)."],
    ["State the Lorentz position transformation.", "x′ = γ(x-vt)."],
    ["State the Lorentz time transformation.", "t′ = γ(t-vx/c²)."],
    ["State relativistic velocity addition.", "u′ = (u-v)/(1-uv/c²)."],
    ["What is invariant about the space-time interval?", "All inertial observers calculate the same value of (cΔt)²-(Δx)²."],
    ["Define proper time interval.", "Time between events measured in the frame where the events occur at the same position."],
    ["Define proper length.", "Length measured in the rest frame of the object."],
    ["State the time-dilation equation.", "Δt = γΔt₀."],
    ["State the length-contraction equation.", "L = L₀/γ."],
    ["What is the relativity of simultaneity?", "Events simultaneous in one inertial frame need not be simultaneous in another."],
    ["What does a world line show on a space-time diagram?", "The position of an object or event through time."],
    ["What experimental evidence do atmospheric muons provide?", "Their survival to Earth's surface is consistent with time dilation and length contraction."],
  ]);
  [0.5, 0.6, 0.8, 0.9].forEach((beta) =>
    add("A.5 Galilean and special relativity", "HL", `Calculate γ for a speed of ${beta}c.`, `γ = 1/√(1-${beta}²) = ${sig(1 / Math.sqrt(1 - beta * beta))}.`));
  [[2, 0.6], [5, 0.8], [1.5, 0.9], [12, 0.5]].forEach(([proper, beta]) => {
    const gamma = 1 / Math.sqrt(1 - beta * beta);
    add("A.5 Galilean and special relativity", "HL", `A moving clock measures a proper interval of ${proper} s at ${beta}c. Calculate the interval in the laboratory frame.`, `Δt = γΔt₀ = ${sig(gamma * proper)} s.`);
  });
  [[100, 0.6], [12, 0.8], [4, 0.9], [250, 0.5]].forEach(([properLength, beta]) => {
    const gamma = 1 / Math.sqrt(1 - beta * beta);
    add("A.5 Galilean and special relativity", "HL", `A body's proper length is ${properLength} m. Calculate its length when moving at ${beta}c.`, `L = L₀/γ = ${sig(properLength / gamma)} m.`);
  });
  [[80, 12, 4], [150, 20, 5], [10, -3, 2], [300, 25, 8]].forEach(([x, v, time]) =>
    add("A.5 Galilean and special relativity", "HL", `In Galilean frames, x = ${x} m, v = ${v} m s⁻¹ and t = ${time} s. Calculate x′.`, `x′ = x-vt = ${sig(x - v * time)} m.`));
  [[0.8, 0.5], [0.9, 0.6], [0.7, -0.4], [0.95, 0.8]].forEach(([uBeta, vBeta]) =>
    add("A.5 Galilean and special relativity", "HL", `An object moves at ${uBeta}c in frame S while S′ moves at ${vBeta}c in the same direction. Calculate u′/c.`, `u′/c = (${uBeta}-${vBeta})/(1-${uBeta}×${vBeta}) = ${sig((uBeta - vBeta) / (1 - uBeta * vBeta))}.`));

  // B. The particulate nature of matter
  many("B.1 Thermal energy transfers", "SL", [
    ["Compare the particle arrangements in solids, liquids and gases.", "Solids have closely packed particles in fixed relative positions; liquids are close but mobile; gases are widely separated and move freely."],
    ["Define density.", "Mass per unit volume: ρ = m/V."],
    ["How are temperature changes in kelvin and degrees Celsius related?", "A change of 1 K is the same size as a change of 1 °C."],
    ["Convert a Celsius temperature θ to kelvin.", "T = θ + 273.15."],
    ["How is kelvin temperature related to molecular kinetic energy?", "The mean translational kinetic energy is 3kBT/2."],
    ["Define internal energy.", "The total random kinetic energy plus intermolecular potential energy of the particles."],
    ["What determines the direction of resultant thermal energy transfer?", "Temperature difference; energy transfers from higher to lower temperature."],
    ["Why is temperature constant during a phase change?", "Energy changes intermolecular potential energy rather than mean kinetic energy."],
    ["State the specific heat-capacity equation.", "Q = mcΔT."],
    ["State the specific latent-heat equation.", "Q = mL."],
    ["Describe conduction using the particle model.", "More energetic particles transfer kinetic energy through interactions with neighbouring particles."],
    ["State the conduction-rate equation.", "ΔQ/Δt = -kAΔT/Δx."],
    ["What does the minus sign in the conduction equation show?", "Energy transfers down the temperature gradient."],
    ["Describe convection.", "Bulk motion of a fluid caused by density differences transfers energy."],
    ["State the Stefan-Boltzmann law for a black body.", "L = σAT⁴."],
    ["Define apparent brightness.", "Received power per unit area from a source."],
    ["Relate luminosity, apparent brightness and distance.", "b = L/(4πd²)."],
    ["State Wien's displacement law.", "λmaxT = 2.9 × 10⁻³ m K."],
  ]);
  [[7800, 0.002], [1000, 0.025], [1.2, 3.5]].forEach(([density, volume]) =>
    add("B.1 Thermal energy transfers", "SL", `A substance has density ${density} kg m⁻³ and volume ${volume} m³. Calculate its mass.`, `m = ρV = ${sig(density * volume)} kg.`));
  [[20], [-15]].forEach(([celsius]) =>
    add("B.1 Thermal energy transfers", "SL", `Convert ${celsius} °C to kelvin.`, `T = θ + 273.15 = ${sig(celsius + 273.15, 5)} K.`));
  [[1, 4200, 5], [2, 900, 20], [0.5, 390, 30]].forEach(([mass, capacity, change]) =>
    add("B.1 Thermal energy transfers", "SL", `Calculate the energy needed to heat ${mass} kg of material with c = ${capacity} J kg⁻¹ K⁻¹ through ${change} K.`, `Q = mcΔT = ${sig(mass * capacity * change)} J.`));
  [[0.2, 334000], [0.5, 2260000]].forEach(([mass, latent]) =>
    add("B.1 Thermal energy transfers", "SL", `A ${mass} kg sample changes phase with L = ${latent} J kg⁻¹. Calculate the energy transferred.`, `Q = mL = ${sig(mass * latent)} J.`));
  [[205, 0.01, 40, 0.5], [0.8, 2, 15, 0.1]].forEach(([conductivity, area, change, thickness]) =>
    add("B.1 Thermal energy transfers", "SL", `A slab has k = ${conductivity} W m⁻¹ K⁻¹, area ${area} m², thickness ${thickness} m and temperature difference ${change} K. Calculate the conduction rate magnitude.`, `|ΔQ/Δt| = kAΔT/Δx = ${sig(conductivity * area * change / thickness)} W.`));
  [[3.8e26, 2e16], [5e28, 4e17]].forEach(([luminosity, distance]) =>
    add("B.1 Thermal energy transfers", "SL", `A star has luminosity ${luminosity.toExponential(1)} W and is ${distance.toExponential(1)} m away. Calculate its apparent brightness.`, `b = L/(4πd²) = ${sig(luminosity / (4 * Math.PI * distance * distance))} W m⁻².`));
  [[5800], [300]].forEach(([temperature]) =>
    add("B.1 Thermal energy transfers", "SL", `A black body is at ${temperature} K. Calculate its peak wavelength using Wien's law.`, `λmax = 2.9×10⁻³/T = ${sig(2.9e-3 / temperature)} m.`));

  many("B.2 Greenhouse effect", "SL", [
    ["Define emissivity.", "Power radiated per unit area divided by σT⁴ for a black surface at the same temperature."],
    ["Define albedo.", "Total scattered power divided by total incident power."],
    ["Name two factors that cause Earth's albedo to vary.", "Cloud formation and latitude."],
    ["What is the solar constant?", "Solar power received per unit area on a surface normal to the rays at Earth's orbital distance."],
    ["Why is the mean incoming solar intensity over a spherical planet S/4?", "The planet intercepts πR² but distributes energy over surface area 4πR²."],
    ["Name the four main greenhouse gases specified in the guide.", "Methane, water vapour, carbon dioxide and nitrous oxide."],
    ["Do the main greenhouse gases have only human sources?", "No. Each has both natural sources and sources created or increased by human activity."],
    ["Why do greenhouse gases absorb selected infrared wavelengths?", "Their molecular energy-level spacings match the photon energies."],
    ["What happens after a greenhouse-gas molecule absorbs infrared radiation?", "It can re-emit radiation in all directions."],
    ["How does the resonance model represent greenhouse-gas absorption?", "The driving infrared frequency matches a natural molecular vibration frequency."],
    ["Define the enhanced greenhouse effect.", "The increase in the greenhouse effect caused by human activities."],
    ["Why does the greenhouse effect warm Earth's surface?", "Downward re-emission by the atmosphere reduces the net rate of energy loss from the surface."],
    ["State the equilibrium condition for a planet's average temperature.", "Average absorbed power equals average emitted power."],
    ["How does increasing albedo affect equilibrium temperature?", "It lowers the temperature because less incoming radiation is absorbed."],
    ["How does increasing emissivity affect emitted power at fixed temperature?", "It increases emitted power in direct proportion to emissivity."],
  ]);
  [[400, 500], [720, 800], [250, 1000]].forEach(([actual, black]) =>
    add("B.2 Greenhouse effect", "SL", `A surface radiates ${actual} W m⁻² while a black surface at the same temperature radiates ${black} W m⁻². Calculate emissivity.`, `e = actual/black = ${sig(actual / black)}.`));
  [[30, 120], [180, 600], [75, 500]].forEach(([scattered, incident]) =>
    add("B.2 Greenhouse effect", "SL", `A body scatters ${scattered} W from ${incident} W incident power. Calculate its albedo.`, `Albedo = scattered/incident = ${sig(scattered / incident)}.`));
  [1360, 1400, 900].forEach((solarConstant) =>
    add("B.2 Greenhouse effect", "SL", `A planet receives solar constant S = ${solarConstant} W m⁻². Calculate the mean incoming intensity before allowing for albedo.`, `Mean intensity = S/4 = ${sig(solarConstant / 4)} W m⁻².`));
  [[1360, 0.30, 1], [900, 0.20, 0.8], [2200, 0.45, 0.9], [500, 0.10, 1]].forEach(([solarConstant, albedo, emissivity]) => {
    const sigma = 5.67e-8;
    const temperature = Math.pow(solarConstant * (1 - albedo) / (4 * emissivity * sigma), 0.25);
    add("B.2 Greenhouse effect", "SL", `A planet has S = ${solarConstant} W m⁻², albedo ${albedo} and emissivity ${emissivity}. Estimate equilibrium temperature using σ = 5.67 × 10⁻⁸ W m⁻² K⁻⁴.`, `S(1-a)/4 = eσT⁴, so T = ${sig(temperature)} K.`);
  });
  [[340, 0.25], [300, 0.4], [500, 0.1]].forEach(([meanIncoming, albedo]) =>
    add("B.2 Greenhouse effect", "SL", `Mean incident intensity is ${meanIncoming} W m⁻² and albedo is ${albedo}. Calculate absorbed intensity.`, `Absorbed intensity = (1-a)I = ${sig((1 - albedo) * meanIncoming)} W m⁻².`));

  many("B.3 Gas laws", "SL", [
    ["Define pressure.", "Normal force per unit area: P = F/A."],
    ["Define amount of substance in moles using particle number.", "n = N/NA."],
    ["What is an ideal gas?", "A model gas that obeys the ideal-gas equation under the conditions considered."],
    ["State the combined gas-law relation for a fixed amount of gas.", "PV/T = constant."],
    ["State both forms of the ideal-gas equation.", "PV = NkBT and PV = nRT."],
    ["Explain gas pressure microscopically.", "Molecules change momentum when colliding with the walls, producing a force per unit area."],
    ["Relate pressure to density and mean square molecular speed.", "P = ρ⟨v²⟩/3."],
    ["State internal energy of a monatomic ideal gas in terms of molecules.", "U = 3NkBT/2."],
    ["State internal energy of a monatomic ideal gas in terms of moles.", "U = 3nRT/2."],
    ["When does a real gas most closely approximate an ideal gas?", "At low density, typically low pressure and high temperature away from condensation."],
    ["How does increasing temperature at constant volume affect pressure?", "Pressure increases because molecules collide more often and with greater momentum change."],
    ["How does increasing volume at constant temperature affect pressure?", "Pressure decreases because collisions with the walls become less frequent."],
    ["What is shown by an isotherm on a pressure-volume graph?", "States at the same temperature."],
    ["Why must absolute temperature be used in gas laws?", "The proportionalities are based on the kelvin scale with zero at absolute zero."],
    ["What assumption is made about intermolecular forces in an ideal gas?", "They are negligible except during collisions."],
  ]);
  [[200, 0.5], [1200, 0.03], [75, 0.002]].forEach(([force, area]) =>
    add("B.3 Gas laws", "SL", `A normal force of ${force} N acts over ${area} m². Calculate pressure.`, `P = F/A = ${sig(force / area)} Pa.`));
  [[6.02e23], [3.01e23], [1.204e24]].forEach(([particles]) =>
    add("B.3 Gas laws", "SL", `A sample contains ${particles.toExponential(3)} molecules. Use NA = 6.02 × 10²³ mol⁻¹. Calculate amount in moles.`, `n = N/NA = ${sig(particles / 6.02e23)} mol.`));
  [[1, 1e5, 0.024], [2, 2e5, 0.01], [0.5, 1.5e5, 0.02], [3, 9e4, 0.08], [0.25, 3e5, 0.005], [1.5, 1.2e5, 0.03]].forEach(([moles, pressure, volume]) =>
    add("B.3 Gas laws", "SL", `${moles} mol of ideal gas has P = ${pressure} Pa and V = ${volume} m³. Calculate T using R = 8.31 J mol⁻¹ K⁻¹.`, `T = PV/(nR) = ${sig(pressure * volume / (moles * 8.31))} K.`));
  [[1e5, 0.02, 300, 0.01, 450], [2e5, 0.01, 400, 0.025, 250], [8e4, 0.03, 280, 0.02, 350], [1.5e5, 0.04, 320, 0.05, 400]].forEach(([p1, v1, t1, v2, t2]) =>
    add("B.3 Gas laws", "SL", `A fixed gas changes from P₁=${p1} Pa, V₁=${v1} m³, T₁=${t1} K to V₂=${v2} m³, T₂=${t2} K. Calculate P₂.`, `P₂ = P₁V₁T₂/(T₁V₂) = ${sig(p1 * v1 * t2 / (t1 * v2))} Pa.`));
  [[1.2, 1e5], [0.8, 2e5], [1.5, 5e4]].forEach(([density, pressure]) =>
    add("B.3 Gas laws", "SL", `An ideal gas has density ${density} kg m⁻³ and pressure ${pressure} Pa. Calculate its rms molecular speed using P = ρ⟨v²⟩/3.`, `vrms = √(3P/ρ) = ${sig(Math.sqrt(3 * pressure / density))} m s⁻¹.`));

  many("B.4 Thermodynamics", "HL", [
    ["State the first law of thermodynamics using the IB sign convention.", "Q = ΔU + W, where Q enters the system and W is work done by the system."],
    ["What is a closed system?", "A system that can exchange energy but not mass with its surroundings."],
    ["What is an isolated system?", "A system that exchanges neither energy nor mass with its surroundings."],
    ["State work done by a gas at constant pressure.", "W = PΔV."],
    ["What sign does work done by a gas have in the IB convention?", "Positive."],
    ["State the change in internal energy of a monatomic ideal gas.", "ΔU = 3NkBΔT/2 = 3nRΔT/2."],
    ["Define entropy macroscopically for a reversible transfer.", "ΔS = ΔQrev/T."],
    ["State Boltzmann's entropy equation.", "S = kB ln Ω."],
    ["What is a microstate?", "One microscopic arrangement consistent with the system's macrostate."],
    ["State the second law for an isolated system.", "Its entropy cannot decrease; it increases for an irreversible process."],
    ["Can entropy decrease locally in a non-isolated system?", "Yes, if the surroundings gain at least as much entropy."],
    ["Define an isovolumetric process.", "A constant-volume process, so W = 0."],
    ["Define an isobaric process.", "A constant-pressure process."],
    ["Define an isothermal process.", "A constant-temperature process; ΔU = 0 for an ideal gas."],
    ["Define an adiabatic process.", "A process with Q = 0."],
    ["State the adiabatic relation for a monatomic ideal gas.", "PV^(5/3) = constant."],
    ["How does a cyclic gas process produce useful work?", "The net work is the area enclosed by the cycle on a P-V diagram."],
    ["State the maximum Carnot efficiency.", "ηCarnot = 1 - Tc/Th, with temperatures in kelvin."],
  ]);
  [[500, 120], [1000, 250], [-200, 80], [750, -100], [0, 300]].forEach(([heat, work]) =>
    add("B.4 Thermodynamics", "HL", `A gas receives Q = ${heat} J and does W = ${work} J. Calculate ΔU.`, `ΔU = Q-W = ${sig(heat - work)} J.`));
  [[2e5, 0.003], [1e5, -0.002], [5e4, 0.01], [3e5, 0.0005]].forEach(([pressure, change]) =>
    add("B.4 Thermodynamics", "HL", `A gas changes volume by ${change} m³ at constant pressure ${pressure} Pa. Calculate work done by the gas.`, `W = PΔV = ${sig(pressure * change)} J.`));
  [[1, 20], [2, -15], [0.5, 80], [3, 5]].forEach(([moles, change]) =>
    add("B.4 Thermodynamics", "HL", `${moles} mol of monatomic ideal gas changes temperature by ${change} K. Calculate ΔU using R = 8.31 J mol⁻¹ K⁻¹.`, `ΔU = 3nRΔT/2 = ${sig(1.5 * moles * 8.31 * change)} J.`));
  [[600, 300], [1200, 400], [-500, 250], [90, 450]].forEach(([heat, temperature]) =>
    add("B.4 Thermodynamics", "HL", `A reversible transfer of ${heat} J occurs at ${temperature} K. Calculate the entropy change of the receiving system.`, `ΔS = Q/T = ${sig(heat / temperature)} J K⁻¹.`));
  [[300, 600], [280, 700], [400, 1000], [250, 500]].forEach(([cold, hot]) =>
    add("B.4 Thermodynamics", "HL", `A Carnot engine operates between ${hot} K and ${cold} K. Calculate its maximum efficiency.`, `η = 1-Tc/Th = ${pct(100 * (1 - cold / hot))}.`));

  many("B.5 Current and circuits", "SL", [
    ["What is emf?", "Energy supplied per unit charge by a source."],
    ["Name two energy sources used in cells in this course.", "Chemical reactions and solar radiation."],
    ["Define direct current.", "A flow of charge in one direction."],
    ["Define current.", "Rate of flow of charge: I = Δq/Δt."],
    ["Define electric potential difference.", "Work done per unit charge: V = W/q."],
    ["Distinguish conductors from insulators using charge carriers.", "Conductors have mobile charge carriers; insulators do not have freely mobile carriers."],
    ["Define resistance.", "R = V/I."],
    ["State the resistivity relation.", "ρ = RA/L, or R = ρL/A."],
    ["State Ohm's law.", "Current is proportional to potential difference when physical conditions such as temperature are constant."],
    ["Why can a filament lamp be non-ohmic?", "Its temperature and therefore resistance change as current increases."],
    ["State three equations for electrical power in a resistor.", "P = IV = I²R = V²/R."],
    ["State the current rule for a series circuit.", "Current is the same through every series component."],
    ["State the potential-difference rule for a parallel circuit.", "Potential difference is the same across each parallel branch."],
    ["State equivalent resistance for series resistors.", "Rs = R1 + R2 + ..."],
    ["State equivalent resistance for parallel resistors.", "1/Rp = 1/R1 + 1/R2 + ..."],
    ["Relate emf, internal resistance and external resistance.", "ε = I(R+r)."],
    ["How does an LDR's resistance usually change as light intensity increases?", "It decreases."],
    ["How does an NTC thermistor's resistance usually change as temperature increases?", "It decreases."],
    ["Give one advantage and one limitation of a solar cell as an electrical energy source.", "It is renewable in operation, but output depends on light intensity and is intermittent."],
  ]);
  [[12, 4], [360, 30], [2.5, 0.5]].forEach(([charge, time]) =>
    add("B.5 Current and circuits", "SL", `${charge} C passes a point in ${time} s. Calculate current.`, `I = q/t = ${sig(charge / time)} A.`));
  [[30, 5], [1200, 240]].forEach(([work, charge]) =>
    add("B.5 Current and circuits", "SL", `${work} J is transferred when ${charge} C moves between two points. Calculate potential difference.`, `V = W/q = ${sig(work / charge)} V.`));
  [[6, 3], [12, 0.4]].forEach(([voltage, current]) =>
    add("B.5 Current and circuits", "SL", `A component has ${voltage} V across it and current ${current} A. Calculate resistance.`, `R = V/I = ${sig(voltage / current)} Ω.`));
  [[12, 3], [24, 2], [230, 5]].forEach(([voltage, current]) =>
    add("B.5 Current and circuits", "SL", `Calculate electrical power for V = ${voltage} V and I = ${current} A.`, `P = VI = ${sig(voltage * current)} W.`));
  [[4, 6], [12, 8]].forEach(([r1, r2]) =>
    add("B.5 Current and circuits", "SL", `Resistors of ${r1} Ω and ${r2} Ω are connected in series. Calculate equivalent resistance.`, `Rs = R1+R2 = ${sig(r1 + r2)} Ω.`));
  [[6, 3], [12, 4]].forEach(([r1, r2]) =>
    add("B.5 Current and circuits", "SL", `Resistors of ${r1} Ω and ${r2} Ω are connected in parallel. Calculate equivalent resistance.`, `Rp = 1/(1/R1+1/R2) = ${sig(1 / (1 / r1 + 1 / r2))} Ω.`));
  [[12, 5, 1], [6, 10, 2]].forEach(([emf, external, internal]) =>
    add("B.5 Current and circuits", "SL", `A cell has emf ${emf} V, external resistance ${external} Ω and internal resistance ${internal} Ω. Calculate current.`, `I = ε/(R+r) = ${sig(emf / (external + internal))} A.`));

  // C. Wave behaviour
  many("C.1 Simple harmonic motion", "SL", [
    ["What condition produces simple harmonic motion?", "Acceleration is proportional to displacement from equilibrium and directed toward equilibrium."],
    ["State the defining equation of SHM.", "a = -ω²x."],
    ["What does the minus sign in a = -ω²x show?", "Acceleration is opposite to displacement and points toward equilibrium."],
    ["Define amplitude.", "Maximum magnitude of displacement from equilibrium."],
    ["Define the period of an oscillator.", "Time for one complete oscillation."],
    ["Relate period and frequency.", "T = 1/f."],
    ["Relate period and angular frequency.", "T = 2π/ω."],
    ["State the period of a mass-spring oscillator.", "T = 2π√(m/k)."],
    ["State the small-oscillation period of a simple pendulum.", "T = 2π√(l/g)."],
    ["Where is kinetic energy greatest during SHM?", "At equilibrium, where speed is greatest."],
    ["Where is potential energy greatest during SHM?", "At the extreme positions, where displacement magnitude is greatest."],
    ["How does energy change during one ideal SHM cycle?", "Kinetic and potential energy continually interchange while total energy remains constant."],
  ]);
  [[2], [0.5], [4]].forEach(([period]) =>
    add("C.1 Simple harmonic motion", "SL", `An oscillator has period ${period} s. Calculate angular frequency.`, `ω = 2π/T = ${sig(2 * Math.PI / period)} rad s⁻¹.`));
  [[0.5, 200], [2, 50], [0.25, 800]].forEach(([mass, springConstant]) =>
    add("C.1 Simple harmonic motion", "SL", `A mass-spring oscillator has m = ${mass} kg and k = ${springConstant} N m⁻¹. Calculate its period.`, `T = 2π√(m/k) = ${sig(2 * Math.PI * Math.sqrt(mass / springConstant))} s.`));
  [[1, 9.8], [0.25, 9.8]].forEach(([length, gravity]) =>
    add("C.1 Simple harmonic motion", "SL", `A simple pendulum has length ${length} m where g = ${gravity} m s⁻². Calculate its period.`, `T = 2π√(l/g) = ${sig(2 * Math.PI * Math.sqrt(length / gravity))} s.`));
  many("C.1 Simple harmonic motion", "HL", [
    ["Define phase angle in SHM.", "The angular quantity ωt+ϕ that identifies the oscillator's stage in its cycle."],
    ["State one displacement equation for SHM.", "x = x₀ sin(ωt+ϕ)."],
    ["State the corresponding velocity equation for x = x₀ sin(ωt+ϕ).", "v = ωx₀ cos(ωt+ϕ)."],
    ["Relate speed to displacement in SHM.", "v = ±ω√(x₀²-x²)."],
    ["State total energy in SHM.", "ET = ½mω²x₀²."],
    ["State potential energy in SHM.", "Ep = ½mω²x²."],
    ["How are displacement and acceleration phased in SHM?", "They differ by π rad."],
    ["How are displacement and velocity phased in SHM?", "They differ by π/2 rad."],
    ["What happens to maximum speed if amplitude doubles at fixed ω?", "Maximum speed doubles because vmax = ωx₀."],
  ]);
  [[0.2, 4, Math.PI / 6], [0.5, 2, Math.PI / 3], [0.08, 10, Math.PI / 2]].forEach(([amplitude, omega, phase]) =>
    add("C.1 Simple harmonic motion", "HL", `For x = x₀ sin(ωt+ϕ), x₀=${amplitude} m and ωt+ϕ=${sig(phase)} rad. Calculate x.`, `x = x₀ sin(phase) = ${sig(amplitude * Math.sin(phase))} m.`));
  [[4, 0.5, 0.3], [8, 0.2, 0.12], [3, 1.5, 0.9]].forEach(([omega, amplitude, displacement]) =>
    add("C.1 Simple harmonic motion", "HL", `An oscillator has ω=${omega} rad s⁻¹, amplitude ${amplitude} m and displacement ${displacement} m. Calculate its speed magnitude.`, `|v| = ω√(x₀²-x²) = ${sig(omega * Math.sqrt(amplitude * amplitude - displacement * displacement))} m s⁻¹.`));
  [[0.5, 4, 0.2], [2, 3, 0.1]].forEach(([mass, omega, amplitude]) =>
    add("C.1 Simple harmonic motion", "HL", `An oscillator has m=${mass} kg, ω=${omega} rad s⁻¹ and amplitude ${amplitude} m. Calculate total energy.`, `ET = ½mω²x₀² = ${sig(0.5 * mass * omega * omega * amplitude * amplitude)} J.`));
  [[0.5, 4, 0.1], [2, 3, 0.05]].forEach(([mass, omega, displacement]) =>
    add("C.1 Simple harmonic motion", "HL", `An oscillator has m=${mass} kg, ω=${omega} rad s⁻¹ and displacement ${displacement} m. Calculate potential energy.`, `Ep = ½mω²x² = ${sig(0.5 * mass * omega * omega * displacement * displacement)} J.`));

  many("C.2 Wave model", "SL", [
    ["Distinguish transverse and longitudinal waves.", "Oscillations are perpendicular to propagation in transverse waves and parallel in longitudinal waves."],
    ["Define wavelength.", "The shortest distance between points in the same phase on a wave."],
    ["Define wave frequency.", "The number of complete oscillations passing a point per unit time."],
    ["Define wave period.", "Time for one complete oscillation."],
    ["State the wave equation.", "v = fλ = λ/T."],
    ["What type of mechanical wave is sound in air?", "Longitudinal."],
    ["What oscillates in a sound wave in air?", "Air particles oscillate parallel to the direction of energy transfer."],
    ["What is an electromagnetic wave?", "A transverse oscillation of electric and magnetic fields that can travel through a vacuum."],
    ["Why can electromagnetic waves travel through a vacuum?", "They do not require particles of a material medium."],
    ["Why can a mechanical wave not travel through a vacuum?", "It requires particles of a medium to transfer the disturbance."],
    ["Do particles of a medium travel with a progressive wave?", "No; they oscillate about equilibrium while energy propagates."],
    ["What does a travelling wave transfer?", "Energy without a resultant transfer of matter."],
    ["Arrange radio, microwave and infrared in order of increasing frequency.", "Radio, microwave, infrared."],
    ["Arrange ultraviolet, X-rays and gamma rays in order of increasing wavelength.", "Gamma rays, X-rays, ultraviolet."],
    ["What changes when a wave crosses into a medium where its speed changes but source frequency is fixed?", "Its wavelength changes; frequency remains fixed."],
    ["Give the approximate wavelength range of visible light.", "About 400 nm to 700 nm."],
  ]);
  [[2, 3], [50, 0.4], [340, 680], [1500, 500]].forEach(([speed, frequency]) =>
    add("C.2 Wave model", "SL", `A wave travels at ${speed} m s⁻¹ with frequency ${frequency} Hz. Calculate wavelength.`, `λ = v/f = ${sig(speed / frequency)} m.`));
  [[0.8, 5], [2.5, 12], [0.03, 2e6], [600, 0.5]].forEach(([wavelength, frequency]) =>
    add("C.2 Wave model", "SL", `A wave has wavelength ${wavelength} m and frequency ${frequency} Hz. Calculate wave speed.`, `v = fλ = ${sig(wavelength * frequency)} m s⁻¹.`));
  [[10], [250], [2e6]].forEach(([frequency]) =>
    add("C.2 Wave model", "SL", `A wave has frequency ${frequency} Hz. Calculate its period.`, `T = 1/f = ${sig(1 / frequency)} s.`));

  many("C.3 Wave phenomena", "SL", [
    ["What is a wavefront?", "A line or surface joining points that are in the same phase."],
    ["What does a ray show?", "The direction of wave propagation and energy transfer, perpendicular to wavefronts."],
    ["State the law of reflection.", "Angle of incidence equals angle of reflection, measured from the normal."],
    ["What is refraction?", "A change in wave direction caused by a change in speed at a boundary."],
    ["What remains unchanged when a wave refracts at a stationary boundary?", "Frequency."],
    ["State Snell's law in the form used in the guide.", "n₁/n₂ = sin θ₂/sin θ₁ = v₂/v₁."],
    ["Define the critical angle.", "The incident angle in the higher-index medium that gives a refracted angle of 90°."],
    ["State the two conditions for total internal reflection.", "The wave travels from higher to lower refractive index and incidence exceeds the critical angle."],
    ["When is diffraction most noticeable?", "When aperture or obstacle size is comparable to the wavelength."],
    ["How do wavefronts change after passing through a narrow aperture?", "They spread out and become more curved."],
    ["State the principle of superposition.", "Resultant displacement is the vector sum of individual displacements."],
    ["What makes two sources coherent?", "They have the same frequency and a constant phase difference."],
    ["State the constructive-interference path condition.", "Path difference = nλ."],
    ["State the destructive-interference path condition.", "Path difference = (n+½)λ."],
    ["State Young's double-slit fringe-spacing equation.", "s = λD/d."],
    ["How does increasing slit separation affect fringe spacing?", "It decreases fringe spacing."],
    ["How does increasing wavelength affect diffraction and double-slit spacing?", "Diffraction increases and double-slit fringes become farther apart."],
  ]);
  [[1, 30, 1.5, 45], [1.5, 20, 1, 0], [1.33, 40, 1.5, 0]].forEach(([n1, theta1, n2]) => {
    const sine = n1 * Math.sin(theta1 * Math.PI / 180) / n2;
    add("C.3 Wave phenomena", "SL", `Light travels from n₁=${n1} at θ₁=${theta1}° into n₂=${n2}. Calculate θ₂.`, `sin θ₂ = n₁sinθ₁/n₂, so θ₂ = ${sig(Math.asin(sine) * 180 / Math.PI)}°.`);
  });
  [1.5, 1.33, 2.4].forEach((index) =>
    add("C.3 Wave phenomena", "SL", `Calculate the critical angle for light travelling from refractive index ${index} into air.`, `c = sin⁻¹(1/n) = ${sig(Math.asin(1 / index) * 180 / Math.PI)}°.`));
  [[500e-9, 2, 0.5e-3], [650e-9, 1.5, 0.3e-3], [450e-9, 3, 0.75e-3]].forEach(([wavelength, distance, separation]) =>
    add("C.3 Wave phenomena", "SL", `Double slits have d=${separation} m, screen distance D=${distance} m and wavelength ${wavelength} m. Calculate fringe spacing.`, `s = λD/d = ${sig(wavelength * distance / separation)} m.`));
  [[2.5, 0.5], [3.5, 0.75], [5.5, 1.5]].forEach(([pathInWavelengths, offset]) =>
    add("C.3 Wave phenomena", "SL", `At a point, the path difference is ${pathInWavelengths}λ. Is the interference constructive or destructive?`, `${Number.isInteger(pathInWavelengths) ? "Constructive" : "Destructive"}; the path difference is ${Number.isInteger(pathInWavelengths) ? "an integer" : "a half-integer"} multiple of λ.`));
  many("C.3 Wave phenomena", "HL", [
    ["Describe the intensity pattern from a single narrow slit.", "A broad bright central maximum with weaker, narrower side maxima separated by minima."],
    ["State the approximate first-minimum condition for single-slit diffraction.", "θ = λ/b for small angles, equivalently b sin θ ≈ λ."],
    ["How does decreasing single-slit width affect the central maximum?", "It becomes wider."],
    ["How does increasing wavelength affect a single-slit pattern?", "The minima move farther apart and the central maximum widens."],
    ["How does the single-slit pattern affect a double-slit pattern?", "It forms an envelope that modulates the double-slit fringe intensities."],
    ["State the diffraction-grating equation.", "nλ = d sin θ."],
    ["How do more illuminated grating slits affect principal maxima?", "They become narrower and more intense."],
    ["How does a grating separate white light?", "Different wavelengths have maxima at different angles."],
    ["Which grating order is undeviated for all wavelengths?", "The zero order."],
    ["Why can some high grating orders not occur?", "They would require sin θ > 1."],
  ]);
  [[500e-9, 0.1e-3], [600e-9, 0.2e-3], [450e-9, 0.05e-3], [700e-9, 0.15e-3]].forEach(([wavelength, width]) =>
    add("C.3 Wave phenomena", "HL", `A slit has width ${width} m and light wavelength ${wavelength} m. Estimate the first-minimum angle in radians.`, `θ ≈ λ/b = ${sig(wavelength / width)} rad.`));
  [[500e-9, 2e-6, 1], [600e-9, 3e-6, 2], [450e-9, 1.5e-6, 1], [650e-9, 4e-6, 3]].forEach(([wavelength, spacing, order]) => {
    const sine = order * wavelength / spacing;
    add("C.3 Wave phenomena", "HL", `A grating has spacing ${spacing} m. Calculate the angle of order ${order} for wavelength ${wavelength} m.`, `sin θ = nλ/d, so θ = ${sig(Math.asin(sine) * 180 / Math.PI)}°.`);
  });
  [[600e3, 500e-9], [1200e3, 650e-9], [300e3, 450e-9], [500e3, 550e-9], [800e3, 400e-9]].forEach(([linesPerMetre, wavelength]) => {
    const spacing = 1 / linesPerMetre;
    const maxOrder = Math.floor(spacing / wavelength);
    add("C.3 Wave phenomena", "HL", `A grating has ${linesPerMetre} lines m⁻¹ and wavelength ${wavelength} m. Determine the highest possible order.`, `d = 1/N and n≤d/λ, so highest order = ${maxOrder}.`);
  });

  many("C.4 Standing waves and resonance", "SL", [
    ["How is a standing wave formed?", "By superposition of two identical waves travelling in opposite directions."],
    ["Define a node.", "A position of zero displacement amplitude."],
    ["Define an antinode.", "A position of maximum displacement amplitude."],
    ["What is the separation of adjacent nodes?", "λ/2."],
    ["What is the separation from a node to an adjacent antinode?", "λ/4."],
    ["How do two points within the same loop of a standing wave oscillate?", "In phase."],
    ["How do points in adjacent loops oscillate?", "In antiphase, a phase difference of π rad."],
    ["What boundary condition occurs at a fixed end of a string?", "A displacement node."],
    ["What boundary condition occurs at a free end of a string?", "A displacement antinode."],
    ["What air-displacement condition occurs at an open pipe end?", "A displacement antinode."],
    ["What air-displacement condition occurs at a closed pipe end?", "A displacement node."],
    ["What is the first harmonic?", "The lowest-frequency allowed standing-wave mode."],
    ["Define resonance.", "A large-amplitude response when driving frequency is near a natural frequency."],
    ["What happens to energy transfer at resonance?", "Average energy transfer from the driver to the oscillator is greatest."],
    ["How does light damping affect a free oscillation?", "Amplitude decreases slowly over many cycles."],
    ["What is critical damping?", "The least damping that returns a displaced system to equilibrium without oscillation."],
    ["What is heavy damping?", "Return to equilibrium without oscillation but more slowly than critical damping."],
    ["How does greater damping affect a resonance response curve?", "It lowers and broadens the maximum and may shift it slightly lower."],
  ]);
  [[0.5, 120, 1], [0.8, 200, 2], [1.2, 90, 3], [0.4, 300, 4]].forEach(([length, speed, harmonic]) =>
    add("C.4 Standing waves and resonance", "SL", `A string fixed at both ends has L=${length} m and wave speed ${speed} m s⁻¹. Calculate frequency of harmonic ${harmonic}.`, `fn = nv/(2L) = ${sig(harmonic * speed / (2 * length))} Hz.`));
  [[0.85, 340, 1], [0.5, 330, 2], [1.2, 360, 3], [0.25, 340, 4]].forEach(([length, speed, harmonic]) =>
    add("C.4 Standing waves and resonance", "SL", `An open pipe has L=${length} m and sound speed ${speed} m s⁻¹. Calculate frequency of harmonic ${harmonic}.`, `fn = nv/(2L) = ${sig(harmonic * speed / (2 * length))} Hz.`));
  [[0.85, 340, 1], [0.5, 330, 3], [1.2, 360, 5], [0.25, 340, 7]].forEach(([length, speed, harmonic]) =>
    add("C.4 Standing waves and resonance", "SL", `A pipe closed at one end has L=${length} m. Calculate frequency of allowed harmonic ${harmonic} using v=${speed} m s⁻¹.`, `fn = nv/(4L) for odd n = ${sig(harmonic * speed / (4 * length))} Hz.`));

  many("C.5 Doppler effect", "SL", [
    ["Define the Doppler effect.", "A change in observed frequency caused by relative motion between source and observer."],
    ["What happens to observed sound frequency when source and observer approach?", "It increases."],
    ["What happens to wavefront spacing ahead of an approaching source?", "It decreases."],
    ["Does motion of a sound source change sound speed in the medium?", "No; speed is set by the medium."],
    ["What is redshift?", "Observed electromagnetic wavelength is increased compared with the source wavelength."],
    ["What does a blueshift indicate?", "Source and observer are approaching."],
    ["State the approximate fractional Doppler relation for light at low relative speed.", "Δf/f = Δλ/λ ≈ v/c in magnitude."],
    ["How do spectral-line shifts reveal stellar motion?", "Their fractional wavelength changes give radial speed and the shift direction gives approach or recession."],
    ["Why is the low-speed light relation only approximate?", "It assumes relative speed is much smaller than c."],
    ["Give two applications of the Doppler effect.", "For example medical ultrasound, radar speed measurement or stellar radial velocity."],
  ]);
  [[500e-9, 0.001], [650e-9, 0.002], [450e-9, 0.0005], [700e-9, 0.003], [550e-9, 0.0015], [400e-9, 0.0008]].forEach(([wavelength, fraction]) =>
    add("C.5 Doppler effect", "SL", `A spectral line of rest wavelength ${wavelength} m is redshifted by fractional amount ${fraction}. Estimate recession speed using c=3.00×10⁸ m s⁻¹.`, `v ≈ cΔλ/λ = ${sig(3e8 * fraction)} m s⁻¹.`));
  many("C.5 Doppler effect", "HL", [
    ["State the moving-source Doppler equation for a stationary observer.", "f′ = fv/(v±us), using minus for approach and plus for recession."],
    ["State the moving-observer Doppler equation for a stationary source.", "f′ = f(v±uo)/v, using plus for approach and minus for recession."],
    ["Why are the source and observer equations for sound different?", "Source motion changes wavelength in the medium; observer motion changes the rate at which wavefronts are encountered."],
    ["What restriction applies to IB Doppler calculations for sound?", "Problems do not require both source and observer to move at the same time."],
  ]);
  [[500, 340, 20], [800, 330, 15], [250, 350, 30]].forEach(([frequency, speed, sourceSpeed]) =>
    add("C.5 Doppler effect", "HL", `A source of ${frequency} Hz approaches a stationary observer at ${sourceSpeed} m s⁻¹. Sound speed is ${speed} m s⁻¹. Calculate observed frequency.`, `f′ = fv/(v-us) = ${sig(frequency * speed / (speed - sourceSpeed))} Hz.`));
  [[500, 340, 20], [800, 330, 15], [250, 350, 30]].forEach(([frequency, speed, observerSpeed]) =>
    add("C.5 Doppler effect", "HL", `An observer moves toward a stationary ${frequency} Hz source at ${observerSpeed} m s⁻¹. Sound speed is ${speed} m s⁻¹. Calculate observed frequency.`, `f′ = f(v+uo)/v = ${sig(frequency * (speed + observerSpeed) / speed)} Hz.`));

  // D. Fields
  many("D.1 Gravitational fields", "SL", [
    ["State Kepler's first law.", "Planets move in elliptical orbits with the Sun at one focus."],
    ["State Kepler's second law.", "The line from the Sun to a planet sweeps out equal areas in equal times."],
    ["State Kepler's third law.", "For bodies orbiting the same central mass, T² is proportional to the cube of the orbit's semi-major axis."],
    ["State Newton's universal law of gravitation.", "F = Gm₁m₂/r²."],
    ["What separation r is used in Newton's gravitation equation?", "The distance between the centres of mass."],
    ["When may a spherical body be treated as a point mass?", "For points outside a spherically symmetric body, with its mass treated as concentrated at its centre."],
    ["Define gravitational field strength.", "Force per unit mass on a small test mass: g = F/m."],
    ["State gravitational field strength outside a spherical mass.", "g = GM/r², directed toward the centre."],
    ["What direction does a gravitational field line show?", "The force direction on a small positive test mass."],
    ["How does field-line density relate to gravitational field strength?", "Closer field lines represent a stronger field."],
    ["What is the shape of gravitational field lines around an isolated spherical mass?", "Radial lines directed inward."],
    ["Can gravitational field lines cross?", "No, because the field has only one direction at a point."],
    ["What provides the centripetal force for an orbiting satellite?", "Gravitational force."],
    ["Why does an orbiting body accelerate at constant speed?", "Its velocity direction changes because acceleration points toward the centre."],
    ["What approximation is used for quantitative orbital problems in this topic?", "Circular orbits."],
  ]);
  [[5e24, 6e24, 4e7], [7e22, 6e24, 3.8e8], [2e30, 6e24, 1.5e11], [8e10, 3e5, 2e3]].forEach(([m1, m2, radius]) =>
    add("D.1 Gravitational fields", "SL", `Two masses ${m1.toExponential(1)} kg and ${m2.toExponential(1)} kg are ${radius.toExponential(1)} m apart. Calculate gravitational force using G=6.67×10⁻¹¹ N m² kg⁻².`, `F = Gm₁m₂/r² = ${sig(6.67e-11 * m1 * m2 / (radius * radius))} N.`));
  [[6e24, 6.4e6], [7.3e22, 1.74e6], [2e30, 7e8]].forEach(([mass, radius]) =>
    add("D.1 Gravitational fields", "SL", `Calculate gravitational field strength at r=${radius.toExponential(2)} m from mass ${mass.toExponential(2)} kg. Use G=6.67×10⁻¹¹.`, `g = GM/r² = ${sig(6.67e-11 * mass / (radius * radius))} N kg⁻¹.`));
  [1.5, 2, 4].forEach((radiusFactor) =>
    add("D.1 Gravitational fields", "SL", `Two bodies orbit the same mass. The second orbit has radius ${radiusFactor} times the first. Use Kepler's third law to find T₂/T₁.`, `T₂/T₁ = (r₂/r₁)^(3/2) = ${sig(Math.pow(radiusFactor, 1.5))}.`));
  many("D.1 Gravitational fields", "HL", [
    ["Define gravitational potential energy of a system.", "The work done to assemble the system from components initially at infinite separation."],
    ["State gravitational potential energy for two point masses.", "Ep = -Gm₁m₂/r."],
    ["Define gravitational potential at a point.", "Work done per unit mass to bring a test mass from infinity to that point."],
    ["State gravitational potential outside a spherical mass.", "Vg = -GM/r."],
    ["Why are gravitational potential and potential energy negative?", "Zero is defined at infinity and energy must be supplied to separate attracting masses to infinity."],
    ["Relate gravitational field strength to potential gradient.", "g = -ΔVg/Δr, or -dVg/dr."],
    ["State work done in moving mass through a potential difference.", "W = mΔVg."],
    ["Define a gravitational equipotential surface.", "A surface on which gravitational potential is constant."],
    ["How do equipotentials meet gravitational field lines?", "At right angles."],
    ["How much work is done moving a mass along an equipotential?", "Zero."],
    ["State escape speed from radius r.", "vesc = √(2GM/r)."],
    ["State circular orbital speed at radius r.", "vorb = √(GM/r)."],
    ["Compare escape and circular orbital speed at the same radius.", "vesc = √2 vorb."],
    ["How does a small atmospheric drag force affect a low satellite orbit?", "Mechanical energy and orbital height decrease while orbital speed increases as it moves to a lower circular orbit."],
    ["What happens to gravitational potential as r approaches infinity?", "It approaches zero from negative values."],
    ["Why is gravitational potential a scalar?", "It has magnitude but no direction, so contributions add algebraically."],
  ]);
  [[6e24, 6.4e6], [7.3e22, 1.74e6], [2e30, 1.5e11], [5e23, 4e6]].forEach(([mass, radius]) =>
    add("D.1 Gravitational fields", "HL", `Calculate gravitational potential at r=${radius.toExponential(2)} m from mass ${mass.toExponential(2)} kg. Use G=6.67×10⁻¹¹.`, `Vg = -GM/r = ${sig(-6.67e-11 * mass / radius)} J kg⁻¹.`));
  [[6e24, 1000, 7e6], [7.3e22, 500, 2e6], [2e30, 3e25, 2e11]].forEach(([mass, testMass, radius]) =>
    add("D.1 Gravitational fields", "HL", `A mass ${testMass} kg is at r=${radius.toExponential(2)} m from ${mass.toExponential(2)} kg. Calculate its gravitational potential energy.`, `Ep = -GMm/r = ${sig(-6.67e-11 * mass * testMass / radius)} J.`));
  [[6e24, 7e6], [7.3e22, 2e6], [2e30, 1.5e11]].forEach(([mass, radius]) =>
    add("D.1 Gravitational fields", "HL", `Calculate circular orbital speed at r=${radius.toExponential(2)} m around mass ${mass.toExponential(2)} kg.`, `vorb = √(GM/r) = ${sig(Math.sqrt(6.67e-11 * mass / radius))} m s⁻¹.`));
  [[6e24, 6.4e6], [7.3e22, 1.74e6], [2e30, 7e8]].forEach(([mass, radius]) =>
    add("D.1 Gravitational fields", "HL", `Calculate escape speed from r=${radius.toExponential(2)} m around mass ${mass.toExponential(2)} kg.`, `vesc = √(2GM/r) = ${sig(Math.sqrt(2 * 6.67e-11 * mass / radius))} m s⁻¹.`));
  [[500, -2e6, -1.5e6], [1200, -6e7, -5e7]].forEach(([mass, initialPotential, finalPotential]) =>
    add("D.1 Gravitational fields", "HL", `A ${mass} kg mass moves from Vg=${initialPotential} J kg⁻¹ to ${finalPotential} J kg⁻¹. Calculate the external work required with no change in kinetic energy.`, `W = mΔVg = ${sig(mass * (finalPotential - initialPotential))} J.`));

  many("D.2 Electric and magnetic fields", "SL", [
    ["What force acts between two positive charges?", "A repulsive electric force."],
    ["What force acts between opposite electric charges?", "An attractive electric force."],
    ["State Coulomb's law.", "F = kq₁q₂/r², with direction along the line joining the charges."],
    ["State conservation of electric charge.", "Total charge of an isolated system remains constant."],
    ["What did Millikan's oil-drop experiment show?", "Electric charge is quantized in integer multiples of the elementary charge."],
    ["How can friction transfer charge?", "Electrons move from one material to the other; charge is not created."],
    ["Describe charging by contact.", "Charge transfers when a charged body touches another body."],
    ["Describe electrostatic induction.", "A nearby charge separates charges in a conductor without direct contact."],
    ["What is the role of grounding during induction?", "It provides a path for electrons to enter or leave Earth."],
    ["Define electric field strength.", "Force per unit positive test charge: E = F/q."],
    ["What direction does an electric field line show?", "The force direction on a positive test charge."],
    ["How does electric field-line density relate to strength?", "Closer lines represent greater field strength."],
    ["In which direction do electric field lines point around a positive point charge?", "Radially outward."],
    ["In which direction do electric field lines point around a negative point charge?", "Radially inward."],
    ["State the uniform electric field between parallel plates.", "E = V/d, directed from the positive to the negative plate."],
    ["How does greater permittivity affect the Coulomb force between fixed charges?", "It reduces the force because the Coulomb constant is k = 1/(4πε)."],
    ["What happens to the electric field inside a conductor in electrostatic equilibrium?", "It is zero."],
    ["Describe the magnetic field around a straight current-carrying wire.", "Concentric circles centred on the wire."],
    ["How is the magnetic-field direction around a straight wire found?", "Use the right-hand grip rule with thumb in the conventional-current direction."],
    ["Describe the field inside a long air-core solenoid.", "Nearly uniform, parallel and closely spaced field lines."],
    ["Can magnetic field lines begin or end at isolated poles?", "No; they form continuous closed loops."],
  ]);
  [[2e-6, 3e-6, 0.2], [-4e-6, 5e-6, 0.3], [8e-9, 2e-9, 0.05], [1e-6, 1e-6, 0.1]].forEach(([q1, q2, radius]) =>
    add("D.2 Electric and magnetic fields", "SL", `Point charges ${q1} C and ${q2} C are ${radius} m apart. Calculate electric force magnitude using k=8.99×10⁹ N m² C⁻².`, `F = k|q₁q₂|/r² = ${sig(8.99e9 * Math.abs(q1 * q2) / (radius * radius))} N.`));
  [[0.02, 2e-6], [5, 0.001], [1.2e-3, 4e-9]].forEach(([force, charge]) =>
    add("D.2 Electric and magnetic fields", "SL", `A test charge ${charge} C experiences force ${force} N. Calculate electric field strength.`, `E = F/q = ${sig(force / charge)} N C⁻¹.`));
  [[120, 0.02], [5000, 0.05], [9, 0.003]].forEach(([voltage, separation]) =>
    add("D.2 Electric and magnetic fields", "SL", `Parallel plates have potential difference ${voltage} V and separation ${separation} m. Calculate field strength.`, `E = V/d = ${sig(voltage / separation)} V m⁻¹.`));
  [[2e-6, 3e-6, 0.4, 0.1], [5e-9, -2e-9, 0.3, 0.2], [-4e-6, -1e-6, 0.5, 0.25], [8e-9, 3e-9, 0.2, 0.4]].forEach(([q1, q2, r1, r2]) => {
    const e1 = 8.99e9 * q1 / (r1 * r1);
    const e2 = 8.99e9 * q2 / (r2 * r2);
    add("D.2 Electric and magnetic fields", "SL", `At a point on one line, fields from charges are ${sig(e1)} N C⁻¹ and ${sig(e2)} N C⁻¹ in the same positive direction convention. Calculate resultant field.`, `Fields add algebraically: E = ${sig(e1 + e2)} N C⁻¹.`);
  });
  many("D.2 Electric and magnetic fields", "HL", [
    ["Define electric potential energy of two charges.", "The work done to assemble the charges from infinite separation."],
    ["State electric potential energy for two point charges.", "Ep = kq₁q₂/r."],
    ["Define electric potential.", "Work done per unit charge to bring a positive test charge from infinity."],
    ["State electric potential due to a point charge.", "Ve = kQ/r."],
    ["Where is zero electric potential defined for isolated point charges?", "At infinity."],
    ["Relate electric field to potential gradient.", "E = -ΔVe/Δr, or -dVe/dr."],
    ["State work done in moving charge through a potential difference.", "W = qΔVe."],
    ["Define an electric equipotential surface.", "A surface on which electric potential is constant."],
    ["How do electric field lines meet equipotential surfaces?", "At right angles."],
    ["How much work is done moving charge along an equipotential?", "Zero."],
    ["What is electric potential inside a charged conducting sphere in electrostatic equilibrium?", "Constant and equal to the surface potential."],
    ["What is the electric field inside a hollow conducting sphere in electrostatic equilibrium?", "Zero."],
    ["How may work in an electric field be expressed besides joules?", "In electronvolts for a particle carrying elementary charge."],
    ["Why is electric potential a scalar?", "It has magnitude but no direction, so potentials add algebraically."],
  ]);
  [[2e-6, 0.3], [-4e-6, 0.2], [8e-9, 0.05], [1.5e-6, 0.8]].forEach(([charge, radius]) =>
    add("D.2 Electric and magnetic fields", "HL", `Calculate electric potential ${radius} m from charge ${charge} C using k=8.99×10⁹.`, `Ve = kQ/r = ${sig(8.99e9 * charge / radius)} V.`));
  [[2e-6, 3e-6, 0.2], [-4e-6, 5e-6, 0.3], [8e-9, 2e-9, 0.05]].forEach(([q1, q2, radius]) =>
    add("D.2 Electric and magnetic fields", "HL", `Charges ${q1} C and ${q2} C are ${radius} m apart. Calculate electric potential energy.`, `Ep = kq₁q₂/r = ${sig(8.99e9 * q1 * q2 / radius)} J.`));
  [[2e-6, 120], [-3e-6, 500], [1.6e-19, 2500]].forEach(([charge, change]) =>
    add("D.2 Electric and magnetic fields", "HL", `Charge ${charge} C moves through potential change ${change} V. Calculate the change in electric potential energy.`, `ΔEp = qΔV = ${sig(charge * change)} J.`));
  [[1200, 0.02], [-600, 0.05]].forEach(([change, distance]) =>
    add("D.2 Electric and magnetic fields", "HL", `Potential changes by ${change} V over ${distance} m in one direction. Calculate the electric-field component in that direction.`, `E = -ΔV/Δr = ${sig(-change / distance)} V m⁻¹.`));

  many("D.3 Motion in electromagnetic fields", "SL", [
    ["Describe the motion of a positive charge released in a uniform electric field.", "It accelerates in the field direction."],
    ["How does a negative charge accelerate in a uniform electric field?", "Opposite to the field direction."],
    ["State the magnetic force on a moving charge.", "F = qvB sin θ."],
    ["When is magnetic force on a moving charge maximum?", "When velocity is perpendicular to the magnetic field."],
    ["When is magnetic force on a moving charge zero?", "When velocity is parallel or antiparallel to the field."],
    ["What path follows when a charged particle enters a uniform magnetic field perpendicular to it?", "A circular path if no other force acts."],
    ["Why does a magnetic field not change a particle's kinetic energy?", "The force is perpendicular to velocity and does no work."],
    ["How does reversing the sign of charge affect magnetic deflection?", "It reverses the force and curvature direction."],
    ["How does increasing momentum affect magnetic-path radius at fixed q and B?", "Radius increases because r = p/(qB)."],
    ["State the force on a current-carrying conductor in a magnetic field.", "F = BIL sin θ."],
    ["What is the force between parallel wires carrying current in the same direction?", "Attractive."],
    ["What is the force between parallel wires carrying current in opposite directions?", "Repulsive."],
    ["State the force per unit length between parallel wires.", "F/L = μ₀I₁I₂/(2πr)."],
    ["What is the undeflected-speed condition in crossed perpendicular E and B fields?", "qE = qvB, so v = E/B."],
    ["How can circular motion in B determine charge-to-mass ratio?", "Using qvB = mv²/r, so q/m = v/(Br)."],
    ["What happens to a charged particle entering an electric field with velocity perpendicular to the field?", "It follows a curved, parabolic path while the field provides constant acceleration."],
  ]);
  [[1.6e-19, 2e6, 0.5, 90], [3.2e-19, 5e5, 0.2, 30], [2e-6, 12, 0.04, 90], [5e-9, 3e4, 0.8, 60]].forEach(([charge, speed, field, angle]) =>
    add("D.3 Motion in electromagnetic fields", "SL", `A charge of magnitude ${charge} C moves at ${speed} m s⁻¹ through B=${field} T at ${angle}°. Calculate magnetic force magnitude.`, `F = qvB sin θ = ${sig(charge * speed * field * Math.sin(angle * Math.PI / 180))} N.`));
  [[0.5, 3, 0.2, 90], [1.2, 5, 0.4, 30], [0.08, 12, 1.5, 60], [2, 0.6, 0.05, 90]].forEach(([field, current, length, angle]) =>
    add("D.3 Motion in electromagnetic fields", "SL", `A wire of length ${length} m carries ${current} A in B=${field} T at ${angle}°. Calculate magnetic force.`, `F = BIL sin θ = ${sig(field * current * length * Math.sin(angle * Math.PI / 180))} N.`));
  [[1.6e-19, 500], [3.2e-19, 1200], [2e-6, 9]].forEach(([charge, voltage]) =>
    add("D.3 Motion in electromagnetic fields", "SL", `A charge of magnitude ${charge} C is accelerated from rest through ${voltage} V. Calculate kinetic energy gained.`, `ΔEk = qV = ${sig(charge * voltage)} J.`));
  [[9.11e-31, 2e6, 1.6e-19, 0.2], [1.67e-27, 3e5, 1.6e-19, 0.5], [6.64e-27, 1e5, 3.2e-19, 0.8], [2e-26, 4e4, 1.6e-19, 0.3]].forEach(([mass, speed, charge, field]) =>
    add("D.3 Motion in electromagnetic fields", "SL", `A particle has m=${mass.toExponential(2)} kg, speed ${speed} m s⁻¹, |q|=${charge} C and moves perpendicular to B=${field} T. Calculate orbit radius.`, `r = mv/(qB) = ${sig(mass * speed / (charge * field))} m.`));
  [[3, 4, 0.1], [10, 2, 0.05], [5, 5, 0.2]].forEach(([i1, i2, separation]) =>
    add("D.3 Motion in electromagnetic fields", "SL", `Parallel wires carry ${i1} A and ${i2} A, separated by ${separation} m. Calculate force per unit length using μ₀=4π×10⁻⁷.`, `F/L = μ₀I₁I₂/(2πr) = ${sig(2e-7 * i1 * i2 / separation)} N m⁻¹.`));

  many("D.4 Induction", "HL", [
    ["Define magnetic flux.", "Φ = BA cos θ, where θ is between B and the area normal."],
    ["When is magnetic flux through a flat loop maximum?", "When the magnetic field is parallel to the area normal."],
    ["When is magnetic flux through a flat loop zero?", "When the magnetic field lies in the plane of the loop."],
    ["State Faraday's law.", "ε = -NΔΦ/Δt."],
    ["State Lenz's law.", "The induced emf drives a current whose field opposes the change in flux that produced it."],
    ["How does Lenz's law express energy conservation?", "If the induced effect reinforced the change, energy would be created without work."],
    ["State motional emf for a straight conductor moving perpendicular to B.", "ε = BvL."],
    ["What is required for an emf to be induced in a circuit?", "A change in magnetic flux linkage."],
    ["Why does a rotating coil in uniform B produce a sinusoidal emf?", "Its flux varies as cos θ while θ changes uniformly, so the flux derivative is sinusoidal."],
    ["How does increasing a rotating coil's frequency affect peak emf?", "Peak emf increases in direct proportion to angular frequency."],
    ["How does increasing the number of coil turns affect induced emf?", "It increases emf in direct proportion to N."],
    ["What is self-induction?", "A changing current in a circuit changes its own flux and induces an emf opposing that current change."],
    ["What happens to induced current direction when the flux change reverses?", "The induced current direction reverses."],
    ["Why is relative motion, rather than motion alone, important in induction?", "The flux through the circuit must change; motion with no flux change produces no emf."],
  ]);
  [[0.5, 0.02, 0], [1.2, 0.005, 60], [0.08, 0.4, 30], [2, 0.01, 90]].forEach(([field, area, angle]) =>
    add("D.4 Induction", "HL", `A loop of area ${area} m² is in B=${field} T with field at ${angle}° to its normal. Calculate magnetic flux.`, `Φ = BA cos θ = ${sig(field * area * Math.cos(angle * Math.PI / 180))} Wb.`));
  [[200, 0.04, 0.01], [50, -0.2, 0.5], [1000, 0.002, 0.02], [20, 0.8, 2], [500, -0.03, 0.1]].forEach(([turns, change, time]) =>
    add("D.4 Induction", "HL", `A ${turns}-turn coil has flux change ${change} Wb per turn in ${time} s. Calculate average induced emf magnitude.`, `|ε| = N|ΔΦ|/Δt = ${sig(turns * Math.abs(change) / time)} V.`));
  [[0.5, 3, 0.2], [1.2, 5, 0.4], [0.08, 12, 1.5], [2, 0.6, 0.05]].forEach(([field, speed, length]) =>
    add("D.4 Induction", "HL", `A rod of length ${length} m moves perpendicular to B=${field} T at ${speed} m s⁻¹. Calculate motional emf.`, `ε = BvL = ${sig(field * speed * length)} V.`));
  [[100, 0.02, 0.5, 5], [50, 0.01, 1.2, 10], [200, 0.005, 0.3, 20], [500, 0.002, 0.8, 2]].forEach(([turns, area, field, frequency]) =>
    add("D.4 Induction", "HL", `A ${turns}-turn coil of area ${area} m² rotates at ${frequency} Hz in B=${field} T. Calculate peak emf using ε₀=NBA(2πf).`, `ε₀ = NBAω = ${sig(turns * field * area * 2 * Math.PI * frequency)} V.`));
  [[50, 0.01, 0.4], [200, 0.005, 0.2], [100, 0.02, 0.1]].forEach(([turns, area, field]) =>
    add("D.4 Induction", "HL", `A ${turns}-turn coil of area ${area} m² is flipped from flux +BA to -BA in B=${field} T. What is the magnitude of change in flux linkage?`, `|Δ(NΦ)| = 2NBA = ${sig(2 * turns * field * area)} Wb turns.`));

  // E. Nuclear and quantum physics
  many("E.1 Structure of the atom", "SL", [
    ["What did the Geiger-Marsden-Rutherford experiment investigate?", "The scattering of alpha particles by thin metal foil."],
    ["What did most alpha particles passing straight through the foil show?", "Atoms are mostly empty space."],
    ["What did rare large-angle alpha deflections show?", "Positive charge and most atomic mass are concentrated in a tiny nucleus."],
    ["Why did Rutherford's nuclear model replace the plum-pudding model?", "The plum-pudding model could not explain the observed large-angle deflections."],
    ["Interpret the nuclear notation ᴬZX.", "A is nucleon number, Z is proton number and X is the element symbol."],
    ["How is neutron number found from nuclear notation?", "N = A-Z."],
    ["What makes two nuclei isotopes of the same element?", "They have the same proton number but different neutron numbers."],
    ["What is an emission spectrum?", "Discrete wavelengths emitted when atoms make downward energy transitions."],
    ["What is an absorption spectrum?", "Dark lines at wavelengths absorbed when atoms make upward energy transitions."],
    ["What do line spectra show about atomic energy?", "Atomic energy levels are discrete."],
    ["What is a photon?", "A quantum of electromagnetic radiation."],
    ["State the photon-energy equation.", "E = hf."],
    ["What determines the frequency of a photon emitted in an atomic transition?", "The energy difference between the two atomic levels: ΔE = hf."],
    ["Why does each element have a characteristic line spectrum?", "Each element has a unique set of allowed electron energy levels."],
    ["How can spectra reveal chemical composition?", "Observed line wavelengths are matched to characteristic lines of known elements."],
  ]);
  [[5e14], [6.5e14], [1.2e15], [4e14]].forEach(([frequency]) =>
    add("E.1 Structure of the atom", "SL", `Calculate photon energy for frequency ${frequency.toExponential(2)} Hz using h=6.63×10⁻³⁴ J s.`, `E = hf = ${sig(6.63e-34 * frequency)} J.`));
  [[24, 12], [56, 26], [238, 92], [14, 6]].forEach(([massNumber, protonNumber]) =>
    add("E.1 Structure of the atom", "SL", `A nucleus has A=${massNumber} and Z=${protonNumber}. Calculate its neutron number.`, `N = A-Z = ${massNumber - protonNumber}.`));
  [[3.0e-19], [2.5e-18], [1.8e-19], [4.2e-19]].forEach(([energy]) =>
    add("E.1 Structure of the atom", "SL", `An atomic transition releases ${energy.toExponential(1)} J. Calculate photon wavelength using h=6.63×10⁻³⁴ J s and c=3.00×10⁸ m s⁻¹.`, `λ = hc/ΔE = ${sig(6.63e-34 * 3e8 / energy)} m.`));
  many("E.1 Structure of the atom", "HL", [
    ["State the nuclear-radius relation.", "R = R₀A^(1/3)."],
    ["What does R ∝ A^(1/3) imply about nuclear density?", "Nuclear density is approximately constant because mass and volume are both proportional to A."],
    ["Why can Rutherford scattering deviate from the simple Coulomb model at high energy?", "The alpha particle approaches close enough for nuclear size and strong-force effects to matter."],
    ["What is distance of closest approach in head-on scattering?", "The minimum separation where the alpha particle's kinetic energy has become electric potential energy."],
    ["State the Bohr energy levels for hydrogen.", "En = -13.6/n² eV."],
    ["State angular-momentum quantization in the Bohr model.", "mvr = nh/(2π)."],
    ["Why are Bohr-model orbits quantized?", "Only orbits with angular momentum equal to integer multiples of h/(2π) are allowed."],
    ["What does the negative sign of a bound hydrogen energy level mean?", "Energy must be supplied to remove the electron to zero energy at infinity."],
  ]);
  [[1, 1.2e-15], [27, 1.2e-15], [125, 1.2e-15]].forEach(([massNumber, r0]) =>
    add("E.1 Structure of the atom", "HL", `Estimate nuclear radius for A=${massNumber} using R₀=${r0} m.`, `R = R₀A^(1/3) = ${sig(r0 * Math.cbrt(massNumber))} m.`));
  [[5e6, 79], [8e6, 47], [6e6, 29]].forEach(([energyEv, protonNumber]) => {
    const energyJ = energyEv * 1.6e-19;
    const radius = 8.99e9 * (2 * 1.6e-19) * (protonNumber * 1.6e-19) / energyJ;
    add("E.1 Structure of the atom", "HL", `An alpha particle of kinetic energy ${energyEv.toExponential(1)} eV approaches a nucleus with Z=${protonNumber} head-on. Estimate closest approach using k=8.99×10⁹.`, `Set Ek = k(2e)(Ze)/r, giving r = ${sig(radius)} m.`);
  });
  [[1, 2], [2, 3]].forEach(([initial, final]) => {
    const emitted = 13.6 * (1 / (initial * initial) - 1 / (final * final));
    add("E.1 Structure of the atom", "HL", `Calculate the energy needed to excite hydrogen from n=${initial} to n=${final}.`, `ΔE = 13.6(1/${initial}²-1/${final}²) = ${sig(emitted)} eV.`);
  });

  many("E.2 Quantum physics", "HL", [
    ["What does the photoelectric effect demonstrate about light?", "Light transfers energy in discrete photons, showing particle behaviour."],
    ["Define threshold frequency.", "The minimum light frequency that can release photoelectrons from a surface."],
    ["Define work function.", "The minimum energy needed to remove an electron from a material's surface."],
    ["State Einstein's photoelectric equation.", "Emax = hf-Φ."],
    ["What does increasing light intensity above threshold change?", "It increases the emission rate, but not maximum photoelectron kinetic energy."],
    ["What does increasing light frequency above threshold change?", "It increases maximum photoelectron kinetic energy."],
    ["Why does classical wave theory fail to explain threshold frequency?", "It predicts enough intensity should eventually eject electrons at any frequency."],
    ["Why does the absence of a time delay support the photon model?", "One electron receives energy from one photon in a single interaction."],
    ["What evidence shows that matter has wave behaviour?", "Particle diffraction, such as electron diffraction."],
    ["State the de Broglie wavelength equation.", "λ = h/p."],
    ["What is wave-particle duality?", "Quantum objects can show both wave-like and particle-like behaviour depending on the experiment."],
    ["What diffraction condition is needed to observe particle waves clearly?", "Aperture or lattice spacing must be comparable to the de Broglie wavelength."],
    ["What does Compton scattering demonstrate?", "Photons carry particle-like momentum and exchange energy and momentum with electrons."],
    ["What happens to a photon in Compton scattering from an electron?", "Its wavelength increases and its energy decreases."],
    ["State the Compton wavelength-shift equation.", "Δλ = h(1-cos θ)/(mec)."],
    ["At what Compton scattering angle is wavelength shift greatest?", "180°, because 1-cos θ is then 2."],
  ]);
  [[5e14, 2e-19], [8e14, 3e-19], [1.2e15, 4e-19], [6e14, 1.5e-19], [2e15, 8e-19]].forEach(([frequency, workFunction]) =>
    add("E.2 Quantum physics", "HL", `Light of frequency ${frequency.toExponential(1)} Hz falls on a metal with Φ=${workFunction.toExponential(1)} J. Calculate maximum photoelectron kinetic energy.`, `Emax = hf-Φ = ${sig(6.63e-34 * frequency - workFunction)} J.`));
  [[2e-19], [3.2e-19], [4.5e-19], [1.6e-19]].forEach(([workFunction]) =>
    add("E.2 Quantum physics", "HL", `A metal has work function ${workFunction.toExponential(1)} J. Calculate threshold frequency using h=6.63×10⁻³⁴ J s.`, `f₀ = Φ/h = ${sig(workFunction / 6.63e-34)} Hz.`));
  [[9.11e-31, 2e6], [1.67e-27, 3e5], [6.64e-27, 1e5], [2e-26, 4e4]].forEach(([mass, speed]) =>
    add("E.2 Quantum physics", "HL", `A non-relativistic particle has mass ${mass.toExponential(2)} kg and speed ${speed} m s⁻¹. Calculate its de Broglie wavelength.`, `λ = h/(mv) = ${sig(6.63e-34 / (mass * speed))} m.`));
  [[1e-10], [2.5e-11], [5e-12], [8e-10]].forEach(([wavelength]) =>
    add("E.2 Quantum physics", "HL", `A particle has de Broglie wavelength ${wavelength} m. Calculate its momentum.`, `p = h/λ = ${sig(6.63e-34 / wavelength)} kg m s⁻¹.`));
  [30, 60, 90, 180].forEach((angle) => {
    const shift = 6.63e-34 * (1 - Math.cos(angle * Math.PI / 180)) / (9.11e-31 * 3e8);
    add("E.2 Quantum physics", "HL", `Calculate the Compton wavelength shift for scattering angle ${angle}° using me=9.11×10⁻³¹ kg.`, `Δλ = h(1-cosθ)/(mec) = ${sig(shift)} m.`);
  });
  [[1e-10, 2e-10], [5e-11, 1e-10]].forEach(([wavelength, spacing]) =>
    add("E.2 Quantum physics", "HL", `Particles have de Broglie wavelength ${wavelength} m and encounter slit/lattice spacing ${spacing} m. Explain whether appreciable diffraction is expected.`, `${wavelength / spacing >= 0.1 ? "Yes" : "Only weakly"}; diffraction is appreciable when spacing is comparable with wavelength.`));

  many("E.3 Radioactive decay", "SL", [
    ["Define isotope.", "Nuclei with the same proton number but different neutron numbers."],
    ["Define nuclear mass defect.", "The difference between the total mass of separated nucleons and the mass of the bound nucleus."],
    ["Define nuclear binding energy.", "Energy required to separate a nucleus completely into its nucleons."],
    ["What does binding energy per nucleon indicate?", "Average energy required to remove a nucleon and therefore a measure of nuclear stability."],
    ["State mass-energy equivalence.", "E = mc²."],
    ["Describe the strong nuclear force in this course.", "A short-range attractive force between nucleons."],
    ["Distinguish random from spontaneous radioactive decay.", "Random means the exact nucleus and time cannot be predicted; spontaneous means decay needs no external trigger."],
    ["Describe the main trend in binding energy per nucleon with nucleon number.", "It rises rapidly for light nuclei, reaches a maximum near iron, then decreases slowly for heavier nuclei."],
    ["What is emitted in alpha decay?", "A helium-4 nucleus."],
    ["How do A and Z change in alpha decay?", "A decreases by 4 and Z decreases by 2."],
    ["What occurs in beta-minus decay?", "A neutron becomes a proton, emitting an electron and an antineutrino."],
    ["How do A and Z change in beta-minus decay?", "A is unchanged and Z increases by 1."],
    ["What occurs in beta-plus decay?", "A proton becomes a neutron, emitting a positron and a neutrino."],
    ["How do A and Z change in beta-plus decay?", "A is unchanged and Z decreases by 1."],
    ["What occurs in gamma decay?", "An excited nucleus emits a photon; A and Z are unchanged."],
    ["Why are neutrinos included in beta-decay equations?", "They allow conservation of energy, momentum and angular momentum."],
    ["Compare alpha ionization and penetration.", "Alpha is strongly ionizing and weakly penetrating."],
    ["Compare gamma ionization and penetration.", "Gamma is weakly ionizing and highly penetrating."],
    ["Define activity.", "Number of decays per unit time, measured in becquerels."],
    ["Define count rate.", "Detector counts recorded per unit time; it need not equal source activity."],
    ["Define half-life.", "Time for the number of undecayed nuclei or activity to fall to half its value."],
    ["Why must background count rate be measured?", "To subtract counts not caused by the source."],
  ]);
  [[2e-29], [5e-28], [1.2e-30], [8e-27]].forEach(([massDefect]) =>
    add("E.3 Radioactive decay", "SL", `A nucleus has mass defect ${massDefect.toExponential(1)} kg. Calculate binding energy using c=3.00×10⁸ m s⁻¹.`, `E = Δmc² = ${sig(massDefect * 9e16)} J.`));
  [[800, 3, 2], [1200, 4, 3], [500, 2, 4], [96, 5, 1]].forEach(([initial, halfLife, elapsedHalfLives]) =>
    add("E.3 Radioactive decay", "SL", `Initial activity is ${initial} Bq and half-life is ${halfLife} h. Find activity after ${elapsedHalfLives * halfLife} h.`, `After ${elapsedHalfLives} half-lives, A = A₀/2^${elapsedHalfLives} = ${sig(initial / Math.pow(2, elapsedHalfLives))} Bq.`));
  [[520, 20], [1800, 45], [92, 12]].forEach(([measured, background]) =>
    add("E.3 Radioactive decay", "SL", `Measured count rate is ${measured} s⁻¹ and background is ${background} s⁻¹. Calculate corrected count rate.`, `Corrected rate = measured-background = ${measured - background} s⁻¹.`));
  [[238, 92, "alpha"], [14, 6, "beta-minus"]].forEach(([a, z, mode]) => {
    const daughterA = mode === "alpha" ? a - 4 : a;
    const daughterZ = mode === "alpha" ? z - 2 : z + 1;
    add("E.3 Radioactive decay", "SL", `A nucleus with A=${a}, Z=${z} undergoes ${mode} decay. State daughter A and Z.`, `Daughter: A=${daughterA}, Z=${daughterZ}.`);
  });
  many("E.3 Radioactive decay", "HL", [
    ["What evidence supports the short range of the strong nuclear force?", "Nuclear binding saturates: each nucleon interacts mainly with nearby nucleons."],
    ["How does neutron-to-proton ratio affect stability?", "Stable heavier nuclei need more neutrons relative to protons; nuclei far from the stability band tend to decay."],
    ["What does the near-constant binding energy per nucleon above A≈60 show?", "The strong force is short range and saturates."],
    ["What do discrete alpha and gamma spectra show?", "Nuclei have discrete energy levels."],
    ["What did the continuous beta spectrum suggest?", "Some decay energy and momentum are carried by a neutrino or antineutrino."],
    ["Define decay constant.", "Probability per unit time that a nucleus decays, in the small-time-interval limit."],
    ["State the radioactive decay law.", "N = N₀e^(-λt)."],
    ["Relate activity and undecayed nuclei.", "A = λN."],
    ["State activity as a function of time.", "A = A₀e^(-λt)."],
    ["Relate half-life and decay constant.", "T½ = ln2/λ."],
    ["Why is radioactive decay exponential?", "Each nucleus has the same constant probability of decay per unit time."],
  ]);
  [[1000, 0.02, 30], [500, 0.005, 120], [2e6, 1e-4, 5000], [800, 0.1, 5]].forEach(([initial, lambda, time]) =>
    add("E.3 Radioactive decay", "HL", `A sample starts with N₀=${initial} and λ=${lambda} s⁻¹. Calculate N after ${time} s.`, `N = N₀e^(-λt) = ${sig(initial * Math.exp(-lambda * time))}.`));
  [[0.02], [0.005], [1e-4]].forEach(([lambda]) =>
    add("E.3 Radioactive decay", "HL", `A nuclide has λ=${lambda} s⁻¹. Calculate its half-life.`, `T½ = ln2/λ = ${sig(Math.log(2) / lambda)} s.`));
  [[2e8, 0.003], [5e12, 1e-6], [8e5, 0.05]].forEach(([nuclei, lambda]) =>
    add("E.3 Radioactive decay", "HL", `A sample has N=${nuclei.toExponential(1)} nuclei and λ=${lambda} s⁻¹. Calculate activity.`, `A = λN = ${sig(lambda * nuclei)} Bq.`));

  many("E.4 Fission", "SL", [
    ["Define spontaneous fission.", "A heavy nucleus splits without first absorbing a neutron."],
    ["Define neutron-induced fission.", "A heavy nucleus absorbs a neutron and then splits into smaller nuclei."],
    ["Why is energy released in fission?", "Products have greater total binding energy and lower mass than the initial system."],
    ["What is a fission chain reaction?", "Neutrons from one fission cause further fissions."],
    ["What is the role of a moderator in a thermal reactor?", "It slows neutrons so they are more likely to cause further fission."],
    ["What is the role of control rods?", "They absorb neutrons to control the reaction rate."],
    ["What is the role of a heat exchanger?", "It transfers thermal energy from the reactor coolant to another fluid used to generate steam."],
    ["What is the role of shielding?", "It absorbs ionizing radiation to protect people and the environment."],
    ["Why are several neutrons released in many fission events?", "Fission fragments have a higher neutron-to-proton ratio than stable nuclei of their size."],
    ["What makes a fission chain reaction self-sustaining?", "On average at least one neutron from each fission causes another fission."],
    ["Why must some fission products be stored for long periods?", "They are radioactive and some have long half-lives."],
    ["Why does nuclear waste require cooling after reactor removal?", "Radioactive decays continue to release thermal energy."],
    ["What property of fission products makes containment important?", "They can emit penetrating or ionizing radiation."],
    ["How is fission energy usually converted to electrical energy?", "Fission heats coolant; steam drives a turbine and generator."],
    ["What equation is used to calculate fission energy from mass change?", "E = Δmc²."],
  ]);
  [[3e-28], [2.5e-28], [4e-28], [1.8e-28], [5e-29]].forEach(([massDefect]) =>
    add("E.4 Fission", "SL", `A fission event has mass decrease ${massDefect.toExponential(1)} kg. Calculate energy released using c=3.00×10⁸ m s⁻¹.`, `E = Δmc² = ${sig(massDefect * 9e16)} J.`));
  [[2e-11, 1e8], [3e-11, 5e12], [1.5e-11, 2e15], [4e-11, 6e9]].forEach(([energyPerFission, number]) =>
    add("E.4 Fission", "SL", `Each fission releases ${energyPerFission.toExponential(1)} J. Calculate energy from ${number.toExponential(1)} fissions.`, `Etotal = NE = ${sig(energyPerFission * number)} J.`));
  [[1e9, 2e-11], [5e8, 3e-11], [2e10, 1.5e-11]].forEach(([energy, perFission]) =>
    add("E.4 Fission", "SL", `A reactor must release ${energy.toExponential(1)} J. If each fission releases ${perFission.toExponential(1)} J, estimate number of fissions.`, `N = Etotal/Efission = ${sig(energy / perFission)}.`));
  [[500e6, 2e-11], [1e9, 3e-11], [200e6, 1.5e-11]].forEach(([power, energyPerFission]) =>
    add("E.4 Fission", "SL", `A reactor's fission power is ${power.toExponential(1)} W and each fission releases ${energyPerFission.toExponential(1)} J. Estimate fission rate.`, `Rate = P/Efission = ${sig(power / energyPerFission)} s⁻¹.`));

  many("E.5 Fusion and stars", "SL", [
    ["Define nuclear fusion.", "Light nuclei combine to form a heavier nucleus."],
    ["Why can fusion release energy?", "The product has greater binding energy per nucleon and lower total mass."],
    ["Why is very high temperature needed for fusion?", "Nuclei need high kinetic energy to approach despite electric repulsion."],
    ["Why is high density helpful for stellar fusion?", "It increases the rate of collisions between nuclei."],
    ["What two effects are balanced in a stable star?", "Outward thermal or radiation pressure and inward gravitational force."],
    ["What is the main energy source of a main-sequence star?", "Fusion of hydrogen into helium."],
    ["How does stellar mass affect evolution?", "More massive stars are hotter, more luminous, use fuel faster and evolve more rapidly."],
    ["Where are main-sequence stars found on an HR diagram?", "Along the diagonal band from hot luminous stars to cool dim stars."],
    ["Where are red giants found on an HR diagram?", "High luminosity and low surface temperature."],
    ["Where are white dwarfs found on an HR diagram?", "Low luminosity and high surface temperature."],
    ["What is the instability strip on an HR diagram?", "A region containing pulsating variable stars."],
    ["Why does the temperature axis on an HR diagram usually decrease to the right?", "It follows the historical spectral classification convention."],
    ["Define stellar parallax.", "The apparent angular shift of a nearby star as Earth is viewed from opposite sides of its orbit."],
    ["State the parallax-distance equation.", "d(pc) = 1/p(arcsecond)."],
    ["Define one parsec.", "Distance at which 1 AU subtends an angle of 1 arcsecond."],
    ["How can stellar radius be found from luminosity and temperature?", "Use L = 4πR²σT⁴."],
    ["How do constant-radius lines run on an HR diagram?", "They run diagonally; at fixed radius greater temperature gives greater luminosity."],
    ["What nuclear process creates elements in stars?", "Fusion reactions, with later stellar processes creating progressively heavier nuclei."],
  ]);
  [0.5, 0.1, 0.02, 0.005].forEach((parallax) =>
    add("E.5 Fusion and stars", "SL", `A star has parallax ${parallax} arcseconds. Calculate its distance in parsecs.`, `d = 1/p = ${sig(1 / parallax)} pc.`));
  [[1, "AU", 1.496e11], [1, "ly", 9.46e15], [1, "pc", 3.086e16], [2, "pc", 6.172e16]].forEach(([value, unit, metres]) =>
    add("E.5 Fusion and stars", "SL", `Convert ${value} ${unit} to metres.`, `${value} ${unit} = ${metres.toExponential(3)} m.`));
  [[3.8e26, 5800], [3.8e28, 10000], [1e25, 3000], [5e27, 7000]].forEach(([luminosity, temperature]) => {
    const radius = Math.sqrt(luminosity / (4 * Math.PI * 5.67e-8 * Math.pow(temperature, 4)));
    add("E.5 Fusion and stars", "SL", `A star has L=${luminosity.toExponential(1)} W and T=${temperature} K. Calculate radius using σ=5.67×10⁻⁸.`, `R = √[L/(4πσT⁴)] = ${sig(radius)} m.`);
  });
  [[5e-29], [7e-30], [2e-28], [1.5e-29]].forEach(([massDefect]) =>
    add("E.5 Fusion and stars", "SL", `A fusion reaction has mass decrease ${massDefect.toExponential(1)} kg. Calculate energy released.`, `E = Δmc² = ${sig(massDefect * 9e16)} J.`));

  // Skills and inquiry
  many("Skills in physics", "SL", [
    ["Define a random error.", "An unpredictable variation that causes repeated readings to scatter."],
    ["Define a systematic error.", "A consistent bias that shifts measurements in the same way."],
    ["How can random uncertainty usually be reduced?", "Repeat measurements and calculate a mean."],
    ["Does repeating measurements remove a systematic error?", "No."],
    ["Define accuracy.", "Closeness of a measured result to the accepted or true value."],
    ["Define precision.", "Closeness of repeated measurements to one another."],
    ["Define absolute uncertainty.", "An estimated range around a measured value, expressed in the same units."],
    ["How is percentage uncertainty calculated?", "Absolute uncertainty divided by measured value, multiplied by 100%."],
    ["What is a zero error?", "A measuring instrument gives a non-zero reading when the true input is zero."],
    ["How is uncertainty in a single analogue-scale reading commonly estimated?", "About half the smallest scale division, unless another method is justified."],
    ["How is uncertainty in a digital reading commonly estimated?", "Usually ±1 in the last displayed digit, unless the instrument specification says otherwise."],
    ["What is an outlier?", "A result inconsistent with the pattern of the other data."],
    ["When may an outlier be excluded from a mean?", "When it is identified using a stated, justified criterion rather than simply because it is inconvenient."],
    ["What belongs on the x-axis of a graph?", "The independent variable."],
    ["What belongs on the y-axis of a graph?", "The dependent variable."],
    ["What should every graph axis label include?", "Quantity name or symbol and its unit."],
    ["How is a best-fit line positioned?", "To represent the overall trend with a reasonable balance of points above and below."],
    ["Why should a gradient triangle be large?", "It reduces the fractional effect of reading coordinates."],
    ["How is graph gradient calculated?", "Change in y divided by change in x."],
    ["What do error bars represent?", "The uncertainty or variability associated with plotted values."],
    ["What does overlap of error bars suggest?", "The apparent difference may not be significant at the stated uncertainty level."],
    ["Define interpolation.", "Estimating a value within the measured data range."],
    ["Why is extrapolation less reliable?", "It assumes the observed relationship continues outside the tested range."],
    ["What is a control variable?", "A relevant factor held constant so the effect of the independent variable can be isolated."],
    ["What makes a hypothesis testable?", "It predicts a measurable relationship between variables."],
    ["Distinguish repeatability from reproducibility.", "Repeatability uses the same method and conditions; reproducibility involves a meaningful change such as operator or equipment."],
    ["What is calibration?", "Comparing an instrument with known standards and adjusting or correcting its readings."],
    ["Why should raw data be recorded before processing?", "It preserves the original measurements and allows calculations to be checked."],
    ["What is the purpose of a risk assessment?", "To identify hazards, evaluate risk and specify control measures."],
    ["What makes a conclusion valid?", "It follows from the processed evidence and acknowledges uncertainty and limitations."],
  ]);
  [[100, 5], [250, 10], [80, 4], [1200, 30], [45, 3]].forEach(([value, uncertainty]) =>
    add("Skills in physics", "SL", `A measurement is ${value} ± ${uncertainty}. Calculate percentage uncertainty.`, `Percentage uncertainty = (${uncertainty}/${value})×100 = ${pct(100 * uncertainty / value)}.`));
  [[[2, 3, 4]], [[5.1, 5.3, 5.2]], [[12, 13, 11, 12]], [[0.8, 0.9, 0.7, 0.8]]].forEach(([values]) => {
    const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
    add("Skills in physics", "SL", `Calculate the mean of ${values.join(", ")}.`, `Mean = ${sig(mean)}.`);
  });
  [[[10, 11, 9, 30], 30], [[5.0, 5.1, 4.9, 8.2], 8.2], [[100, 102, 99, 101, 60], 60]].forEach(([values, anomaly]) => {
    const kept = values.filter((value) => value !== anomaly);
    const mean = kept.reduce((sum, value) => sum + value, 0) / kept.length;
    add("Skills in physics", "SL", `The readings are ${values.join(", ")}. Treat ${anomaly} as an anomaly and calculate the mean of the remaining readings.`, `Mean = ${sig(mean)}.`);
  });
  [[2, 0.1, 5, 0.2], [12, 0.5, 3, 0.1], [0.8, 0.04, 4, 0.2]].forEach(([a, da, b, db]) =>
    add("Skills in physics", "SL", `Calculate z=a+b and its absolute uncertainty for a=${a}±${da} and b=${b}±${db}.`, `z=${sig(a + b)} and Δz=${sig(da + db)}, so z=${sig(a + b)}±${sig(da + db)}.`));
  [[2, 0.1, 5, 0.2], [12, 0.5, 3, 0.1], [0.8, 0.04, 4, 0.2]].forEach(([a, da, b, db]) => {
    const result = a * b;
    const fractional = da / a + db / b;
    add("Skills in physics", "SL", `For z=ab, find percentage uncertainty when a=${a}±${da} and b=${b}±${db}.`, `Add fractional uncertainties: Δz/z=${sig(fractional)}, so percentage uncertainty=${pct(100 * fractional)}.`);
  });
  [[2, 5, 10, 21], [1, 4, 3, 15], [0, 2, 5, 11]].forEach(([x1, x2, y1, y2]) =>
    add("Skills in physics", "SL", `A best-fit line passes through (${x1}, ${y1}) and (${x2}, ${y2}). Calculate its gradient.`, `Gradient = Δy/Δx = ${sig((y2 - y1) / (x2 - x1))}.`));
  [[12.4, 12], [0.003456, 2], [9876, 3]].forEach(([value, figures]) =>
    add("Skills in physics", "SL", `Round ${value} to ${figures} significant figures.`, `${Number(value.toPrecision(figures))}.`));

  // TOPIC_BANKS

  const questions = [];
  for (const topic of topicMeta) {
    const target = levelTargets[topic.name];
    for (const level of ["SL", "HL"]) {
      const available = draft.filter((question) => question.topic === topic.name && question.level === level);
      if (available.length < target[level]) {
        throw new Error(`${topic.name} has ${available.length} ${level} questions; ${target[level]} required.`);
      }
      questions.push(...available.slice(0, target[level]));
    }
  }

  questions.forEach((question, index) => {
    question.id = `ib-${String(index + 1).padStart(4, "0")}`;
  });

  window.IB_PHYSICS_DATA = { topicMeta, questions };
})();
