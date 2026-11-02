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
  const sig = (value, figures = 3) => value.toPrecision(figures);
  const cosDegrees = (angle) => angle % 180 === 90 ? 0 : Math.cos(angle * Math.PI / 180);
  const pct = (value) => `${sig(value, 3)}%`;

  const exponentDigits = {
    "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴",
    "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
  };

  const formatScientificNotation = (text) => text.replace(
    /(-?\d+(?:\.\d+)?)[eE]([+-]?\d+)/g,
    (_, coefficient, exponent) => {
      const superscript = exponent
        .replace(/^\+/, "")
        .split("")
        .map((character) => exponentDigits[character] || character)
        .join("");
      return `${coefficient} × 10${superscript}`;
    },
  );

  const formatSmallDecimals = (text) => text.replace(/\b0\.(0{3,}\d+)\b/g, (value) =>
    Number(value).toExponential(2).replace(/\.0+e/, "e").replace(/(\.\d*?)0+e/, "$1e"));

  const groupLargeIntegers = (text) => text.replace(/\b\d{5,}\b/g, (value) =>
    value.replace(/\B(?=(\d{3})+(?!\d))/g, " "));

  const polishExamStyle = (entry) => {
    let question = entry.question;
    let answer = entry.answer;

    const exactRewrites = new Map([
      [
        "State the power relation for a force parallel to velocity.",
        "A vehicle moves with velocity v. Its engine exerts a driving force F parallel to its velocity. Write down an expression for the useful power developed by the engine.",
      ],
      [
        "What is the position of a body?",
        "State what is meant by the position of an object relative to a reference frame.",
      ],
      [
        "At the highest point of a projectile, what are its vertical velocity and acceleration?",
        "A ball is projected at an angle above the horizontal. State its vertical velocity and vertical acceleration at the highest point of its path.",
      ],
      [
        "On what does moment of inertia depend?",
        "State the two features of a rigid body that determine its moment of inertia about a chosen axis.",
      ],
      [
        "What is the force between parallel wires carrying current in the same direction?",
        "State whether the force between two parallel wires carrying current in the same direction is attractive or repulsive.",
      ],
      [
        "What is the force between parallel wires carrying current in opposite directions?",
        "State whether the force between two parallel wires carrying current in opposite directions is attractive or repulsive.",
      ],
      [
        "Two pucks collide on frictionless ice. Initial total momentum is 5.0 kg m s⁻¹ east and 12 kg m s⁻¹ north. What is the final total momentum?",
        "Two pucks collide on frictionless ice. Before the collision, their total momentum is 5.0 kg m s⁻¹ east and 12 kg m s⁻¹ north. State the total momentum of the pucks after the collision.",
      ],
      [
        "What is distance of closest approach in head-on scattering?",
        "Define the distance of closest approach for an alpha particle undergoing head-on scattering by a nucleus.",
      ],
      [
        "What is the undeflected-speed condition in crossed perpendicular E and B fields?",
        "A charged particle passes undeflected through perpendicular electric and magnetic fields. Write down an expression for its speed in terms of E and B.",
      ],
      [
        "What is required for an emf to be induced in a circuit?",
        "State the condition required for an emf to be induced in a circuit.",
      ],
      [
        "What should a free-body diagram show?",
        "State the information that should be included in a free-body diagram for an object.",
      ],
      [
        "What is the separation of adjacent nodes?",
        "State the separation between two adjacent nodes in a standing wave of wavelength λ.",
      ],
      [
        "What is the separation from a node to an adjacent antinode?",
        "State the separation between a node and an adjacent antinode in a standing wave of wavelength λ.",
      ],
      [
        "What approximation is used for quantitative orbital problems in this topic?",
        "State the shape of orbit assumed for quantitative orbital calculations in D.1.",
      ],
      [
        "What is the shape of gravitational field lines around an isolated spherical mass?",
        "Describe the shape and direction of the gravitational field lines around an isolated spherical mass.",
      ],
      [
        "What is electric potential inside a charged conducting sphere in electrostatic equilibrium?",
        "State how electric potential varies inside a charged conducting sphere in electrostatic equilibrium.",
      ],
      [
        "What is the electric field inside a hollow conducting sphere in electrostatic equilibrium?",
        "State the electric field inside a hollow conducting sphere in electrostatic equilibrium.",
      ],
      [
        "What is the purpose of a risk assessment?",
        "State the purpose of a risk assessment in a physics investigation.",
      ],
    ]);
    question = exactRewrites.get(question) || question;
    question = question.replace(/^Why /, "Explain why ");
    question = question.replace(/\s*=\s*/g, " = ");

    const contextualRewrites = [
      [/^A body travels (.+?) in (.+?)\. Calculate its average speed\.$/, "A cyclist travels $1 along a straight road in $2. Calculate the cyclist's average speed."],
      [/^Velocity changes from (.+?) to (.+?) in (.+?)\. Calculate the average acceleration\.$/, "A trolley moves along a straight track. Its velocity changes from $1 to $2 in $3. Calculate its average acceleration."],
      [/^An object starts at (.+?) and accelerates at (.+?) for (.+?)\. Calculate its final velocity\.$/, "A trolley moves along a straight track with initial velocity $1. It has constant acceleration $2 for $3. Calculate its final velocity."],
      [/^Velocity changes uniformly from (.+?) to (.+?) in (.+?)\. Calculate displacement\.$/, "A trolley moves along a straight track. Its velocity changes uniformly from $1 to $2 in $3. Calculate its displacement."],
      [/^A projectile has horizontal velocity (.+?) and is airborne for (.+?)\. Neglect drag\. Calculate its horizontal range\.$/, "A ball is projected horizontally with velocity $1 and lands after $2. Air resistance is negligible. Calculate its horizontal range."],
      [/^A ([\d.-]+) kg body has acceleration (.+?)\. Calculate the resultant force\.$/, "A trolley of mass $1 kg has acceleration $2. Calculate the resultant force on the trolley."],
      [/^Calculate the momentum of a ([\d.-]+) kg body moving at (.+?)\.$/, "A trolley of mass $1 kg moves with velocity $2. Calculate its momentum."],
      [/^A constant resultant force of (.+?) acts for (.+?)\. Calculate the impulse\.$/, "A constant resultant force of $1 acts on a trolley for $2. Calculate the impulse delivered to the trolley."],
      [/^A spring has k = (.+?) and displacement (.+?)\. Calculate the restoring force, including its sign\.$/, "For a horizontal spring, displacement x is measured positive to the right. The spring constant is $1 and x = $2. Calculate the restoring force, including its sign."],
      [/^A sliding body has μd = (.+?) and normal force (.+?)\. Calculate dynamic friction\.$/, "A crate slides across a horizontal floor. The coefficient of dynamic friction is $1 and the normal force is $2. Calculate the magnitude of the frictional force."],
      [/^A body displaces (.+?) of fluid of density (.+?)\. Use g = (.+?)\. Calculate buoyancy\.$/, "A fully immersed object displaces $1 of a fluid whose density is $2. Use g = $3. Calculate the buoyant force on the object."],
      [/^A body moves in a circle at (.+?) with radius (.+?)\. Calculate centripetal acceleration\.$/, "A small car moves at constant speed $1 around a circular track of radius $2. Calculate its centripetal acceleration."],
      [/^Calculate the kinetic energy of a ([\d.-]+) kg body moving at (.+?)\.$/, "A trolley of mass $1 kg moves at $2. Calculate its kinetic energy."],
      [/^A (.+?) force acts through (.+?) at (.+?) to the displacement\. Calculate the work done\.$/, "A force of magnitude $1 acts on a crate as it moves through $2. The angle between the force and the displacement is $3. Calculate the work done by the force."],
      [/^A device transfers (.+?) in (.+?)\. Calculate its power\.$/, "An electric motor transfers $1 of energy in $2. Calculate the average power developed by the motor."],
      [/^A system receives (.+?) and transfers (.+?) usefully\. Calculate its efficiency\.$/, "An electric motor receives $1 of energy and transfers $2 to useful mechanical energy. Calculate its efficiency."],
      [/^A ([\d.-]+) kg mass rises (.+?) near Earth\. Use g = (.+?)\. Calculate ΔEp\.$/, "A load of mass $1 kg is lifted vertically through $2 near Earth's surface. Use g = $3. Calculate the increase in gravitational potential energy of the load."],
      [/^A force of (.+?) acts (.+?) from an axis at (.+?) to the radius\. Calculate torque magnitude\.$/, "A force of magnitude $1 acts on a wheel at a point $2 from its axis. The angle between the force and the radius is $3. Calculate the magnitude of the torque about the axis."],
      [/^A body starts from rest with angular acceleration (.+?) for (.+?)\. Calculate final angular speed\.$/, "A flywheel starts from rest and has constant angular acceleration $1 for $2. Calculate its final angular speed."],
      [/^Point masses (.+?) rotate about an axis\. Calculate their total moment of inertia\.$/, "Two small masses are attached to a light rigid frame at the stated distances from its axis: $1. Calculate the total moment of inertia."],
      [/^A body has I = (.+?) and ω = (.+?)\. Calculate rotational kinetic energy\.$/, "A flywheel has moment of inertia I = $1 and angular speed ω = $2. Calculate its rotational kinetic energy."],
      [/^A body has I = (.+?) and ω = (.+?)\. Calculate angular momentum\.$/, "A flywheel has moment of inertia I = $1 and angular speed ω = $2. Calculate its angular momentum."],
      [/^A moving clock measures a proper interval of (.+?) at (.+?)\. Calculate the interval in the laboratory frame\.$/, "A clock on a spacecraft measures a proper time interval of $1. The spacecraft moves at $2 relative to a laboratory. Calculate the time interval measured in the laboratory frame."],
      [/^A body's proper length is (.+?)\. Calculate its length when moving at (.+?)\.$/, "A spacecraft has proper length $1. It moves parallel to its length at $2 relative to Earth. Calculate its length measured in the Earth frame."],
      [/^Calculate γ for a speed of (.+?)\.$/, "A spacecraft moves at $1 relative to Earth. Calculate the Lorentz factor γ for the spacecraft."],
      [/^In Galilean frames, x = (.+?), v = (.+?) and t = (.+?)\. Calculate x′\.$/, "Frames S and S′ are in Galilean relative motion at velocity v = $2. An event has coordinates x = $1 and t = $3 in S. Calculate its position coordinate x′ in S′."],
      [/^An object moves at (.+?) in frame S while S′ moves at (.+?) in the same direction\. Calculate u′\/c\.$/, "A spacecraft moves at $1 in frame S. Frame S′ moves at $2 relative to S along the same axis. Calculate the spacecraft's velocity u′ in S′ as a fraction of c."],
      [/^A substance has density (.+?) and volume (.+?)\. Calculate its mass\.$/, "A material sample has density $1 and volume $2. Calculate the mass of the sample."],
      [/^Calculate the energy needed to heat (.+?) of material with c = (.+?) through (.+?)\.$/, "A material sample of mass $1 has specific heat capacity $2. Its temperature increases by $3. Calculate the thermal energy transferred to the sample."],
      [/^A ([\d.-]+) kg sample changes phase with L = (.+?)\. Calculate the energy transferred\.$/, "A $1 kg sample undergoes a complete change of phase. Its specific latent heat is $2. Calculate the energy transferred."],
      [/^A body scatters (.+?) from (.+?) incident power\. Calculate its albedo\.$/, "A planet scatters $1 of the $2 of radiation incident on it. Calculate the planet's albedo."],
      [/^Mean incident intensity is (.+?) and albedo is (.+?)\. Calculate absorbed intensity\.$/, "The mean radiation intensity incident on a planet is $1 and its albedo is $2. Calculate the mean intensity absorbed by the planet."],
      [/^A normal force of (.+?) acts over (.+?)\. Calculate pressure\.$/, "Gas in a cylinder exerts a normal force of $1 on a piston of area $2. Calculate the pressure of the gas."],
      [/^A sample contains (.+?) molecules\. Use NA = (.+?)\. Calculate amount in moles\.$/, "A gas sample contains $1 molecules. Use NA = $2. Calculate the amount of gas in moles."],
      [/^A fixed gas changes from (.+?)\. Calculate P₂\.$/, "A fixed mass of gas is sealed in a cylinder. It changes from $1. Calculate the final pressure P₂."],
      [/^(.+?) mol of ideal gas has P = (.+?) and V = (.+?)\. Calculate T using R = (.+?)\.$/, "A sealed gas sample contains $1 mol of ideal gas at pressure $2 and volume $3. Calculate its temperature using R = $4."],
      [/^A gas receives Q = (.+?) and does W = (.+?)\. Calculate ΔU\.$/, "For a gas in a cylinder, Q = $1 and W = $2, where W is the work done by the gas. Calculate the change ΔU in its internal energy."],
      [/^A gas changes volume by (.+?) at constant pressure (.+?)\. Calculate work done by the gas\.$/, "Gas in a cylinder expands or is compressed by a volume change $1 at constant pressure $2. Calculate the work done by the gas, including its sign."],
      [/^Gas in a cylinder expands or is compressed by a volume change (.+?) at constant pressure (.+?)\. Calculate the work done by the gas, including its sign\.$/, "The volume of a gas in a cylinder changes by ΔV = $1 at constant pressure $2. Calculate the work done by the gas, including its sign."],
      [/^(.+?) mol of monatomic ideal gas changes temperature by (.+?)\. Calculate ΔU using R = (.+?)\.$/, "A sealed sample contains $1 mol of monatomic ideal gas. Its temperature changes by $2. Calculate the change in internal energy using R = $3."],
      [/^A reversible transfer of (.+?) occurs at (.+?)\. Calculate the entropy change of the receiving system\.$/, "For a system at constant temperature $2, the reversible thermal energy transfer into the system is Q = $1. Calculate the entropy change of the system."],
      [/^(.+?) C passes a point in (.+?)\. Calculate current\.$/, "A charge of $1 C passes a point in a wire in $2. Calculate the current in the wire."],
      [/^(.+?) J is transferred when (.+?) moves between two points\. Calculate potential difference\.$/, "A power supply transfers $1 J of energy as charge $2 moves between two points. Calculate the potential difference between the points."],
      [/^A wave travels at (.+?) with frequency (.+?)\. Calculate wavelength\.$/, "A travelling wave has speed $1 and frequency $2. Calculate its wavelength."],
      [/^A wave has wavelength (.+?) and frequency (.+?)\. Calculate wave speed\.$/, "A travelling wave has wavelength $1 and frequency $2. Calculate its speed."],
      [/^Calculate electrical power for V = (.+?) and I = (.+?)\.$/, "The potential difference across a resistor is $1 and the current in it is $2. Calculate the power dissipated by the resistor."],
      [/^Calculate the critical angle for light travelling from refractive index (.+?) into air\.$/, "A ray of light travels from a transparent material of refractive index $1 towards a boundary with air. Calculate the critical angle at the boundary."],
      [/^A source of (.+?) approaches a stationary observer at (.+?)\. Sound speed is (.+?)\. Calculate observed frequency\.$/, "An ambulance siren of frequency $1 approaches a stationary observer at $2. The speed of sound is $3. Calculate the frequency heard by the observer."],
      [/^An observer moves toward a stationary source of (.+?) at (.+?)\. Sound speed is (.+?)\. Calculate observed frequency\.$/, "An observer moves at $2 towards a stationary loudspeaker emitting frequency $1. The speed of sound is $3. Calculate the frequency heard by the observer."],
      [/^A charge of magnitude (.+?) moves at (.+?) through B = (.+?) at (.+?)\. Calculate magnetic force magnitude\.$/, "A charged particle of charge magnitude $1 moves at $2 through a uniform magnetic field of magnitude B = $3. The angle between its velocity and the field is $4. Calculate the magnitude of the magnetic force."],
      [/^A charge of magnitude (.+?) is accelerated from rest through (.+?)\. Calculate kinetic energy gained\.$/, "A charged particle of charge magnitude $1 is accelerated from rest through a potential difference $2. Calculate the kinetic energy gained by the particle."],
      [/^A particle has m = (.+?), speed (.+?), \|q\| = (.+?) and moves perpendicular to B = (.+?)\. Calculate orbit radius\.$/, "A charged particle of mass $1 and charge magnitude $3 moves at $2 perpendicular to a uniform magnetic field B = $4. Calculate the radius of its circular path."],
      [/^A loop of area (.+?) is in B = (.+?) with field at (.+?) to its normal\. Calculate magnetic flux\.$/, "A single flat loop of area $1 is placed in a uniform magnetic field B = $2. The field makes an angle $3 with the normal to the loop. Calculate the magnetic flux through the loop."],
      [/^A rod of length (.+?) moves perpendicular to B = (.+?) at (.+?)\. Calculate motional emf\.$/, "A conducting rod of length $1 moves at $3 perpendicular to a uniform magnetic field B = $2. Calculate the induced emf across the rod."],
      [/^Calculate photon energy for frequency (.+?) using h = (.+?)\.$/, "A photon in an atomic emission line has frequency $1. Use h = $2. Calculate the energy of the photon."],
      [/^A nucleus has A = (.+?) and Z = (.+?)\. Calculate its neutron number\.$/, "A nucleus has nucleon number A = $1 and proton number Z = $2. Calculate its neutron number."],
      [/^A particle has de Broglie wavelength (.+?)\. Calculate its momentum\.$/, "A beam of particles has de Broglie wavelength $1. Calculate the momentum of each particle."],
      [/^Particles have de Broglie wavelength (.+?) and encounter slit\/lattice spacing (.+?)\. Explain whether appreciable diffraction is expected\.$/, "A beam of particles with de Broglie wavelength $1 is incident on a crystal whose lattice spacing is $2. Explain whether appreciable diffraction is expected."],
      [/^Calculate gravitational field strength at r = (.+?) from mass (.+?)\. Use G = (.+?)\.$/, "A spherical planet has mass $2. Calculate the gravitational field strength at a point $1 from its centre. Use G = $3."],
      [/^Calculate gravitational potential at r = (.+?) from mass (.+?)\. Use G = (.+?)\.$/, "A spherical body has mass $2. Calculate the gravitational potential at a point $1 from its centre. Use G = $3 and take zero potential at infinity."],
      [/^Calculate circular orbital speed at r = (.+?) around mass (.+?)\.$/, "A satellite moves in a circular orbit of radius $1 around a spherical body of mass $2. Calculate the orbital speed of the satellite."],
      [/^Calculate escape speed from r = (.+?) around mass (.+?)\.$/, "An object is launched from a point $1 from the centre of a spherical body of mass $2. Calculate the escape speed from this point."],
      [/^Calculate electric potential (.+?) from charge (.+?) using k = (.+?)\.$/, "An isolated point charge has charge $2. Calculate the electric potential at a point $1 from the charge. Use k = $3 and take zero potential at infinity."],
      [/^Estimate nuclear radius for A = (.+?) using R₀ = (.+?)\.$/, "A nucleus has nucleon number A = $1. Use R₀ = $2 to estimate the radius of the nucleus."],
      [/^Calculate the Compton wavelength shift for scattering angle (.+?) using me = (.+?)\.$/, "An X-ray photon undergoes Compton scattering through an angle $1. Use me = $2 to calculate the change in the photon's wavelength."],
      [/^A sample starts with N₀ = (.+?) and λ = (.+?)\. Calculate N after (.+?)\.$/, "A radioactive sample initially contains N₀ = $1 undecayed nuclei and has decay constant λ = $2. Calculate the number N remaining after $3."],
      [/^A sample has N = (.+?) nuclei and λ = (.+?)\. Calculate activity\.$/, "A radioactive sample contains N = $1 undecayed nuclei and has decay constant λ = $2. Calculate its activity."],
      [/^Initial activity is (.+?) and half-life is (.+?)\. Find activity after (.+?)\.$/, "A radioactive source has initial activity $1 and half-life $2. Calculate its activity after $3."],
      [/^Measured count rate is (.+?) and background is (.+?)\. Calculate corrected count rate\.$/, "A detector near a radioactive source records a count rate of $1. The background count rate is $2. Calculate the corrected count rate due to the source."],
      [/^A measurement is (.+?) ± (.+?)\. Calculate percentage uncertainty\.$/, "A student records a time as $1 ± $2 s. Calculate the percentage uncertainty in the time."],
      [/^Calculate the mean of (.+?)\.$/, "A student obtains repeated measurements with values $1. Calculate the mean value."],
      [/^The readings are (.+?)\. Treat (.+?) as an anomaly and calculate the mean of the remaining readings\.$/, "A student obtains repeated measurements with values $1. The value $2 is identified as an anomaly. Calculate the mean of the remaining values."],
      [/^Calculate z = a\s*\+\s*b and its absolute uncertainty for a = (.+?) and b = (.+?)\.$/, "Two measured lengths are a = $1 and b = $2. The total length is z = a + b. Calculate z and its absolute uncertainty."],
      [/^For z = ab, find percentage uncertainty when a = (.+?) and b = (.+?)\.$/, "A rectangle has measured sides a = $1 and b = $2. Its area is z = ab. Calculate the percentage uncertainty in z."],
      [/^A best-fit line passes through \((.+?), (.+?)\) and \((.+?), (.+?)\)\. Calculate its gradient\.$/, "On a velocity–time graph, a best-fit line passes through (t = $1 s, v = $2 m s⁻¹) and (t = $3 s, v = $4 m s⁻¹). Calculate the acceleration represented by the gradient."],
    ];
    for (const [pattern, replacement] of contextualRewrites) {
      question = question.replace(pattern, replacement);
    }

    question = groupLargeIntegers(formatScientificNotation(formatSmallDecimals(question)))
      .replace(/\s*=\s*/g, " = ")
      .replace(/(\d)×10/g, "$1 × 10")
      .replace(/\s*±\s*/g, " ± ");
    answer = groupLargeIntegers(formatScientificNotation(formatSmallDecimals(answer)))
      .replace(/\s*=\s*/g, " = ")
      .replace(/(\d)×10/g, "$1 × 10")
      .replace(/\s*±\s*/g, " ± ");
    return { ...entry, question, answer };
  };

  // A. Space, time and motion
  many("A.1 Kinematics", "SL", [
    ["Distinguish distance from displacement.", "Distance is total path length; displacement is the directed change in position."],
    ["Distinguish between average speed and average velocity.", "Average speed is total distance divided by elapsed time and is a scalar. Average velocity is displacement divided by elapsed time and is a vector."],
    ["What is the position of a body?", "Its location relative to a chosen origin in a reference frame."],
    ["Define displacement.", "The change in position: final position minus initial position."],
    ["Define average velocity.", "Displacement divided by elapsed time."],
    ["Define average speed.", "Total distance travelled divided by elapsed time."],
    ["What is instantaneous velocity?", "Velocity at a particular instant; the gradient of the tangent to a position-time graph."],
    ["State what is meant by instantaneous acceleration.", "The rate of change of velocity with time at a particular instant: a = dv/dt. Average acceleration over an interval is Δv/Δt."],
    ["What does the gradient of a position-time graph represent?", "Velocity."],
    ["A trolley has velocities 2.0, 5.0 and 8.0 m s⁻¹ at times 0.0, 1.0 and 2.0 s respectively. Its velocity–time graph is a straight line.\n(a) Determine its acceleration. [1]\n(b) Determine its displacement from t = 0 to t = 2.0 s. [2]", "(a) Gradient = (8.0 − 2.0)/2.0 = 3.0 m s⁻². [1]\n(b) Displacement is the area under the graph: ½(2.0 + 8.0) × 2.0 = 10 m. [2]"],
    ["What does signed area under a velocity-time graph represent?", "Displacement."],
    ["A ball is dropped from rest in a vacuum near Earth’s surface. Which statement describes its motion?\nA. It covers equal distances in equal time intervals.\nB. Its velocity changes by equal amounts in equal time intervals.\nC. Its acceleration increases as its speed increases.\nD. Its velocity is constant.", "B. Acceleration is approximately constant, so Δv = gΔt. Its speed increases and it covers progressively greater distances in equal time intervals."],
    ["How does non-uniform acceleration appear on a velocity-time graph?", "As a changing gradient."],
    ["When may the constant-acceleration equations be used?", "Only when acceleration is uniform over the interval considered."],
    ["Describe horizontal motion of a projectile when fluid resistance is neglected.", "Horizontal velocity is constant because horizontal acceleration is zero."],
    ["Describe vertical motion of a projectile when fluid resistance is neglected.", "It has constant downward acceleration g."],
    ["At the highest point of a projectile, what are its vertical velocity and acceleration?", "Vertical velocity is momentarily zero; acceleration remains g downward."],
    ["What shape is a projectile trajectory when fluid resistance is absent?", "A parabola."],
    ["Two identical balls are launched with the same initial velocity. One moves through still air and the other through a vacuum. Explain why the horizontal range is generally smaller in air.", "Air resistance opposes the motion and reduces the horizontal component of velocity. The horizontal distance travelled is therefore generally smaller than in a vacuum."],
    ["A ball is projected upwards at an angle through still air. Explain why its acceleration is not constant.", "Drag acts opposite to the instantaneous velocity. Its magnitude and direction change as the velocity changes, so the resultant force and acceleration change even though weight is approximately constant."],
    ["Define terminal speed.", "The constant speed reached when the resultant force becomes zero."],
  ]);
  [[120, 15], [450, 30], [72, 6], [1000, 40], [3.6, 2], [84, 7]].forEach(([distance, time]) =>
    add("A.1 Kinematics", "SL", `A body travels ${distance} m in ${time} s. Calculate its average speed.`, `Average speed = distance/time = ${sig(distance / time)} m s⁻¹.`));
  [[0, 12, 3], [5, 21, 4], [18, 2, 8], [10, 30, 5], [25, 5, 4], [-4, 8, 6]].forEach(([u, v, time]) =>
    add("A.1 Kinematics", "SL", `Velocity changes from ${u} m s⁻¹ to ${v} m s⁻¹ in ${time} s. Calculate the average acceleration.`, `a = (v-u)/t = ${sig((v - u) / time)} m s⁻².`));
  [[3, 2, 5], [12, -1.5, 4], [0, 9.8, 2], [20, -4, 3], [-5, 2, 6]].forEach(([u, a, time]) =>
    add("A.1 Kinematics", "SL", `An object starts at ${u} m s⁻¹ and accelerates at ${a} m s⁻² for ${time} s. Calculate its final velocity.`, `v = u + at = ${sig(u + a * time)} m s⁻¹.`));
  [[4, 16, 5], [20, 8, 3], [-2, 10, 4], [0, 24, 6], [15, 15, 7]].forEach(([u, v, time]) =>
    add("A.1 Kinematics", "SL", `A trolley has initial velocity ${u} m s⁻¹ and final velocity ${v} m s⁻¹ after ${time} s. Its acceleration is constant.\n(a) Calculate its displacement. [2]\n(b) Determine whether the distance travelled equals the magnitude of this displacement. Explain your answer. [1]`, `(a) s = ½(u+v)t = ${sig(0.5 * (u + v) * time)} m. [2]\n(b) ${u * v < 0 ? "No. The velocity changes sign, so the trolley reverses direction and distance exceeds the magnitude of displacement." : "Yes. The velocity does not change sign, so the trolley does not reverse direction."} [1]`));
  [[20, 4], [45, 3], [12, 5]].forEach(([vx, time]) =>
    add("A.1 Kinematics", "SL", `A ball is projected horizontally at ${vx} m s⁻¹ from a cliff and hits the ground after ${time} s. Air resistance is negligible. Use g = 9.81 m s⁻².\n(a) Calculate the height of the cliff. [2]\n(b) Determine the horizontal range. [1]`, `(a) The initial vertical velocity is zero. h = ½gt² = ${sig(0.5 * 9.81 * time * time)} m. [2]\n(b) Horizontal velocity is constant: R = vₓt = ${sig(vx * time)} m. [1]`));
  [[19.6], [14.7], [29.4]].forEach(([u]) =>
    add("A.1 Kinematics", "SL", `A ball is thrown vertically upward at ${u} m s⁻¹. Use g = 9.8 m s⁻². Calculate the time to maximum height.`, `At the top v = 0, so t = u/g = ${sig(u / 9.8)} s.`));

  many("A.2 Forces and momentum", "SL", [
    ["State Newton's first law.", "A body remains at rest or at constant velocity unless acted on by a resultant external force."],
    ["State Newton's second law for constant mass.", "The resultant force equals mass multiplied by acceleration: F = ma."],
    ["State Newton’s third law of motion.", "When two bodies interact, they exert forces on each other that are equal in magnitude and opposite in direction. The forces act on different bodies and are of the same type."],
    ["A block slides down a rough inclined plane. Draw a labelled free-body diagram for the block.", "Show three forces acting on the block: weight vertically downwards; normal contact force perpendicular to and away from the plane; kinetic friction up the plane. Do not add a separate “resultant force” as another force."],
    ["What is the normal force?", "The component of contact force perpendicular to the surface."],
    ["A crate is at rest on a rough horizontal floor. A horizontal force is increased slowly. State the maximum magnitude of static friction in terms of μs and the normal force FN.", "Ff,max = μsFN. Below this limit static friction adjusts to balance the applied horizontal force; it is not always equal to μsFN."],
    ["State the dynamic-friction relation.", "Ff = μdFN."],
    ["What is tension?", "A pulling contact force transmitted by a taut string, rope or cable."],
    ["State Hooke's law for the restoring force.", "FH = -kx; the minus sign shows that the force opposes displacement."],
    ["A small sphere moves slowly through a viscous fluid in laminar flow. State an expression for the magnitude of the viscous drag force.", "Fd = 6πηrv, where η is dynamic viscosity, r is sphere radius and v is speed relative to the fluid. The force opposes relative motion; the law requires low Reynolds number."],
    ["State the buoyancy equation.", "Fb = ρVg, where V is displaced-fluid volume."],
    ["Distinguish mass from weight.", "Mass measures inertia in kg; weight is gravitational force mg in N."],
    ["A book rests on a horizontal table. A student claims that the normal force and the weight are a Newton’s third-law pair. Explain why this claim is incorrect. [2]", "Both forces act on the book, whereas a third-law pair acts on two different bodies. [1] The partner to the table’s force on the book is the book’s force on the table; the partner to Earth’s gravitational force on the book is the book’s gravitational force on Earth. [1]"],
    ["Define linear momentum.", "p = mv."],
    ["When is total linear momentum conserved?", "When the resultant external force on the system is zero."],
    ["State what is meant by the impulse of a force.", "Impulse is the time integral of the force and equals the change in momentum: J = ∫F dt = Δp. For constant force, J = FΔt."],
    ["What does area under a force-time graph represent?", "Impulse, equal to the change in momentum."],
    ["Distinguish elastic from inelastic collisions.", "Kinetic energy is conserved in an elastic collision but not in an inelastic collision; momentum is conserved in both isolated systems."],
    ["An object initially at rest explodes into two fragments of unequal mass. External impulse is negligible. Explain which fragment has the greater speed.", "Total momentum remains zero, so the two fragment momenta are equal in magnitude and opposite in direction. Since p = mv, the fragment of smaller mass has the greater speed."],
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
    add("A.2 Forces and momentum", "SL", `A horizontal spring has spring constant ${k} N m⁻¹. Displacement x is measured from equilibrium, positive to the right. The spring obeys Hooke’s law.\n(a) Calculate the restoring force when x = ${extension} m, including its sign. [2]\n(b) Explain the direction indicated by your answer. [1]`, `(a) FH = −kx = ${sig(-k * extension)} N. [2]\n(b) The force acts ${extension > 0 ? "left" : "right"}, opposite to the displacement, towards equilibrium. [1]`));
  [[0.35, 20], [0.6, 50], [0.25, 120]].forEach(([mu, normal]) =>
    add("A.2 Forces and momentum", "SL", `A sliding body has μd = ${mu} and normal force ${normal} N. Calculate dynamic friction.`, `Ff = μdFN = ${sig(mu * normal)} N.`));
  [[1000, 0.003], [800, 0.012]].forEach(([rho, volume]) =>
    add("A.2 Forces and momentum", "SL", `A body displaces ${volume} m³ of fluid of density ${rho} kg m⁻³. Use g = 9.8 m s⁻². Calculate buoyancy.`, `Fb = ρVg = ${sig(rho * volume * 9.8)} N.`));
  [[12, 3], [20, 5]].forEach(([speed, radius]) =>
    add("A.2 Forces and momentum", "SL", `A car moves at constant speed ${speed} m s⁻¹ around a circular track of radius ${radius} m.\n(a) Calculate the magnitude of its acceleration. [2]\n(b) Explain why it accelerates despite its constant speed. [1]`, `(a) a = v²/r = ${sig(speed * speed / radius)} m s⁻², directed towards the centre. [2]\n(b) Velocity changes because its direction changes, even though its magnitude is constant. [1]`));
  many("A.2 Forces and momentum", "HL", [
    ["A 3.0 kg object moves east at 4.0 m s⁻¹ and a 4.0 kg object moves north at 3.0 m s⁻¹. Calculate the magnitude of their total momentum.", "The components are 12 kg m s⁻¹ east and 12 kg m s⁻¹ north, so |p| = √(12²+12²) = 17.0 kg m s⁻¹."],
    ["A stationary object explodes into fragments with momenta 6.0 kg m s⁻¹ east and 8.0 kg m s⁻¹ north. State the momentum of the third fragment.", "6.0 kg m s⁻¹ west and 8.0 kg m s⁻¹ south; its magnitude is 10.0 kg m s⁻¹."],
    ["Two pucks collide on frictionless ice. Initial total momentum is 5.0 kg m s⁻¹ east and 12 kg m s⁻¹ north. What is the final total momentum?", "The same vector: 5.0 kg m s⁻¹ east and 12 kg m s⁻¹ north."],
    ["A ball initially has momentum 10 kg m s⁻¹ east and leaves a collision with momentum 6 kg m s⁻¹ north. State its change in momentum.", "Δp = 6 kg m s⁻¹ north minus 10 kg m s⁻¹ east: components 10 west and 6 north."],
    ["Two objects collide in a plane. The resultant external impulse on the system is zero. Explain how conservation of momentum can be applied to this collision.", "Momentum is a vector. Resolve the initial and final momenta along two perpendicular axes and equate the total initial and final components separately along each axis."],
  ]);

  many("A.3 Work, energy and power", "SL", [
    ["State the principle of conservation of energy.", "Total energy remains constant in an isolated system, although it may change form."],
    ["Define the work done by a constant force on an object.", "The product of the force component in the direction of displacement and the displacement: W = Fs cos θ, where θ is the angle between force and displacement."],
    ["A motor receives 500 J of electrical energy and transfers 350 J to a load. Determine the energy dissipated and the efficiency of the motor.", "Dissipated energy = 500 − 350 = 150 J. Efficiency = 350/500 = 0.70 = 70%."],
    ["State work done by a constant force at angle θ to displacement.", "W = Fs cos θ."],
    ["State the work–energy theorem for a particle of constant mass.", "The net work done by the resultant force equals the change in kinetic energy: Wnet = ΔEk. Work by an individual force need not equal the change in kinetic energy."],
    ["A trolley attached to a spring moves up a slope. State the three contributions to the mechanical energy of this system, treating the trolley as a particle.", "Translational kinetic energy, gravitational potential energy and elastic potential energy. For a rotating rigid body, rotational kinetic energy must also be included."],
    ["When is total mechanical energy conserved?", "When no frictional or other non-conservative forces do work."],
    ["Two particles have equal kinetic energy. Particle X has four times the mass of particle Y. Determine pX/pY. [2]", "Ek = p²/(2m), so p = √(2mEk). At fixed Ek, momentum magnitude is proportional to √m. Therefore pX/pY = √4 = 2. [2]"],
    ["State the near-Earth change in gravitational potential energy.", "ΔEp = mgΔh."],
    ["State elastic potential energy in a Hookean spring.", "EH = ½k(Δx)²."],
    ["Define power.", "Rate of work done or energy transferred: P = ΔW/Δt."],
    ["State the power relation for a force parallel to velocity.", "P = Fv."],
    ["Define efficiency.", "Useful work or power output divided by total work or power input."],
    ["Define energy density of a fuel.", "Energy released per unit mass or, when specified, per unit volume."],
    ["A block slides to rest on a rough horizontal surface. Explain how energy conservation applies.", "The block loses kinetic energy because friction does negative work on it. Energy is transferred to internal energy of the block and surface, so total energy is conserved although mechanical energy decreases."],
    ["What does area under a force-displacement graph represent?", "Work done."],
    ["A satellite moves at constant speed in a circular orbit. Explain why the gravitational force does no work on the satellite.", "The gravitational force is radial and the instantaneous displacement is tangential. They are perpendicular, so F·ds = 0 and the kinetic energy remains constant."],
  ]);
  [[2, 4], [5, 10], [1200, 20], [0.25, 8], [70, 6]].forEach(([mass, speed]) =>
    add("A.3 Work, energy and power", "SL", `Calculate the kinetic energy of a ${mass} kg body moving at ${speed} m s⁻¹.`, `Ek = ½mv² = ${sig(0.5 * mass * speed * speed)} J.`));
  [[20, 5, 0], [40, 3, 60], [12, 8, 30], [100, 2, 90]].forEach(([force, distance, angle]) =>
    add("A.3 Work, energy and power", "SL", `A ${force} N force acts through ${distance} m at ${angle}° to the displacement. Calculate the work done.`, `W = Fs cos θ = ${sig(force * distance * cosDegrees(angle))} J.`));
  [[600, 20], [1500, 30], [72, 6], [9000, 45]].forEach(([energy, time]) =>
    add("A.3 Work, energy and power", "SL", `A device transfers ${energy} J in ${time} s. Calculate its power.`, `P = E/t = ${sig(energy / time)} W.`));
  [[80, 100], [450, 600], [1200, 1500], [36, 90]].forEach(([useful, input]) =>
    add("A.3 Work, energy and power", "SL", `A motor receives ${input} J of electrical energy and transfers ${useful} J to useful mechanical energy.\n(a) Calculate its efficiency. [2]\n(b) Determine the energy dissipated and state one possible form of this energy. [2]`, `(a) η = useful/input = ${pct(100 * useful / input)}. [2]\n(b) Energy dissipated = ${input} − ${useful} = ${sig(input - useful)} J; for example, increased internal energy of the motor and surroundings. [2]`));
  [[2, 5], [75, 1.2], [0.4, 18], [1200, 0.25]].forEach(([mass, height]) =>
    add("A.3 Work, energy and power", "SL", `A ${mass} kg mass rises ${height} m near Earth. Use g = 9.8 m s⁻². Calculate ΔEp.`, `ΔEp = mgΔh = ${sig(mass * 9.8 * height)} J.`));
  [[200, 0.04], [35, 0.12], [500, 0.025], [80, 0.2], [1200, 0.01]].forEach(([k, extension]) =>
    add("A.3 Work, energy and power", "SL", `A spring of constant ${k} N m⁻¹ is extended ${extension} m. Calculate its elastic potential energy.`, `EH = ½kx² = ${sig(0.5 * k * extension * extension)} J.`));

  many("A.4 Rigid body mechanics", "HL", [
    ["Define the torque of a force about an axis.", "The product of force magnitude and perpendicular distance from the axis to its line of action: τ = Fd⊥ = Fr sin θ. State the sense of rotation separately."],
    ["State the condition for rotational equilibrium.", "The resultant torque about the axis is zero."],
    ["A flywheel rotates about a fixed axis with constant moment of inertia. Explain how a non-zero resultant torque affects its angular velocity.", "The flywheel has angular acceleration α = τnet/I. Its angular velocity changes in the direction of the resultant torque."],
    ["Define angular displacement.", "The angle through which a body rotates, measured in radians."],
    ["Define angular speed about a fixed axis.", "The magnitude of angular velocity: the magnitude of the rate of change of angular displacement with time, in rad s⁻¹."],
    ["Define angular acceleration about a fixed axis.", "The rate of change of angular velocity with time: α = dω/dt. Average angular acceleration is Δω/Δt; angular velocity includes the sense of rotation."],
    ["On what does moment of inertia depend?", "The mass and its distribution about the chosen axis."],
    ["State moment of inertia for point masses.", "I = Σmr²."],
    ["State Newton's second law for rotation.", "τ = Iα."],
    ["Define angular momentum of a rigid body.", "L = Iω."],
    ["When is angular momentum conserved?", "When the resultant external torque is zero."],
    ["A constant resultant torque acts on a flywheel for a time interval Δt. State the relation between the torque and the change in angular momentum.", "τΔt = ΔL. For a variable torque, angular impulse is ∫τ dt. L = Iω for rotation about the specified fixed axis."],
    ["A flywheel’s angular speed is doubled while its moment of inertia remains constant. Which row gives the factors by which angular momentum and rotational kinetic energy increase?\nA. 2 and 2\nB. 2 and 4\nC. 4 and 2\nD. 4 and 4", "B. L = Iω increases by a factor of 2; Ek = ½Iω² increases by a factor of 4."],
    ["A solid cylinder rolls without slipping on a stationary horizontal surface. Its centre moves at speed v. State the speed of its point of contact with the surface and relate v to angular speed ω.", "The point of contact is instantaneously at rest relative to the surface. v = ωR, where R is the cylinder radius."],
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
    add("A.4 Rigid body mechanics", "HL", `A flywheel with moment of inertia I = ${inertia} kg m² rotates at angular speed ω = ${omega} rad s⁻¹.\n(a) Calculate its angular momentum. [2]\n(b) Its moment of inertia is doubled without external torque. Deduce its new angular speed. [2]`, `(a) L = Iω = ${sig(inertia * omega)} kg m² s⁻¹. [2]\n(b) Angular momentum is conserved, so Iω = (2I)ωnew. Thus ωnew = ${sig(omega / 2)} rad s⁻¹. [2]`));

  many("A.5 Galilean and special relativity", "HL", [
    ["What is an inertial reference frame?", "A non-accelerating frame in which Newton's laws have their usual form."],
    ["State Galilean relativity.", "Newton's laws are the same in all inertial reference frames."],
    ["Frame S′ moves at constant velocity v along the positive x-axis of S. Their origins coincide at t = 0. State the Galilean position transformation for an event.", "x′ = x − vt. The axes are parallel and the clocks share t′ = t."],
    ["Two light flashes occur at different positions but at the same time in inertial frame S. Frame S′ moves along the line joining the flashes. Explain why the flashes are not simultaneous in S′. [2]", "The Lorentz transformation gives Δt′ = γ(Δt − vΔx/c²). [1] Although Δt = 0, Δx is non-zero, so Δt′ = −γvΔx/c² is non-zero for v ≠ 0. [1]"],
    ["State the Galilean velocity-addition equation.", "u′ = u - v."],
    ["State the first postulate of special relativity.", "The laws of physics are the same in all inertial reference frames."],
    ["State the second postulate of special relativity.", "The speed of light in vacuum is the same for all inertial observers."],
    ["State the Lorentz factor.", "γ = 1/√(1-v²/c²)."],
    ["Frame S′ moves at constant velocity v along the positive x-axis of S. The origins and zero clock readings coincide. State the Lorentz position transformation.", "x′ = γ(x − vt), where γ = 1/√(1 − v²/c²)."],
    ["Frame S′ moves at constant velocity v along the positive x-axis of S. The origins and zero clock readings coincide. State the Lorentz time transformation.", "t′ = γ(t − vx/c²), where γ = 1/√(1 − v²/c²)."],
    ["State relativistic velocity addition.", "u′ = (u-v)/(1-uv/c²)."],
    ["Two events have separations Δx and Δt along one spatial axis. State the space–time interval and explain what is meant by its invariance.", "The interval is (cΔt)² − (Δx)². All inertial frames calculate the same value for this pair of events, although Δx and Δt can differ."],
    ["Define proper time interval.", "Time between events measured in the frame where the events occur at the same position."],
    ["Define proper length.", "Length measured in the rest frame of the object."],
    ["State the time-dilation equation.", "Δt = γΔt₀."],
    ["State the length-contraction equation.", "L = L₀/γ."],
    ["What is the relativity of simultaneity?", "Events simultaneous in one inertial frame need not be simultaneous in another."],
    ["What does a world line show on a space-time diagram?", "The position of an object or event through time."],
    ["Muons created high in the atmosphere reach Earth in much greater numbers than a calculation using their proper mean lifetime and the Earth-frame distance would predict. Explain this using special relativity in the Earth frame.", "The muons move rapidly relative to Earth, so their mean lifetime in the Earth frame is increased by time dilation: Δt = γΔt₀. They can therefore travel farther before decaying."],
  ]);
  [0.5, 0.6, 0.8, 0.9].forEach((beta) =>
    add("A.5 Galilean and special relativity", "HL", `Calculate γ for a speed of ${beta}c.`, `γ = 1/√(1-${beta}²) = ${sig(1 / Math.sqrt(1 - beta * beta))}.`));
  [[2, 0.6], [5, 0.8], [1.5, 0.9], [12, 0.5]].forEach(([proper, beta]) => {
    const gamma = 1 / Math.sqrt(1 - beta * beta);
    add("A.5 Galilean and special relativity", "HL", `A moving clock measures a proper interval of ${proper} s at ${beta}c. Calculate the interval in the laboratory frame.`, `Δt = γΔt₀ = ${sig(gamma * proper)} s.`);
  });
  [[100, 0.6], [12, 0.8], [4, 0.9], [250, 0.5]].forEach(([properLength, beta]) => {
    const gamma = 1 / Math.sqrt(1 - beta * beta);
    add("A.5 Galilean and special relativity", "HL", `A spacecraft has proper length ${properLength} m. It moves parallel to its length at ${beta}c relative to Earth.\n(a) Calculate its length in the Earth frame. [2]\n(b) State how the positions of its two ends must be measured in the Earth frame to obtain this length. [1]`, `(a) L = L₀/γ = ${sig(properLength / gamma)} m. [2]\n(b) The two end positions must be measured simultaneously in the Earth frame. [1]`);
  });
  [[80, 12, 4], [150, 20, 5], [10, -3, 2], [300, 25, 8]].forEach(([x, v, time]) =>
    add("A.5 Galilean and special relativity", "HL", `Frame S′ moves at v = ${v} m s⁻¹ along the x-axis of S. The origins coincide at t = 0 and the axes are parallel. An event has x = ${x} m and t = ${time} s in S. Calculate x′ using Galilean transformations.`, `x′ = x-vt = ${sig(x - v * time)} m.`));
  [[0.8, 0.5], [0.9, 0.6], [0.7, -0.4], [0.95, 0.8]].forEach(([uBeta, vBeta]) => {
    const displayedV = vBeta < 0 ? `(${vBeta})` : `${vBeta}`;
    add(
      "A.5 Galilean and special relativity",
      "HL",
      `A spacecraft moves at ${uBeta}c in the positive x-direction in frame S. Frame S′ moves at ${vBeta}c relative to S along the x-axis. Calculate u′/c.`,
      `u′/c = (${uBeta} - ${displayedV})/(1 - ${uBeta}×${displayedV}) = ${sig((uBeta - vBeta) / (1 - uBeta * vBeta))}.`,
    );
  });

  // B. The particulate nature of matter
  many("B.1 Thermal energy transfers", "SL", [
    ["Compare the particle arrangements in solids, liquids and gases.", "Solids have closely packed particles in fixed relative positions; liquids are close but mobile; gases are widely separated and move freely."],
    ["Define density.", "Mass per unit volume: ρ = m/V."],
    ["How are temperature changes in kelvin and degrees Celsius related?", "A change of 1 K is the same size as a change of 1 °C."],
    ["Convert a Celsius temperature θ to kelvin.", "T = θ + 273.15."],
    ["State the relation between absolute temperature and the mean translational kinetic energy of a molecule in an ideal gas.", "⟨Ek⟩ = 3kBT/2. T must be in kelvin; this is the mean random translational kinetic energy, not the total internal energy of every substance."],
    ["Define internal energy.", "The total random kinetic energy plus intermolecular potential energy of the particles."],
    ["What determines the direction of resultant thermal energy transfer?", "Temperature difference; energy transfers from higher to lower temperature."],
    ["A pure substance melts at constant pressure while thermal energy is supplied. Explain why its temperature remains constant during melting.", "The supplied energy increases intermolecular potential energy as the arrangement changes. Mean random kinetic energy remains constant, so the temperature remains constant."],
    ["State the specific heat-capacity equation.", "Q = mcΔT."],
    ["State the specific latent-heat equation.", "Q = mL."],
    ["Explain thermal conduction in a metal rod heated at one end.", "Particles at the hot end have greater mean random kinetic energy. Energy is transferred through interactions between neighbouring particles and by mobile electrons moving through the metal, without bulk movement of the rod."],
    ["A slab of thickness L and area A has thermal conductivity k. Its faces are held at temperatures Th and Tc, where Th > Tc. State the rate of thermal energy transfer from the hot face to the cold face in steady state.", "Q/Δt = kA(Th − Tc)/L. This is the positive magnitude of the rate. In signed gradient form, Q̇ = −kA dT/dx."],
    ["In the equation Q̇ = −kA dT/dx, explain the significance of the minus sign.", "The thermal energy transfer is in the direction of decreasing temperature, opposite to the temperature gradient."],
    ["Explain how natural convection transfers thermal energy in a fluid heated from below.", "The heated fluid expands and becomes less dense, so buoyancy causes it to rise. Cooler, denser fluid moves down to replace it, establishing bulk circulation that transfers thermal energy."],
    ["The absolute temperature of a black body doubles while its surface area remains constant. State the factors by which its total emitted power and peak wavelength change. [2]", "From P = σAT⁴, emitted power increases by a factor of 16. [1] From λmaxT = constant, the peak wavelength halves. [1]"],
    ["Define apparent brightness.", "Received power per unit area from a source."],
    ["Relate luminosity, apparent brightness and distance.", "b = L/(4πd²)."],
    ["State Wien's displacement law.", "λmaxT = 2.9 × 10⁻³ m K."],
  ]);
  [[7800, 0.002], [1000, 0.025], [1.2, 3.5]].forEach(([density, volume]) =>
    add("B.1 Thermal energy transfers", "SL", `A substance has density ${density} kg m⁻³ and volume ${volume} m³. Calculate its mass.`, `m = ρV = ${sig(density * volume)} kg.`));
  [[20], [-15]].forEach(([celsius]) =>
    add("B.1 Thermal energy transfers", "SL", `Convert ${celsius} °C to kelvin.`, `T = θ + 273.15 = ${sig(celsius + 273.15, 5)} K.`));
  [[1, 4200, 5], [2, 900, 20], [0.5, 390, 30]].forEach(([mass, capacity, change]) =>
    add("B.1 Thermal energy transfers", "SL", `A sample of mass ${mass} kg has specific heat capacity ${capacity} J kg⁻¹ K⁻¹. It is heated without changing state.\n(a) Calculate the thermal energy required for a temperature rise of ${change} °C. [2]\n(b) Explain why this temperature change can be used directly with a heat capacity given in J kg⁻¹ K⁻¹. [1]`, `(a) Q = mcΔT = ${sig(mass * capacity * change)} J. [2]\n(b) A change of 1 °C equals a change of 1 K, so the numerical temperature rise is the same in both scales. [1]`));
  [[0.2, 334000], [0.5, 2260000]].forEach(([mass, latent]) =>
    add("B.1 Thermal energy transfers", "SL", `${latent === 334000 ? "Ice at 0 °C melts completely at atmospheric pressure" : "Water at 100 °C vaporises completely at atmospheric pressure"}. The sample mass is ${mass.toFixed(2)} kg and its specific latent heat for this change is ${latent.toExponential(2)} J kg⁻¹.\n(a) Calculate the energy transferred to the sample. [2]\n(b) Explain why the sample’s temperature remains constant during this change of state. [2]`, `(a) Q = mL = ${sig(mass * latent)} J. [2]\n(b) Intermolecular potential energy increases as the particle arrangement changes. Mean random kinetic energy remains constant, so temperature remains constant. [2]`));
  [[205, 0.01, 40, 0.5], [0.8, 2, 15, 0.1]].forEach(([conductivity, area, change, thickness]) =>
    add("B.1 Thermal energy transfers", "SL", `A slab has k = ${conductivity} W m⁻¹ K⁻¹, area ${area} m², thickness ${thickness} m and temperature difference ${change} K. Calculate the conduction rate magnitude.`, `|ΔQ/Δt| = kAΔT/Δx = ${sig(conductivity * area * change / thickness)} W.`));
  [[3.8e26, 2e16], [5e28, 4e17]].forEach(([luminosity, distance]) =>
    add("B.1 Thermal energy transfers", "SL", `A star has luminosity ${luminosity.toExponential(1)} W and is ${distance.toExponential(1)} m away. Calculate its apparent brightness.`, `b = L/(4πd²) = ${sig(luminosity / (4 * Math.PI * distance * distance))} W m⁻².`));
  [[5800], [300]].forEach(([temperature]) =>
    add("B.1 Thermal energy transfers", "SL", `A black body is at ${temperature} K. Calculate its peak wavelength using Wien's law.`, `λmax = 2.9×10⁻³/T = ${sig(2.9e-3 / temperature)} m.`));

  many("B.2 Greenhouse effect", "SL", [
    ["Define emissivity.", "Power radiated per unit area divided by σT⁴ for a black surface at the same temperature."],
    ["Define albedo.", "Total scattered power divided by total incident power."],
    ["An airless spherical planet has albedo 0.25. The stellar intensity at its orbital distance is 1200 W m⁻². Determine the mean absorbed power per unit area over the whole planet. [2]", "The mean incident intensity over the sphere is S/4 = 300 W m⁻². [1] The absorbed fraction is 1 − 0.25, so the mean absorbed intensity is 225 W m⁻². [1]"],
    ["What is the solar constant?", "Solar power received per unit area on a surface normal to the rays at Earth's orbital distance."],
    ["Why is the mean incoming solar intensity over a spherical planet S/4?", "The planet intercepts πR² but distributes energy over surface area 4πR²."],
    ["State four greenhouse gases.", "Water vapour, carbon dioxide, methane and nitrous oxide."],
    ["State one natural source and one human activity that increases atmospheric carbon dioxide.", "For example, natural source: respiration or volcanic activity. Human activity: burning fossil fuels or deforestation."],
    ["Why do greenhouse gases absorb selected infrared wavelengths?", "Their molecular energy-level spacings match the photon energies."],
    ["Outline two ways in which energy absorbed from an infrared photon by a greenhouse-gas molecule can be transferred.", "The molecule can transfer energy to other molecules in collisions. It can also emit infrared radiation, with emission occurring in different directions, including towards the surface."],
    ["Use a molecular model to explain why a greenhouse gas absorbs some infrared wavelengths more strongly than others.", "Molecules have particular allowed rotational and vibrational energy transitions. Infrared photons with energies matching these transitions can be absorbed; the absorption is selective rather than equal at all wavelengths."],
    ["Define the enhanced greenhouse effect.", "The increase in the greenhouse effect caused by human activities."],
    ["Why does the greenhouse effect warm Earth's surface?", "Downward re-emission by the atmosphere reduces the net rate of energy loss from the surface."],
    ["State the equilibrium condition for a planet's average temperature.", "Average absorbed power equals average emitted power."],
    ["How does increasing albedo affect equilibrium temperature?", "It lowers the temperature because less incoming radiation is absorbed."],
    ["How does increasing emissivity affect emitted power at fixed temperature?", "It increases emitted power in direct proportion to emissivity."],
  ]);
  [[400, 500], [720, 800], [250, 1000]].forEach(([actual, black]) =>
    add("B.2 Greenhouse effect", "SL", `A surface radiates ${actual} W m⁻² while a black body at the same temperature radiates ${black} W m⁻².\n(a) Calculate the emissivity of the surface. [2]\n(b) Deduce the factor by which its emitted power per unit area changes if its absolute temperature doubles and emissivity remains constant. [1]`, `(a) e = actual/black = ${sig(actual / black)}. [2]\n(b) Power per unit area is eσT⁴, so it increases by 2⁴ = 16. [1]`));
  [[30, 120], [180, 600], [75, 500]].forEach(([scattered, incident]) =>
    add("B.2 Greenhouse effect", "SL", `A body scatters ${scattered} W from ${incident} W incident power. Calculate its albedo.`, `Albedo = scattered/incident = ${sig(scattered / incident)}.`));
  [1360, 1400, 900].forEach((solarConstant) =>
    add("B.2 Greenhouse effect", "SL", `A planet receives solar constant S = ${solarConstant} W m⁻². Calculate the mean incoming intensity before allowing for albedo.`, `Mean intensity = S/4 = ${sig(solarConstant / 4)} W m⁻².`));
  [[1360, 0.30, 1], [900, 0.20, 0.8], [2200, 0.45, 0.9], [500, 0.10, 1]].forEach(([solarConstant, albedo, emissivity]) => {
    const sigma = 5.67e-8;
    const temperature = Math.pow(solarConstant * (1 - albedo) / (4 * emissivity * sigma), 0.25);
    add("B.2 Greenhouse effect", "SL", `A spherical planet has incident stellar intensity S = ${solarConstant} W m⁻² at its orbital distance, albedo ${albedo} and emissivity ${emissivity}. Model it as having uniform temperature, no internal energy source and no atmosphere. Estimate its equilibrium temperature. Use σ = 5.67 × 10⁻⁸ W m⁻² K⁻⁴.`, `S(1-a)/4 = eσT⁴, so T = ${sig(temperature)} K.`);
  });
  [[340, 0.25], [300, 0.4], [500, 0.1]].forEach(([meanIncoming, albedo]) =>
    add("B.2 Greenhouse effect", "SL", `Mean incident intensity is ${meanIncoming} W m⁻² and albedo is ${albedo}. Calculate absorbed intensity.`, `Absorbed intensity = (1-a)I = ${sig((1 - albedo) * meanIncoming)} W m⁻².`));

  many("B.3 Gas laws", "SL", [
    ["Define pressure.", "Normal force per unit area: P = F/A."],
    ["Define amount of substance in moles using particle number.", "n = N/NA."],
    ["State two assumptions of the kinetic model of an ideal gas.", "For example: molecules have negligible volume compared with the gas volume; intermolecular forces are negligible except during collisions. Other valid assumptions include random motion and elastic collisions."],
    ["A fixed amount of ideal gas is kept at constant temperature. Its volume decreases to one-third of its initial value. Which statement is correct?\nA. Pressure triples and mean molecular kinetic energy triples.\nB. Pressure triples and mean molecular kinetic energy is unchanged.\nC. Pressure is unchanged and mean molecular kinetic energy triples.\nD. Pressure decreases to one-third and mean molecular kinetic energy is unchanged.", "B. PV is constant, so pressure triples. Mean molecular kinetic energy depends only on absolute temperature and is unchanged."],
    ["State both forms of the ideal-gas equation.", "PV = NkBT and PV = nRT."],
    ["Explain gas pressure microscopically.", "Molecules change momentum when colliding with the walls, producing a force per unit area."],
    ["Relate pressure to density and mean square molecular speed.", "P = ρ⟨v²⟩/3."],
    ["State internal energy of a monatomic ideal gas in terms of molecules.", "U = 3NkBT/2."],
    ["State internal energy of a monatomic ideal gas in terms of moles.", "U = 3nRT/2."],
    ["When does a real gas most closely approximate an ideal gas?", "At low density, typically low pressure and high temperature away from condensation."],
    ["How does increasing temperature at constant volume affect pressure?", "Pressure increases because molecules collide more often and with greater momentum change."],
    ["A fixed amount of ideal gas expands isothermally to twice its initial volume. Explain the change in pressure using the molecular model.", "Mean molecular kinetic energy and speed remain unchanged. Collisions per unit wall area become less frequent, so pressure decreases; from PV = constant, the final pressure is half the initial pressure."],
    ["What is shown by an isotherm on a pressure-volume graph?", "States at the same temperature."],
    ["An ideal gas in a rigid sealed container is heated from 20 °C to 40 °C. Explain why its pressure does not double.", "At fixed amount and volume, P is proportional to temperature in kelvin. The ratio is 313.15/293.15 ≈ 1.068, so pressure increases by about 6.8%, rather than doubling."],
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
    add("B.3 Gas laws", "SL", `An ideal gas has density ${density} kg m⁻³ and pressure ${pressure} Pa.\n(a) Determine its root-mean-square molecular speed. [2]\n(b) The absolute temperature is doubled. Deduce the factor by which the rms speed changes. [1]`, `(a) From P = ρ⟨v²⟩/3, vrms = √(3P/ρ) = ${sig(Math.sqrt(3 * pressure / density))} m s⁻¹. [2]\n(b) Mean square speed is proportional to T for a fixed molecular mass, so rms speed increases by √2. [1]`));

  many("B.4 Thermodynamics", "HL", [
    ["State the first law of thermodynamics using the IB sign convention.", "Q = ΔU + W, where Q enters the system and W is work done by the system."],
    ["What is a closed system?", "A system that can exchange energy but not mass with its surroundings."],
    ["What is an isolated system?", "A system that exchanges neither energy nor mass with its surroundings."],
    ["State work done by a gas at constant pressure.", "W = PΔV."],
    ["A gas is compressed. State the sign of W in Q = ΔU + W, where W is work done by the gas.", "W is negative during compression because ΔV is negative. During expansion W is positive."],
    ["State the change in internal energy of a monatomic ideal gas.", "ΔU = 3NkBΔT/2 = 3nRΔT/2."],
    ["A system receives a small reversible transfer of thermal energy δQrev at absolute temperature T. State the associated entropy change.", "dS = δQrev/T. For a finite reversible transfer at constant temperature, ΔS = Qrev/T; if temperature changes, integrate δQrev/T."],
    ["State Boltzmann's entropy equation.", "S = kB ln Ω."],
    ["What is a microstate?", "One microscopic arrangement consistent with the system's macrostate."],
    ["State the second law for an isolated system.", "Its entropy cannot decrease; it increases for an irreversible process."],
    ["Can entropy decrease locally in a non-isolated system?", "Yes, if the surroundings gain at least as much entropy."],
    ["Define an isovolumetric process.", "A constant-volume process, so W = 0."],
    ["A monatomic ideal gas expands at constant pressure 2.0 × 10⁵ Pa from 1.0 × 10⁻³ m³ to 4.0 × 10⁻³ m³.\n(a) Calculate the work done by the gas. [2]\n(b) Use U = 3PV/2 to determine the thermal energy supplied. [2]", "(a) W = PΔV = 600 J. [2]\n(b) ΔU = 3PΔV/2 = 900 J. From Q = ΔU + W, Q = 1500 J. [2]"],
    ["Define an isothermal process.", "A constant-temperature process; ΔU = 0 for an ideal gas."],
    ["Define an adiabatic process.", "A process with Q = 0."],
    ["A monatomic ideal gas undergoes a reversible adiabatic change. State the relation between pressure and volume.", "PV^(5/3) = constant. The process is adiabatic and sufficiently slow for the gas to remain in equilibrium."],
    ["A gas completes a clockwise cycle on a graph of pressure against volume. State the net change in internal energy and explain how the net work done by the gas is found.", "ΔU = 0 because the gas returns to its initial state. Net work done by the gas is positive and equals the area enclosed by the clockwise cycle; an anticlockwise cycle gives negative net work."],
    ["State the maximum Carnot efficiency.", "ηCarnot = 1 - Tc/Th, with temperatures in kelvin."],
  ]);
  [[500, 120], [1000, 250], [-200, 80], [750, -100], [0, 300]].forEach(([heat, work]) =>
    add("B.4 Thermodynamics", "HL", `For a closed monatomic ideal gas, the net thermal energy supplied is Q = ${heat} J and the net work done by the gas is W = ${work} J.\n(a) Calculate its change in internal energy. [2]\n(b) State whether its temperature increases or decreases. [1]`, `(a) Q = ΔU + W, so ΔU = Q − W = ${sig(heat - work)} J. [2]\n(b) Temperature ${heat - work > 0 ? "increases" : "decreases"} because U is proportional to T for a fixed amount of monatomic ideal gas. [1]`));
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
    ["A chemical cell and a solar cell each drive current through a resistor. State the initial energy source in each cell.", "Chemical cell: chemical energy. Solar cell: energy of incident electromagnetic radiation."],
    ["Define direct current.", "A flow of charge in one direction."],
    ["Define current.", "Rate of flow of charge: I = Δq/Δt."],
    ["Define electric potential difference.", "Work done per unit charge: V = W/q."],
    ["Distinguish conductors from insulators using charge carriers.", "Conductors have mobile charge carriers; insulators do not have freely mobile carriers."],
    ["Define the electrical resistance of a component.", "The ratio of the potential difference across the component to the current through it: R = V/I. Unit: Ω."],
    ["State the resistivity relation.", "ρ = RA/L, or R = ρL/A."],
    ["A cell’s terminal potential difference V is measured for different currents I. A best-fit line passes through (0.0 A, 6.0 V) and (2.0 A, 5.0 V). Determine the emf and internal resistance of the cell. [3]", "V = ε − Ir. The vertical intercept gives ε = 6.0 V. [1] Gradient = (5.0 − 6.0)/(2.0 − 0.0) = −0.50 V A⁻¹, [1] so r = 0.50 Ω. [1]"],
    ["Explain why the current in a filament lamp is not proportional to the potential difference across it.", "As current increases the filament temperature rises. Increased lattice vibrations increase scattering of conduction electrons, raising resistance, so I is not proportional to V."],
    ["State three equations for electrical power in a resistor.", "P = IV = I²R = V²/R."],
    ["Two resistors are connected in series to a cell. Explain why the currents through the resistors are equal in steady state.", "Charge is conserved and does not accumulate between the resistors. The same charge therefore passes through each resistor per unit time."],
    ["Two resistors are connected in parallel across a cell. Explain why the potential difference across each resistor is the same.", "Both resistors are connected between the same two circuit nodes. Each therefore has the same difference in electric potential between its ends."],
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
    add("B.5 Current and circuits", "SL", `A cell of emf ${emf} V and internal resistance ${internal} Ω is connected to an external resistor of resistance ${external} Ω.\n(a) Calculate the current. [2]\n(b) Determine the terminal potential difference of the cell. [1]`, `(a) I = ε/(R+r) = ${sig(emf / (external + internal))} A. [2]\n(b) Vterminal = IR = ε − Ir = ${sig(emf * external / (external + internal))} V. [1]`));

  // C. Wave behaviour
  many("C.1 Simple harmonic motion", "SL", [
    ["What condition produces simple harmonic motion?", "Acceleration is proportional to displacement from equilibrium and directed toward equilibrium."],
    ["State the defining equation of SHM.", "a = -ω²x."],
    ["A particle has acceleration a = −ω²x. Explain why this relation leads to oscillations about x = 0.", "The acceleration is directed towards equilibrium and its magnitude is proportional to displacement. It returns the particle towards x = 0; inertia carries the particle through equilibrium and the restoring acceleration then reverses direction."],
    ["Define amplitude.", "Maximum magnitude of displacement from equilibrium."],
    ["Define the period of an oscillator.", "Time for one complete oscillation."],
    ["For a simple harmonic oscillator, acceleration is plotted against displacement. The straight line has gradient −25 s⁻². Determine the period of the oscillator. [2]", "a = −ω²x, so ω² = 25 s⁻² and ω = 5.0 rad s⁻¹. [1] T = 2π/ω = 1.26 s, approximately 1.3 s to two significant figures. [1]"],
    ["Relate period and angular frequency.", "T = 2π/ω."],
    ["State the period of a mass-spring oscillator.", "T = 2π√(m/k)."],
    ["State the small-oscillation period of a simple pendulum.", "T = 2π√(l/g)."],
    ["A mass on a horizontal spring performs undamped simple harmonic motion. State where its kinetic energy is greatest and explain your answer.", "At the equilibrium position. Spring potential energy is at its minimum there, so kinetic energy and speed are greatest while total energy remains constant."],
    ["Where is potential energy greatest during SHM?", "At the extreme positions, where displacement magnitude is greatest."],
    ["How does energy change during one ideal SHM cycle?", "Kinetic and potential energy continually interchange while total energy remains constant."],
  ]);
  [[2], [0.5], [4]].forEach(([period]) =>
    add("C.1 Simple harmonic motion", "SL", `An oscillator has period ${period} s. Calculate angular frequency.`, `ω = 2π/T = ${sig(2 * Math.PI / period)} rad s⁻¹.`));
  [[0.5, 200], [2, 50], [0.25, 800]].forEach(([mass, springConstant]) =>
    add("C.1 Simple harmonic motion", "SL", `A mass ${mass} kg oscillates on an ideal spring of spring constant ${springConstant} N m⁻¹. Damping is negligible.\n(a) Calculate its period. [2]\n(b) The mass is doubled. Deduce the factor by which the period changes. [1]`, `(a) T = 2π√(m/k) = ${sig(2 * Math.PI * Math.sqrt(mass / springConstant))} s. [2]\n(b) T is proportional to √m, so the period increases by √2. [1]`));
  [[1, 9.8], [0.25, 9.8]].forEach(([length, gravity]) =>
    add("C.1 Simple harmonic motion", "SL", `A simple pendulum has length ${length} m where g = ${gravity} m s⁻². Its angular amplitude is small and damping is negligible. Calculate its period.`, `T = 2π√(l/g) = ${sig(2 * Math.PI * Math.sqrt(length / gravity))} s.`));
  many("C.1 Simple harmonic motion", "HL", [
    ["Define phase angle in SHM.", "The angular quantity ωt+ϕ that identifies the oscillator's stage in its cycle."],
    ["State one displacement equation for SHM.", "x = x₀ sin(ωt+ϕ)."],
    ["State the corresponding velocity equation for x = x₀ sin(ωt+ϕ).", "v = ωx₀ cos(ωt+ϕ)."],
    ["An oscillator has angular frequency ω and amplitude x₀. State an expression for its speed at displacement x.", "Speed = ω√(x₀² − x²). Velocity may have either sign: v = ±ω√(x₀² − x²), depending on the direction of motion."],
    ["State total energy in SHM.", "ET = ½mω²x₀²."],
    ["State potential energy in SHM.", "Ep = ½mω²x²."],
    ["A particle in SHM has amplitude x₀. At a particular instant its displacement is x₀/2. Determine the fraction of its total energy that is kinetic. [2]", "Ep/ET = x²/x₀² = 1/4. [1] Since Ek + Ep = ET, Ek/ET = 1 − 1/4 = 3/4. [1]"],
    ["How are displacement and velocity phased in SHM?", "They differ by π/2 rad."],
    ["The amplitude of a simple harmonic oscillator doubles while its mass and angular frequency remain constant. Deduce the factors by which its maximum speed and total energy change.", "vmax = ωx₀, so maximum speed doubles. ET = ½mω²x₀², so total energy increases by a factor of four."],
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
    ["Define the wavelength of a travelling wave.", "The shortest distance, measured along the direction of propagation, between two points that oscillate in phase, for example adjacent crests."],
    ["Define wave frequency.", "The number of complete oscillations passing a point per unit time."],
    ["Define wave period.", "Time for one complete oscillation."],
    ["State the wave equation.", "v = fλ = λ/T."],
    ["What type of mechanical wave is sound in air?", "Longitudinal."],
    ["What oscillates in a sound wave in air?", "Air particles oscillate parallel to the direction of energy transfer."],
    ["What is an electromagnetic wave?", "A transverse oscillation of electric and magnetic fields that can travel through a vacuum."],
    ["Distinguish between the oscillations in a sound wave in air and those in an electromagnetic wave in a vacuum.", "In sound, air particles oscillate parallel to propagation. In an electromagnetic wave, electric and magnetic fields oscillate perpendicular to propagation and to each other; no material medium is required."],
    ["Why can a mechanical wave not travel through a vacuum?", "It requires particles of a medium to transfer the disturbance."],
    ["A small marker floats on water as a wave passes. Describe the distinction between the motion of the marker and the transfer of energy, using an ideal transverse-wave model.", "The marker oscillates about its equilibrium position perpendicular to propagation, with no net displacement after a cycle. Energy is transferred along the wave even though the marker does not travel along with it."],
    ["What does a travelling wave transfer?", "Energy without a resultant transfer of matter."],
    ["Arrange radio, microwave and infrared in order of increasing frequency.", "Radio, microwave, infrared."],
    ["Arrange ultraviolet, X-rays and gamma rays in order of increasing wavelength.", "Gamma rays, X-rays, ultraviolet."],
    ["A wave enters a second medium where its speed is lower. Which quantity remains unchanged at a stationary boundary?\nA. Wavelength\nB. Frequency\nC. Wave speed\nD. Refractive index", "B. The oscillation frequency is fixed by the source. From v = fλ, the wavelength decreases when the wave speed decreases."],
    ["Give the approximate wavelength range of visible light.", "About 400 nm to 700 nm."],
  ]);
  [[2, 3], [50, 0.4], [340, 680], [1500, 500]].forEach(([speed, frequency]) =>
    add("C.2 Wave model", "SL", `A wave travels at ${speed} m s⁻¹ with frequency ${frequency} Hz.\n(a) Calculate its wavelength. [2]\n(b) It enters a second medium where its speed is halved. State the changes in frequency and wavelength. [2]`, `(a) λ = v/f = ${sig(speed / frequency)} m. [2]\n(b) Frequency remains ${frequency} Hz at a stationary boundary; wavelength halves to ${sig(speed / (2 * frequency))} m. [2]`));
  [[0.8, 5], [2.5, 12], [0.03, 2e6], [600, 0.5]].forEach(([wavelength, frequency]) =>
    add("C.2 Wave model", "SL", `A wave has wavelength ${wavelength} m and frequency ${frequency} Hz. Calculate wave speed.`, `v = fλ = ${sig(wavelength * frequency)} m s⁻¹.`));
  [[10], [250], [2e6]].forEach(([frequency]) =>
    add("C.2 Wave model", "SL", `A wave has frequency ${frequency} Hz. Calculate its period.`, `T = 1/f = ${sig(1 / frequency)} s.`));

  many("C.3 Wave phenomena", "SL", [
    ["What is a wavefront?", "A line or surface joining points that are in the same phase."],
    ["What does a ray show?", "The direction of wave propagation and energy transfer, perpendicular to wavefronts."],
    ["State the law of reflection.", "Angle of incidence equals angle of reflection, measured from the normal."],
    ["Describe what happens when a wave crosses obliquely into a medium in which its speed is lower.", "Its speed and wavelength decrease, its frequency remains unchanged, and its direction bends towards the normal. At normal incidence there is no change in direction."],
    ["What remains unchanged when a wave refracts at a stationary boundary?", "Frequency."],
    ["State Snell's law in the form used in the guide.", "n₁/n₂ = sin θ₂/sin θ₁ = v₂/v₁."],
    ["Define the critical angle.", "The incident angle in the higher-index medium that gives a refracted angle of 90°."],
    ["State the two conditions for total internal reflection.", "The wave travels from higher to lower refractive index and incidence exceeds the critical angle."],
    ["When is diffraction most noticeable?", "When aperture or obstacle size is comparable to the wavelength."],
    ["How do wavefronts change after passing through a narrow aperture?", "They spread out and become more curved."],
    ["State the principle of superposition.", "Resultant displacement is the vector sum of individual displacements."],
    ["What makes two sources coherent?", "They have the same frequency and a constant phase difference."],
    ["Two coherent sources emit in phase. State the path-difference condition for constructive interference.", "Path difference = nλ, where n is an integer. The in-phase source condition is essential; an initial source phase difference changes the condition."],
    ["Two coherent sources emit in phase. State the path-difference condition for destructive interference.", "Path difference = (n + ½)λ, where n is an integer. Zero resultant amplitude additionally requires equal amplitudes at the point."],
    ["Monochromatic light is incident on two narrow slits separated by d. A screen is a distance D from the slits, with D much greater than d. State the small-angle expression for the fringe spacing s.", "s = λD/d, where λ is the wavelength. The fringes considered must be sufficiently close to the central maximum for the small-angle approximation."],
    ["The fringe spacing in a double-slit experiment is s. The wavelength doubles and the slit separation is halved, while the screen distance is unchanged. Deduce the new fringe spacing. [2]", "s = λD/d. Doubling λ multiplies s by 2 and halving d multiplies it by another 2. The new spacing is 4s. [2]"],
    ["How does increasing wavelength affect diffraction and double-slit spacing?", "Diffraction increases and double-slit fringes become farther apart."],
  ]);
  [[1, 30, 1.5, 45], [1.5, 20, 1, 0], [1.33, 40, 1.5, 0]].forEach(([n1, theta1, n2]) => {
    const sine = n1 * Math.sin(theta1 * Math.PI / 180) / n2;
    add("C.3 Wave phenomena", "SL", `Light travels from a material of refractive index n₁=${n1} into one of refractive index n₂=${n2}. The angle of incidence to the normal is θ₁=${theta1}°. Calculate the angle of refraction, measured from the normal.`, `sin θ₂ = n₁sinθ₁/n₂, so θ₂ = ${sig(Math.asin(sine) * 180 / Math.PI)}°.`);
  });
  [1.5, 1.33, 2.4].forEach((index) =>
    add("C.3 Wave phenomena", "SL", `Calculate the critical angle for light travelling from refractive index ${index} into air.`, `c = sin⁻¹(1/n) = ${sig(Math.asin(1 / index) * 180 / Math.PI)}°.`));
  [[500e-9, 2, 0.5e-3], [650e-9, 1.5, 0.3e-3], [450e-9, 3, 0.75e-3]].forEach(([wavelength, distance, separation]) =>
    add("C.3 Wave phenomena", "SL", `Monochromatic light of wavelength ${wavelength} m illuminates two narrow slits separated by ${separation} m. A screen is ${distance} m away. Use the small-angle approximation.\n(a) Calculate the fringe spacing. [2]\n(b) The slit separation doubles. Deduce the new fringe spacing. [1]`, `(a) s = λD/d = ${sig(wavelength * distance / separation)} m. [2]\n(b) Fringe spacing is inversely proportional to slit separation, so it halves to ${sig(wavelength * distance / (2 * separation))} m. [1]`));
  [[2.5, 0.5], [3.5, 0.75], [5.5, 1.5]].forEach(([pathInWavelengths, offset]) =>
    add("C.3 Wave phenomena", "SL", `Two coherent sources emit in phase. At a point the path difference is ${pathInWavelengths}λ. Determine whether interference is constructive or destructive and explain your answer.`, `${Number.isInteger(pathInWavelengths) ? "Constructive" : "Destructive"}; the path difference is ${Number.isInteger(pathInWavelengths) ? "an integer" : "a half-integer"} multiple of λ.`));
  many("C.3 Wave phenomena", "HL", [
    ["Describe the intensity pattern from a single narrow slit.", "A broad bright central maximum with weaker, narrower side maxima separated by minima."],
    ["Monochromatic light of wavelength λ is incident normally on a slit of width b. State the condition for the first diffraction minimum and its small-angle approximation.", "b sin θ = λ. For θ small and measured in radians, θ ≈ λ/b. θ is measured from the central axis."],
    ["A monochromatic beam is incident normally on a slit. The slit width is halved without changing the wavelength. Deduce the change in the angular width of the central diffraction maximum for small angles. [2]", "The first minima occur at θ ≈ ±λ/b. The full angular width is approximately 2λ/b. [1] Halving b doubles this width. [1]"],
    ["How does increasing wavelength affect a single-slit pattern?", "The minima move farther apart and the central maximum widens."],
    ["How does the single-slit pattern affect a double-slit pattern?", "It forms an envelope that modulates the double-slit fringe intensities."],
    ["State the diffraction-grating equation.", "nλ = d sin θ."],
    ["The number of illuminated slits of a grating increases while slit spacing and incident intensity per slit remain constant. Describe the change in the principal maxima.", "They become narrower and their peak intensity increases. Their angular positions remain unchanged because nλ = d sin θ is unchanged."],
    ["How does a grating separate white light?", "Different wavelengths have maxima at different angles."],
    ["Which grating order is undeviated for all wavelengths?", "The zero order."],
    ["Why can some high grating orders not occur?", "They would require sin θ > 1."],
  ]);
  [[500e-9, 0.1e-3], [600e-9, 0.2e-3], [450e-9, 0.05e-3], [700e-9, 0.15e-3]].forEach(([wavelength, width]) =>
    add("C.3 Wave phenomena", "HL", `A slit has width ${width} m and light wavelength ${wavelength} m. Estimate the first-minimum angle in radians.`, `θ ≈ λ/b = ${sig(wavelength / width)} rad.`));
  [[500e-9, 2e-6, 1], [600e-9, 3e-6, 2], [450e-9, 1.5e-6, 1], [650e-9, 4e-6, 3]].forEach(([wavelength, spacing, order]) => {
    const sine = order * wavelength / spacing;
    add("C.3 Wave phenomena", "HL", `Monochromatic light of wavelength ${wavelength} m is incident normally on a grating of slit spacing ${spacing} m. Calculate the angle of the order-${order} principal maximum to the normal.`, `sin θ = nλ/d, so θ = ${sig(Math.asin(sine) * 180 / Math.PI)}°.`);
  });
  [[600e3, 500e-9], [1200e3, 650e-9], [300e3, 450e-9], [500e3, 550e-9], [800e3, 400e-9]].forEach(([linesPerMetre, wavelength]) => {
    const spacing = 1 / linesPerMetre;
    const maxOrder = Math.floor(spacing / wavelength);
    add("C.3 Wave phenomena", "HL", `Light of wavelength ${wavelength} m is incident normally on a grating with ${linesPerMetre} lines m⁻¹. Determine the highest possible diffraction order.`, `d = 1/N and n≤d/λ, so highest order = ${maxOrder}.`);
  });

  many("C.4 Standing waves and resonance", "SL", [
    ["How is a standing wave formed?", "By superposition of two identical waves travelling in opposite directions."],
    ["Define a node.", "A position of zero displacement amplitude."],
    ["Define an antinode.", "A position of maximum displacement amplitude."],
    ["A standing wave is formed on a string. Adjacent displacement nodes are 0.30 m apart and the frequency is 50 Hz. Determine the speed of the travelling waves that form the standing wave. [2]", "Adjacent nodes are separated by λ/2, so λ = 0.60 m. [1] v = fλ = 30 m s⁻¹. [1]"],
    ["What is the separation from a node to an adjacent antinode?", "λ/4."],
    ["Two points between the same adjacent nodes of a standing wave have different displacement amplitudes. State their phase difference.", "Zero: the points oscillate in phase even though their amplitudes can differ. The nodes themselves do not oscillate and have no defined oscillation phase."],
    ["How do points in adjacent loops oscillate?", "In antiphase, a phase difference of π rad."],
    ["What boundary condition occurs at a fixed end of a string?", "A displacement node."],
    ["What boundary condition occurs at a free end of a string?", "A displacement antinode."],
    ["What air-displacement condition occurs at an open pipe end?", "A displacement antinode."],
    ["A pipe closed at one end and open at the other has a fundamental frequency of 120 Hz. Neglect end corrections. State the next two resonance frequencies and explain why 240 Hz is not a resonance. [3]", "The next resonances are 360 Hz and 600 Hz. [1] Only odd harmonics occur because the closed end is a displacement node and the open end a displacement antinode. [1] The second harmonic at 240 Hz cannot satisfy both boundary conditions. [1]"],
    ["A string fixed at both ends vibrates in its fundamental mode. State the number of displacement nodes and antinodes on the string.", "Two nodes, one at each end, and one antinode at the centre. The fundamental is the first harmonic."],
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
    add("C.4 Standing waves and resonance", "SL", `A pipe open at both ends has length L=${length} m. The sound speed is ${speed} m s⁻¹. Neglect end corrections. Calculate the frequency of harmonic ${harmonic}.`, `fn = nv/(2L) = ${sig(harmonic * speed / (2 * length))} Hz.`));
  [[0.85, 340, 1], [0.5, 330, 3], [1.2, 360, 5], [0.25, 340, 7]].forEach(([length, speed, harmonic]) =>
    add("C.4 Standing waves and resonance", "SL", `A pipe closed at one end and open at the other has length L=${length} m. Neglect end corrections. Calculate the frequency of harmonic ${harmonic}, using v=${speed} m s⁻¹.`, `fn = nv/(4L) for odd n = ${sig(harmonic * speed / (4 * length))} Hz.`));

  many("C.5 Doppler effect", "SL", [
    ["Define the Doppler effect.", "A change in observed frequency caused by relative motion between source and observer."],
    ["What happens to observed sound frequency when source and observer approach?", "It increases."],
    ["A siren approaches a stationary observer and then moves away. Its emitted frequency and speed remain constant. Describe the frequency heard before and after it passes. [2]", "On approach the observer hears a frequency higher than the emitted frequency. [1] After passage the observer hears a lower frequency than the emitted frequency; there is a drop as the radial motion changes from approach to recession. [1]"],
    ["Does motion of a sound source change sound speed in the medium?", "No; speed is set by the medium."],
    ["What is redshift?", "Observed electromagnetic wavelength is increased compared with the source wavelength."],
    ["A stellar absorption line is observed at a shorter wavelength than its laboratory value. State what this indicates about the star’s radial motion relative to the observer, assuming the shift is due to motion.", "The star is approaching the observer along the line of sight."],
    ["State the approximate relation between the fractional wavelength shift and radial speed v of a receding source when v is much less than c.", "Δλ/λ₀ ≈ v/c, with Δλ = λobserved − λ₀. The frequency change has the opposite sign: Δf/f₀ ≈ −v/c."],
    ["How do spectral-line shifts reveal stellar motion?", "Their fractional wavelength changes give radial speed and the shift direction gives approach or recession."],
    ["Why is the low-speed light relation only approximate?", "It assumes relative speed is much smaller than c."],
    ["Give two applications of the Doppler effect.", "For example medical ultrasound, radar speed measurement or stellar radial velocity."],
  ]);
  [[500e-9, 0.001], [650e-9, 0.002], [450e-9, 0.0005], [700e-9, 0.003], [550e-9, 0.0015], [400e-9, 0.0008]].forEach(([wavelength, fraction]) =>
    add("C.5 Doppler effect", "SL", `A stellar spectral line has laboratory wavelength ${wavelength} m. The observed fractional wavelength shift Δλ/λ₀ is +${fraction}. Assume the shift is entirely due to radial motion and v is much less than c.\n(a) Estimate the radial speed using c=3.00×10⁸ m s⁻¹. [2]\n(b) State whether the star is approaching or receding. [1]`, `(a) v ≈ cΔλ/λ₀ = ${sig(3e8 * fraction)} m s⁻¹. [2]\n(b) The wavelength shift is positive, so the star is receding. [1]`));
  many("C.5 Doppler effect", "HL", [
    ["State the moving-source Doppler equation for a stationary observer.", "f′ = fv/(v±us), using minus for approach and plus for recession."],
    ["State the moving-observer Doppler equation for a stationary source.", "f′ = f(v±uo)/v, using plus for approach and minus for recession."],
    ["Why are the source and observer equations for sound different?", "Source motion changes wavelength in the medium; observer motion changes the rate at which wavefronts are encountered."],
    ["A stationary listener hears a moving siren. Explain why the wavelength in front of the siren is shorter than the wavelength behind it.", "During each emission period the source moves towards the wavefronts in front and away from those behind. The forward spacing becomes (v − us)/f and the rear spacing becomes (v + us)/f, while the sound speed in the medium is unchanged."],
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
    ["Two small masses are separated by distance r. Both masses and their separation are doubled. Deduce the factor by which the gravitational force changes. [2]", "F = Gm₁m₂/r². The mass product increases by 4 and r² also increases by 4, so the force is unchanged. [2]"],
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
    ["Two planets move in circular orbits about the same star. The radius of the second orbit is four times that of the first. Deduce the ratio of their orbital periods.", "Kepler’s third law gives T₂/T₁ = (r₂/r₁)^(3/2) = 4^(3/2) = 8."],
  ]);
  [[5e24, 6e24, 4e7], [7e22, 6e24, 3.8e8], [2e30, 6e24, 1.5e11], [8e10, 3e5, 2e3]].forEach(([m1, m2, radius]) =>
    add("D.1 Gravitational fields", "SL", `Two point masses of ${m1.toExponential(1)} kg and ${m2.toExponential(1)} kg are separated by ${radius.toExponential(1)} m. Calculate gravitational force using G=6.67×10⁻¹¹ N m² kg⁻².`, `F = Gm₁m₂/r² = ${sig(6.67e-11 * m1 * m2 / (radius * radius))} N.`));
  [[6e24, 6.4e6], [7.3e22, 1.74e6], [2e30, 7e8]].forEach(([mass, radius]) =>
    add("D.1 Gravitational fields", "SL", `Calculate gravitational field strength at r=${radius.toExponential(2)} m from mass ${mass.toExponential(2)} kg. Use G=6.67×10⁻¹¹ N m² kg⁻².`, `g = GM/r² = ${sig(6.67e-11 * mass / (radius * radius))} N kg⁻¹.`));
  [1.5, 2, 4].forEach((radiusFactor) =>
    add("D.1 Gravitational fields", "SL", `Two small satellites move in circular orbits about the same planet. The second orbital radius is ${radiusFactor} times the first. Deduce the ratio T₂/T₁ of their orbital periods.`, `T₂/T₁ = (r₂/r₁)^(3/2) = ${sig(Math.pow(radiusFactor, 1.5))}.`));
  many("D.1 Gravitational fields", "HL", [
    ["Define gravitational potential energy of a system.", "The work done to assemble the system from components initially at infinite separation."],
    ["State gravitational potential energy for two point masses.", "Ep = -Gm₁m₂/r."],
    ["Define gravitational potential at a point.", "Work done per unit mass to bring a test mass from infinity to that point."],
    ["State gravitational potential outside a spherical mass.", "Vg = -GM/r."],
    ["Why are gravitational potential and potential energy negative?", "Zero is defined at infinity and energy must be supplied to separate attracting masses to infinity."],
    ["Along a radial direction, a gravitational-potential curve has tangent gradient +4.0 J kg⁻¹ m⁻¹ at a point. Determine the radial gravitational field component and state its direction. [2]", "gr = −dVg/dr = −4.0 N kg⁻¹. [1] The negative sign means inward, opposite to increasing radial distance. [1]"],
    ["A mass m is moved slowly between two points whose gravitational potential difference is ΔVg. State the work done by an external agent and by the gravitational field.", "For no change in kinetic energy, Wexternal = mΔVg. Work done by the gravitational field is Wfield = −mΔVg."],
    ["Define a gravitational equipotential surface.", "A surface on which gravitational potential is constant."],
    ["How do equipotentials meet gravitational field lines?", "At right angles."],
    ["How much work is done moving a mass along an equipotential?", "Zero."],
    ["State escape speed from radius r.", "vesc = √(2GM/r)."],
    ["State circular orbital speed at radius r.", "vorb = √(GM/r)."],
    ["Compare escape and circular orbital speed at the same radius.", "vesc = √2 vorb."],
    ["How does a small atmospheric drag force affect a low satellite orbit?", "Mechanical energy and orbital height decrease while orbital speed increases as it moves to a lower circular orbit."],
    ["What happens to gravitational potential as r approaches infinity?", "It approaches zero from negative values."],
    ["Two equal masses are fixed on a line. At the midpoint, their resultant gravitational field is zero. Explain why their total gravitational potential is not zero.", "The two field contributions have equal magnitudes and opposite directions, so cancel as vectors. Each potential contribution is negative when zero is at infinity; the scalar potentials add to a non-zero negative value."],
  ]);
  [[6e24, 6.4e6], [7.3e22, 1.74e6], [2e30, 1.5e11], [5e23, 4e6]].forEach(([mass, radius]) =>
    add("D.1 Gravitational fields", "HL", `Calculate gravitational potential at r=${radius.toExponential(2)} m from mass ${mass.toExponential(2)} kg. Use G=6.67×10⁻¹¹ N m² kg⁻².`, `Vg = -GM/r = ${sig(-6.67e-11 * mass / radius)} J kg⁻¹.`));
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
    ["State Coulomb’s law for two point charges in a vacuum.", "The force magnitude is F = |q₁q₂|/(4πε₀r²) = k|q₁q₂|/r² and acts along their line of separation. Like charges repel and unlike charges attract."],
    ["State conservation of electric charge.", "Total charge of an isolated system remains constant."],
    ["What did Millikan's oil-drop experiment show?", "Electric charge is quantized in integer multiples of the elementary charge."],
    ["How can friction transfer charge?", "Electrons move from one material to the other; charge is not created."],
    ["Describe charging by contact.", "Charge transfers when a charged body touches another body."],
    ["Describe electrostatic induction.", "A nearby charge separates charges in a conductor without direct contact."],
    ["A negatively charged rod is held near an initially neutral insulated metal sphere. The sphere is briefly earthed, the earth connection is removed, and then the rod is removed. Explain the final charge of the sphere.", "The rod repels electrons from the sphere through the earth connection. Removing the earth connection traps an electron deficit. After the rod is removed, the sphere remains positively charged."],
    ["Define electric field strength.", "Force per unit positive test charge: E = F/q."],
    ["What direction does an electric field line show?", "The force direction on a positive test charge."],
    ["A point charge produces electric field strength E at distance r. Which is the field strength at distance 3r?\nA. 9E\nB. 3E\nC. E/3\nD. E/9", "D. E = k|Q|/r², so tripling the distance reduces the field strength by a factor of nine."],
    ["In which direction do electric field lines point around a positive point charge?", "Radially outward."],
    ["In which direction do electric field lines point around a negative point charge?", "Radially inward."],
    ["Two large parallel plates have potential difference V and separation d. State the magnitude and direction of the electric field well away from their edges.", "E = V/d. The field points from the positive plate towards the negative plate. Edge effects are neglected."],
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
    add("D.2 Electric and magnetic fields", "SL", `At point P, two electric fields act along the x-axis. Their signed components are ${sig(e1)} N C⁻¹ and ${sig(e2)} N C⁻¹, with positive values directed to the right. Calculate the resultant field component and state its direction.`, `Fields add algebraically: E = ${sig(Number(sig(e1)) + Number(sig(e2)))} N C⁻¹, directed ${e1 + e2 >= 0 ? "right" : "left"}.`);
  });
  many("D.2 Electric and magnetic fields", "HL", [
    ["Define electric potential energy of two charges.", "The work done to assemble the charges from infinite separation."],
    ["State electric potential energy for two point charges.", "Ep = kq₁q₂/r."],
    ["Define electric potential.", "Work done per unit charge to bring a positive test charge from infinity."],
    ["State electric potential due to a point charge.", "Ve = kQ/r."],
    ["Where is zero electric potential defined for isolated point charges?", "At infinity."],
    ["The electric potential is V(x) = (100 − 20x) V, where x is measured in metres. Determine the electric field component Ex. [2]", "dV/dx = −20 V m⁻¹. [1] Ex = −dV/dx = +20 V m⁻¹, directed along positive x. [1]"],
    ["A charge q moves through an electric potential change ΔVe. State the change in its potential energy and the work done by the electric field.", "ΔEp = qΔVe. Work done by the electric field is Wfield = −qΔVe. An external agent moving it with unchanged kinetic energy does Wexternal = qΔVe."],
    ["Define an electric equipotential surface.", "A surface on which electric potential is constant."],
    ["How do electric field lines meet equipotential surfaces?", "At right angles."],
    ["How much work is done moving charge along an equipotential?", "Zero."],
    ["What is electric potential inside a charged conducting sphere in electrostatic equilibrium?", "Constant and equal to the surface potential."],
    ["A hollow conducting sphere is in electrostatic equilibrium and its cavity contains no charge. State the electric field inside the conducting material and inside the cavity.", "The electric field is zero in both regions. The empty-cavity condition is needed; a charge inside the cavity would produce a field there."],
    ["Define one electronvolt and state its value in joules.", "One electronvolt is the energy gained by a particle of charge magnitude e when accelerated through a potential difference of 1 V. 1 eV = 1.60 × 10⁻¹⁹ J. The unit can be used for any energy, not only energies of electrons."],
    ["Two point charges, +Q and −Q, are fixed equal distances from a midpoint. Explain why the potential can be zero there while the electric field is non-zero.", "The scalar potentials +kQ/r and −kQ/r cancel. Both electric fields point from the positive charge towards the negative charge at the midpoint, so the vector field contributions add."],
  ]);
  [[2e-6, 0.3], [-4e-6, 0.2], [8e-9, 0.05], [1.5e-6, 0.8]].forEach(([charge, radius]) =>
    add("D.2 Electric and magnetic fields", "HL", `Calculate electric potential ${radius} m from charge ${charge} C using k=8.99×10⁹ N m² C⁻².`, `Ve = kQ/r = ${sig(8.99e9 * charge / radius)} V.`));
  [[2e-6, 3e-6, 0.2], [-4e-6, 5e-6, 0.3], [8e-9, 2e-9, 0.05]].forEach(([q1, q2, radius]) =>
    add("D.2 Electric and magnetic fields", "HL", `Charges ${q1} C and ${q2} C are ${radius} m apart. Calculate electric potential energy.`, `Ep = kq₁q₂/r = ${sig(8.99e9 * q1 * q2 / radius)} J.`));
  [[2e-6, 120], [-3e-6, 500], [1.6e-19, 2500]].forEach(([charge, change]) =>
    add("D.2 Electric and magnetic fields", "HL", `Charge ${charge} C moves through potential change ${change} V. Calculate the change in electric potential energy.`, `ΔEp = qΔV = ${sig(charge * change)} J.`));
  [[1200, 0.02], [-600, 0.05]].forEach(([change, distance]) =>
    add("D.2 Electric and magnetic fields", "HL", `The electric potential varies linearly with x, changing by ΔV = ${change} V over Δx = ${distance} m. Calculate the electric-field component Ex.`, `E = -ΔV/Δr = ${sig(-change / distance)} V m⁻¹.`));

  many("D.3 Motion in electromagnetic fields", "SL", [
    ["Describe the motion of a positive charge released in a uniform electric field.", "It accelerates in the field direction."],
    ["How does a negative charge accelerate in a uniform electric field?", "Opposite to the field direction."],
    ["State the magnitude of the magnetic force on a particle with charge q moving at speed v at angle θ to a uniform magnetic field B.", "F = |q|vB sin θ. The force is perpendicular to both velocity and field; its sense reverses if the sign of charge reverses."],
    ["A positively charged particle enters a uniform magnetic field. Its velocity is to the right and the field is into the page. State the initial direction of the magnetic force. [1]", "Upwards on the page, from the right-hand rule for q(v × B). [1]"],
    ["When is magnetic force on a moving charge zero?", "When velocity is parallel or antiparallel to the field."],
    ["What path follows when a charged particle enters a uniform magnetic field perpendicular to it?", "A circular path if no other force acts."],
    ["Why does a magnetic field not change a particle's kinetic energy?", "The force is perpendicular to velocity and does no work."],
    ["How does reversing the sign of charge affect magnetic deflection?", "It reverses the force and curvature direction."],
    ["Two particles have the same charge magnitude and travel perpendicular to the same uniform magnetic field. One has twice the momentum of the other. Deduce the ratio of their path radii.", "r = p/(|q|B), so the particle with twice the momentum has twice the radius."],
    ["State the force on a current-carrying conductor in a magnetic field.", "F = BIL sin θ."],
    ["What is the force between parallel wires carrying current in the same direction?", "Attractive."],
    ["What is the force between parallel wires carrying current in opposite directions?", "Repulsive."],
    ["State the force per unit length between parallel wires.", "F/L = μ₀I₁I₂/(2πr)."],
    ["A charged particle passes through perpendicular uniform electric and magnetic fields. Its velocity is perpendicular to both fields and the electric and magnetic forces oppose each other. Deduce the speed for no deflection.", "For no deflection, |q|E = |q|vB, so v = E/B. The force directions must oppose; perpendicular fields alone do not guarantee this."],
    ["How can circular motion in B determine charge-to-mass ratio?", "Using qvB = mv²/r, so q/m = v/(Br)."],
    ["A non-relativistic charged particle enters a uniform electric field with initial velocity perpendicular to the field. Other forces are negligible. Describe and explain its path.", "The field produces constant acceleration along the field for a positive charge and opposite the field for a negative charge. The perpendicular velocity component remains constant, so the path is parabolic."],
  ]);
  [[1.6e-19, 2e6, 0.5, 90], [3.2e-19, 5e5, 0.2, 30], [2e-6, 12, 0.04, 90], [5e-9, 3e4, 0.8, 60]].forEach(([charge, speed, field, angle]) =>
    add("D.3 Motion in electromagnetic fields", "SL", `A charge of magnitude ${charge} C moves at ${speed} m s⁻¹ through B=${field} T at ${angle}°. Calculate magnetic force magnitude.`, `F = qvB sin θ = ${sig(charge * speed * field * Math.sin(angle * Math.PI / 180))} N.`));
  [[0.5, 3, 0.2, 90], [1.2, 5, 0.4, 30], [0.08, 12, 1.5, 60], [2, 0.6, 0.05, 90]].forEach(([field, current, length, angle]) =>
    add("D.3 Motion in electromagnetic fields", "SL", `A straight wire segment of length ${length} m carries current ${current} A in a uniform field B=${field} T. The angle between the conventional-current direction and the field is ${angle}°. Calculate the magnitude of the magnetic force on the segment.`, `F = BIL sin θ = ${sig(field * current * length * Math.sin(angle * Math.PI / 180))} N.`));
  [[1.6e-19, 500], [3.2e-19, 1200], [2e-6, 9]].forEach(([charge, voltage]) =>
    add("D.3 Motion in electromagnetic fields", "SL", `A charge of magnitude ${charge} C is accelerated from rest through ${voltage} V. Calculate kinetic energy gained.`, `ΔEk = qV = ${sig(charge * voltage)} J.`));
  [[9.11e-31, 2e6, 1.6e-19, 0.2], [1.67e-27, 3e5, 1.6e-19, 0.5], [6.64e-27, 1e5, 3.2e-19, 0.8], [2e-26, 4e4, 1.6e-19, 0.3]].forEach(([mass, speed, charge, field]) =>
    add("D.3 Motion in electromagnetic fields", "SL", `A non-relativistic particle has mass ${mass.toExponential(2)} kg, speed ${speed} m s⁻¹ and charge magnitude ${charge} C. It enters a uniform magnetic field B=${field} T perpendicular to the field. No other forces act.\n(a) Determine the radius of its path. [2]\n(b) Explain why its speed remains constant. [2]`, `(a) Magnetic force provides centripetal force: |q|vB = mv²/r, so r = mv/(|q|B) = ${sig(mass * speed / (charge * field))} m. [2]\n(b) The magnetic force is perpendicular to velocity and does no work. Kinetic energy, and therefore speed, remains constant. [2]`));
  [[3, 4, 0.1], [10, 2, 0.05], [5, 5, 0.2]].forEach(([i1, i2, separation]) =>
    add("D.3 Motion in electromagnetic fields", "SL", `Parallel wires carry ${i1} A and ${i2} A, separated by ${separation} m. Calculate force per unit length using μ₀=4π×10⁻⁷ N A⁻².`, `F/L = μ₀I₁I₂/(2πr) = ${sig(2e-7 * i1 * i2 / separation)} N m⁻¹.`));

  many("D.4 Induction", "HL", [
    ["Define the magnetic flux through a flat surface in a uniform magnetic field.", "Φ = BA cos θ, where A is surface area and θ is the angle between B and the surface normal. The unit is the weber, Wb."],
    ["When is magnetic flux through a flat loop maximum?", "When the magnetic field is parallel to the area normal."],
    ["When is magnetic flux through a flat loop zero?", "When the magnetic field lies in the plane of the loop."],
    ["State Faraday’s law of electromagnetic induction.", "The induced emf equals the negative rate of change of magnetic flux linkage: ε = −d(NΦ)/dt. Over an interval the average emf is −Δ(NΦ)/Δt; the sign is consistent with Lenz’s law."],
    ["State Lenz's law.", "The induced emf drives a current whose field opposes the change in flux that produced it."],
    ["How does Lenz's law express energy conservation?", "If the induced effect reinforced the change, energy would be created without work."],
    ["A straight rod of length L moves at speed v in a uniform magnetic field B. The rod, its velocity and the field are mutually perpendicular. State the magnitude of the induced emf between its ends.", "ε = BvL. Both the rod and its velocity must have the stated orientation; velocity perpendicular to B alone is insufficient."],
    ["What is required for an emf to be induced in a circuit?", "A change in magnetic flux linkage."],
    ["A flat coil rotates at constant angular speed about an axis in its plane perpendicular to a uniform magnetic field. Explain why the induced emf varies sinusoidally.", "The flux linkage is NBA cos(ωt), taking t = 0 at maximum flux. Faraday’s law gives ε = NBAω sin(ωt), so the emf is sinusoidal."],
    ["A flat coil rotates in a uniform magnetic field. At an instant its normal is parallel to the field. State whether the flux magnitude and induced emf magnitude are maximum or zero at that instant. [2]", "Flux magnitude is maximum because |Φ| = BA. [1] Induced emf is zero because the instantaneous rate of change of flux is zero at the flux maximum. [1]"],
    ["How does increasing the number of coil turns affect induced emf?", "It increases emf in direct proportion to N."],
    ["What is self-induction?", "A changing current in a circuit changes its own flux and induces an emf opposing that current change."],
    ["What happens to induced current direction when the flux change reverses?", "The induced current direction reverses."],
    ["A closed rigid loop translates entirely within a uniform, steady magnetic field without changing orientation. Explain why the net induced emf around the loop is zero.", "The magnetic flux through the loop is constant. Faraday’s law therefore gives zero net emf around the loop. Motional emfs in opposite sides cancel."],
  ]);
  [[0.5, 0.02, 0], [1.2, 0.005, 60], [0.08, 0.4, 30], [2, 0.01, 90]].forEach(([field, area, angle]) =>
    add("D.4 Induction", "HL", `A loop of area ${area} m² is in B=${field} T with field at ${angle}° to its normal. Calculate magnetic flux.`, `Φ = BA cos θ = ${sig(field * area * cosDegrees(angle))} Wb.`));
  [[200, 0.04, 0.01], [50, -0.2, 0.5], [1000, 0.002, 0.02], [20, 0.8, 2], [500, -0.03, 0.1]].forEach(([turns, change, time]) =>
    add("D.4 Induction", "HL", `The magnetic flux through each turn of a ${turns}-turn coil changes by ${change} Wb in ${time} s.\n(a) Calculate the magnitude of the average induced emf. [2]\n(b) The same flux change occurs in half the time. Deduce the change in the average emf magnitude. [1]`, `(a) |εavg| = N|ΔΦ|/Δt = ${sig(turns * Math.abs(change) / time)} V. [2]\n(b) The rate of change of flux doubles, so the average emf magnitude doubles. [1]`));
  [[0.5, 3, 0.2], [1.2, 5, 0.4], [0.08, 12, 1.5], [2, 0.6, 0.05]].forEach(([field, speed, length]) =>
    add("D.4 Induction", "HL", `A straight conducting rod of length ${length} m moves at ${speed} m s⁻¹ through a uniform magnetic field B=${field} T. The rod, its velocity and the field are mutually perpendicular. Calculate the magnitude of the induced emf between its ends.`, `ε = BvL = ${sig(field * speed * length)} V.`));
  [[100, 0.02, 0.5, 5], [50, 0.01, 1.2, 10], [200, 0.005, 0.3, 20], [500, 0.002, 0.8, 2]].forEach(([turns, area, field, frequency]) =>
    add("D.4 Induction", "HL", `A ${turns}-turn flat coil of area ${area} m² rotates at frequency ${frequency} Hz about an axis in its plane and perpendicular to a uniform field B=${field} T. Determine the peak induced emf.`, `ε₀ = NBAω = ${sig(turns * field * area * 2 * Math.PI * frequency)} V.`));
  [[50, 0.01, 0.4], [200, 0.005, 0.2], [100, 0.02, 0.1]].forEach(([turns, area, field]) =>
    add("D.4 Induction", "HL", `A ${turns}-turn flat coil of area ${area} m² is turned through 180° in a uniform field B=${field} T, from its normal parallel to the field to antiparallel. Calculate the magnitude of the change in magnetic flux linkage.`, `|Δ(NΦ)| = 2NBA = ${sig(2 * turns * field * area)} Wb. (The turn count is dimensionless.)`));

  // E. Nuclear and quantum physics
  many("E.1 Structure of the atom", "SL", [
    ["What did the Geiger-Marsden-Rutherford experiment investigate?", "The scattering of alpha particles by thin metal foil."],
    ["What did most alpha particles passing straight through the foil show?", "Atoms are mostly empty space."],
    ["What did rare large-angle alpha deflections show?", "Positive charge and most atomic mass are concentrated in a tiny nucleus."],
    ["Why did Rutherford's nuclear model replace the plum-pudding model?", "The plum-pudding model could not explain the observed large-angle deflections."],
    ["A nucleus is written as X with superscript A and subscript Z to the left of the symbol. State the meaning of A and Z and give its neutron number.", "A is the nucleon number and Z is the proton number. The neutron number is A − Z."],
    ["How is neutron number found from nuclear notation?", "N = A-Z."],
    ["What makes two nuclei isotopes of the same element?", "They have the same proton number but different neutron numbers."],
    ["What is an emission spectrum?", "Discrete wavelengths emitted when atoms make downward energy transitions."],
    ["What is an absorption spectrum?", "Dark lines at wavelengths absorbed when atoms make upward energy transitions."],
    ["Explain why the emission spectrum of an isolated gas consists of discrete lines rather than a continuous range of wavelengths.", "Atoms have discrete allowed electron energy levels. Each downward transition emits a photon of energy hf equal to an allowed level difference, so only particular frequencies and wavelengths occur."],
    ["What is a photon?", "A quantum of electromagnetic radiation."],
    ["State the photon-energy equation.", "E = hf."],
    ["An electron drops from energy −2.0 eV to −5.0 eV. Determine the energy of the emitted photon. [2]", "The atom loses 3.0 eV, so the photon carries positive energy 3.0 eV. [1] Using 1 eV = 1.60 × 10⁻¹⁹ J gives 4.8 × 10⁻¹⁹ J. [1]"],
    ["Why does each element have a characteristic line spectrum?", "Each element has a unique set of allowed electron energy levels."],
    ["How can spectra reveal chemical composition?", "Observed line wavelengths are matched to characteristic lines of known elements."],
  ]);
  [[5e14], [6.5e14], [1.2e15], [4e14]].forEach(([frequency]) =>
    add("E.1 Structure of the atom", "SL", `Calculate photon energy for frequency ${frequency.toExponential(2)} Hz using h=6.63×10⁻³⁴ J s.`, `E = hf = ${sig(6.63e-34 * frequency)} J.`));
  [[24, 12], [56, 26], [238, 92], [14, 6]].forEach(([massNumber, protonNumber]) =>
    add("E.1 Structure of the atom", "SL", `A nucleus has A=${massNumber} and Z=${protonNumber}. Calculate its neutron number.`, `N = A-Z = ${massNumber - protonNumber}.`));
  [[3.0e-19], [2.5e-18], [1.8e-19], [4.2e-19]].forEach(([energy]) =>
    add("E.1 Structure of the atom", "SL", `An atom emits a photon when an electron moves between two levels separated by ${energy.toExponential(1)} J.\n(a) Calculate the photon wavelength, using h=6.63×10⁻³⁴ J s and c=3.00×10⁸ m s⁻¹. [2]\n(b) State whether the electron moves to a higher or lower energy level. [1]`, `(a) ΔE = hf = hc/λ, so λ = ${sig(6.63e-34 * 3e8 / energy)} m. [2]\n(b) A lower energy level; the atom loses the energy carried by the emitted photon. [1]`));
  many("E.1 Structure of the atom", "HL", [
    ["State the nuclear-radius relation.", "R = R₀A^(1/3)."],
    ["What does R ∝ A^(1/3) imply about nuclear density?", "Nuclear density is approximately constant because mass and volume are both proportional to A."],
    ["Why can Rutherford scattering deviate from the simple Coulomb model at high energy?", "The alpha particle approaches close enough for nuclear size and strong-force effects to matter."],
    ["What is distance of closest approach in head-on scattering?", "The minimum separation where the alpha particle's kinetic energy has become electric potential energy."],
    ["State the Bohr energy levels for hydrogen.", "En = -13.6/n² eV."],
    ["State angular-momentum quantization in the Bohr model.", "mvr = nh/(2π)."],
    ["Use the standing-wave model of an electron to explain the quantization condition for a circular Bohr orbit.", "A stable orbit accommodates an integer number of de Broglie wavelengths: 2πr = nλ. With λ = h/(mv), this gives mvr = nh/(2π), so only particular orbits are allowed."],
    ["A hydrogen atom is in the n = 2 state. Determine the minimum photon energy required to ionize it. [2]", "En = −13.6/n² eV gives E₂ = −3.40 eV. [1] Ionization raises its energy to zero, so the minimum photon energy is +3.40 eV = 5.44 × 10⁻¹⁹ J. [1]"],
  ]);
  [[1, 1.2e-15], [27, 1.2e-15], [125, 1.2e-15]].forEach(([massNumber, r0]) =>
    add("E.1 Structure of the atom", "HL", `Estimate nuclear radius for A=${massNumber} using R₀=${r0} m.`, `R = R₀A^(1/3) = ${sig(r0 * Math.cbrt(massNumber))} m.`));
  [[5e6, 79], [8e6, 47], [6e6, 29]].forEach(([energyEv, protonNumber]) => {
    const energyJ = energyEv * 1.6e-19;
    const radius = 8.99e9 * (2 * 1.6e-19) * (protonNumber * 1.6e-19) / energyJ;
    add("E.1 Structure of the atom", "HL", `An alpha particle of kinetic energy ${energyEv.toExponential(1)} eV approaches a nucleus with Z=${protonNumber} head-on. Estimate closest approach using k=8.99×10⁹ N m² C⁻².`, `Set Ek = k(2e)(Ze)/r, giving r = ${sig(radius)} m.`);
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
    ["Monochromatic light above the threshold frequency illuminates a metal. Its intensity increases at constant frequency. State the effects on the maximum photoelectron kinetic energy and the emission rate.", "Maximum kinetic energy is unchanged because hf − Φ is unchanged. In the usual single-photon model, more incident photons per second increase the photoelectron emission rate, assuming other conditions remain fixed."],
    ["A graph of maximum photoelectron kinetic energy against incident light frequency is a straight line. State what is represented by its gradient and its intercept on the frequency axis. [2]", "From Emax = hf − Φ, the gradient is Planck’s constant h when Emax is in joules and f in hertz. [1] The frequency-axis intercept is the threshold frequency f₀ = Φ/h. [1]"],
    ["Why does classical wave theory fail to explain threshold frequency?", "It predicts enough intensity should eventually eject electrons at any frequency."],
    ["Why does the absence of a time delay support the photon model?", "One electron receives energy from one photon in a single interaction."],
    ["What evidence shows that matter has wave behaviour?", "Particle diffraction, such as electron diffraction."],
    ["State the de Broglie wavelength equation.", "λ = h/p."],
    ["What is wave-particle duality?", "Quantum objects can show both wave-like and particle-like behaviour depending on the experiment."],
    ["What diffraction condition is needed to observe particle waves clearly?", "Aperture or lattice spacing must be comparable to the de Broglie wavelength."],
    ["What does Compton scattering demonstrate?", "Photons carry particle-like momentum and exchange energy and momentum with electrons."],
    ["A photon scatters through a non-zero angle from a free electron initially at rest. Describe the change in photon wavelength and account for the change in its energy.", "Its wavelength increases, so its energy hc/λ decreases. Energy is transferred to kinetic energy of the recoiling electron. At zero scattering angle the wavelength shift is zero."],
    ["State the Compton wavelength-shift equation.", "Δλ = h(1-cos θ)/(mec)."],
    ["At what Compton scattering angle is wavelength shift greatest?", "180°, because 1-cos θ is then 2."],
  ]);
  [[5e14, 2e-19], [8e14, 3e-19], [1.2e15, 4e-19], [6e14, 1.5e-19], [2e15, 8e-19]].forEach(([frequency, workFunction]) =>
    add("E.2 Quantum physics", "HL", `Light of frequency ${frequency.toExponential(1)} Hz illuminates a metal of work function ${workFunction.toExponential(1)} J. Use h=6.63×10⁻³⁴ J s.\n(a) Calculate the maximum photoelectron kinetic energy. [2]\n(b) The intensity is doubled at the same frequency. State whether the maximum kinetic energy changes, and explain your answer. [2]`, `(a) Emax = hf − Φ = ${sig(6.63e-34 * frequency - workFunction)} J. [2]\n(b) It does not change. Intensity changes photon arrival rate but each photon still has energy hf, so hf − Φ is unchanged. [2]`));
  [[2e-19], [3.2e-19], [4.5e-19], [1.6e-19]].forEach(([workFunction]) =>
    add("E.2 Quantum physics", "HL", `A metal has work function ${workFunction.toExponential(1)} J. Calculate threshold frequency using h=6.63×10⁻³⁴ J s.`, `f₀ = Φ/h = ${sig(workFunction / 6.63e-34)} Hz.`));
  [[9.11e-31, 2e6], [1.67e-27, 3e5], [6.64e-27, 1e5], [2e-26, 4e4]].forEach(([mass, speed]) =>
    add("E.2 Quantum physics", "HL", `A non-relativistic particle has mass ${mass.toExponential(2)} kg and speed ${speed} m s⁻¹. Calculate its de Broglie wavelength.`, `λ = h/(mv) = ${sig(6.63e-34 / (mass * speed))} m.`));
  [[1e-10], [2.5e-11], [5e-12], [8e-10]].forEach(([wavelength]) =>
    add("E.2 Quantum physics", "HL", `A particle has de Broglie wavelength ${wavelength} m. Calculate its momentum.`, `p = h/λ = ${sig(6.63e-34 / wavelength)} kg m s⁻¹.`));
  [30, 60, 90, 180].forEach((angle) => {
    const shift = 6.63e-34 * (1 - cosDegrees(angle)) / (9.11e-31 * 3e8);
    add("E.2 Quantum physics", "HL", `Calculate the Compton wavelength shift for scattering angle ${angle}° using me=9.11×10⁻³¹ kg.`, `Δλ = h(1-cosθ)/(mec) = ${sig(shift)} m.`);
  });
  [[1e-10, 2e-10], [5e-11, 1e-10]].forEach(([wavelength, spacing]) =>
    add("E.2 Quantum physics", "HL", `Particles have de Broglie wavelength ${wavelength} m and encounter slit/lattice spacing ${spacing} m. Explain whether appreciable diffraction is expected.`, `${wavelength / spacing >= 0.1 ? "Yes" : "Only weakly"}; diffraction is appreciable when spacing is comparable with wavelength.`));

  many("E.3 Radioactive decay", "SL", [
    ["Define isotope.", "Nuclei with the same proton number but different neutron numbers."],
    ["Define nuclear mass defect.", "The difference between the total mass of separated nucleons and the mass of the bound nucleus."],
    ["Define nuclear binding energy.", "Energy required to separate a nucleus completely into its nucleons."],
    ["State what is meant by nuclear binding energy per nucleon.", "The total energy needed to separate a nucleus completely into free nucleons, divided by the number of nucleons. It is an average measure of binding, not generally the energy required to remove one particular nucleon."],
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
    ["A source gives a measured count rate of 180 s⁻¹ including a constant background of 20 s⁻¹. After 12 minutes the measured count rate is 60 s⁻¹. Determine the half-life. [3]", "Corrected count rates are 160 s⁻¹ and 40 s⁻¹. [1] The source count rate has fallen by a factor of four, corresponding to two half-lives. [1] Half-life = 12/2 = 6.0 minutes. [1]"],
  ]);
  [[2e-29], [5e-28], [1.2e-30], [8e-27]].forEach(([massDefect]) =>
    add("E.3 Radioactive decay", "SL", `A nucleus has mass defect ${massDefect.toExponential(1)} kg. Calculate binding energy using c=3.00×10⁸ m s⁻¹.`, `E = Δmc² = ${sig(massDefect * 9e16)} J.`));
  [[800, 3, 2], [1200, 4, 3], [500, 2, 4], [96, 5, 1]].forEach(([initial, halfLife, elapsedHalfLives]) =>
    add("E.3 Radioactive decay", "SL", `A radioactive source has initial activity ${initial} Bq and half-life ${halfLife} h.\n(a) Calculate its activity after ${elapsedHalfLives * halfLife} h. [2]\n(b) Explain why the exact number of decays in a short time interval cannot be predicted. [1]`, `(a) After ${elapsedHalfLives} half-life${elapsedHalfLives === 1 ? "" : "s"}, A = A₀/2^${elapsedHalfLives} = ${sig(initial / Math.pow(2, elapsedHalfLives))} Bq. [2]\n(b) Individual nuclear decays are random; activity describes an expected average rate rather than an exact count in every interval. [1]`));
  [[520, 20], [1800, 45], [92, 12]].forEach(([measured, background]) =>
    add("E.3 Radioactive decay", "SL", `Measured count rate is ${measured} s⁻¹ and background is ${background} s⁻¹. Calculate corrected count rate.`, `Corrected rate = measured-background = ${measured - background} s⁻¹.`));
  [[238, 92, "alpha"], [14, 6, "beta-minus"]].forEach(([a, z, mode]) => {
    const daughterA = mode === "alpha" ? a - 4 : a;
    const daughterZ = mode === "alpha" ? z - 2 : z + 1;
    add("E.3 Radioactive decay", "SL", `A nucleus with A=${a}, Z=${z} undergoes ${mode} decay. State daughter A and Z.`, `Daughter: A=${daughterA}, Z=${daughterZ}.`);
  });
  many("E.3 Radioactive decay", "HL", [
    ["Explain how the approximate constancy of binding energy per nucleon for larger nuclei supports a short-range nuclear force.", "Each nucleon interacts strongly mainly with a limited number of nearby nucleons. Adding nucleons therefore adds roughly the same binding energy per nucleon rather than an attraction to every nucleon throughout the nucleus. Coulomb repulsion causes a slow decline for the heaviest nuclei."],
    ["How does neutron-to-proton ratio affect stability?", "Stable heavier nuclei need more neutrons relative to protons; nuclei far from the stability band tend to decay."],
    ["What does the near-constant binding energy per nucleon above A≈60 show?", "The strong force is short range and saturates."],
    ["What do discrete alpha and gamma spectra show?", "Nuclei have discrete energy levels."],
    ["What did the continuous beta spectrum suggest?", "Some decay energy and momentum are carried by a neutrino or antineutrino."],
    ["Define decay constant.", "Probability per unit time that a nucleus decays, in the small-time-interval limit."],
    ["State the radioactive decay law.", "N = N₀e^(-λt)."],
    ["Relate activity and undecayed nuclei.", "A = λN."],
    ["State activity as a function of time.", "A = A₀e^(-λt)."],
    ["A graph of ln(A/A₀) against time t in seconds has gradient −0.020 s⁻¹. Determine the half-life of the radioactive source. [2]", "ln(A/A₀) = −λt, so λ = 0.020 s⁻¹. [1] T½ = ln2/λ = 34.7 s, approximately 35 s. [1]"],
    ["Why is radioactive decay exponential?", "Each nucleus has the same constant probability of decay per unit time."],
  ]);
  [[1000, 0.02, 30], [500, 0.005, 120], [2e6, 1e-4, 5000], [800, 0.1, 5]].forEach(([initial, lambda, time]) =>
    add("E.3 Radioactive decay", "HL", `A sample starts with N₀=${initial} and λ=${lambda} s⁻¹. Calculate the expected number of undecayed nuclei after ${time} s.`, `N = N₀e^(-λt) = ${Math.round(initial * Math.exp(-lambda * time))} nuclei (expected number, rounded to a whole nucleus).`));
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
    ["Explain why fission fragments are often unstable and subsequently undergo beta-minus decay.", "They inherit a relatively high neutron-to-proton ratio from the heavy parent nucleus. Beta-minus decay converts a neutron into a proton, reducing this ratio while leaving nucleon number unchanged. Prompt neutron emission also helps remove excess neutrons."],
    ["Distinguish between a steady self-sustaining chain reaction and a growing chain reaction in a fission reactor.", "In a steady reaction, on average one neutron from each fission causes another fission. If more than one does so, the fission rate grows; if fewer than one does so, the rate falls."],
    ["Why must some fission products be stored for long periods?", "They are radioactive and some have long half-lives."],
    ["A reactor is shut down by inserting control rods. Explain why cooling is still required.", "The fission chain reaction is suppressed, but unstable fission products continue to decay. Their decay energy is transferred to internal energy, so heat must still be removed."],
    ["What property of fission products makes containment important?", "They can emit penetrating or ionizing radiation."],
    ["How is fission energy usually converted to electrical energy?", "Fission heats coolant; steam drives a turbine and generator."],
    ["The total binding energy of the products of a fission reaction exceeds that of the reactants by 180 MeV. State the energy released and explain the corresponding change in total rest mass. [2]", "180 MeV is released. [1] The products have smaller total rest mass, with Δm = E/c²; greater binding means lower mass for the same total nucleon content. [1]"],
  ]);
  [[3e-28], [2.5e-28], [4e-28], [1.8e-28], [5e-29]].forEach(([massDefect]) =>
    add("E.4 Fission", "SL", `A fission event has mass decrease ${massDefect.toExponential(1)} kg. Calculate energy released using c=3.00×10⁸ m s⁻¹.`, `E = Δmc² = ${sig(massDefect * 9e16)} J.`));
  [[2e-11, 1e8], [3e-11, 5e12], [1.5e-11, 2e15], [4e-11, 6e9]].forEach(([energyPerFission, number]) =>
    add("E.4 Fission", "SL", `Each fission releases ${energyPerFission.toExponential(1)} J. Calculate energy from ${number.toExponential(1)} fissions.`, `Etotal = NE = ${sig(energyPerFission * number)} J.`));
  [[1e9, 2e-11], [5e8, 3e-11], [2e10, 1.5e-11]].forEach(([energy, perFission]) =>
    add("E.4 Fission", "SL", `A reactor must release ${energy.toExponential(1)} J. If each fission releases ${perFission.toExponential(1)} J, estimate number of fissions.`, `N = Etotal/Efission = ${sig(energy / perFission)}.`));
  [[500e6, 2e-11], [1e9, 3e-11], [200e6, 1.5e-11]].forEach(([power, energyPerFission]) =>
    add("E.4 Fission", "SL", `A reactor releases thermal power ${power.toExponential(1)} W from fission. Each fission releases ${energyPerFission.toExponential(1)} J.\n(a) Estimate the fission rate. [2]\n(b) The station converts 35% of the thermal power to electricity. Determine its electrical power output. [1]`, `(a) Fission rate = P/Efission = ${sig(power / energyPerFission)} s⁻¹. [2]\n(b) Pelectrical = 0.35Pthermal = ${sig(0.35 * power)} W. [1]`));

  many("E.5 Fusion and stars", "SL", [
    ["Define nuclear fusion.", "Light nuclei combine to form a heavier nucleus."],
    ["Why can fusion release energy?", "The product has greater binding energy per nucleon and lower total mass."],
    ["Why is very high temperature needed for fusion?", "Nuclei need high kinetic energy to approach despite electric repulsion."],
    ["Why is high density helpful for stellar fusion?", "It increases the rate of collisions between nuclei."],
    ["What two effects are balanced in a stable star?", "Outward thermal or radiation pressure and inward gravitational force."],
    ["What is the main energy source of a main-sequence star?", "Fusion of hydrogen into helium."],
    ["How does stellar mass affect evolution?", "More massive stars are hotter, more luminous, use fuel faster and evolve more rapidly."],
    ["Where are main-sequence stars found on an HR diagram?", "Along the diagonal band from hot luminous stars to cool dim stars."],
    ["A star is cooler than the Sun but has a much greater luminosity. Deduce how its radius compares with the Sun’s radius. [2]", "L = 4πR²σT⁴. Its lower temperature means less power emitted per unit area. To have greater luminosity despite this, it must have a much larger surface area and hence a larger radius. [2]"],
    ["Where are white dwarfs found on an HR diagram?", "Low luminosity and high surface temperature."],
    ["What is the instability strip on an HR diagram?", "A region containing pulsating variable stars."],
    ["Two stars have the same luminosity. Star X has twice the surface temperature of star Y. Deduce the ratio RX/RY, treating both stars as black bodies.", "L = 4πR²σT⁴. At fixed L, R is proportional to 1/T². RX/RY = (TY/TX)² = 1/4."],
    ["Define the stellar parallax angle used in d(pc) = 1/p(arcsecond).", "Half the total apparent angular displacement of a nearby star against distant background stars when observed from opposite sides of Earth’s orbit. Equivalently, it is the angle subtended by 1 AU at the star."],
    ["State the parallax-distance equation.", "d(pc) = 1/p(arcsecond)."],
    ["Define one parsec.", "Distance at which 1 AU subtends an angle of 1 arcsecond."],
    ["How can stellar radius be found from luminosity and temperature?", "Use L = 4πR²σT⁴."],
    ["How do constant-radius lines run on an HR diagram?", "They run diagonally; at fixed radius greater temperature gives greater luminosity."],
    ["Explain why fusion of light nuclei can release energy but fusion to nuclei well beyond the iron region does not provide a main-sequence-like energy source.", "Fusion of light nuclei increases binding energy per nucleon, reducing total rest mass and releasing energy. Beyond the peak near iron, further fusion does not increase binding energy per nucleon in this way and generally requires energy input."],
  ]);
  [0.5, 0.1, 0.02, 0.005].forEach((parallax) =>
    add("E.5 Fusion and stars", "SL", `The total apparent displacement of a star against distant background stars, between observations six months apart on opposite sides of Earth’s orbit, is ${2 * parallax} arcsecond${2 * parallax === 1 ? "" : "s"}.\n(a) Determine its parallax angle. [1]\n(b) Calculate its distance in parsecs. [1]`, `(a) The parallax is half the total displacement: p = ${parallax} arcseconds. [1]\n(b) d(pc) = 1/p(arcsecond) = ${sig(1 / parallax)} pc. [1]`));
  [[1, "AU", 1.496e11], [1, "ly", 9.46e15], [1, "pc", 3.086e16], [2, "pc", 6.172e16]].forEach(([value, unit, metres]) =>
    add("E.5 Fusion and stars", "SL", `Convert ${value} ${unit} to metres.`, `${value} ${unit} = ${metres.toExponential(3)} m.`));
  [[3.8e26, 5800], [3.8e28, 10000], [1e25, 3000], [5e27, 7000]].forEach(([luminosity, temperature]) => {
    const radius = Math.sqrt(luminosity / (4 * Math.PI * 5.67e-8 * Math.pow(temperature, 4)));
    add("E.5 Fusion and stars", "SL", `A star has L=${luminosity.toExponential(1)} W and T=${temperature} K. Calculate radius using σ=5.67×10⁻⁸ W m⁻² K⁻⁴. Model the star as a spherical black body.`, `R = √[L/(4πσT⁴)] = ${sig(radius)} m.`);
  });
  [[5e-29], [7e-30], [2e-28], [1.5e-29]].forEach(([massDefect]) =>
    add("E.5 Fusion and stars", "SL", `A fusion reaction has mass decrease ${massDefect.toExponential(1)} kg. Calculate energy released.`, `E = Δmc² = ${sig(massDefect * 9e16)} J.`));

  // Skills and inquiry
  many("Skills in physics", "SL", [
    ["Define a random error.", "An unpredictable variation that causes repeated readings to scatter."],
    ["Define a systematic error.", "A consistent bias that shifts measurements in the same way."],
    ["A student measures the period of a pendulum using a stopwatch. Describe how the effect of reaction-time uncertainty can be reduced.", "Time many complete oscillations and divide the total time by their number, reducing the fractional effect of start/stop uncertainty. Repeat timings and average them. Repeats do not remove systematic timing bias."],
    ["A balance reads +0.20 g when empty. A student repeats each mass measurement ten times and takes a mean without correcting the zero. Explain the effect on the results.", "The +0.20 g zero error remains in the mean. Averaging can reduce random scatter but does not remove this systematic offset. Subtract the offset or correctly zero the balance."],
    ["Define accuracy.", "Closeness of a measured result to the accepted or true value."],
    ["Define precision.", "Closeness of repeated measurements to one another."],
    ["Define absolute uncertainty.", "An estimated range around a measured value, expressed in the same units."],
    ["How is percentage uncertainty calculated?", "Absolute uncertainty divided by measured value, multiplied by 100%."],
    ["What is a zero error?", "A measuring instrument gives a non-zero reading when the true input is zero."],
    ["How is uncertainty in a single analogue-scale reading commonly estimated?", "About half the smallest scale division, unless another method is justified."],
    ["How is uncertainty in a digital reading commonly estimated?", "Usually ±1 in the last displayed digit, unless the instrument specification says otherwise."],
    ["What is an outlier?", "A result inconsistent with the pattern of the other data."],
    ["When may an outlier be excluded from a mean?", "When it is identified using a stated, justified criterion rather than simply because it is inconvenient."],
    ["A student investigates the period T of a simple pendulum as its length l is varied. State the quantities to plot to obtain a straight-line graph using T = 2π√(l/g).", "Plot T² against l, with T²/s² on the vertical axis and l/m on the horizontal axis. The gradient is 4π²/g."],
    ["The relationship y = k/x² is proposed for measured quantities x and y. State which quantities should be plotted to test the relationship with a straight line.", "Plot y against 1/x². A straight line with intercept consistent with zero supports the proposed relationship; its gradient is k."],
    ["What should every graph axis label include?", "Quantity name or symbol and its unit."],
    ["Measurements are predicted to obey y = kx. A best-fit straight line has a clearly non-zero intercept even after uncertainties are considered. Explain why the result does not support direct proportionality. [2]", "Direct proportionality requires y = 0 when x = 0, so a straight line through the origin is required. [1] A significant non-zero intercept suggests an additional offset or an incomplete model; a straight line alone is insufficient. [1]"],
    ["Why should a gradient triangle be large?", "It reduces the fractional effect of reading coordinates."],
    ["A graph of force F against acceleration a for a trolley is a straight line. Its gradient is 0.80 N s² m⁻¹ and its force-axis intercept is 0.20 N. Interpret both quantities using F = ma + Ffriction. [2]", "The gradient represents mass: m = 0.80 kg. [1] The force-axis intercept represents a constant opposing frictional force of 0.20 N. [1]"],
    ["A straight-line graph has a best-fit gradient of 2.4 and acceptable extreme gradients of 2.1 and 2.7, all in m s⁻². Estimate the absolute gradient uncertainty using half the range and state the result. [2]", "Δm = (2.7 − 2.1)/2 = 0.3 m s⁻². [1] Gradient = (2.4 ± 0.3) m s⁻². [1]"],
    ["Two measurements with stated uncertainty intervals overlap. State what can be concluded about their difference from the overlap alone.", "The values are compatible within those stated intervals. Overlap alone does not establish statistical significance; that also depends on what the intervals represent and the appropriate comparison method."],
    ["Define interpolation.", "Estimating a value within the measured data range."],
    ["Why is extrapolation less reliable?", "It assumes the observed relationship continues outside the tested range."],
    ["What is a control variable?", "A relevant factor held constant so the effect of the independent variable can be isolated."],
    ["A student predicts that T² is proportional to pendulum length l. State the graph that would test this prediction and the feature that would support direct proportionality.", "Plot T² on the vertical axis against l on the horizontal axis. A straight line whose intercept is consistent with zero within uncertainty supports direct proportionality over the measured range."],
    ["Distinguish repeatability from reproducibility.", "Repeatability uses the same method and conditions; reproducibility involves a meaningful change such as operator or equipment."],
    ["What is calibration?", "Comparing an instrument with known standards and adjusting or correcting its readings."],
    ["Why should raw data be recorded before processing?", "It preserves the original measurements and allows calculations to be checked."],
    ["A student uses an electrical heater to warm water in a beaker. State one relevant hazard and a specific precaution.", "For example: hot water and the heater can cause burns; allow cooling before handling and use suitable heat-resistant protection. Alternatively: water near electrical equipment can cause shock; use an appropriate low-voltage supply and keep connections dry."],
    ["A student measures g = (9.6 ± 0.3) m s⁻². The accepted value is 9.81 m s⁻². Determine whether the result is consistent with the accepted value within the stated uncertainty.", "The measurement interval is 9.3 to 9.9 m s⁻² and contains 9.81 m s⁻². The result is therefore consistent within the stated uncertainty. This does not prove the absence of systematic error."],
  ]);
  [[100, 5], [250, 10], [80, 4], [1200, 30], [45, 3]].forEach(([value, uncertainty]) =>
    add("Skills in physics", "SL", `A measurement is ${value} ± ${uncertainty}. Calculate percentage uncertainty.`, `Percentage uncertainty = (${uncertainty}/${value})×100 = ${pct(100 * uncertainty / value)}.`));
  [[[2, 3, 4]], [[5.1, 5.3, 5.2]], [[12, 13, 11, 12]], [[0.8, 0.9, 0.7, 0.8]]].forEach(([values]) => {
    const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
    add("Skills in physics", "SL", `A student repeats a timing measurement and obtains ${values.join(", ")} s.\n(a) Calculate the mean time. [1]\n(b) Estimate the absolute uncertainty using half the range and report the result with its uncertainty. [2]`, `(a) Mean time = ${sig(mean)} s. [1]\n(b) Half-range = (${Math.max(...values)} − ${Math.min(...values)})/2 = ${sig((Math.max(...values) - Math.min(...values)) / 2)} s. Report (${mean.toFixed(1)} ± ${((Math.max(...values) - Math.min(...values)) / 2).toFixed(1)}) s. [2]`);
  });
  [[[10, 11, 9, 30], 30], [[5.0, 5.1, 4.9, 8.2], 8.2], [[100, 102, 99, 101, 60], 60]].forEach(([values, anomaly]) => {
    const kept = values.filter((value) => value !== anomaly);
    const mean = kept.reduce((sum, value) => sum + value, 0) / kept.length;
    add("Skills in physics", "SL", `The measured times, in seconds, are ${values.join(", ")}. The value ${anomaly} is identified as an anomaly. Calculate the mean of the remaining values.`, `(a) Mean time = ${sig(mean)} s. [1]\n(b) Half-range = (${Math.max(...values)} − ${Math.min(...values)})/2 = ${sig((Math.max(...values) - Math.min(...values)) / 2)} s. Report (${mean.toFixed(1)} ± ${((Math.max(...values) - Math.min(...values)) / 2).toFixed(1)}) s. [2]`);
  });
  [[2, 0.1, 5, 0.2], [12, 0.5, 3, 0.1], [0.8, 0.04, 4, 0.2]].forEach(([a, da, b, db]) =>
    add("Skills in physics", "SL", `Two lengths are a=(${a}±${da}) cm and b=(${b}±${db}) cm. Calculate their total length z = a + b and its absolute uncertainty.`, `z=${sig(a + b)} cm and Δz=${sig(da + db)} cm, so z=${sig(a + b)}±${sig(da + db)} cm.`));
  [[2, 0.1, 5, 0.2], [12, 0.5, 3, 0.1], [0.8, 0.04, 4, 0.2]].forEach(([a, da, b, db]) => {
    const result = a * b;
    const fractional = da / a + db / b;
    add("Skills in physics", "SL", `A rectangle has measured sides a=(${a}±${da}) cm and b=(${b}±${db}) cm. Its area is z=ab. Calculate the percentage uncertainty in z.`, `Add fractional uncertainties: Δz/z=${sig(fractional)}, so percentage uncertainty=${pct(100 * fractional)}.`);
  });
  [[2, 5, 10, 21], [1, 4, 3, 15], [0, 2, 5, 11]].forEach(([x1, x2, y1, y2]) =>
    add("Skills in physics", "SL", `A velocity–time best-fit line passes through (${x1} s, ${y1} m s⁻¹) and (${x2} s, ${y2} m s⁻¹). Calculate the acceleration represented by its gradient.`, `Acceleration = Δv/Δt = ${sig((y2 - y1) / (x2 - x1))} m s⁻².`));
  [[12.4, 2, "m s⁻¹"], [0.003456, 2, "A"], [9876, 3, "Pa"]].forEach(([value, figures, unit]) =>
    add("Skills in physics", "SL", `A measured value is ${value} ${unit}. Round it to ${figures} significant figures.`, `${Number(value).toPrecision(figures)} ${unit}.`));

  // TOPIC_BANKS

  const questions = [];
  for (const topic of topicMeta) {
    const target = levelTargets[topic.name];
    for (const level of ["SL", "HL"]) {
      const available = draft.filter((question) => question.topic === topic.name && question.level === level);
      if (available.length < target[level]) {
        throw new Error(`${topic.name} has ${available.length} ${level} questions; ${target[level]} required.`);
      }
      questions.push(...available.slice(0, target[level]).map(polishExamStyle));
    }
  }

  questions.forEach((question, index) => {
    question.id = `ib-${String(index + 1).padStart(4, "0")}`;
  });

  window.IB_PHYSICS_DATA = { topicMeta, questions };
})();
