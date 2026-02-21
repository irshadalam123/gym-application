import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { StatCard } from '../../components/common'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  }),
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24, delay: 0.06 * i },
  }),
}

/**
 * Stats overview for the Programs page. Derives totals from programs list.
 */
export default function ProgramStats({ programs = [] }) {
  const stats = useMemo(() => {
    const total = programs.length
    const active = programs.filter((p) => p.status === 'Active').length
    const enrollments = programs.reduce((sum, p) => sum + (Number(p.enrolled) || 0), 0)
    return [
      {
        label: 'Total Programs',
        value: String(total),
        change: total > 0 ? `+${total}` : '0',
        trend: total > 0 ? 'up' : 'neutral',
        description: 'All programs',
        comparisonText: 'vs last month',
        icon: '📋',
      },
      {
        label: 'Active Programs',
        value: String(active),
        change: active > 0 ? `+${active}` : '0',
        trend: active > 0 ? 'up' : 'neutral',
        description: 'Currently running',
        comparisonText: 'vs last week',
        icon: '✓',
      },
      {
        label: 'Total Enrollments',
        value: String(enrollments),
        change: enrollments > 0 ? `+${enrollments}` : '0',
        trend: enrollments > 0 ? 'up' : 'neutral',
        description: 'Across all programs',
        comparisonText: 'vs last month',
        icon: '👥',
      },
    ]
  }, [programs])

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {stats.map((stat, i) => (
        <motion.div key={stat.label} variants={cardVariants} custom={i}>
          <StatCard
            {...stat}
            motionProps={{
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { type: 'spring', stiffness: 300, damping: 24, delay: 0.06 * i },
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}
