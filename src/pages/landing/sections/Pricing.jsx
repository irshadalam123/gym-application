import { motion } from 'framer-motion'
import { ScrollReveal } from './ScrollReveal'

const plans = [
  {
    name: 'Starter',
    price: 19,
    period: '/month',
    desc: 'Perfect for getting started',
    features: ['Access to all on-demand workouts', 'Basic progress tracking', 'Community access', 'Email support'],
    cta: 'Start Free Trial',
    featured: false,
  },
  {
    name: 'Pro',
    price: 39,
    period: '/month',
    desc: 'Most popular for serious athletes',
    features: ['Everything in Starter', 'Live classes (unlimited)', 'Personalized meal plans', 'Priority support', 'Wearable sync'],
    cta: 'Go Pro',
    featured: true,
  },
  {
    name: 'Elite',
    price: 79,
    period: '/month',
    desc: '1-on-1 coaching included',
    features: ['Everything in Pro', 'Monthly 1-on-1 coach call', 'Custom program design', 'Dedicated success manager'],
    cta: 'Get Elite',
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-zinc-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-orange-500 text-sm font-bold uppercase tracking-[0.3em]">Pricing</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4 mb-4 tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-zinc-400 text-lg">
            Start with a 14-day free trial. No credit card required.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 0.1}>
              <motion.div
                className={`relative rounded-2xl p-8 h-full flex flex-col ${
                  plan.featured
                    ? 'bg-orange-500 text-white border-2 border-orange-500 shadow-xl shadow-orange-500/20 scale-105 z-10'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white text-orange-600 text-xs font-bold uppercase">
                    Best value
                  </span>
                )}
                <h3 className="text-xl font-bold">{plan.featured ? 'Pro' : plan.name}</h3>
                <p className={`text-sm mt-1 ${plan.featured ? 'text-white/90' : 'text-zinc-400'}`}>{plan.desc}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-black">${plan.price}</span>
                  <span className={plan.featured ? 'text-white/80' : 'text-zinc-500'}>{plan.period}</span>
                </div>
                <ul className="mt-6 space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <span className="text-orange-500">✓</span>
                      <span className={plan.featured ? 'text-white/95' : 'text-zinc-300'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <motion.a
                  href="#"
                  className={`mt-8 block text-center py-3.5 rounded-full font-bold text-sm uppercase tracking-wider transition-colors ${
                    plan.featured
                      ? 'bg-white text-orange-600 hover:bg-zinc-100'
                      : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {plan.cta}
                </motion.a>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
