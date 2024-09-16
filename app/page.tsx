'use client'

import HeroSection from '@/components/App/HeroSection';
import Navbar from '@/components/App/Navbar'
import EvolveSection from '@/components/App/EvolveSection'
import Marquee from '@/components/App/Marquee';
import Game from '@/components/App/Game';

function ParallaxDemo() {
  return (
    <div className="min-h-screen w-full relative bg-gradient-to-br from-[#024042] via-[#3A0662] to-[#024042]">
      <Navbar />
      <HeroSection />
      <EvolveSection />
      
      <div id="game-section">
        <Game/>
      </div>
      <div id="rewards-section">
        <Marquee />
      </div>
    </div>
  );
}

export default ParallaxDemo;
