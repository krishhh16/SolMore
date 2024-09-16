import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

const photos = [
  '/baby-sol1.png',
  '/normal-sol1.png',
  '/normal-sol3.png',
  '/normal-sol4.png',
  '/normal-sol5.png',
  '/normal-sol6.png',
  '/normal-sol7.png',
  '/normal-sol8.png',
  '/normal-sol9.png',
];

const Marquee: React.FC = () => {
  return (
    <div className="w-full py-4">
      <h2 className="text-6xl text-white font-bold text-center mb-6">Choose from our huge variety of Solgichis</h2>
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 20,
              ease: 'linear',
            },
          }}
        >
          {[...photos, ...photos].map((photo, index) => (
            <Card
              key={index}
              className="flex-shrink-0 w-64 h-64 mx-2 overflow-hidden"
            >
              <Image
                src={photo}
                alt={`Photo ${index + 1}`}
                width={256}
                height={300}
                className={`object-contain w-full h-full transition-transform duration-300 hover:scale-110 ${index === 0 ? 'p-16' : 'p-6'}`}
                style={{ backgroundColor: 'transparent' }}
              />
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Marquee;
