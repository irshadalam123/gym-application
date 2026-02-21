import { motion } from 'framer-motion'
import { ScrollReveal } from './ScrollReveal'

const trainers = [
  { name: 'Alex Rivera', role: 'Strength & Conditioning', initials: 'AR', color: 'from-orange-500 to-amber-600' },
  { name: 'Jordan Lee', role: 'HIIT & Cardio', initials: 'JL', color: 'from-emerald-500 to-teal-600' },
  { name: 'Sam Chen', role: 'Yoga & Mobility', initials: 'SC', color: 'from-violet-500 to-purple-600' },
  { name: 'Morgan Blake', role: 'Nutrition Coach', initials: 'MB', color: 'from-rose-500 to-pink-600' },
]

export default function Trainers() {
  return (
    <section id="trainers" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-orange-500 text-sm font-bold uppercase tracking-[0.3em]">Meet the team</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4 mb-4 tracking-tight">
            Expert trainers, real results
          </h2>
          <p className="text-zinc-400 text-lg">
            Our certified coaches bring years of experience and a passion for helping you reach your goals.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map((trainer, i) => (
            <ScrollReveal key={trainer.name} delay={i * 0.1}>
              <motion.div
                className="group text-center"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`relative w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${trainer.color} flex items-center justify-center text-3xl font-black text-white shadow-lg mb-4 overflow-hidden`}>
                  <span>{trainer.initials}</span>
                  <motion.div
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    initial={false}
                  >
                    <span className="text-xs font-bold uppercase tracking-wider">View Profile</span>
                  </motion.div>
                </div>
                <h3 className="text-lg font-bold text-white">{trainer.name}</h3>
                <p className="text-orange-500 text-sm font-medium">{trainer.role}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
