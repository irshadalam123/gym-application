import { motion } from 'framer-motion'

const fieldVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.03 * i, duration: 0.2 },
  }),
}

function DetailRow({ label, value }) {
  return (
    <div className="flex flex-col gap-1 py-2 border-b border-zinc-800/80 last:border-0">
      <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">{label}</span>
      <span className="text-sm text-zinc-200">{value ?? '—'}</span>
    </div>
  )
}

/**
 * View-only trainer details for the side modal.
 */
export default function TrainerViewDetails({ trainer }) {
  if (!trainer) return null

  const fields = [
    { label: 'Name', value: trainer.name },
    { label: 'Specialty', value: trainer.specialty },
    { label: 'Email', value: trainer.email },
    { label: 'Phone', value: trainer.phone },
    { label: 'Programs', value: trainer.programsCount != null ? `${trainer.programsCount} program(s)` : '—' },
    { label: 'Status', value: trainer.status },
  ]

  return (
    <motion.div
      className="space-y-1"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
    >
      <motion.div
        className="rounded-xl border border-zinc-700/80 bg-zinc-800/30 p-4 mb-4"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className="flex items-center gap-3">
          {/* Photo placeholder - empty space for future image */}
          <div
            className="h-14 w-14 shrink-0 rounded-xl bg-zinc-700/60 border border-zinc-600/60 flex items-center justify-center"
            aria-hidden
          >
            <span className="text-zinc-500 text-xs">Photo</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-white truncate">{trainer.name}</p>
            <p className="text-sm text-zinc-400 truncate">{trainer.specialty}</p>
            <p className="text-xs text-zinc-500">ID: {trainer.id}</p>
          </div>
          <motion.span
            className={`shrink-0 inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
              trainer.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-600/40 text-zinc-400'
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
          >
            {trainer.status}
          </motion.span>
        </div>
      </motion.div>

      <div className="rounded-xl border border-zinc-700/80 bg-zinc-900/50 p-4">
        <h3 className="text-sm font-semibold text-orange-400 mb-3">Details</h3>
        {fields.map(({ label, value }, i) => (
          <motion.div key={label} custom={i} variants={fieldVariants}>
            <DetailRow label={label} value={value} />
          </motion.div>
        ))}
      </div>

      {trainer.bio && (
        <motion.div
          className="rounded-xl border border-zinc-700/80 bg-zinc-900/50 p-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-sm font-semibold text-orange-400 mb-2">About</h3>
          <p className="text-sm text-zinc-300 leading-relaxed">{trainer.bio}</p>
        </motion.div>
      )}
    </motion.div>
  )
}
