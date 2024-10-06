import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const articles = [
  {
    title: "NASA's TESS Discovers Its First Earth-size Planet in Star's Habitable Zone",
    url: "https://exoplanets.nasa.gov/tess/",
    description: "NASA's Transiting Exoplanet Survey Satellite (TESS) has discovered its first Earth-size planet in its star's habitable zone, the range of distances where conditions may be just right to allow the presence of liquid water on the surface.",
    image: "https://exoplanets.nasa.gov/internal_resources/1102"
  },
  {
    title: "NASA's TESS Delivers New Insights Into an Ultrahot World",
    url: "https://www.nasa.gov/universe/nasas-tess-delivers-new-insights-into-an-ultrahot-world/",
    description: "KELT-9 b is one of the hottest planets known. New measurements from NASA's Transiting Exoplanet Survey Satellite (TESS) have enabled astronomers to greatly improve their understanding of this bizarre world.",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/31/Artist%27s_impression_of_KELT-9b_orbiting_KELT-9.jpg"
  },
  {
    title: "NASA Completes Spacecraft to Transport, Support Roman Space Telescope",
    url: "https://www.nasa.gov/feature/jpl/nasa-s-planet-hunter-completes-its-primary-mission",
    description: "NASA's Nancy Grace Roman Space Telescope has completed its spacecraft bus, crucial for transporting and supporting the observatory in orbit. This versatile system will integrate key components and enable groundbreaking research on dark energy, dark matter, and exoplanets. With nearly 50 miles of cabling, it ensures seamless communication and will deploy essential elements during launch. Roman is expected to deliver a staggering 1.4 terabytes of data daily, advancing our understanding of the universe.",
    image: "https://www.nasa.gov/wp-content/uploads/2024/09/spacecraft-001.jpg?resize=1536,1151"
  }
]

export default function Articles() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">NASA Exoplanet Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105">
            <Image
              src={article.image}
              alt={article.title}
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{article.title}</h2>
              <p className="text-gray-600 mb-4">{article.description}</p>
              <Link href={article.url} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}