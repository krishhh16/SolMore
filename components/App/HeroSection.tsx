// components/Hero.js
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Handjet } from 'next/font/google';
import Image from "next/image";

const handjet = Handjet({ subsets: ['latin'], variable: '--font-handjet' });

const Hero = () => {
  return (
    <section 
    style={{ backgroundImage: 'url(/coin-bg.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'right' }} className={"relative h-screen w-[100vw] flex items-center justify-center overflow-hidden font-handjet" + handjet.className}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center"
      >
        <h1 className="text-5xl md:text-[7rem] font-extrabold text-white mb-4 flex gap-5  items-center">
          Experience <span className="text-blue-500"> Staking</span>
        </h1>
        <h1 className="text-5xl md:text-6xl font-extrabold text-white flex items-center justify-center">
          with engaging <span className="text-blue-500 ml-2">gaming</span>
          <motion.div
            whileHover={{ scale: 1.2}}
            transition={{ duration: 0.3 }}
          >
            <Image 
              src="/something.jpeg" 
              alt="Baby Sol" 
              width={75} 
              height={75} 
              className="border mx-4 border-white-1" 
            />
          </motion.div>
          arena
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
