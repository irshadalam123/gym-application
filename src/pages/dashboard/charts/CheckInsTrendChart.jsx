import { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { CHART_COLORS, defaultChartOptions, ChartTooltip } from "./chartConfig.jsx";

const checkInsByWeek = [
  { week: "W1 Jan", checkIns: 1240, unique: 412 },
  { week: "W2 Jan", checkIns: 1320, unique: 438 },
  { week: "W3 Jan", checkIns: 1180, unique: 398 },
  { week: "W4 Jan", checkIns: 1450, unique: 465 },
  { week: "W1 Feb", checkIns: 1380, unique: 448 },
  { week: "W2 Feb", checkIns: 1520, unique: 492 },
  { week: "W3 Feb", checkIns: 1490, unique: 478 },
];

export default function CheckInsTrendChart() {
  const [metric, setMetric] = useState("checkIns"); // "checkIns" | "unique"

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.22 }}
      className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-5 sm:p-6 hover:border-zinc-700 transition-colors"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <h2 className="text-lg font-bold text-white uppercase tracking-tight">
          Check-ins Trend
        </h2>
        <div className="flex rounded-lg bg-zinc-800/80 p-0.5">
          <button
            type="button"
            onClick={() => setMetric("checkIns")}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              metric === "checkIns"
                ? "bg-orange-500/20 text-orange-400"
                : "text-zinc-400 hover:text-zinc-300"
            }`}
          >
            Total
          </button>
          <button
            type="button"
            onClick={() => setMetric("unique")}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              metric === "unique"
                ? "bg-emerald-500/20 text-emerald-400"
                : "text-zinc-400 hover:text-zinc-300"
            }`}
          >
            Unique
          </button>
        </div>
      </div>
      <span className="text-zinc-500 text-sm block mb-2">By week</span>
      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={checkInsByWeek} margin={defaultChartOptions.margin}>
            <defs>
              <linearGradient id="checkInsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CHART_COLORS.quaternary} stopOpacity={0.3} />
                <stop offset="100%" stopColor={CHART_COLORS.quaternary} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid {...defaultChartOptions.cartesianGrid} />
            <XAxis dataKey="week" {...defaultChartOptions.xAxis} />
            <YAxis {...defaultChartOptions.yAxis} />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: CHART_COLORS.grid }} />
            <Area
              type="monotone"
              dataKey={metric}
              name={metric === "checkIns" ? "Check-ins" : "Unique members"}
              stroke={CHART_COLORS.quaternary}
              strokeWidth={2}
              fill="url(#checkInsGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.section>
  );
}
