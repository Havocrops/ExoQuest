"use client"

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import React from 'react'

const resources = {
  articles: [
    { title: "The Hunt for Earth-like Exoplanets", url: "https://exoplanets.nasa.gov/news/1560/the-hunt-is-on-for-closest-earth-like-planets/" },
    { title: "How Do We Find and Classify Exoplanets?", url: "https://science.nasa.gov/exoplanets/how-we-find-and-characterize/" },
  ],
  images: [
    { title: "Artist's concept of TRAPPIST-1 planetary system", url: "https://www.nasa.gov/wp-content/uploads/2023/03/pia21751.jpg?resize=768,432" },
    { title: "Kepler-16b Circumbinary Planet", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Kepler-16.jpg/290px-Kepler-16.jpg" },
  ],
  videos: [
    { title: "NASA's Exoplanet Excursions 360", url: "https://youtu.be/cL1WbM2FSyQ?si=GU-ERvUOyMUCDRRy" },
    { title: "The Cosmic Search For A New Planet Earth", url: "https://youtu.be/-lGHxBvRnSM?si=3Z9AFInZFUv3KnT9" },
  ]
}

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState("articles")

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Image
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjQfn60tIPZd06hAqcmgD7ASBN6QQevmM_zQ&s"
        alt="Space background"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
      <div className="relative z-10 container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Exoplanet Resources</h1>
        <Tabs defaultValue="articles" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
          </TabsList>
          <TabsContent value="articles">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.articles.map((article, index) => (
                <motion.div
                  key={article.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-black bg-opacity-70">
                    <CardHeader>
                      <CardTitle>{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        Read Article
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="images">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.images.map((image, index) => (
                <motion.div
                  key={image.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-black bg-opacity-70">
                    <CardHeader>
                      <CardTitle>{image.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Image src={image.url} alt={image.title} width={600} height={400} className="rounded-lg" />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="videos">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.videos.map((video, index) => (
                <motion.div
                  key={video.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-black bg-opacity-70">
                    <CardHeader>
                      <CardTitle>{video.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-w-16 aspect-h-9">
                        <iframe
                          src={video.url}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        ></iframe>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}