import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './index'

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const popupVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', damping: 25, stiffness: 300 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 8,
    transition: { duration: 0.15 },
  },
}

/**
 * Confirmation popup with framer-motion. Centered modal for confirm/cancel actions.
 * @param {boolean} isOpen - Whether the popup is visible
 * @param {function} onClose - Called when cancel or backdrop is clicked
 * @param {function} onConfirm - Called when user confirms (e.g. delete)
 * @param {string} title - Popup title
 * @param {string} [message] - Body message
 * @param {string} [confirmLabel='Confirm'] - Confirm button text
 * @param {string} [cancelLabel='Cancel'] - Cancel button text
 * @param {string} [confirmVariant='danger'] - Button variant for confirm (e.g. danger for delete)
 * @param {boolean} [loading] - Show loading state on confirm button
 */
export default function ConfirmPopup({
  isOpen,
  onClose,
  onConfirm,
  title,
  message = 'Are you sure you want to continue?',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmVariant = 'danger',
  loading = false,
}) {
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

  const handleConfirm = () => {
    onConfirm()
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-popup-title"
            aria-describedby="confirm-popup-desc"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="confirm-popup-title" className="text-lg font-bold text-white">
              {title}
            </h3>
            <p id="confirm-popup-desc" className="mt-2 text-sm text-zinc-400">
              {message}
            </p>
            <div className="mt-6 flex gap-3 justify-end">
              <Button variant="secondary" size="md" onClick={onClose} disabled={loading}>
                {cancelLabel}
              </Button>
              <Button
                variant={confirmVariant}
                size="md"
                onClick={handleConfirm}
                loading={loading}
              >
                {confirmLabel}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
