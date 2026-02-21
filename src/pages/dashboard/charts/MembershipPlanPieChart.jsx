import { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { CHART_COLORS, CustomPieTooltip } from "./chartConfig.jsx";

const planDistribution = [
  { name: "Premium", value: 520, color: CHART_COLORS.primary },
  { name: "Standard", value: 412, color: CHART_COLORS.secondary },
  { name: "Basic", value: 282, color: CHART_COLORS.tertiary },
  { name: "Trial", value: 70, color: CHART_COLORS.quaternary },
];

const total = planDistribution.reduce((s, x) => s + x.value, 0);

export default function MembershipPlanPieChart() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-5 sm:p-6 hover:border-zinc-700 transition-colors"
    >
      <h2 className="text-lg font-bold text-white uppercase tracking-tight mb-4">
        Membership by Plan
      </h2>
      <div className="h-[260px] w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={planDistribution}
              cx="50%"
              cy="50%"
              innerRadius="58%"
              outerRadius="85%"
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
              stroke="transparent"
              activeIndex={activeIndex}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {planDistribution.map((entry, i) => (
                <Cell
                  key={entry.name}
                  fill={entry.color}
                  stroke={activeIndex === i ? "rgba(255,255,255,0.2)" : "transparent"}
                  strokeWidth={activeIndex === i ? 2 : 0}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomPieTooltip total={total} />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2">
        {planDistribution.map((p) => (
          <span key={p.name} className="flex items-center gap-1.5 text-sm">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: p.color }}
            />
            <span className="text-zinc-400">{p.name}</span>
          </span>
        ))}
      </div>
    </motion.section>
  );
}
