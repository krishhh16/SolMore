'use client'

import HeroSection from '@/components/App/HeroSection';
import Navbar from '@/components/App/Navbar'
import EvolveSection from '@/components/App/EvolveSection'

function ParallaxDemo() {
  return (
    <div className="min-h-screen w-full relative bg-gradient-to-br from-[#024042] to-[#3A0662]">
      <Navbar />
      <HeroSection />
      <EvolveSection />
    </div>
  );
}

export default ParallaxDemo;
