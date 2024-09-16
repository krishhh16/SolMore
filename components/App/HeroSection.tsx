import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Handjet } from 'next/font/google';
import Image from "next/image";
import { BoxesCore } from "@/components/ui/background-boxes";

const handjet = Handjet({ subsets: ['latin'], variable: '--font-handjet' });

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={`relative h-screen w-full flex items-center justify-center overflow-hidden ${handjet.className} before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-transparent before:blur-sm`}>
      <BoxesCore />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 pointer-events-none text-center px-4"
      >
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-extrabold text-white mb-4 flex flex-wrap justify-center items-center gap-2">
          <span>Stake</span>
          <span className="text-blue-500 mx-2">&</span>
          <span>Play</span>
        </h1>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white flex flex-wrap items-center justify-center mb-6">
          in our
          <span className="text-blue-500 mx-2">Immersive</span>
          <motion.div
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.5 }}
          >
            <Image 
              src="/adobe-bg.png" 
              alt="Baby Sol" 
              width={60} 
              height={60} 
              className="mx-2 pointer-events-auto" 
            />
          </motion.div>
          Arena
        </h2>
        <p className="text-lg md:text-xl text-white mt-4 max-w-2xl mx-auto">
          Experience the future of gaming where your stakes fuel your gameplay. 
          Earn rewards, level up, and dominate in our unique 
          <span className="text-blue-500 font-semibold"> staking-powered </span> 
          gaming ecosystem.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            onClick={() => scrollToSection('game-section')}
            className="bg-teal-500 pointer-events-auto text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-all text-lg font-semibold"
          >
            Start Staking & Gaming
          </Button>
          <Button 
            onClick={() => scrollToSection('rewards-section')}
            variant="outline" 
            className="bg-transparent pointer-events-auto text-white border-white px-6 py-3 rounded-lg hover:bg-white hover:text-teal-500 transition-all text-lg font-semibold"
          >
            Explore Rewards
          </Button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;