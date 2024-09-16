import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import {LinkPreview} from '../ui/link-preview';

const characterSkins = [
  '/armor.png',
  '/normal-sol7.png',
  '/normal-sol4.png',
  '/normal-sol5.png',
];

const rewards = [
  '/armor1.png',
  '/armor4.png',
  '/armor2.png',
  '/shield1.png',
  "/sword1.png",
  "helmet3.png",
  "helmetsil.png",
  "arch1.png"
];

const rewards2 = [
  '/shield2.png',
  '/armor6.png',
  '/sword2.png',
  '/armorbr.png',
  '/armor4.png',
  '/helmet4.png',
  '/sword4.png',
  '/armor5.png',
];

const CharacterShowcase: React.FC = () => {
  const [currentSkin, setCurrentSkin] = useState(0);
  const controlsLeft = useAnimation();  // Controls for left-side rewards
  const controlsRight = useAnimation(); // Controls for right-side rewards
  const [scrollY, setScrollY] = useState(0);
  const [animatedIndices, setAnimatedIndices] = useState<number[]>([]);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update wiggle effect based on scroll position
  useEffect(() => {
    if (scrollY > 100) {  // Wiggle trigger when scrolled past 100px
      // Randomly select only 3 indices to animate
      const newAnimatedIndices = Array.from({length: 1}, () => Math.floor(Math.random() * rewards.length));
      setAnimatedIndices(newAnimatedIndices);

      controlsLeft.start(i => ({
        rotate: animatedIndices.includes(i) ? [0, 10, -10, 10, -10, 0] : 0,
        transition: { duration: 1, loop: Infinity, ease: 'easeInOut' },
      }));
      controlsRight.start(i => ({
        rotate: animatedIndices.includes(i) ? [0, -10, 10, -10, 10, 0] : 0,
        transition: { duration: 1, loop: Infinity, ease: 'easeInOut' },
      }));
    } else {
      controlsLeft.stop();
      controlsRight.stop();
      setAnimatedIndices([]);
    }
  }, [scrollY, controlsLeft, controlsRight]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkin((prevSkin) => (prevSkin + 1) % characterSkins.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Function to generate random margin values
  const getRandomMargin = () => {
    const margins = ['m-1', 'm-2', 'm-3', 'm-4'];
    return margins[Math.floor(Math.random() * margins.length)];
  };

  // Generate an array of reward images
  const repeatedRewards = [...rewards];
  const repeatedRewards2 = [...rewards2];

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] text-white py-20 px-4">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center">
        Unlock New Skins and Rewards!
      </h1>
      <p className="text-xl md:text-2xl lg:text-3xl text-center mb-8">
        The more you stake, the more rewards and skins you'll unlock!
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center w-full">
        {/* Left Side - Rewards */}
        <div className="flex flex-wrap justify-center w-full md:w-1/3 mb-8 md:mb-0">
          {repeatedRewards.slice(0, 8).map((reward, index) => (
            <motion.img
              key={index}
              src={reward}
              alt={`reward-${index}`}
              className={`h-12 w-12 md:h-16 md:w-16 object-cover m-2 md:m-4 ${index >= 5 ? 'hidden md:block' : ''}`}
              animate={controlsLeft}
              custom={index}
              whileHover={{ rotate: 10, scale: 1.1 }}
              whileTap={{ rotate: -10, scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          ))}
        </div>

        {/* Center - Auto Carousel for Character Skins */}
        <div className="mx-4 md:mx-8 flex justify-center items-center mb-8 md:mb-0">
          <img
            src={characterSkins[currentSkin]}
            alt="Character Skin"
            className="h-48 w-48 md:h-64 md:w-64 object-cover"
          />
        </div>

        {/* Right Side - Rewards */}
        <div className="flex flex-wrap justify-center w-full md:w-1/3">
          {repeatedRewards2.slice(0, 8).map((reward, index) => (
            <motion.img
              key={index}
              src={reward}
              alt={`reward-${index}`}
              className={`h-12 w-12 md:h-16 md:w-16 object-cover m-2 md:m-4 ${index >= 5 ? 'hidden md:block' : ''}`}
              animate={controlsRight}
              custom={index}
              whileHover={{ rotate: 10, scale: 1.1 }}
              whileTap={{ rotate: -10, scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          ))}
        </div>
      </div>

      {/* Credits component with LinkPreview */}
      <div className="mt-16 text-left">
       <p className="text-sm text-gray-400">
          Developed by
        </p>
        <LinkPreview url="https://github.com/krishhh16">
          <span className="text-sm text-blue-500 hover:underline">@krishhh16</span>
        </LinkPreview>
      </div>
    </div>
  );
};

export default CharacterShowcase;
