import { motion } from 'framer-motion'
import { ScrollReveal } from './ScrollReveal'

const logos = [
  'NIKE', 'ADIDAS', 'UNDER ARMOUR', 'REEBOK', 'GYMSHARK', 'CROSSFIT',
]

export default function TrustedBy() {
  return (
    <section id="trusted-by" className="py-20 bg-zinc-900/50 border-y border-zinc-800/50 overflow-hidden">
      <ScrollReveal className="text-center mb-12">
        <p className="text-zinc-500 text-sm font-semibold uppercase tracking-[0.3em]">Trusted by athletes worldwide</p>
      </ScrollReveal>
      <motion.div
        className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: { staggerChildren: 0.08 },
          },
        }}
      >
        {logos.map((name, i) => (
          <motion.div
            key={name}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 0.5, y: 0 },
            }}
            whileHover={{ opacity: 1, scale: 1.05 }}
            className="text-zinc-500 font-black text-lg md:text-xl tracking-wider hover:text-orange-500/80 transition-colors cursor-default"
          >
            {name}
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
