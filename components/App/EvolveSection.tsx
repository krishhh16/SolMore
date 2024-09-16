'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"

const evolutionStages = [
  { id: 1, src: '/baby-sol1.jpeg', alt: 'Evolution Stage 1' },
  { id: 2, src: '/normal-sol1.jpeg', alt: 'Evolution Stage 2' },
  { id: 3, src: '/normal-sol3.jpeg', alt: 'Evolution Stage 3' },
]

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14 5l7 7m0 0l-7 7m7-7H3"
    />
  </svg>
)

export default function EvolveSection() {
  return (
    <section className="py-16 px-4">
      <h2 className="text-3xl font-bold text-center text-white mb-12">
        Evolve your Solgotchi to be stronger and stronger
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-4">
        {evolutionStages.map((stage, index) => (
          <>
            <motion.div
              key={stage.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="w-64">
                <CardContent className="p-4">
                  <Image
                    src={stage.src}
                    alt={stage.alt}
                    width={240}
                    height={300}
                    className="rounded-lg object-cover"
                  />
                </CardContent>
              </Card>
            </motion.div>
            {index < evolutionStages.length - 1 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.2 }}
              >
                <ArrowIcon />
              </motion.div>
            )}
          </>
        ))}
      </div>
    </section>
  )
}
