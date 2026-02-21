import { motion } from 'framer-motion'
import { ScrollReveal } from './ScrollReveal'

const categories = [
  { title: 'Strength', desc: 'Build muscle and power', emoji: '🏋️', gradient: 'from-orange-500 to-red-600' },
  { title: 'Cardio', desc: 'Burn fat, boost endurance', emoji: '🏃', gradient: 'from-cyan-500 to-blue-600' },
  { title: 'HIIT', desc: 'Max results in minimal time', emoji: '⚡', gradient: 'from-amber-500 to-orange-600' },
  { title: 'Yoga', desc: 'Flexibility & mindfulness', emoji: '🧘', gradient: 'from-violet-500 to-purple-600' },
  { title: 'Recovery', desc: 'Mobility and rest days', emoji: '🛁', gradient: 'from-emerald-500 to-teal-600' },
]

export default function Categories() {
  return (
    <section id="categories" className="py-24 bg-zinc-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-orange-500 text-sm font-bold uppercase tracking-[0.3em]">Programs</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4 mb-4 tracking-tight">
            Train your way
          </h2>
          <p className="text-zinc-400 text-lg">
            From strength to yoga—pick the style that fits your goals and schedule.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.title} delay={i * 0.08}>
              <motion.div
                className={`relative p-6 rounded-2xl bg-gradient-to-br ${cat.gradient} cursor-pointer overflow-hidden group`}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative z-10">
                  <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform">{cat.emoji}</span>
                  <h3 className="text-xl font-bold text-white">{cat.title}</h3>
                  <p className="text-white/80 text-sm mt-1">{cat.desc}</p>
                </div>
                <motion.div
                  className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
