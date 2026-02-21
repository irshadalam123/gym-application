import { motion } from 'framer-motion'
import { ScrollReveal } from './ScrollReveal'

const features = [
  {
    icon: '💪',
    title: 'Personalized Plans',
    desc: 'AI-driven workout and nutrition plans tailored to your goals and level.',
  },
  {
    icon: '📺',
    title: 'Live & On-Demand',
    desc: 'Join live classes or train anytime with hundreds of on-demand sessions.',
  },
  {
    icon: '📊',
    title: 'Progress Tracking',
    desc: 'Track reps, weight, and body metrics with sleek dashboards and insights.',
  },
  {
    icon: '👥',
    title: 'Community',
    desc: 'Connect with members, join challenges, and stay accountable together.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-orange-500 text-sm font-bold uppercase tracking-[0.3em]">Why Prime Zone</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4 mb-4 tracking-tight">
            Everything you need to win
          </h2>
          <p className="text-zinc-400 text-lg">
            From personalized plans to live classes and progress tracking—all in one place.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <ScrollReveal key={feature.title} delay={i * 0.1}>
              <motion.div
                className="group relative p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-orange-500/50 transition-colors h-full"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{feature.desc}</p>
                <div className="absolute inset-0 rounded-2xl bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
