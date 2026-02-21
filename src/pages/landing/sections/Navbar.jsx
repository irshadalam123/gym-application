import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#trainers', label: 'Trainers' },
  { href: '#categories', label: 'Categories' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#testimonials', label: 'Testimonials' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-zinc-950/95 backdrop-blur-xl shadow-lg shadow-orange-500/5' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <motion.span
            className="text-2xl font-black tracking-tighter text-white"
            whileHover={{ scale: 1.02 }}
          >
            PRIME<span className="text-orange-500">ZONE</span>
          </motion.span>
          <span className="text-xs font-semibold text-orange-500 uppercase tracking-widest">Fitness</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="text-zinc-400 hover:text-orange-500 font-medium text-sm uppercase tracking-wider transition-colors"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ y: -2 }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <motion.a
            href="#pricing"
            className="px-5 py-2.5 rounded-full bg-orange-500 text-white font-bold text-sm uppercase tracking-wider hover:bg-orange-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Join Now
          </motion.a>
        </div>

        <motion.button
          className="md:hidden p-2 text-white"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </motion.button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-900/98 border-t border-zinc-800 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-300 hover:text-orange-500 font-medium uppercase tracking-wider py-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#pricing"
                className="mt-2 px-5 py-3 rounded-full bg-orange-500 text-white font-bold text-center uppercase tracking-wider"
              >
                Join Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
