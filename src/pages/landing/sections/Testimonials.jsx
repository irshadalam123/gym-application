import { motion } from 'framer-motion'
import { ScrollReveal } from './ScrollReveal'

const testimonials = [
  { quote: 'Prime Zone changed how I train. The live classes feel like a real gym and the trainers are incredible.', author: 'Sarah K.', role: 'Member since 2023', rating: 5 },
  { quote: 'I dropped 20 lbs in 3 months with the HIIT program and meal plans. Best investment I\'ve made in myself.', author: 'Mike T.', role: 'HIIT enthusiast', rating: 5 },
  { quote: 'The community and challenges keep me accountable. I finally found a fitness app that sticks.', author: 'Jessica L.', role: 'Yoga & Strength', rating: 5 },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-orange-500 text-sm font-bold uppercase tracking-[0.3em]">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4 mb-4 tracking-tight">
            Real people, real results
          </h2>
          <p className="text-zinc-400 text-lg">
            Join thousands who have transformed their fitness with Prime Zone.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.author} delay={i * 0.1}>
              <motion.div
                className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 h-full flex flex-col"
                whileHover={{ y: -4, borderColor: 'rgba(249, 115, 22, 0.3)' }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="text-orange-500">★</span>
                  ))}
                </div>
                <p className="text-zinc-300 flex-1 leading-relaxed">"{t.quote}"</p>
                <div className="mt-6 pt-4 border-t border-zinc-800">
                  <p className="font-bold text-white">{t.author}</p>
                  <p className="text-zinc-500 text-sm">{t.role}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
