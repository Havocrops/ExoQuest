"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Telescope, Gamepad2, Palette, Film } from 'lucide-react'
import React from 'react'

export default function HomePage() {
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    const video = document.querySelector('video')
    if (video) {
      video.addEventListener('loadeddata', () => setVideoLoaded(true))
    }
    return () => {
      if (video) {
        video.removeEventListener('loadeddata', () => setVideoLoaded(true))
      }
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {!videoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <video
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          videoLoaded ? 'opacity-50' : 'opacity-0'
        }`}
      >
        <source src="/excesshotJupitervidhires" type="video/mp4" />
      </video>
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-bold text-center mb-8"
        >
          ExoQuest
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl md:text-2xl text-center mb-12"
        >
          Embark on a journey to distant worlds and explore the wonders of exoplanets!
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Telescopes", icon: Telescope, href: "/telescopes", image: "https://science.nasa.gov/wp-content/uploads/2023/07/hubble-space-telescope-hst-6.jpg?w=1024&format=webp" },
            { title: "Quiz", icon: Gamepad2, href: "/quiz", image: "https://media.wnyc.org/i/800/0/c/85/1/185519800.jpg" },
            { title: "Art Studio", icon: Palette, href: "/art-studio", image: "https://images.nightcafe.studio/jobs/ZfCHYx692HEZQ95Fwv4P/ZfCHYx692HEZQ95Fwv4P--2--lkh6l_4x.jpg?tr=w-1200,c-at_max" },
            { title: "Resources", icon: Film, href: "/resources", image: "https://www.nasa.gov/wp-content/uploads/2017/12/1-giada-1.jpg?resize=1024,576" },
            { title: "Article", icon: Palette, href: "/article", image: "https://static.scientificamerican.com/sciam/cache/file/640FFA7C-AA3F-45A1-8E2417B1B3DDB8E9_source.jpg?w=900" },
            { title: "About ExoPlanet", icon: Film, href: "/about", image: "https://spaceplace.nasa.gov/all-about-exoplanets/en/all-about-exoplanets1.en.png" },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 1 }}
            >
              <Link href={item.href} className="block">
                <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={item.image}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 transform hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <item.icon className="w-12 h-12 text-white" />
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-center">{item.title}</h2>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      <footer className="relative z-10 w-full py-4 mt-16 bg-black bg-opacity-50">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ExoQuest. All rights reserved.</p>
          <p className="mt-2">
            Images courtesy of NASA/JPL-Caltech
          </p>
        </div>
      </footer>
    </div>
  )
}