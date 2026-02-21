import { motion } from 'framer-motion'

/**
 * Reusable stat card with hover effects and optional details.
 * @param {string} label - Card title (e.g. "Active Members")
 * @param {string} value - Main metric value
 * @param {string} change - Change indicator (e.g. "+12%")
 * @param {'up'|'down'|'neutral'} [trend] - Visual trend direction
 * @param {string} [description] - Short context below the value
 * @param {string} [comparisonText] - e.g. "vs last month"
 * @param {React.ReactNode} [icon] - Optional icon or emoji
 * @param {object} [motionProps] - Framer-motion props (initial, animate, transition)
 */
export default function StatCard({
  label,
  value,
  change,
  trend = 'up',
  description,
  comparisonText,
  icon,
  motionProps = {},
}) {
  const trendColors = {
    up: 'text-emerald-400',
    down: 'text-red-400',
    neutral: 'text-zinc-400',
  }
  const trendBg = {
    up: 'bg-emerald-500/10 group-hover:bg-emerald-500/20',
    down: 'bg-red-500/10 group-hover:bg-red-500/20',
    neutral: 'bg-zinc-500/10 group-hover:bg-zinc-500/20',
  }

  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl bg-zinc-900/80 border border-zinc-800 p-5 cursor-default"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.2 },
      }}
      {...motionProps}
    >
      {/* Hover glow border */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 0 1px rgba(249, 115, 22, 0.4), 0 0 24px -4px rgba(249, 115, 22, 0.25)',
        }}
      />
      {/* Shine sweep on hover */}
      <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
        <div
          className="absolute inset-0 w-1/2 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent skew-x-12 transition-transform duration-500 ease-out group-hover:translate-x-[200%]"
          aria-hidden
        />
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-zinc-500 text-sm font-medium uppercase tracking-wider">{label}</p>
            {icon && (
              <span className="mt-2 inline-flex text-2xl opacity-80 group-hover:scale-110 transition-transform" aria-hidden>
                {icon}
              </span>
            )}
          </div>
          {change && (
            <span
              className={`shrink-0 inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${trendBg[trend]} ${trendColors[trend]}`}
            >
              {change}
            </span>
          )}
        </div>

        <p className="text-2xl font-bold text-white mt-2 tabular-nums">{value}</p>

        {(description || comparisonText) && (
          <p className="text-zinc-500 text-sm mt-1.5">
            {description}
            {description && comparisonText && ' · '}
            {comparisonText}
          </p>
        )}
      </div>
    </motion.div>
  )
}
