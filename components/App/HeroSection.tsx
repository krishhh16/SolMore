// components/Hero.js
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Handjet } from 'next/font/google';

const handjet = Handjet({ subsets: ['latin'], variable: '--font-handjet' });

const Hero = () => {
  return (
    <section className={"relative h-screen flex items-center justify-center overflow-hidden font-handjet" + handjet.className}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
          Unlock premium <span className="text-blue-500">Discord</span>
        </h1>
        <h1 className="text-5xl md:text-6xl font-extrabold text-white">
          experiences with <span className="text-blue-500">Blinkord.</span>
        </h1>
        <p className="text-lg md:text-xl text-white mt-4">
          Monetize your <span className="text-blue-500">Discord</span> server effortlessly.
        </p>

        <Button className="mt-6 bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-all">
          Get Started
        </Button>
      </motion.div>
    </section>
  );
};

export default Hero;
