export const QUESTIONS = [
  {
    "id": "ib-0217",
    "topic": "B.1 Thermal energy transfers",
    "q": "Compare the particle arrangements in solids, liquids and gases.",
    "a": "Solid: fixed positions; liquid: close and mobile; gas: widely separated",
    "wrong": [
      "Solid: widely separated; liquid: fixed; gas: close",
      "All three have particles fixed in position",
      "Solid and liquid: stationary particles; gas: moving particles"
    ],
    "explanation": "Solids have closely packed particles in fixed relative positions; liquids are close but mobile; gases are widely separated and move freely.",
    "source": "../questions.js#ib-0217"
  },
  {
    "id": "ib-0218",
    "topic": "B.1 Thermal energy transfers",
    "q": "Define density.",
    "a": "Mass per unit volume",
    "wrong": [
      "Volume per unit mass",
      "Weight per unit area",
      "Mass multiplied by volume"
    ],
    "explanation": "Mass per unit volume: ρ = m/V.",
    "source": "../questions.js#ib-0218"
  },
  {
    "id": "ib-0219",
    "topic": "B.1 Thermal energy transfers",
    "q": "How are temperature changes in kelvin and degrees Celsius related?",
    "a": "A rise of 1 K equals a rise of 1 °C",
    "wrong": [
      "A rise of 1 K equals a rise of 273 °C",
      "A rise of 1 K equals a rise of 0 °C",
      "A rise of 1 K equals a rise of 100 °C"
    ],
    "explanation": "A change of 1 K is the same size as a change of 1 °C.",
    "source": "../questions.js#ib-0219"
  },
  {
    "id": "ib-0220",
    "topic": "B.1 Thermal energy transfers",
    "q": "Convert a Celsius temperature θ to kelvin.",
    "a": "T = θ + 273.15",
    "wrong": [
      "T = θ − 273.15",
      "T = 273.15θ",
      "T = θ/273.15"
    ],
    "explanation": "T = θ + 273.15.",
    "source": "../questions.js#ib-0220"
  },
  {
    "id": "ib-0222",
    "topic": "B.1 Thermal energy transfers",
    "q": "Define internal energy.",
    "a": "Total random kinetic energy plus intermolecular potential energy",
    "wrong": [
      "Only the random kinetic energy of the particles",
      "Only the intermolecular potential energy",
      "The kinetic energy of the whole object moving"
    ],
    "explanation": "The total random kinetic energy plus intermolecular potential energy of the particles.",
    "source": "../questions.js#ib-0222"
  },
  {
    "id": "ib-0223",
    "topic": "B.1 Thermal energy transfers",
    "q": "What determines the direction of resultant thermal energy transfer?",
    "a": "Temperature difference: from hotter to colder",
    "wrong": [
      "Mass difference: from heavier to lighter",
      "Volume difference: from larger to smaller",
      "Internal energy difference: always towards lower total energy"
    ],
    "explanation": "Temperature difference; energy transfers from higher to lower temperature.",
    "source": "../questions.js#ib-0223"
  },
  {
    "id": "ib-0224",
    "topic": "B.1 Thermal energy transfers",
    "q": "A pure substance melts at constant pressure while thermal energy is supplied. Explain why its temperature remains constant during melting.",
    "a": "Potential energy rises; mean random kinetic energy stays constant",
    "wrong": [
      "Kinetic energy rises; potential energy stays constant",
      "All supplied energy leaves the substance immediately",
      "Both kinetic and potential energy stay constant"
    ],
    "explanation": "The supplied energy increases intermolecular potential energy as the arrangement changes. Mean random kinetic energy remains constant, so the temperature remains constant.",
    "source": "../questions.js#ib-0224"
  },
  {
    "id": "ib-0225",
    "topic": "B.1 Thermal energy transfers",
    "q": "State the specific heat-capacity equation.",
    "a": "Q = mcΔT",
    "wrong": [
      "Q = mL",
      "Q = mc/ΔT",
      "Q = cΔT/m"
    ],
    "explanation": "Q = mcΔT.",
    "source": "../questions.js#ib-0225"
  },
  {
    "id": "ib-0226",
    "topic": "B.1 Thermal energy transfers",
    "q": "State the specific latent-heat equation.",
    "a": "Q = mL",
    "wrong": [
      "Q = mcΔT",
      "Q = L/m",
      "Q = m/L"
    ],
    "explanation": "Q = mL.",
    "source": "../questions.js#ib-0226"
  },
  {
    "id": "ib-0227",
    "topic": "B.1 Thermal energy transfers",
    "q": "Explain thermal conduction in a metal rod heated at one end.",
    "a": "Interactions between particles and energy transfer by mobile electrons",
    "wrong": [
      "Bulk circulation of the metal from hot to cold",
      "Only infrared radiation travelling inside the rod",
      "Protons flowing freely along the rod"
    ],
    "explanation": "Particles at the hot end have greater mean random kinetic energy. Energy is transferred through interactions between neighbouring particles and by mobile electrons moving through the metal, without bulk movement of the rod.",
    "source": "../questions.js#ib-0227"
  },
  {
    "id": "ib-0228",
    "topic": "B.1 Thermal energy transfers",
    "q": "A slab of thickness L and area A has thermal conductivity k. Its faces are held at temperatures Th and Tc, where Th > Tc. State the rate of thermal energy transfer from the hot face to the cold face in steady state.",
    "a": "Rate = kA(Th − Tc)/L",
    "wrong": [
      "Rate = kL(Th − Tc)/A",
      "Rate = kAL/(Th − Tc)",
      "Rate = A(Th − Tc)/(kL)"
    ],
    "explanation": "Q/Δt = kA(Th − Tc)/L. This is the positive magnitude of the rate. In signed gradient form, Q̇ = −kA dT/dx.",
    "source": "../questions.js#ib-0228"
  },
  {
    "id": "ib-0229",
    "topic": "B.1 Thermal energy transfers",
    "q": "In the equation Q̇ = −kA dT/dx, explain the significance of the minus sign.",
    "a": "Energy flows opposite to the temperature gradient",
    "wrong": [
      "Thermal conductivity must be negative",
      "The rod must have a temperature below 0 K",
      "Thermal energy is destroyed during conduction"
    ],
    "explanation": "The thermal energy transfer is in the direction of decreasing temperature, opposite to the temperature gradient.",
    "source": "../questions.js#ib-0229"
  },
  {
    "id": "ib-0230",
    "topic": "B.1 Thermal energy transfers",
    "q": "Explain how natural convection transfers thermal energy in a fluid heated from below.",
    "a": "Warm fluid expands, becomes less dense and rises",
    "wrong": [
      "Warm fluid contracts, becomes denser and rises",
      "Warm fluid expands, becomes denser and sinks",
      "Particles stop moving at the hot end"
    ],
    "explanation": "The heated fluid expands and becomes less dense, so buoyancy causes it to rise. Cooler, denser fluid moves down to replace it, establishing bulk circulation that transfers thermal energy.",
    "source": "../questions.js#ib-0230"
  },
  {
    "id": "ib-0231",
    "topic": "B.1 Thermal energy transfers",
    "q": "The absolute temperature of a black body doubles while its surface area remains constant. State the factors by which its total emitted power and peak wavelength change. [2]",
    "a": "Power ×16; peak wavelength ×½",
    "wrong": [
      "Power ×2; peak wavelength ×2",
      "Power ×4; peak wavelength ×½",
      "Power ×16; peak wavelength ×2"
    ],
    "explanation": "From P = σAT⁴, emitted power increases by a factor of 16. [1] From λmaxT = constant, the peak wavelength halves. [1]",
    "source": "../questions.js#ib-0231"
  },
  {
    "id": "ib-0232",
    "topic": "B.1 Thermal energy transfers",
    "q": "Define apparent brightness.",
    "a": "Received power per unit area",
    "wrong": [
      "Total power emitted by the source",
      "Energy emitted per unit mass",
      "Received energy multiplied by area"
    ],
    "explanation": "Received power per unit area from a source.",
    "source": "../questions.js#ib-0232"
  },
  {
    "id": "ib-0233",
    "topic": "B.1 Thermal energy transfers",
    "q": "Relate luminosity, apparent brightness and distance.",
    "a": "b = L/(4πd²)",
    "wrong": [
      "b = L/(4πd)",
      "b = 4πd²L",
      "b = Ld²/(4π)"
    ],
    "explanation": "b = L/(4πd²).",
    "source": "../questions.js#ib-0233"
  },
  {
    "id": "ib-0234",
    "topic": "B.1 Thermal energy transfers",
    "q": "State Wien's displacement law.",
    "a": "λmaxT = 2.9 × 10⁻³ m K",
    "wrong": [
      "λmax/T = 2.9 × 10⁻³ m K",
      "λmaxT² = 2.9 × 10⁻³ m K",
      "λmaxT = 2.9 × 10³ m K"
    ],
    "explanation": "λmaxT = 2.9 × 10⁻³ m K.",
    "source": "../questions.js#ib-0234"
  },
  {
    "id": "ib-0235",
    "topic": "B.1 Thermal energy transfers",
    "q": "A material sample has density 7800 kg m⁻³ and volume 0.002 m³. Calculate the mass of the sample.",
    "a": "15.6 kg",
    "wrong": [
      "3.90 × 10⁶ kg",
      "0.0641 kg",
      "156 kg"
    ],
    "explanation": "m = ρV = 15.6 kg.",
    "source": "../questions.js#ib-0235"
  },
  {
    "id": "ib-0238",
    "topic": "B.1 Thermal energy transfers",
    "q": "Convert 20 °C to kelvin.",
    "a": "293.15 K",
    "wrong": [
      "253.15 K",
      "20 K",
      "5463 K"
    ],
    "explanation": "T = θ + 273.15 = 293.15 K.",
    "source": "../questions.js#ib-0238"
  },
  {
    "id": "ib-0240",
    "topic": "B.1 Thermal energy transfers",
    "q": "A 1 kg sample has specific heat capacity 4200 J kg⁻¹ K⁻¹. Calculate the energy needed to raise its temperature by 5 °C without changing state.",
    "a": "21,000 J",
    "wrong": [
      "840 J",
      "4200 J",
      "105,000 J"
    ],
    "explanation": "(a) Q = mcΔT = 2.10 × 10⁴ J. [2]\n(b) A change of 1 °C equals a change of 1 K, so the numerical temperature rise is the same in both scales. [1]",
    "source": "../questions.js#ib-0240"
  },
  {
    "id": "ib-0243",
    "topic": "B.1 Thermal energy transfers",
    "q": "Calculate the energy needed to melt 0.20 kg of ice at 0 °C. Its specific latent heat of fusion is 3.34 × 10⁵ J kg⁻¹.",
    "a": "66,800 J",
    "wrong": [
      "16,700 J",
      "1,670,000 J",
      "668 J"
    ],
    "explanation": "(a) Q = mL = 6.68 × 10⁴ J. [2]\n(b) Intermolecular potential energy increases as the particle arrangement changes. Mean random kinetic energy remains constant, so temperature remains constant. [2]",
    "source": "../questions.js#ib-0243"
  },
  {
    "id": "ib-0249",
    "topic": "B.1 Thermal energy transfers",
    "q": "A black body is at 5800 K. Calculate its peak wavelength using Wien's law.",
    "a": "5.00 × 10⁻⁷ m",
    "wrong": [
      "5.00 × 10⁻⁵ m",
      "1.68 × 10¹ m",
      "2.00 × 10⁶ m"
    ],
    "explanation": "λmax = 2.9 × 10⁻³/T = 5.00 × 10⁻⁷ m.",
    "source": "../questions.js#ib-0249"
  },
  {
    "id": "ib-0251",
    "topic": "B.2 Greenhouse effect",
    "q": "Define emissivity.",
    "a": "Emitted power / black-body power at the same area and temperature",
    "wrong": [
      "Scattered power / incident power",
      "Absorbed power / surface temperature",
      "Black-body power / emitted power at the same area and temperature"
    ],
    "explanation": "Power radiated per unit area divided by σT⁴ for a black surface at the same temperature.",
    "source": "../questions.js#ib-0251"
  },
  {
    "id": "ib-0252",
    "topic": "B.2 Greenhouse effect",
    "q": "Define albedo.",
    "a": "Scattered power / incident power",
    "wrong": [
      "Absorbed power / incident power",
      "Emitted power / absorbed power",
      "Incident power / scattered power"
    ],
    "explanation": "Total scattered power divided by total incident power.",
    "source": "../questions.js#ib-0252"
  },
  {
    "id": "ib-0253",
    "topic": "B.2 Greenhouse effect",
    "q": "An airless spherical planet has albedo 0.25. The stellar intensity at its orbital distance is 1200 W m⁻². Determine the mean absorbed power per unit area over the whole planet. [2]",
    "a": "225 W m⁻²",
    "wrong": [
      "300 W m⁻²",
      "900 W m⁻²",
      "75 W m⁻²"
    ],
    "explanation": "The mean incident intensity over the sphere is S/4 = 300 W m⁻². [1] The absorbed fraction is 1 − 0.25, so the mean absorbed intensity is 225 W m⁻². [1]",
    "source": "../questions.js#ib-0253"
  },
  {
    "id": "ib-0254",
    "topic": "B.2 Greenhouse effect",
    "q": "What is the solar constant?",
    "a": "Solar power per unit area normal to the rays at Earth's orbital distance",
    "wrong": [
      "Total power emitted by the Sun",
      "Average solar power per unit area over the whole Earth",
      "Infrared power emitted per unit area by Earth"
    ],
    "explanation": "Solar power received per unit area on a surface normal to the rays at Earth's orbital distance.",
    "source": "../questions.js#ib-0254"
  },
  {
    "id": "ib-0255",
    "topic": "B.2 Greenhouse effect",
    "q": "Why is the mean incoming solar intensity over a spherical planet S/4?",
    "a": "Intercepted area is πR²; total surface area is 4πR²",
    "wrong": [
      "The Sun only emits for one quarter of each day",
      "Earth absorbs only one quarter of all wavelengths",
      "The distance to the Sun is four times the radius of Earth"
    ],
    "explanation": "The planet intercepts πR² but distributes energy over surface area 4πR².",
    "source": "../questions.js#ib-0255"
  },
  {
    "id": "ib-0256",
    "topic": "B.2 Greenhouse effect",
    "q": "State four greenhouse gases.",
    "a": "Water vapour, carbon dioxide, methane, nitrous oxide",
    "wrong": [
      "Nitrogen, oxygen, argon, helium",
      "Carbon dioxide, oxygen, nitrogen, helium",
      "Methane, oxygen, argon, nitrogen"
    ],
    "explanation": "Water vapour, carbon dioxide, methane and nitrous oxide.",
    "source": "../questions.js#ib-0256"
  },
  {
    "id": "ib-0257",
    "topic": "B.2 Greenhouse effect",
    "q": "State one natural source and one human activity that increases atmospheric carbon dioxide.",
    "a": "Natural: respiration; human: burning fossil fuels",
    "wrong": [
      "Natural: photosynthesis; human: burning fossil fuels",
      "Natural: respiration; human: planting growing forests",
      "Natural: photosynthesis; human: planting growing forests"
    ],
    "explanation": "For example, natural source: respiration or volcanic activity. Human activity: burning fossil fuels or deforestation.",
    "source": "../questions.js#ib-0257"
  },
  {
    "id": "ib-0258",
    "topic": "B.2 Greenhouse effect",
    "q": "Why do greenhouse gases absorb selected infrared wavelengths?",
    "a": "Photon energies match allowed molecular energy transitions",
    "wrong": [
      "All infrared photons have the same energy",
      "The gases reflect every wavelength equally",
      "Infrared photons are too heavy to pass through"
    ],
    "explanation": "Their molecular energy-level spacings match the photon energies.",
    "source": "../questions.js#ib-0258"
  },
  {
    "id": "ib-0259",
    "topic": "B.2 Greenhouse effect",
    "q": "Outline two ways in which energy absorbed from an infrared photon by a greenhouse-gas molecule can be transferred.",
    "a": "Collisions with other molecules and infrared emission in different directions",
    "wrong": [
      "Only reflection directly towards the Sun",
      "Only permanent storage inside the molecule",
      "Only visible-light emission towards the surface"
    ],
    "explanation": "The molecule can transfer energy to other molecules in collisions. It can also emit infrared radiation, with emission occurring in different directions, including towards the surface.",
    "source": "../questions.js#ib-0259"
  },
  {
    "id": "ib-0261",
    "topic": "B.2 Greenhouse effect",
    "q": "Define the enhanced greenhouse effect.",
    "a": "An increase in the greenhouse effect caused by human activities",
    "wrong": [
      "The natural greenhouse effect before human activity",
      "An increase in the solar constant caused by greenhouse gases",
      "A decrease in atmospheric infrared absorption"
    ],
    "explanation": "The increase in the greenhouse effect caused by human activities.",
    "source": "../questions.js#ib-0261"
  },
  {
    "id": "ib-0262",
    "topic": "B.2 Greenhouse effect",
    "q": "Why does the greenhouse effect warm Earth's surface?",
    "a": "Downward infrared emission reduces net energy loss from the surface",
    "wrong": [
      "Greenhouse gases create energy from nothing",
      "The atmosphere stops all energy escaping to space",
      "Greenhouse gases increase the power emitted by the Sun"
    ],
    "explanation": "Downward re-emission by the atmosphere reduces the net rate of energy loss from the surface.",
    "source": "../questions.js#ib-0262"
  },
  {
    "id": "ib-0263",
    "topic": "B.2 Greenhouse effect",
    "q": "State the equilibrium condition for a planet's average temperature.",
    "a": "Average absorbed power = average emitted power",
    "wrong": [
      "Average absorbed power = zero",
      "Average emitted power = zero",
      "Average absorbed power is always greater than emitted power"
    ],
    "explanation": "Average absorbed power equals average emitted power.",
    "source": "../questions.js#ib-0263"
  },
  {
    "id": "ib-0264",
    "topic": "B.2 Greenhouse effect",
    "q": "How does increasing albedo affect equilibrium temperature?",
    "a": "Temperature falls because less incoming radiation is absorbed",
    "wrong": [
      "Temperature rises because more radiation is absorbed",
      "Temperature falls because all infrared emission stops",
      "Temperature stays constant for any albedo change"
    ],
    "explanation": "It lowers the temperature because less incoming radiation is absorbed.",
    "source": "../questions.js#ib-0264"
  },
  {
    "id": "ib-0265",
    "topic": "B.2 Greenhouse effect",
    "q": "How does increasing emissivity affect emitted power at fixed temperature?",
    "a": "Emitted power increases in direct proportion",
    "wrong": [
      "Emitted power decreases in direct proportion",
      "Emitted power increases with emissivity to the fourth power",
      "Emitted power stays unchanged"
    ],
    "explanation": "It increases emitted power in direct proportion to emissivity.",
    "source": "../questions.js#ib-0265"
  },
  {
    "id": "ib-0266",
    "topic": "B.2 Greenhouse effect",
    "q": "A surface radiates 400 W m⁻²; a black body at the same temperature radiates 500 W m⁻². Calculate the emissivity of the surface.",
    "a": "0.80",
    "wrong": [
      "1.25",
      "0.20",
      "100"
    ],
    "explanation": "(a) e = actual/black = 0.800. [2]\n(b) Power per unit area is eσT⁴, so it increases by 2⁴ = 16. [1]",
    "source": "../questions.js#ib-0266"
  },
  {
    "id": "ib-0269",
    "topic": "B.2 Greenhouse effect",
    "q": "A planet scatters 30 W of the 120 W of radiation incident on it. Calculate the planet's albedo.",
    "a": "0.25",
    "wrong": [
      "0.75",
      "4.0",
      "0.40"
    ],
    "explanation": "Albedo = scattered/incident = 0.250.",
    "source": "../questions.js#ib-0269"
  },
  {
    "id": "ib-0272",
    "topic": "B.2 Greenhouse effect",
    "q": "A planet receives solar constant S = 1360 W m⁻². Calculate the mean incoming intensity before allowing for albedo.",
    "a": "340 W m⁻²",
    "wrong": [
      "1360 W m⁻²",
      "680 W m⁻²",
      "5440 W m⁻²"
    ],
    "explanation": "Mean intensity = S/4 = 340 W m⁻².",
    "source": "../questions.js#ib-0272"
  },
  {
    "id": "ib-0279",
    "topic": "B.2 Greenhouse effect",
    "q": "The mean radiation intensity incident on a planet is 340 W m⁻² and its albedo is 0.25. Calculate the mean intensity absorbed by the planet.",
    "a": "255 W m⁻²",
    "wrong": [
      "85 W m⁻²",
      "340 W m⁻²",
      "1360 W m⁻²"
    ],
    "explanation": "Absorbed intensity = (1-a)I = 255 W m⁻².",
    "source": "../questions.js#ib-0279"
  }
];
