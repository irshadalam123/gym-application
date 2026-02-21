import { motion } from 'framer-motion'
import { ScrollReveal } from './ScrollReveal'

export default function ProductShowcase() {
  return (
    <section id="product-showcase" className="py-24 bg-zinc-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal className="order-2 lg:order-1">
            <span className="text-orange-500 text-sm font-bold uppercase tracking-[0.3em]">The App</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-4 mb-6 tracking-tight">
              Your gym in your pocket
            </h2>
            <p className="text-zinc-400 text-lg mb-8">
              Prime Zone app gives you instant access to workouts, meal plans, and your progress—whether you're at the gym or at home. Sync with wearables and never miss a beat.
            </p>
            <ul className="space-y-4">
              {['Workout library with 500+ exercises', 'Meal plans & macro tracking', 'Wearable sync (Apple Watch, Garmin)', 'Offline mode for travel'].map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-center gap-3 text-zinc-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                >
                  <span className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 text-sm font-bold">✓</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </ScrollReveal>
          <ScrollReveal variant="fadeIn" className="order-1 lg:order-2">
            <motion.div
              className="relative aspect-[9/16] max-w-sm mx-auto rounded-3xl bg-gradient-to-b from-zinc-800 to-zinc-900 border border-zinc-700 shadow-2xl overflow-hidden"
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 rounded-2xl bg-orange-500/20 flex items-center justify-center text-4xl mb-4">📱</div>
                <p className="text-white font-bold text-lg">Prime Zone</p>
                <p className="text-zinc-500 text-sm mt-1">Fitness • Nutrition • Community</p>
                <div className="mt-8 w-full space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-2 rounded-full bg-zinc-700" style={{ width: `${60 + i * 10}%`, marginLeft: 'auto' }} />
                  ))}
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
