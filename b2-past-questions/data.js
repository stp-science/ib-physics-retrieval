// B.2 practice. Shared question and worked-solution source for website and booklets.
const MC = [
  {
    "id": "m1",
    "title": "Global warming",
    "topic": "Greenhouse effect",
    "difficulty": 1,
    "q": "The rate of global warming will most likely be increased by:",
    "options": [
      "replacing coal-based power stations by nuclear power stations.",
      "reforestation.",
      "using natural gas instead of oil.",
      "decreasing the use of renewable energy sources."
    ],
    "answer": 3,
    "hint": "Which change is likely to increase reliance on fossil fuels?",
    "steps": [
      {
        "text": "Choose D: decreasing the use of renewable energy sources. If total energy demand stays the same, more energy will usually need to come from fossil fuels.",
        "math": []
      },
      {
        "text": "Burning fossil fuels releases carbon dioxide. More carbon dioxide strengthens the greenhouse effect by absorbing outgoing infrared radiation.",
        "math": []
      },
      {
        "text": "A would usually reduce carbon emissions from electricity generation. B removes carbon dioxide through photosynthesis. Burning natural gas generally produces less carbon dioxide per unit energy than burning oil, so C is not the best answer.",
        "math": []
      }
    ],
    "trap": "The question is asking which change would increase warming."
  },
  {
    "id": "m2",
    "title": "Identifying greenhouse gases",
    "topic": "Greenhouse gases",
    "difficulty": 2,
    "q": "Which of the following gases is not considered a greenhouse gas?",
    "options": [
      "Carbon dioxide (CO₂)",
      "Methane (CH₄)",
      "Oxygen (O₂)",
      "Nitrous oxide (N₂O)"
    ],
    "answer": 2,
    "hint": "A greenhouse gas must absorb the infrared wavelengths emitted by Earth.",
    "steps": [
      {
        "text": "Choose C: oxygen (O₂). A greenhouse gas must be able to absorb some of the infrared radiation emitted by Earth.",
        "math": []
      },
      {
        "text": "Carbon dioxide, methane and nitrous oxide can absorb this radiation through suitable molecular vibrations. Ordinary oxygen does not do this effectively and is not normally classed as a greenhouse gas.",
        "math": []
      }
    ],
    "trap": "Being present in the atmosphere does not automatically make a gas a greenhouse gas."
  },
  {
    "id": "m3",
    "title": "An average solar constant",
    "topic": "Solar constant",
    "difficulty": 2,
    "q": "The average value of the solar constant is 1.36 × 10³ W m⁻². Which of the following is a correct reason for using an average value for this constant?",
    "options": [
      "The orbit of the Earth around the Sun is circular.",
      "The albedo of the Earth is different at different locations.",
      "The atmosphere of the Earth is more dense closer to the surface of the Earth.",
      "The Sun has an 11 year cycle during which its power output varies."
    ],
    "answer": 3,
    "hint": "The solar constant is measured at the top of the atmosphere. Think about the source of the radiation.",
    "steps": [
      {
        "text": "Choose D. The Sun’s power output varies during its approximately 11-year activity cycle. An average value accounts for this variation.",
        "math": []
      },
      {
        "text": "The solar constant describes the incoming intensity at the top of the atmosphere, on a surface facing the Sun. Earth’s albedo and atmospheric density do not define it, so B and C do not answer the question.",
        "math": []
      },
      {
        "text": "A is false: Earth’s orbit is slightly elliptical, rather than circular. The changing Earth–Sun distance also causes variation during the year.",
        "math": []
      }
    ],
    "trap": "“Constant” here does not mean the measured value never changes."
  },
  {
    "id": "m4",
    "title": "Albedo of a forest",
    "topic": "Albedo",
    "q": "The Sun emits 4 × 10²⁶ J of energy per second. Of this, approximately 1400 J is incident on one square metre of the top of the atmosphere. The atmosphere above a forest reflects 400 J of this energy and the rest reaches the forest. The amount of energy absorbed by the forest is 280 J.\n\nWhat is the albedo of the forest?",
    "options": [
      "0.20",
      "0.28",
      "0.70",
      "0.72"
    ],
    "answer": 3,
    "hint": "First find the energy reaching the forest. Then find how much of that energy is reflected.",
    "steps": [
      {
        "text": "Identify the two quantities needed: energy reflected by the forest and energy arriving at the forest.",
        "math": [
          "α = <span class=\"frac\"><span>energy reflected by forest</span><span>energy arriving at forest</span></span>"
        ]
      },
      {
        "text": "Subtract the energy reflected by the atmosphere from the energy arriving at the top of the atmosphere. This gives the energy that reaches the forest.",
        "math": [
          "Energy arriving at forest = 1400 − 400 = 1000 J"
        ]
      },
      {
        "text": "The forest absorbs 280 J. In this question, assume the rest is reflected, so subtract 280 J from 1000 J.",
        "math": [
          "Energy reflected by forest = 1000 − 280 = 720 J"
        ]
      },
      {
        "text": "Put reflected energy on top and incident energy underneath.",
        "math": [
          "α = <span class=\"frac\"><span>720</span><span>1000</span></span>"
        ]
      },
      {
        "text": "Divide 720 by 1000. Albedo is a fraction, so it has no unit.",
        "math": [
          "α = 0.72"
        ]
      },
      {
        "text": "Select D. A quick check: 72% reflected plus 28% absorbed adds to 100% of the energy reaching the forest.",
        "math": []
      }
    ],
    "trap": "Use the energy reaching the forest, not the energy at the top of the atmosphere."
  },
  {
    "id": "m5",
    "title": "Interpreting an albedo",
    "topic": "Albedo",
    "difficulty": 3,
    "q": "The albedo of ice that covers a lake during winter is 0.75. This means that:",
    "options": [
      "the ice reflects 75% of the radiation that is incident on its surface.",
      "the ice reflects 25% of the radiation that is incident on its surface.",
      "75% of the radiation that is emitted by the ice falls into the ultraviolet region of the electromagnetic spectrum.",
      "25% of the radiation that is emitted by the ice falls into the ultraviolet region of the electromagnetic spectrum."
    ],
    "answer": 0,
    "hint": "Albedo describes reflected radiation as a fraction of incident radiation.",
    "steps": [
      {
        "text": "Choose A. Albedo means the fraction of incoming radiation that is reflected.",
        "math": [
          "α = <span class=\"frac\"><span>reflected power</span><span>incident power</span></span>"
        ]
      },
      {
        "text": "Change the decimal fraction to a percentage by multiplying by 100.",
        "math": [
          "0.75 × 100 = 75%"
        ]
      },
      {
        "text": "Therefore, the ice reflects 75% of the radiation arriving at its surface. The question is not asking about the wavelengths it emits.",
        "math": []
      }
    ],
    "trap": "Albedo measures reflection; emissivity describes thermal emission."
  },
  {
    "id": "m6",
    "title": "Why methane absorbs infrared",
    "topic": "Greenhouse gases",
    "difficulty": 3,
    "q": "Methane is said to be a greenhouse gas, because:",
    "options": [
      "some of its vibrational modes match the frequency of infrared photons.",
      "some of its vibrational modes match the frequency of ultraviolet photons.",
      "it absorbs ultraviolet radiation emitted by the Sun.",
      "it absorbs infrared radiation re-emitted by the surface of the Earth."
    ],
    "answer": 0,
    "hint": "What property of the molecule allows an infrared photon to transfer energy to it?",
    "steps": [
      {
        "text": "Choose A, as in the supplied answer. Some infrared photon frequencies match suitable vibrational transitions in methane molecules.",
        "math": []
      },
      {
        "text": "A photon with a suitable frequency can be absorbed and transfer energy to a molecular vibration. This explains why methane can absorb terrestrial infrared radiation.",
        "math": []
      },
      {
        "text": "Greenhouse gases absorb infrared and emit infrared in all directions, including towards the surface. This reduces the net rate at which the surface loses energy by radiation.",
        "math": []
      },
      {
        "text": "B and C refer to ultraviolet radiation, so they do not explain methane’s greenhouse action. D describes a real absorption process, but its “re-emitted” wording is imprecise. A gives the molecular explanation intended by this question.",
        "math": []
      }
    ],
    "trap": "A is the expected answer. Earth emits thermal infrared because of its temperature; methane can absorb some of it."
  },
  {
    "id": "m7",
    "title": "Two radiating spheres",
    "topic": "Stefan–Boltzmann law",
    "q": "Two spherical objects, X and Y, emit radiation at the same rate. The temperature of X is 200 K and its emissivity is ε. The temperature of Y is 100 K and its emissivity is 2ε.\n\nWhat is the ratio of the radius of object X to the radius of object Y?",
    "options": [
      "<span class=\"frac\"><span>1</span><span>√2</span></span>",
      "<span class=\"frac\"><span>1</span><span>2√2</span></span>",
      "<span class=\"frac\"><span>1</span><span>8</span></span>",
      "<span class=\"frac\"><span>1</span><span>16</span></span>"
    ],
    "answer": 1,
    "hint": "Use P = εσAT⁴ and A = 4πr². Set the two powers equal before rearranging.",
    "steps": [
      {
        "text": "Use the power emitted by a sphere. P is power, ε is emissivity, σ is a constant, r is radius and T is temperature.",
        "math": [
          "P = εσAT⁴",
          "A = 4πr²"
        ]
      },
      {
        "text": "The powers are equal. Put the values for X on the left and Y on the right. The emissivity of Y is 2ε.",
        "math": [
          "εσ(4πr<sub>X</sub>²)(200)⁴ = 2εσ(4πr<sub>Y</sub>²)(100)⁴"
        ]
      },
      {
        "text": "Divide both sides by ε, σ and 4π. These common factors cancel.",
        "math": [
          "r<sub>X</sub>² × 200⁴ = 2 × r<sub>Y</sub>² × 100⁴"
        ]
      },
      {
        "text": "Divide both sides by rᵧ² and by 200⁴. This puts the squared radius ratio on the left.",
        "math": [
          "<span class=\"frac\"><span>r<sub>X</sub>²</span><span>r<sub>Y</sub>²</span></span> = 2 × <span class=\"frac\"><span>100⁴</span><span>200⁴</span></span>"
        ]
      },
      {
        "text": "First divide the temperatures: 100 ÷ 200 = 0.5. Raise this to the fourth power, then multiply by 2.",
        "math": [
          "0.5⁴ = 0.5 × 0.5 × 0.5 × 0.5 = 0.0625",
          "2 × 0.0625 = 0.125"
        ]
      },
      {
        "text": "The squared radius ratio is 0.125. Take the square root to undo the square. Use the √ key.",
        "math": [
          "<span class=\"frac\"><span>r<sub>X</sub></span><span>r<sub>Y</sub></span></span> = <math xmlns=\"http://www.w3.org/1998/Math/MathML\" class=\"root-math\"><msqrt><mtext>0.125</mtext></msqrt></math> ≈ 0.354"
        ]
      },
      {
        "text": "Compare with the answer options. For B, first calculate √2, multiply it by 2, then divide 1 by that result.",
        "math": [
          "<span class=\"frac\"><span>1</span><span>2√2</span></span> ≈ <span class=\"frac\"><span>1</span><span>2 × 1.414</span></span> ≈ 0.354"
        ]
      },
      {
        "text": "Both values match, so choose B. As X is hotter, it needs a smaller radius to emit the same power.",
        "math": []
      }
    ],
    "trap": "The surface area of a sphere is proportional to r², not r."
  },
  {
    "id": "m8",
    "title": "Black-body statements",
    "topic": "Wien & Stefan–Boltzmann",
    "q": "The peak wavelength of radiation emitted by an object that can be considered a black body is 290 nm. The object emits 57 GJ of energy per second. Consider the following statements:\n\nI. The emissivity of the object is one.\nII. The temperature of the object is 10000 °C.\nIII. The surface area of the object is approximately 100 m².\n\nWhich of these statements are correct?",
    "options": [
      "I and II only",
      "I and III only",
      "II and III only",
      "I, II and III"
    ],
    "answer": 1,
    "hint": "Use Wien’s law to find T in kelvin, then use P = σAT⁴ to find A.",
    "steps": [
      {
        "text": "Check statement I first. An ideal black body has emissivity ε = 1, so statement I is true.",
        "math": []
      },
      {
        "text": "Convert the peak wavelength from nanometres to metres. Nano means 10⁻⁹.",
        "math": [
          "λ<sub>max</sub> = 290 × 10⁻⁹ m = 2.90 × 10⁻⁷ m"
        ]
      },
      {
        "text": "Use Wien’s law. To find T, divide both sides by the peak wavelength. The answer will be in kelvin.",
        "math": [
          "λ<sub>max</sub>T = 2.90 × 10⁻³",
          "T = <span class=\"frac\"><span>2.90 × 10⁻³</span><span>2.90 × 10⁻⁷</span></span> = 10000 K"
        ]
      },
      {
        "text": "Convert to Celsius by subtracting 273. Statement II says 10000 °C, so it is false.",
        "math": [
          "Temperature in °C = 10000 − 273 = 9727 °C"
        ]
      },
      {
        "text": "For statement III, convert the energy emitted per second to power. Giga means 10⁹; one joule per second is one watt.",
        "math": [
          "P = 57 × 10⁹ W = 5.7 × 10¹⁰ W"
        ]
      },
      {
        "text": "Use P = σAT⁴ because ε = 1. Divide both sides by σT⁴ to make A the subject.",
        "math": [
          "A = <span class=\"frac\"><span>P</span><span>σT⁴</span></span>"
        ]
      },
      {
        "text": "Calculate the denominator in two small steps: raise 10000 K to the fourth power, then multiply by σ.",
        "math": [
          "T⁴ = 10000⁴ = 1.00 × 10¹⁶",
          "σT⁴ = (5.67 × 10⁻⁸) × (1.00 × 10¹⁶) = 5.67 × 10⁸"
        ]
      },
      {
        "text": "Divide the power by this denominator. The result is approximately 100 m², so III is true. I and III are true: choose B.",
        "math": [
          "A = <span class=\"frac\"><span>5.7 × 10¹⁰</span><span>5.67 × 10⁸</span></span> ≈ 100.5 m² ≈ 100 m²"
        ]
      }
    ],
    "trap": "Wien’s law and the Stefan–Boltzmann law both require kelvin."
  },
  {
    "id": "m9",
    "title": "The orbit of Mars",
    "topic": "Inverse-square law",
    "difficulty": 4,
    "q": "The intensity of solar radiation at the orbit of Mars is approximately 600 W m⁻². If the orbital radius of Earth is R, what is the orbital radius of Mars?",
    "options": [
      "0.16R",
      "0.40R",
      "1.5R",
      "2.3R"
    ],
    "answer": 2,
    "hint": "Use 1360 W m⁻² at Earth. Intensity decreases as the square of distance increases.",
    "steps": [
      {
        "text": "Use the solar constant at Earth: 1360 W m⁻². At Mars it is 600 W m⁻². The lower intensity tells us Mars is farther away.",
        "math": []
      },
      {
        "text": "Use the inverse-square law. Intensity × distance² is the same at both orbits. R is Earth’s orbital radius; r is Mars’s orbital radius.",
        "math": [
          "I<sub>Earth</sub>R² = I<sub>Mars</sub>r²"
        ]
      },
      {
        "text": "Substitute the intensities.",
        "math": [
          "1360R² = 600r²"
        ]
      },
      {
        "text": "Divide both sides by 600R² to find the squared distance ratio.",
        "math": [
          "<span class=\"frac\"><span>r²</span><span>R²</span></span> = <span class=\"frac\"><span>1360</span><span>600</span></span> ≈ 2.2667"
        ]
      },
      {
        "text": "Take the square root to undo the square. On a calculator, calculate 1360 ÷ 600, then press √.",
        "math": [
          "<span class=\"frac\"><span>r</span><span>R</span></span> = <math xmlns=\"http://www.w3.org/1998/Math/MathML\" class=\"root-math\"><msqrt><mtext>2.2667</mtext></msqrt></math> ≈ 1.51"
        ]
      },
      {
        "text": "Mars’s orbital radius is therefore about 1.5 times Earth’s. Choose C.",
        "math": [
          "r ≈ 1.5R"
        ]
      }
    ],
    "trap": "The intensity ratio gives the squared distance ratio. Remember the square root."
  }
];
const PAPERS = [
  {
    "id": "venus",
    "title": "Venus & the greenhouse effect",
    "topic": "Planetary energy balance",
    "intro": "The intensity of solar radiation at the orbit of Venus is approximately 2.6 × 10³ W m⁻².",
    "parts": [
      {
        "id": "v-a",
        "label": "a",
        "marks": 2,
        "difficulty": 3,
        "q": "Determine the ratio of the Venus-to-Sun distance to the Earth-to-Sun distance.",
        "hint": "Compare the intensities using I ∝ 1/r². Use 1.36 × 10³ W m⁻² at Earth.",
        "answer": "Venus-to-Sun distance / Earth-to-Sun distance ≈ 0.72",
        "steps": [
          {
            "text": "Write the known intensities in ordinary numbers. Let rᵥ be the Venus–Sun distance and rₑ be the Earth–Sun distance.",
            "math": [
              "I<sub>Venus</sub> = 2600 W m⁻²; I<sub>Earth</sub> = 1360 W m⁻²"
            ]
          },
          {
            "text": "Use the inverse-square law: intensity × distance² is the same at both orbits.",
            "math": [
              "I<sub>Venus</sub>r<sub>V</sub>² = I<sub>Earth</sub>r<sub>E</sub>²"
            ]
          },
          {
            "text": "Substitute the known values.",
            "math": [
              "2600r<sub>V</sub>² = 1360r<sub>E</sub>²"
            ]
          },
          {
            "text": "Divide both sides by 2600 and by rₑ². This gives the squared ratio requested.",
            "math": [
              "<span class=\"frac\"><span>r<sub>V</sub>²</span><span>r<sub>E</sub>²</span></span> = <span class=\"frac\"><span>1360</span><span>2600</span></span> ≈ 0.52308"
            ]
          },
          {
            "text": "Take the square root to undo the square. Calculate 1360 ÷ 2600, then press √.",
            "math": [
              "<span class=\"frac\"><span>r<sub>V</sub></span><span>r<sub>E</sub></span></span> = <math xmlns=\"http://www.w3.org/1998/Math/MathML\" class=\"root-math\"><msqrt><mtext>0.52308</mtext></msqrt></math> ≈ 0.723 ≈ 0.72"
            ]
          },
          {
            "text": "The ratio has no unit because it is a distance divided by a distance. It is less than 1, which makes sense: Venus is closer to the Sun.",
            "math": []
          }
        ],
        "check": [
          "Use the inverse-square law.",
          "Take the square root and give a dimensionless ratio."
        ]
      },
      {
        "id": "v-b",
        "label": "b",
        "marks": 3,
        "difficulty": 4,
        "q": "Assuming that Venus acts as a black body, show that the mean surface temperature of Venus is 54 °C.",
        "hint": "Start with Iπr² = σ(4πr²)T⁴. Cancel πr², divide by 4σ, then take the fourth root.",
        "answer": "T ≈ 327 K ≈ 54 °C in this ideal black-body model.",
        "steps": [
          {
            "text": "At equilibrium, power absorbed equals power emitted. Venus intercepts sunlight over a circular area πr², but emits over its whole spherical surface 4πr². For a black body, ε = 1.",
            "math": [
              "Iπr² = σ(4πr²)T⁴"
            ]
          },
          {
            "text": "Divide both sides by πr². The same factor cancels on each side.",
            "math": [
              "I = 4σT⁴"
            ]
          },
          {
            "text": "Divide both sides by 4σ. This leaves T⁴ on its own.",
            "math": [
              "T⁴ = <span class=\"frac\"><span>I</span><span>4σ</span></span>"
            ]
          },
          {
            "text": "Substitute I = 2600 W m⁻² and σ = 5.67 × 10⁻⁸. Calculate the bottom first: 4 × σ = 2.268 × 10⁻⁷.",
            "math": [
              "T⁴ = <span class=\"frac\"><span>2600</span><span>2.268 × 10⁻⁷</span></span> ≈ 1.1464 × 10¹⁰"
            ]
          },
          {
            "text": "Take the fourth root to undo the fourth power. On a calculator, take the square root twice. The fourth root is also written as power ¼.",
            "math": [
              "T = <math xmlns=\"http://www.w3.org/1998/Math/MathML\" class=\"root-math\"><mroot><mtext>1.1464 × 10¹⁰</mtext><mn>4</mn></mroot></math> ≈ 327.2 K"
            ]
          },
          {
            "text": "Convert kelvin to Celsius by subtracting 273.",
            "math": [
              "Temperature in °C = 327.2 − 273 = 54.2 °C ≈ 54 °C"
            ]
          },
          {
            "text": "This is the temperature of the ideal black-body model. Venus’s real atmosphere produces a strong greenhouse effect, so its actual surface is much hotter.",
            "math": []
          }
        ],
        "check": [
          "Use πr² for interception and 4πr² for emission.",
          "Rearrange with a fourth root.",
          "Calculate in kelvin, then convert to °C."
        ]
      },
      {
        "id": "v-c",
        "label": "c",
        "marks": 2,
        "difficulty": 2,
        "q": "The mean surface temperature of the Earth has been rising over the past decades due to the effect of greenhouse gases, such as carbon dioxide (CO₂). Write down one sink and one source of this gas.",
        "hint": "A source adds CO₂ to the atmosphere; a sink removes it.",
        "answer": "Sink: photosynthesis by plants. Source: burning fossil fuels.",
        "steps": [
          {
            "text": "A sink removes carbon dioxide from the atmosphere. Example: plants absorb CO₂ during photosynthesis and store the carbon in biomass.",
            "math": []
          },
          {
            "text": "A source adds carbon dioxide to the atmosphere. Example: burning fossil fuels releases CO₂.",
            "math": []
          },
          {
            "text": "For this two-mark answer, name one sink and one source. You do not need a calculation.",
            "math": []
          }
        ],
        "check": [
          "Give one process that removes atmospheric CO₂.",
          "Give one process that adds atmospheric CO₂."
        ]
      },
      {
        "id": "v-d",
        "label": "d",
        "marks": 3,
        "difficulty": 4,
        "q": "The atmosphere of Planet X is composed of the same gases as the atmosphere of the Earth. The ratio (number of gas particles per m³ in the atmosphere of Planet X) / (number of gas particles per m³ in the atmosphere of Earth) is 0.02. Explain the effect that this has on the greenhouse effect on Planet X.",
        "hint": "For a comparable atmospheric path length and gas proportions, how does a lower particle density affect absorption of outgoing infrared?",
        "answer": "Planet X would have a weaker greenhouse effect, assuming comparable gas proportions and atmospheric path length.",
        "steps": [
          {
            "text": "Interpret the given ratio. Multiply 0.02 by 100 to convert it to a percentage.",
            "math": [
              "0.02 × 100 = 2%"
            ]
          },
          {
            "text": "There are only 2% as many gas particles per cubic metre as in Earth’s atmosphere. Assuming the same gas proportions, this also means fewer greenhouse-gas molecules per cubic metre.",
            "math": []
          },
          {
            "text": "For a comparable atmospheric path length, fewer greenhouse-gas molecules absorb less outgoing infrared radiation. Less infrared is emitted back towards the surface.",
            "math": []
          },
          {
            "text": "More infrared can escape directly to space, so the greenhouse warming is weaker. Do not say the temperature or greenhouse effect is exactly 2% of Earth’s: other atmospheric conditions also matter.",
            "math": []
          }
        ],
        "check": [
          "Identify fewer greenhouse-gas molecules per unit volume.",
          "Link this to reduced infrared absorption and downward emission.",
          "Conclude that greenhouse warming is weaker under comparable conditions."
        ]
      }
    ]
  },
  {
    "id": "mars",
    "title": "Solar radiation & Mars",
    "topic": "Radiation and albedo",
    "intro": "The average distance between the Sun and Mars is 2.14 × 10⁸ km. The radius of the Sun is 6.96 × 10⁵ km and its average surface temperature is 5505 °C.",
    "parts": [
      {
        "id": "ma-a",
        "label": "a",
        "marks": 2,
        "difficulty": 2,
        "q": "Distinguish between thermal radiation and thermal conduction.",
        "hint": "Compare the transfer mechanism and whether a material medium is needed.",
        "answer": "Radiation transfers energy by electromagnetic waves; conduction transfers energy through interactions between particles in matter.",
        "steps": [
          {
            "text": "Thermal radiation transfers energy by electromagnetic waves. It can travel through a vacuum, so it does not need matter.",
            "math": []
          },
          {
            "text": "Thermal conduction transfers energy through microscopic interactions between particles in matter. Metals also transfer energy through mobile electrons.",
            "math": []
          },
          {
            "text": "The key distinction: radiation can cross a vacuum; conduction needs a material medium. Conduction does not involve bulk movement of the material.",
            "math": []
          }
        ],
        "check": [
          "State that radiation uses electromagnetic waves and needs no medium.",
          "State that conduction uses microscopic interactions in matter."
        ]
      },
      {
        "id": "ma-b",
        "label": "b",
        "marks": 4,
        "difficulty": 5,
        "q": "Show that the intensity of solar radiation at the orbit of Mars is approximately 668 W m⁻².",
        "hint": "Use T = 5505 + 273 and convert km to m. Combine L = σ4πR²T⁴ with I = L/(4πd²), then calculate in small steps.",
        "answer": "I ≈ 668 W m⁻²",
        "steps": [
          {
            "text": "Convert the Sun’s temperature to kelvin by adding 273. Use kelvin in the Stefan–Boltzmann law.",
            "math": [
              "T = 5505 + 273 = 5778 K"
            ]
          },
          {
            "text": "Convert both distances from kilometres to metres by multiplying by 1000. R is the Sun’s radius; d is the Sun–Mars distance.",
            "math": [
              "R = (6.96 × 10⁵) × 1000 = 6.96 × 10⁸ m",
              "d = (2.14 × 10⁸) × 1000 = 2.14 × 10¹¹ m"
            ]
          },
          {
            "text": "Treat the Sun as a black body. Its luminosity L is its total emitted power.",
            "math": [
              "L = σ(4πR²)T⁴"
            ]
          },
          {
            "text": "At Mars, that power spreads over a sphere with area 4πd². Substitute the luminosity formula, then cancel 4π.",
            "math": [
              "I = <span class=\"frac\"><span>L</span><span>4πd²</span></span> = <span class=\"frac\"><span>σ(4πR²)T⁴</span><span>4πd²</span></span>",
              "I = σT⁴ × (<span class=\"frac\"><span>R</span><span>d</span></span>)²"
            ]
          },
          {
            "text": "Calculate σT⁴: first raise the temperature to the fourth power, then multiply by σ.",
            "math": [
              "5778⁴ ≈ 1.1146 × 10¹⁵",
              "(5.67 × 10⁻⁸) × (5778⁴) ≈ 6.3197 × 10⁷"
            ]
          },
          {
            "text": "Calculate the distance ratio, then square it. Put each number in brackets when entering scientific notation.",
            "math": [
              "<span class=\"frac\"><span>R</span><span>d</span></span> = <span class=\"frac\"><span>6.96 × 10⁸</span><span>2.14 × 10¹¹</span></span> ≈ 0.0032523",
              "(0.0032523)² ≈ 1.0578 × 10⁻⁵"
            ]
          },
          {
            "text": "Multiply the two results. Keep full calculator values until the final answer.",
            "math": [
              "I ≈ (6.3197 × 10⁷) × (1.0578 × 10⁻⁵)",
              "I ≈ 668.47 W m⁻² ≈ 668 W m⁻²"
            ]
          },
          {
            "text": "Check the unit: intensity is power per unit area, so the unit is W m⁻².",
            "math": []
          }
        ],
        "check": [
          "Convert °C to K and km to m.",
          "Use the Sun’s emitting area 4πR².",
          "Spread the emitted power over 4πd².",
          "Obtain approximately 668 W m⁻²."
        ]
      },
      {
        "id": "ma-c",
        "label": "c",
        "marks": 2,
        "difficulty": 3,
        "q": "The average intensity of solar radiation at the surface of Mars is 150 W m⁻². Calculate the albedo of Mars’s atmosphere. Give your answer to an appropriate number of significant figures.",
        "hint": "Average 668 W m⁻² over the whole spherical planet first: divide by 4. Then compare with 150 W m⁻².",
        "answer": "Albedo α ≈ 0.10 (2 significant figures)",
        "steps": [
          {
            "text": "First find the incoming intensity averaged over the whole planet. The orbit value, 668 W m⁻², applies to a surface facing the Sun. Divide by 4 because a sphere has four times the area of its circular cross-section.",
            "math": [
              "Mean incoming intensity = <span class=\"frac\"><span>668</span><span>4</span></span> = 167 W m⁻²"
            ]
          },
          {
            "text": "The mean intensity reaching the surface is 150 W m⁻². In this simplified model, assume the missing intensity is reflected, with atmospheric absorption neglected.",
            "math": [
              "Mean reflected intensity = 167 − 150 = 17 W m⁻²"
            ]
          },
          {
            "text": "Use reflected divided by incoming. Use 167 underneath because it is the global mean before reflection.",
            "math": [
              "α = <span class=\"frac\"><span>reflected intensity</span><span>incoming intensity</span></span> = <span class=\"frac\"><span>17</span><span>167</span></span>"
            ]
          },
          {
            "text": "Divide and round. The result is a fraction, so it has no unit.",
            "math": [
              "α ≈ 0.1018 ≈ 0.10 (2 significant figures)"
            ]
          },
          {
            "text": "Check: an albedo of 0.10 means about 10% reflected and 90% reaching the surface in this model. Do not calculate 1 − 150/668: those intensities use different averages.",
            "math": []
          }
        ],
        "check": [
          "Use the globally averaged incident intensity of 167 W m⁻².",
          "Obtain albedo ≈ 0.10, with no unit."
        ]
      },
      {
        "id": "ma-di",
        "label": "d(i)",
        "marks": 2,
        "difficulty": 3,
        "q": "Mars behaves as a perfect black body. Deduce that the average surface temperature of Mars is −46 °C.",
        "hint": "Use the globally averaged absorbed intensity of 150 W m⁻², so σT⁴ = 150.",
        "answer": "T ≈ 227 K ≈ −46 °C",
        "steps": [
          {
            "text": "A perfect black body has ε = 1. At equilibrium, its emitted intensity equals the absorbed global mean intensity, 150 W m⁻².",
            "math": [
              "σT⁴ = 150"
            ]
          },
          {
            "text": "Divide both sides by σ to leave T⁴ on its own.",
            "math": [
              "T⁴ = <span class=\"frac\"><span>150</span><span>σ</span></span>"
            ]
          },
          {
            "text": "Substitute σ and calculate the division.",
            "math": [
              "T⁴ = <span class=\"frac\"><span>150</span><span>5.67 × 10⁻⁸</span></span> ≈ 2.6455 × 10⁹"
            ]
          },
          {
            "text": "Take the fourth root to undo the fourth power. Use the fourth-root key, or take the square root twice.",
            "math": [
              "T = <math xmlns=\"http://www.w3.org/1998/Math/MathML\" class=\"root-math\"><mroot><mtext>2.6455 × 10⁹</mtext><mn>4</mn></mroot></math> ≈ 226.8 K"
            ]
          },
          {
            "text": "Subtract 273 to convert to degrees Celsius.",
            "math": [
              "Temperature in °C = 226.8 − 273 = −46.2 °C ≈ −46 °C"
            ]
          }
        ],
        "check": [
          "Use the absorbed global mean intensity of 150 W m⁻².",
          "Take a fourth root and convert kelvin to °C."
        ]
      },
      {
        "id": "ma-dii",
        "label": "d(ii)",
        "marks": 2,
        "difficulty": 2,
        "q": "Calculate the peak wavelength in the intensity of radiation emitted by the surface of Mars.",
        "hint": "Apply Wien’s law using the temperature in kelvin from part d(i).",
        "answer": "λₘₐₓ ≈ 1.3 × 10⁻⁵ m ≈ 13 μm (infrared)",
        "steps": [
          {
            "text": "Use the kelvin temperature from part d(i): T ≈ 226.8 K. Do not use −46 °C in Wien’s law.",
            "math": []
          },
          {
            "text": "Write Wien’s displacement law. Divide both sides by T to make the peak wavelength the subject.",
            "math": [
              "λ<sub>max</sub>T = 2.90 × 10⁻³",
              "λ<sub>max</sub> = <span class=\"frac\"><span>2.90 × 10⁻³</span><span>T</span></span>"
            ]
          },
          {
            "text": "Substitute the temperature, then divide. On a calculator, enter (2.90 × 10⁻³) ÷ 226.8.",
            "math": [
              "λ<sub>max</sub> = <span class=\"frac\"><span>2.90 × 10⁻³</span><span>226.8</span></span> ≈ 1.28 × 10⁻⁵ m"
            ]
          },
          {
            "text": "To express this in micrometres, multiply the answer in metres by 10⁶.",
            "math": [
              "λ<sub>max</sub> ≈ (1.28 × 10⁻⁵) × 10⁶ = 12.8 μm ≈ 13 μm"
            ]
          },
          {
            "text": "The peak is in the infrared region. A sensible rounded answer is 1.3 × 10⁻⁵ m or 13 μm.",
            "math": []
          }
        ],
        "check": [
          "Use T ≈ 227 K, not −46 °C.",
          "Give the peak wavelength with an appropriate unit."
        ]
      }
    ]
  }
];
