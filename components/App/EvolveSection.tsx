import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const CharacterEvolution = () => {
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const evolutionStages = [
    {
      id: 1,
      name: 'Stage 1',
      stakeRequirement: 0,
      image: '/baby-sol1.png',
    },
    {
      id: 2,
      name: 'Stage 2',
      stakeRequirement: 50,
      image: '/normal-sol2.png',
    },
    {
      id: 3,
      name: 'Stage 3',
      stakeRequirement: 100,
      image: '/armor.png',
    },
  ];

  // Calculate which stage is currently active based on progress
  const currentStage = evolutionStages.find((stage, index, array) => 
    progress >= stage.stakeRequirement && (index === array.length - 1 || progress < array[index + 1].stakeRequirement)
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const interval = setInterval(() => {
            start += 1;
            setProgress(start);
            if (start === 100) clearInterval(interval);
          }, 20); // Adjust the speed of the progress bar here
        }
      },
      { threshold: 0.5 } // Adjust the visibility threshold here
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="w-full flex flex-col items-center p-4 md:p-8">
      <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6 font-bold text-center">Evolve Your Character by Staking More!</h2>
      
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 items-center">
        {evolutionStages.map((stage, index) => (
          <motion.div
            key={stage.id}
            className="flex flex-col items-center relative group"
            initial={{ opacity: 0 }}
            animate={{ opacity: progress >= stage.stakeRequirement ? 1 : 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              src={stage.image}
              alt={stage.name}
              className={`h-32 w-32 md:h-48 md:w-48 ${index === 0 ? "p-8 md:p-16" : "p-4 md:p-8"} object-cover border border-gray-300 rounded-lg`}
              animate={{ scale: currentStage?.id === stage.id ? 1 : 0.9 }}
              transition={{ duration: 0.5 }}
            />
            <p className="text-sm mt-2 text-white font-semibold">{stage.name}</p>
            <p className="text-xs text-gray-400">{stage.stakeRequirement}% Required</p>

            {progress < stage.stakeRequirement && (
              <div className="absolute bottom-0 p-2 md:p-4 bg-white text-black text-xs md:text-sm rounded shadow-md group-hover:block hidden">
                Unlock at {stage.stakeRequirement}%!
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Dynamic Progress Bar with Range Slider */}
      <div className="relative w-full md:w-2/3 mt-6">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="w-full h-4 bg-gray-700 rounded-full appearance-none cursor-pointer"
        />
        <div
          className="absolute top-0 left-0 h-4 bg-green-400 rounded-full pointer-events-none"
          style={{ width: `${progress}%` }}
        />
        <p className="text-white mt-2 text-center">
          {progress === 100 ? 'Max Evolution Achieved!' : `Progress: ${progress}%`}
        </p>
      </div>

      {/* Reward Information */}
      <div className="mt-4 p-4 bg-white bg-opacity-20 rounded-lg text-white text-center">
        <p>Stake more to evolve your character and unlock new abilities!</p>
        <p className="mt-2 font-semibold">
          {progress === 100
            ? 'You have reached the maximum evolution!'
            //@ts-ignore
            : `Next Evolution at ${currentStage?.stakeRequirement + 50}%`}
        </p>
      </div>
    </div>
  );
};

export default CharacterEvolution;
