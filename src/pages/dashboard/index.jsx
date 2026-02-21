import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StatCard, Table } from "../../components/common";
import {
  RevenueMembersTrendChart,
  ClassesAttendanceBarChart,
  MembershipPlanPieChart,
  CheckInsTrendChart,
  NewMembersChart,
  QuickInsightsCards,
} from "./charts";

const stats = [
  {
    label: "Active Members",
    value: "1,284",
    change: "+12%",
    trend: "up",
    description: "Currently checked in",
    comparisonText: "vs last month",
    icon: "👥",
  },
  {
    label: "Classes Today",
    value: "24",
    change: "+3",
    trend: "up",
    description: "Across 4 studios",
    comparisonText: "vs yesterday",
    icon: "🏋️",
  },
  // {
  //   label: "Revenue",
  //   value: "$12.4k",
  //   change: "+8%",
  //   trend: "up",
  //   description: "MTD",
  //   comparisonText: "vs last month",
  //   icon: "💰",
  // },
  {
    label: "Active Employee",
    value: "18",
    change: "+2",
    trend: "up",
    description: "On duty",
    comparisonText: "vs last week",
    icon: "👤",
  },
  {
    label: "Today's Collection",
    value: "$1,240",
    change: "+15%",
    trend: "up",
    description: "Payments received today",
    comparisonText: "vs yesterday",
    icon: "💵",
  },
  {
    label: "Current Week Collection",
    value: "$8,920",
    change: "+22%",
    trend: "up",
    description: "This week",
    comparisonText: "vs last week",
    icon: "📅",
  },
  {
    label: "Current Month Collection",
    value: "$34,560",
    change: "+8%",
    trend: "up",
    description: "MTD",
    comparisonText: "vs last month",
    icon: "📊",
  },
  {
    label: "Last Month Collection",
    value: "$32,100",
    change: "+5%",
    trend: "up",
    description: "Previous month total",
    comparisonText: "vs month before",
    icon: "📉",
  },
  {
    label: "Member Expired Today",
    value: "7",
    change: "-2",
    trend: "down",
    description: "Expirations today",
    comparisonText: "vs yesterday",
    icon: "⏰",
  },
];

export default function Dashboard() {
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [chartsExpanded, setChartsExpanded] = useState(true);

  return (
    <div className="space-y-6 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, i) => (
          <StatCard
            key={stat.label}
            {...stat}
            motionProps={{ transition: { delay: 0.1 * i } }}
          />
        ))}
      </motion.div>

      {/* Analytics section — toggleable */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.12 }}
        className="rounded-xl bg-zinc-900/50 border border-zinc-800 overflow-hidden"
      >
        <button
          type="button"
          onClick={() => setChartsExpanded((e) => !e)}
          className="w-full flex items-center justify-between gap-2 px-5 py-4 text-left hover:bg-zinc-800/40 transition-colors"
        >
          <h2 className="text-lg font-bold text-white uppercase tracking-tight">
            Analytics
          </h2>
          <span className="text-zinc-400 text-sm">
            {chartsExpanded ? "Collapse" : "Expand"}
          </span>
          <motion.span
            animate={{ rotate: chartsExpanded ? 180 : 0 }}
            className="text-zinc-500"
          >
            ▼
          </motion.span>
        </button>
        <AnimatePresence>
          {chartsExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="border-t border-zinc-800 px-5 py-5 space-y-6"
            >
              <RevenueMembersTrendChart />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ClassesAttendanceBarChart />
                <MembershipPlanPieChart />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CheckInsTrendChart />
                <NewMembersChart />
              </div>
              <QuickInsightsCards />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-6"
      >
        <h2 className="text-lg font-bold text-white uppercase tracking-tight mb-4">
          Welcome to Prime Zone
        </h2>
        <p className="text-zinc-400 mb-6">
          Use the sidebar to navigate. The layout is fully responsive: open the
          menu on mobile, collapse the sidebar on desktop.
        </p>

        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
          Common Table demo
        </h3>
        <Table
          columns={[
            { key: "name", label: "Member", sortable: true },
            { key: "plan", label: "Plan", sortable: true },
            {
              key: "status",
              label: "Status",
              align: "center",
              render: (val) => (
                <span
                  className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${val === "Active" ? "bg-emerald-500/20 text-emerald-400" : "bg-zinc-600/40 text-zinc-400"}`}
                >
                  {val}
                </span>
              ),
            },
            { key: "joined", label: "Joined", align: "right" },
          ]}
          data={[
            {
              id: 1,
              name: "Alex Rivera",
              plan: "Premium",
              status: "Active",
              joined: "Jan 15, 2025",
            },
            {
              id: 2,
              name: "Jordan Lee",
              plan: "Basic",
              status: "Active",
              joined: "Feb 1, 2025",
            },
            {
              id: 3,
              name: "Sam Chen",
              plan: "Premium",
              status: "Inactive",
              joined: "Dec 10, 2024",
            },
          ]}
          keyField="id"
          sortKey={sortBy}
          sortOrder={sortOrder}
          onSort={(key) => {
            setSortOrder((o) =>
              sortBy === key && o === "asc" ? "desc" : "asc",
            );
            setSortBy(key);
          }}
          emptyMessage="No members yet."
        />
      </motion.section>
    </div>
  );
}
