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
 * View-only member details for the side modal. Receives member row object.
 */
export default function MemberViewDetails({ member }) {
  if (!member) return null

  const fields = [
    { label: 'Member name', value: member.name },
    { label: 'Email', value: member.email ?? '—' },
    { label: 'Phone', value: member.phone ?? '—' },
    { label: 'Plan', value: member.plan },
    { label: 'Status', value: member.status },
    { label: 'Joined', value: member.joined },
    { label: 'Address', value: member.address ?? '—' },
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
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-orange-400 text-lg font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.1 }}
          >
            {(member.name || '?').charAt(0)}
          </motion.div>
          <div>
            <p className="font-semibold text-white">{member.name}</p>
            <p className="text-xs text-zinc-500">ID: {member.id}</p>
          </div>
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
    </motion.div>
  )
}
