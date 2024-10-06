"use client"

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import React from 'react'

const telescopes = [
  {
    name: "Kepler Space Telescope",
    description: "NASA's groundbreaking mission that discovered thousands of exoplanets.",
    discoveries: [
      { name: "Kepler-186f", description: "First Earth-sized planet discovered in the habitable zone of another star." },
      { name: "Kepler-16b", description: "First confirmed circumbinary planet, orbiting two stars." },
      { name: "Kepler-22b", description: "First planet in the habitable zone of a sun-like star." },
    ]
  },
  {
    name: "James Webb Space Telescope",
    description: "The most powerful space telescope ever built, capable of studying exoplanet atmospheres.",
    discoveries: [
      { name: "WASP-39 b", description: "First detection of carbon dioxide in an exoplanet atmosphere." },
      { name: "LHS 475 b", description: "Earth-sized exoplanet with potential for an atmosphere." },
      { name: "WASP-96 b", description: "Clear signature of water, along with evidence for clouds and haze, in the atmosphere surrounding a hot, puffy gas giant planet." },
    ]
  },
]

export default function TelescopesPage() {
  const [selectedTelescope, setSelectedTelescope] = useState(telescopes[0])

  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
      <Image
        src="https://img.freepik.com/premium-photo/abstract-planets-space-background_343732-19002.jpg"
        alt="Space background"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
        className="opacity-50"
      />
      <div className="relative z-10 container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Telescopes and Discoveries</h1>
        <Tabs defaultValue={telescopes[0].name} onValueChange={(value) => setSelectedTelescope(telescopes.find(t => t.name === value))}>
          <TabsList className="justify-center mb-8">
            {telescopes.map((telescope) => (
              <TabsTrigger key={telescope.name} value={telescope.name}>
                {telescope.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {telescopes.map((telescope) => (
            <TabsContent key={telescope.name} value={telescope.name}>
              <div className="grid grid-cols-1 gap-8">
                <Card className="bg-gray-800 bg-opacity-70">
                  <CardHeader>
                    <CardTitle className="text-2xl">{telescope.name}</CardTitle>
                    <CardDescription className="text-gray-300">{telescope.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-xl font-semibold mb-4">Notable Discoveries</h3>
                    <ul className="space-y-4">
                      {telescope.discoveries.map((discovery, index) => (
                        <motion.li
                          key={discovery.name}
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="bg-gray-700 bg-opacity-50 p-4 rounded-lg"
                        >
                          <h4 className="text-lg font-semibold text-blue-300">{discovery.name}</h4>
                          <p className="text-gray-300">{discovery.description}</p>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}