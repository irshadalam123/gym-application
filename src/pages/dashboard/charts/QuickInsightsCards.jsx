import { motion } from "framer-motion";

const insights = [
  {
    label: "Peak day",
    value: "Friday",
    sub: "58 classes · 502 attendance",
    accent: "text-amber-400",
  },
  {
    label: "Top plan",
    value: "Premium",
    sub: "520 members (40%)",
    accent: "text-emerald-400",
  },
  {
    label: "Revenue growth",
    value: "+18%",
    sub: "MTD vs last month",
    accent: "text-emerald-400",
  },
  {
    label: "Avg. class size",
    value: "12.4",
    sub: "Across all programs",
    accent: "text-blue-400",
  },
];

export default function QuickInsightsCards() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-5 sm:p-6 hover:border-zinc-700 transition-colors"
    >
      <h2 className="text-lg font-bold text-white uppercase tracking-tight mb-4">
        Quick Insights
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight, i) => (
          <motion.div
            key={insight.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.03 }}
            className="rounded-lg bg-zinc-800/60 border border-zinc-700/80 p-4 hover:border-zinc-600 hover:bg-zinc-800/80 transition-all cursor-default"
          >
            <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">
              {insight.label}
            </p>
            <p className={`text-xl font-bold mt-1 ${insight.accent}`}>{insight.value}</p>
            <p className="text-zinc-500 text-sm mt-0.5">{insight.sub}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
