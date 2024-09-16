import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

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
    <div className="flex flex-col items-center justify-center h-[800px] text-white -mt-40">
      {/* Heading */}
      <h1 className="text-5xl font-bold mb-8 text-center">
        Unlock New Skins and Rewards!
      </h1>

      <div className="flex items-center justify-center w-full">
        {/* Left Side - Fill entire space with smaller reward images */}
        <div className="hidden md:flex flex-wrap justify-center w-1/5">
          {repeatedRewards.map((reward, index) => (
            <motion.img
              key={index}
              src={reward}
              alt={`reward-${index}`}
              className={`h-16 w-16 object-cover m-4`}
              animate={controlsLeft}
              custom={index}
              whileHover={{ rotate: 10, scale: 1.1 }}
              whileTap={{ rotate: -10, scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          ))}
        </div>

        {/* Center - Auto Carousel for Character Skins */}
        <div className="mx-8 flex justify-center items-center">
          <img
            src={characterSkins[currentSkin]}
            alt="Character Skin"
            className="h-64 w-64 object-cover"
          />
        </div>

        {/* Right Side - Fill entire space with smaller reward images */}
        <div className="hidden md:flex flex-wrap justify-center w-1/5">
          {repeatedRewards2.map((reward, index) => (
            <motion.img
              key={index}
              src={reward}
              alt={`reward-${index}`}
              className={`h-16 w-16 object-cover m-4`}
              animate={controlsRight}
              custom={index}
              whileHover={{ rotate: 10, scale: 1.1 }}
              whileTap={{ rotate: -10, scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterShowcase;
