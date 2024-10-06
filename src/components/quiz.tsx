'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import React from 'react'

const categories = [
  { id: 'exoplanets', name: 'Exoplanets' },
  { id: 'telescopes', name: 'Telescopes' },
  { id: 'types', name: 'Exoplanet Types' },
  { id: 'discovery', name: 'Discovery Methods' },
]

const questions = {
  exoplanets: [
    {
      question: "What is an exoplanet?",
      options: [
        "A planet in our solar system",
        "A planet orbiting a star other than the Sun",
        "A dwarf planet",
        "A moon orbiting a planet"
      ],
      correctAnswer: 1
    },
    {
      question: "Which is the closest known exoplanet to Earth?",
      options: [
        "Kepler-186f",
        "TRAPPIST-1e",
        "Proxima Centauri b",
        "HD 209458 b"
      ],
      correctAnswer: 2
    },
    {
      question: "In which year was the first exoplanet discovered?",
      options: ["1992", "1995", "2000", "2005"],
      correctAnswer: 0
    },
    {
      question: "How many confirmed exoplanets have been discovered as of 2024?",
      options: ["About 1,000", "About 5,000", "About 10,000", "About 20,000"],
      correctAnswer: 1
    },
    {
      question: "Which space mission has discovered the most exoplanets to date?",
      options: ["Hubble", "TESS", "Kepler", "James Webb"],
      correctAnswer: 2
    },
    {
      question: "What is the 'habitable zone' of a star?",
      options: [
        "The area where planets can form",
        "The region where liquid water could exist on a planet's surface",
        "The zone where stars are born",
        "The area where asteroids are most common"
      ],
      correctAnswer: 1
    },
    {
      question: "Which exoplanet is often called 'Earth's cousin' due to its similar size and orbit?",
      options: ["Kepler-452b", "TRAPPIST-1e", "Proxima Centauri b", "Gliese 581g"],
      correctAnswer: 0
    },
    {
      question: "What is the term for a planet that orbits two stars instead of one?",
      options: ["Binary planet", "Dual planet", "Circumbinary planet", "Double planet"],
      correctAnswer: 2
    },
    {
      question: "Which of these is NOT a method used to detect exoplanets?",
      options: ["Transit method", "Radial velocity method", "Gravitational lensing", "X-ray diffraction"],
      correctAnswer: 3
    },
    {
      question: "What is the name of the NASA mission dedicated to finding Earth-sized and smaller planets?",
      options: ["TESS", "Kepler", "CHEOPS", "PLATO"],
      correctAnswer: 0
    }
  ],
  telescopes: [
    {
      question: "Which space telescope, launched in 2009, was specifically designed to search for exoplanets?",
      options: [
        "Hubble Space Telescope",
        "James Webb Space Telescope",
        "Kepler Space Telescope",
        "Spitzer Space Telescope"
      ],
      correctAnswer: 2
    },
    {
      question: "Which future NASA telescope is expected to greatly advance our understanding of exoplanets?",
      options: [
        "Nancy Grace Roman Space Telescope",
        "Chandra X-ray Observatory",
        "Fermi Gamma-ray Space Telescope",
        "Compton Gamma Ray Observatory"
      ],
      correctAnswer: 0
    },
    {
      question: "Which telescope took over Kepler's exoplanet-hunting mission?",
      options: ["TESS", "Hubble", "James Webb", "Spitzer"],
      correctAnswer: 0
    },
    {
      question: "What type of telescope is the James Webb Space Telescope?",
      options: ["X-ray telescope", "Infrared telescope", "Radio telescope", "Gamma-ray telescope"],
      correctAnswer: 1
    },
    {
      question: "Which ground-based telescope array is used for exoplanet research?",
      options: ["Very Large Array", "ALMA", "Event Horizon Telescope", "Very Large Telescope"],
      correctAnswer: 3
    },
    {
      question: "What is the primary mirror diameter of the James Webb Space Telescope?",
      options: ["2.4 meters", "6.5 meters", "8.4 meters", "10 meters"],
      correctAnswer: 1
    },
    {
      question: "Which space telescope was the first to directly image an exoplanet?",
      options: ["Hubble", "Spitzer", "Kepler", "COROT"],
      correctAnswer: 0
    },
    {
      question: "What is the main advantage of space-based telescopes over ground-based ones for exoplanet research?",
      options: [
        "They're cheaper to build",
        "They can observe 24/7 without atmospheric interference",
        "They're easier to maintain",
        "They can be much larger"
      ],
      correctAnswer: 1
    },
    {
      question: "Which telescope uses the transit method to detect exoplanets?",
      options: ["TESS", "Chandra", "Fermi", "XMM-Newton"],
      correctAnswer: 0
    },
    {
      question: "What is the expected operational lifetime of the James Webb Space Telescope?",
      options: ["5 years", "10 years", "20 years", "30 years"],
      correctAnswer: 1
    }
  ],
  types: [
    {
      question: "What is a 'Hot Jupiter'?",
      options: [
        "A gas giant planet orbiting very close to its star",
        "A rocky planet with a molten surface",
        "A planet with a thick, hot atmosphere",
        "Jupiter when it's at its closest point to the Sun"
      ],
      correctAnswer: 0
    },
    {
      question: "What is a 'Super-Earth'?",
      options: [
        "A planet exactly like Earth but larger",
        "A rocky planet up to 10 times the mass of Earth",
        "A gas giant planet smaller than Jupiter",
        "An exoplanet with a super-powered magnetic field"
      ],
      correctAnswer: 1
    },
    {
      question: "What is an 'Ocean World'?",
      options: [
        "A planet completely covered in water",
        "A planet with more water than land",
        "A planet with subsurface oceans",
        "Any of the above"
      ],
      correctAnswer: 3
    },
    {
      question: "What is a 'Mini-Neptune'?",
      options: [
        "A planet smaller than Neptune but larger than Earth",
        "A gas giant with a small solid core",
        "A planet with a very thin atmosphere",
        "A moon orbiting a Neptune-like planet"
      ],
      correctAnswer: 0
    },
    {
      question: "What is a 'Rogue Planet'?",
      options: [
        "A planet with an extremely elliptical orbit",
        "A planet that doesn't orbit any star",
        "A planet that orbits two stars",
        "A planet with a retrograde rotation"
      ],
      correctAnswer: 1
    },
    {
      question: "What is a 'Chthonian Planet'?",
      options: [
        "A planet with a mostly underground biosphere",
        "A planet with a very thick atmosphere",
        "A gas giant that has lost its atmosphere",
        "A planet with extreme volcanic activity"
      ],
      correctAnswer: 2
    },
    {
      question: "What is a 'Pulsar Planet'?",
      options: [
        "A planet that emits radio waves",
        "A planet orbiting a pulsar",
        "A planet with a pulsating core",
        "A planet with extreme day-night temperature differences"
      ],
      correctAnswer: 1
    },
    {
      question: "What is a 'Carbon Planet'?",
      options: [
        "A planet with a carbon-based atmosphere",
        "A planet with a diamond core",
        "A planet with more carbon than oxygen in its composition",
        "A planet covered in carbon-based life forms"
      ],
      correctAnswer: 2
    },
    {
      question: "What is an 'Eyeball Planet'?",
      options: [
        "A planet with a large, eye-like feature on its surface",
        "A tidally locked planet with one habitable side",
        "A planet with a thin, transparent atmosphere",
        "A planet that appears to 'wink' due to its orbit"
      ],
      correctAnswer: 1
    },
    {
      question: "What is a 'Super-Puff'?",
      options: [
        "A planet with an extremely low density",
        "A planet with a very thick, puffy atmosphere",
        "A gas giant larger than Jupiter",
        "A planet covered in clouds"
      ],
      correctAnswer: 1
    }
  ],
  discovery: [
    {
      question: "Which method has discovered the most exoplanets to date?",
      options: [
        "Direct imaging",
        "Radial velocity",
        "Transit method",
        "Gravitational microlensing"
      ],
      correctAnswer: 2
    },
    {
      question: "What does the transit method measure to detect exoplanets?",
      options: [
        "The wobble of a star",
        "The bending of light from a distant star",
        "The dimming of a star's light",
        "The radio waves emitted by a planet"
      ],
      correctAnswer: 2
    },
    {
      question: "What is the principle behind the radial velocity method?",
      options: [
        "Detecting the star's motion towards and away from Earth",
        "Measuring the star's brightness changes",
        "Observing the planet directly",
        "Analyzing the star's spectrum for planetary atmospheres"
      ],
      correctAnswer: 0
    },
    {
      question: "Which method can potentially detect exoplanets around distant stars?",
      options: [
        "Transit method",
        "Radial velocity method",
        "Direct imaging",
        "Gravitational microlensing"
      ],
      correctAnswer: 3
    },
    {
      question: "What is astrometry in the context of exoplanet discovery?",
      options: [
        "Measuring a star's position in the sky over time",
        "Analyzing the chemical composition of exoplanets",
        "Detecting radio waves from exoplanets",
        "Observing exoplanets through telescopes"
      ],
      correctAnswer: 0
    },
    {
      question: "Which method is most effective for detecting planets around very young stars?",
      options: [
        "Transit method",
        "Radial velocity method",
        "Direct imaging",
        "Gravitational microlensing"
      ],
      correctAnswer: 2
    },
    {
      question: "What is the main limitation of the transit method?",
      options: [
        "It can only detect large planets",
        "It requires the planet's orbit to be edge-on to our line of sight",
        "It's very slow",
        "It can only detect planets around small stars"
      ],
      correctAnswer: 1
    },
    {
      question: "Which method can provide information about an exoplanet's atmosphere?",
      options: [
        "Radial velocity",
        "Transit spectroscopy",
        "Astrometry",
        "Timing variations"
      ],
      correctAnswer: 1
    },
    {
      question: "What is the 'Doppler beaming' method of exoplanet detection?",
      options: [
        "Detecting changes in star brightness due to relativistic effects",
        "Measuring the star's wobble",
        "Observing planets directly",
        "Analyzing gravitational waves"
      ],
      correctAnswer: 0
    },
    {
      question: "Which method relies on detecting tiny changes in the timing of a pulsar's radio pulses?",
      options: [
        "Pulsar timing",
        "Transit method",
        "Radial velocity",
        "Direct imaging"
      ],
      correctAnswer: 0
    }
  ]
}

export default function Quiz() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
  }

  const handleAnswerSubmit = () => {
    if (selectedAnswer === questions[selectedCategory][currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    if (currentQuestion < questions[selectedCategory].length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      setShowResult(true)
    }
  }

  const resetQuiz = () => {
    setSelectedCategory(null)
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswer(null)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center">Exoplanet Quiz</h1>
      {!selectedCategory ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => (
            <Card key={category.id} className="cursor-pointer hover:bg-primary/10 transition-colors" onClick={() => handleCategorySelect(category.id)}>
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
                <CardDescription>Test your knowledge about {category.name.toLowerCase()}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : showResult ? (
        <Card>
          <CardHeader>
            <CardTitle>Quiz Results</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl mb-4">Your score: {score} / {questions[selectedCategory].length}</p>
            <Button onClick={resetQuiz}>Try Another Category</Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Question {currentQuestion + 1}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl mb-4">{questions[selectedCategory][currentQuestion].question}</p>
            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
              {questions[selectedCategory][currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
            <Button className="mt-4" onClick={handleAnswerSubmit} disabled={selectedAnswer === null}>
              {currentQuestion < questions[selectedCategory].length - 1 ? 'Next Question' : 'Finish Quiz'}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}