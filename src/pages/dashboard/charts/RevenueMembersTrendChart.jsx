import { useState } from "react";
import { motion } from "framer-motion";
import {
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { CHART_COLORS, defaultChartOptions, ChartTooltip } from "./chartConfig.jsx";

const revenueByMonth = [
  { month: "Aug", revenue: 18.2, members: 980 },
  { month: "Sep", revenue: 19.8, members: 1020 },
  { month: "Oct", revenue: 21.1, members: 1080 },
  { month: "Nov", revenue: 22.4, members: 1140 },
  { month: "Dec", revenue: 20.8, members: 1100 },
  { month: "Jan", revenue: 23.1, members: 1180 },
  { month: "Feb", revenue: 24.8, members: 1284 },
];

export default function RevenueMembersTrendChart() {
  const [showRevenue, setShowRevenue] = useState(true);
  const [showMembers, setShowMembers] = useState(true);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-5 sm:p-6 hover:border-zinc-700 transition-colors"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <h2 className="text-lg font-bold text-white uppercase tracking-tight">
          Revenue &amp; Members Trend
        </h2>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showRevenue}
              onChange={(e) => setShowRevenue(e.target.checked)}
              className="rounded border-zinc-600 bg-zinc-800 text-orange-500 focus:ring-orange-500"
            />
            <span className="text-zinc-400 text-sm">Revenue</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showMembers}
              onChange={(e) => setShowMembers(e.target.checked)}
              className="rounded border-zinc-600 bg-zinc-800 text-emerald-500 focus:ring-emerald-500"
            />
            <span className="text-zinc-400 text-sm">Members</span>
          </label>
        </div>
      </div>
      <span className="text-zinc-500 text-sm block mb-2">Last 7 months</span>
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueByMonth} margin={defaultChartOptions.margin}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CHART_COLORS.primary} stopOpacity={0.35} />
                <stop offset="100%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="membersGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CHART_COLORS.secondary} stopOpacity={0.25} />
                <stop offset="100%" stopColor={CHART_COLORS.secondary} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid {...defaultChartOptions.cartesianGrid} />
            <XAxis dataKey="month" {...defaultChartOptions.xAxis} />
            <YAxis
              yAxisId="revenue"
              {...defaultChartOptions.yAxis}
              tickFormatter={(v) => `$${v}`}
              hide={!showRevenue}
            />
            <YAxis
              yAxisId="members"
              orientation="right"
              {...defaultChartOptions.yAxis}
              hide={!showMembers}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: CHART_COLORS.grid }} />
            <Legend
              wrapperStyle={{ paddingTop: 8 }}
              formatter={(value) => <span className="text-zinc-400 text-sm">{value}</span>}
            />
            {showRevenue && (
              <Area
                yAxisId="revenue"
                type="monotone"
                dataKey="revenue"
                name="Revenue (k)"
                stroke={CHART_COLORS.primary}
                strokeWidth={2}
                fill="url(#revenueGrad)"
              />
            )}
            {showMembers && (
              <Line
                yAxisId="members"
                type="monotone"
                dataKey="members"
                name="Members"
                stroke={CHART_COLORS.secondary}
                strokeWidth={2}
                dot={{ fill: CHART_COLORS.secondary, r: 3 }}
                activeDot={{ r: 5 }}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.section>
  );
}
