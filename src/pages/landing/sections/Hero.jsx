import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const navigate = useNavigate()
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(249,115,22,0.15),transparent)]" />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-32 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1.5 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-[0.3em] mb-6"
        >
          Transform Your Body & Mind
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6"
        >
          <span className="block">BUILD YOUR</span>
          <span className="block text-orange-500">BEST SELF</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="max-w-2xl mx-auto text-zinc-400 text-lg md:text-xl mb-10"
        >
          Premium fitness programs, expert trainers, and a community that pushes you to break limits. Your prime zone starts here.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href="#pricing"
            className="px-8 py-4 rounded-full bg-orange-500 text-white font-bold text-sm uppercase tracking-wider hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(249, 115, 22, 0.4)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/login')}
          >
            Login
          </motion.a>
          <motion.a
            href="#features"
            className="px-8 py-4 rounded-full border-2 border-zinc-600 text-zinc-300 font-bold text-sm uppercase tracking-wider hover:border-orange-500 hover:text-orange-500 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Programs
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 flex items-center justify-center gap-8 text-zinc-500 text-sm"
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            24/7 Access
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Expert Trainers
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Live Classes
          </span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#trusted-by"
          className="flex flex-col items-center gap-2 text-zinc-500 hover:text-orange-500 transition-colors"
          whileHover={{ y: 4 }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 rounded-full border-2 border-current flex justify-center pt-2"
          >
            <span className="w-1 h-1 rounded-full bg-current" />
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  )
}
