import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SideModal } from '../../components/common'
import { TRAINERS_INITIAL_DATA } from './constants'
import TrainerViewDetails from './TrainerViewDetails'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
}

function TrainerCard({ trainer, onClick }) {
  return (
    <motion.article
      variants={cardVariants}
      className="group relative overflow-hidden rounded-xl bg-zinc-900/80 border border-zinc-800 cursor-pointer"
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onClick(trainer)}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow:
            'inset 0 0 0 1px rgba(249, 115, 22, 0.35), 0 0 20px -4px rgba(249, 115, 22, 0.2)',
        }}
      />
      <div className="relative z-10 flex flex-col">
        {/* Photo placeholder - empty space for future image */}
        <div
          className="aspect-[4/3] w-full bg-zinc-800/60 border-b border-zinc-800 flex items-center justify-center"
          aria-hidden
        >
          <span className="text-zinc-500 text-sm font-medium">Photo</span>
        </div>
        <div className="p-4 flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-white truncate flex-1">{trainer.name}</h3>
            <span
              className={`shrink-0 inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                trainer.status === 'Active'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-zinc-600/40 text-zinc-400'
              }`}
            >
              {trainer.status}
            </span>
          </div>
          <p className="text-sm text-orange-400/90 truncate">{trainer.specialty}</p>
          <p className="text-xs text-zinc-500 truncate">{trainer.email}</p>
          <p className="text-xs text-zinc-500">
            {trainer.programsCount != null
              ? `${trainer.programsCount} ${trainer.programsCount === 1 ? 'program' : 'programs'}`
              : '—'}
          </p>
        </div>
      </div>
    </motion.article>
  )
}

export default function Trainers() {
  const [trainers] = useState(TRAINERS_INITIAL_DATA)
  const [sideModalOpen, setSideModalOpen] = useState(false)
  const [selectedTrainer, setSelectedTrainer] = useState(null)

  const handleCardClick = (trainer) => {
    setSelectedTrainer(trainer)
    setSideModalOpen(true)
  }

  const handleCloseModal = () => {
    setSideModalOpen(false)
    setSelectedTrainer(null)
  }

  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-xl bg-zinc-900/80 border border-zinc-800 overflow-hidden"
      >
        <div className="p-4 sm:p-6 border-b border-zinc-800">
          <h2 className="text-lg font-bold text-white uppercase tracking-tight">
            Trainers
          </h2>
          <p className="text-zinc-400 mt-1 text-sm">
            Click a card to view full trainer details.
          </p>
        </div>

        <div className="p-4 sm:p-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {trainers.map((trainer) => (
              <TrainerCard
                key={trainer.id}
                trainer={trainer}
                onClick={handleCardClick}
              />
            ))}
          </motion.div>
          {trainers.length === 0 && (
            <p className="text-zinc-500 text-center py-12 text-sm">
              No trainers yet.
            </p>
          )}
        </div>
      </motion.section>

      <SideModal
        isOpen={sideModalOpen}
        onClose={handleCloseModal}
        title="Trainer details"
        width="max-w-lg"
      >
        <AnimatePresence mode="wait">
          {selectedTrainer && (
            <TrainerViewDetails key={selectedTrainer.id} trainer={selectedTrainer} />
          )}
        </AnimatePresence>
      </SideModal>
    </div>
  )
}
