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

const typeColors = {
  HIIT: 'bg-rose-500/20 text-rose-400',
  Yoga: 'bg-violet-500/20 text-violet-400',
  Strength: 'bg-amber-500/20 text-amber-400',
  Cardio: 'bg-orange-500/20 text-orange-400',
  Pilates: 'bg-teal-500/20 text-teal-400',
  CrossFit: 'bg-red-500/20 text-red-400',
  Boxing: 'bg-zinc-500/20 text-zinc-300',
  Spinning: 'bg-cyan-500/20 text-cyan-400',
}

/**
 * View-only program details for the side modal.
 */
export default function ProgramViewDetails({ program }) {
  if (!program) return null

  const typeClass = typeColors[program.type] ?? 'bg-zinc-500/20 text-zinc-400'
  const fields = [
    { label: 'Program name', value: program.name },
    { label: 'Type', value: program.type },
    { label: 'Duration', value: program.duration },
    { label: 'Capacity', value: `${program.enrolled ?? 0} / ${program.capacity ?? '—'}` },
    { label: 'Trainer', value: program.trainer },
    { label: 'Schedule', value: program.schedule },
    { label: 'Status', value: program.status },
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
          <motion.div
            className={`flex h-12 min-w-[3rem] shrink-0 items-center justify-center rounded-xl px-2 ${typeClass} text-xs font-bold truncate`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.1 }}
            title={program.type}
          >
            {program.type || '—'}
          </motion.div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-white truncate">{program.name}</p>
            <p className="text-xs text-zinc-500">ID: {program.id}</p>
          </div>
          <motion.span
            className={`shrink-0 inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
              program.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-600/40 text-zinc-400'
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
          >
            {program.status}
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

      {program.description && (
        <motion.div
          className="rounded-xl border border-zinc-700/80 bg-zinc-900/50 p-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-sm font-semibold text-orange-400 mb-2">Description</h3>
          <p className="text-sm text-zinc-300 leading-relaxed">{program.description}</p>
        </motion.div>
      )}
    </motion.div>
  )
}
