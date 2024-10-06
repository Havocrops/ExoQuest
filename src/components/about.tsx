import Image from 'next/image'
import React from 'react'

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">About Exoplanets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="mb-4">
            Exoplanets are planets that orbit stars other than our Sun. The discovery of exoplanets has revolutionized our understanding of planetary systems and expanded our knowledge of the universe.
          </p>
          <p className="mb-4">
            Since the first confirmed detection in 1992, thousands of exoplanets have been discovered, ranging from gas giants larger than Jupiter to rocky worlds smaller than Earth. These distant worlds offer insights into the diversity of planetary systems and the potential for life beyond our solar system.
          </p>
        </div>
        <div className="relative h-64 md:h-full">
          <Image
            src="https://science.nasa.gov/wp-content/uploads/2023/09/Exoplanet_types-2.jpeg"
            alt="Various types of exoplanets"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mt-12 mb-4">Key Facts about Exoplanets:</h2>
        <ul className="list-disc list-inside mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <li>There are more planets than stars in our galaxy</li>
          <li>The closest known exoplanet is Proxima Centauri b, about 4 light-years away</li>
          <li>Exoplanets come in a wide variety of sizes, compositions, and orbital characteristics</li>
          <li>Some exoplanets orbit in the "habitable zone" of their stars, where liquid water could exist on the surface</li>
        </ul>
      </div>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Exoplanet Detection Methods</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-bold mb-2">Transit Method</h4>
            <p>This is one of the most successful methods. It involves monitoring the brightness of a star over time. If a planet passes in front of the star (transits), it blocks a portion of the star's light, causing a temporary dimming. The amount of dimming can reveal the planet's size and orbit.</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Radial Velocity Method</h4>
            <p>This method measures changes in the star's spectrum due to the gravitational pull of an orbiting planet. As the planet orbits, it causes the star to wobble slightly, leading to shifts in the star's spectral lines (redshift and blueshift). This can provide information about the planet's mass and orbit.</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Direct Imaging Method</h4>
            <p>This technique involves capturing images of exoplanets directly. It’s challenging due to the brightness of stars compared to planets, but advancements in technology (like coronagraphs and starshades) are improving the feasibility of this method. Direct imaging can help study the atmospheres of planets.</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Gravitional Microlensing Method</h4>
            <p>When a massive object (like a star with planets) passes in front of a more distant star, its gravity can bend the light from the distant star, temporarily magnifying it. This effect can reveal the presence of planets around the foreground star based on the light curve observed.</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Astrometry</h4>
            <p>This method measures the precise movements of a star in the sky. If a planet is orbiting the star, it will cause the star to move in a small orbit as well. While this method is very precise, it has been less successful in practice compared to others.</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Timing Variations</h4>
            <p>This involves observing the timing of periodic events, such as transits or pulsar signals. Variations in timing can indicate the presence of an additional body exerting gravitational influence.</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Pulsar Timing</h4>
            <p>For pulsars (highly magnetized rotating neutron stars), astronomers can measure the timing of their pulses. Variations in timing can indicate the presence of planets orbiting the pulsar.</p>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <Image
          src="https://cdn.sci.esa.int/documents/34080/35442/Exoplanets_missions_20201127_625.png"
          alt="Exoplanet discovery timeline"
          width={800}
          height={400}
          className="rounded-lg"
        />
        <p className="mt-2 text-sm text-gray-600">Timeline of exoplanet discoveries</p>
      </div>
    </div>
  )
}