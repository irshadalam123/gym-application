import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { CHART_COLORS, defaultChartOptions, ChartTooltip } from "./chartConfig.jsx";

const classesByDay = [
  { day: "Mon", classes: 42, attendance: 368 },
  { day: "Tue", classes: 48, attendance: 412 },
  { day: "Wed", classes: 52, attendance: 445 },
  { day: "Thu", classes: 45, attendance: 398 },
  { day: "Fri", classes: 58, attendance: 502 },
  { day: "Sat", classes: 38, attendance: 334 },
  { day: "Sun", classes: 28, attendance: 245 },
];

export default function ClassesAttendanceBarChart() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="lg:col-span-2 rounded-xl bg-zinc-900/80 border border-zinc-800 p-5 sm:p-6 hover:border-zinc-700 transition-colors"
    >
      <h2 className="text-lg font-bold text-white uppercase tracking-tight mb-4">
        Classes &amp; Attendance by Day
      </h2>
      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={classesByDay}
            margin={defaultChartOptions.margin}
            barGap={8}
            barCategoryGap="20%"
          >
            <CartesianGrid {...defaultChartOptions.cartesianGrid} />
            <XAxis dataKey="day" {...defaultChartOptions.xAxis} />
            <YAxis {...defaultChartOptions.yAxis} />
            <Tooltip
              content={<ChartTooltip />}
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
            />
            <Legend
              wrapperStyle={{ paddingTop: 8 }}
              formatter={(value) => <span className="text-zinc-400 text-sm">{value}</span>}
            />
            <Bar
              dataKey="classes"
              name="Classes"
              fill={CHART_COLORS.primary}
              radius={[4, 4, 0, 0]}
              maxBarSize={48}
            />
            <Bar
              dataKey="attendance"
              name="Attendance"
              fill={CHART_COLORS.tertiary}
              radius={[4, 4, 0, 0]}
              maxBarSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.section>
  );
}
