import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollReveal } from './ScrollReveal'

const images = [
  { id: 1, label: 'Strength training', color: 'bg-orange-600' },
  { id: 2, label: 'HIIT session', color: 'bg-amber-600' },
  { id: 3, label: 'Yoga flow', color: 'bg-violet-600' },
  { id: 4, label: 'Cardio', color: 'bg-cyan-600' },
  { id: 5, label: 'Recovery', color: 'bg-emerald-600' },
  { id: 6, label: 'Community', color: 'bg-rose-600' },
]

export default function Gallery() {
  const [hovered, setHovered] = useState(null)

  return (
    <section id="gallery" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-orange-500 text-sm font-bold uppercase tracking-[0.3em]">Gallery</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4 mb-4 tracking-tight">
            Life at Prime Zone
          </h2>
          <p className="text-zinc-400 text-lg">
            See the energy, the community, and the results.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <ScrollReveal key={img.id} delay={i * 0.05}>
              <motion.div
                className={`relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer ${img.color}`}
                onMouseEnter={() => setHovered(img.id)}
                onMouseLeave={() => setHovered(null)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/20 text-6xl font-black">{img.id}</span>
                </div>
                <AnimatePresence>
                  {hovered === img.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-black/60 flex items-center justify-center"
                    >
                      <span className="text-white font-bold text-lg uppercase tracking-wider">{img.label}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
