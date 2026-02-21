import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const panelVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { type: 'spring', damping: 28, stiffness: 300 },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
  },
}

/**
 * Side modal that slides in from the right. Use for view/edit drawers.
 * @param {boolean} isOpen - Whether the modal is visible
 * @param {function} onClose - Called when backdrop is clicked or close button
 * @param {string} title - Header title
 * @param {React.ReactNode} children - Content (e.g. view or edit form)
 * @param {string} [width='max-w-lg'] - Tailwind max-width class for the panel
 */
export default function SideModal({ isOpen, onClose, title, children, width = 'max-w-lg' }) {
  useEffect(() => {
    if (!isOpen) return
    const handleEscape = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed right-0 top-0 bottom-0 z-50 w-full ${width} flex flex-col bg-zinc-900 border-l border-zinc-800 shadow-2xl`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="side-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between shrink-0 border-b border-zinc-800 px-6 py-4">
              <h2 id="side-modal-title" className="text-lg font-bold text-white">
                {title}
              </h2>
              <motion.button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
            <motion.div
              className="flex-1 overflow-y-auto p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
