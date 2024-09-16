'use client'

import HeroSection from '@/components/App/HeroSection';
import Navbar from '@/components/App/Navbar'

function ParallaxDemo() {
  return (
    <div className="min-h-screen h-[200vh] w-full relative bg-gradient-to-br from-[#024042] to-[#3A0662]">
      <Navbar />
      <HeroSection />
    </div>
  );
}

export default ParallaxDemo;
