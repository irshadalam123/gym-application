import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CHART_COLORS, defaultChartOptions, ChartTooltip } from "./chartConfig.jsx";

const newMembersByMonth = [
  { month: "Aug", new: 42, renewed: 28 },
  { month: "Sep", new: 48, renewed: 35 },
  { month: "Oct", new: 52, renewed: 38 },
  { month: "Nov", new: 45, renewed: 42 },
  { month: "Dec", new: 38, renewed: 30 },
  { month: "Jan", new: 58, renewed: 45 },
  { month: "Feb", new: 62, renewed: 48 },
];

export default function NewMembersChart() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.28 }}
      className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-5 sm:p-6 hover:border-zinc-700 transition-colors"
    >
      <h2 className="text-lg font-bold text-white uppercase tracking-tight mb-4">
        New vs Renewed Members
      </h2>
      <span className="text-zinc-500 text-sm block mb-2">Last 7 months</span>
      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={newMembersByMonth}
            margin={defaultChartOptions.margin}
            barGap={4}
            barCategoryGap="18%"
          >
            <CartesianGrid {...defaultChartOptions.cartesianGrid} />
            <XAxis dataKey="month" {...defaultChartOptions.xAxis} />
            <YAxis {...defaultChartOptions.yAxis} />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
            <Bar
              dataKey="new"
              name="New signups"
              fill={CHART_COLORS.primary}
              radius={[4, 4, 0, 0]}
              maxBarSize={36}
            />
            <Bar
              dataKey="renewed"
              name="Renewals"
              fill={CHART_COLORS.secondary}
              radius={[4, 4, 0, 0]}
              maxBarSize={36}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.section>
  );
}
