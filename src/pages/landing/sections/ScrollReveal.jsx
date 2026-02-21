import { motion } from 'framer-motion'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
}

export function ScrollReveal({ children, className = '', variant = 'fadeInUp', delay = 0 }) {
  const variants = variant === 'fadeIn' ? fadeIn : fadeInUp
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={variants}
      custom={delay}
    >
      {children}
    </motion.div>
  )
}

export { fadeInUp, fadeIn }
