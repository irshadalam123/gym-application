import { motion } from 'framer-motion'
import { ScrollReveal } from './ScrollReveal'

export default function CTA() {
  return (
    <section className="py-24 bg-zinc-900/50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <ScrollReveal>
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-orange-500 to-amber-600 p-12 md:p-16">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.08\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
            <div className="relative z-10">
              <motion.h2
                className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Ready to enter your prime?
              </motion.h2>
              <motion.p
                className="text-white/90 text-lg mb-8 max-w-xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Join thousands of members and get 14 days free. No credit card required.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <motion.a
                  href="#pricing"
                  className="px-8 py-4 rounded-full bg-white text-orange-600 font-bold text-sm uppercase tracking-wider hover:bg-zinc-100 transition-colors shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Free Trial
                </motion.a>
                <motion.a
                  href="#features"
                  className="px-8 py-4 rounded-full border-2 border-white/50 text-white font-bold text-sm uppercase tracking-wider hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Learn More
                </motion.a>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
