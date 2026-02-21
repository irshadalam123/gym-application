export const CHART_COLORS = {
  primary: "#f97316",
  secondary: "#22c55e",
  tertiary: "#3b82f6",
  quaternary: "#a855f7",
  grid: "rgba(255,255,255,0.06)",
  text: "#a1a1aa",
  tooltipBg: "rgba(24,24,27,0.95)",
};

export const defaultChartOptions = {
  margin: { top: 8, right: 8, left: 8, bottom: 8 },
  cartesianGrid: {
    stroke: CHART_COLORS.grid,
    strokeDasharray: "3 3",
    vertical: false,
  },
  xAxis: {
    axisLine: { stroke: CHART_COLORS.grid },
    tick: { fill: CHART_COLORS.text, fontSize: 11 },
    tickLine: false,
  },
  yAxis: {
    axisLine: false,
    tick: { fill: CHART_COLORS.text, fontSize: 11 },
    tickLine: false,
    grid: { stroke: CHART_COLORS.grid, strokeDasharray: "3 3" },
  },
};

export function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-lg border border-zinc-700 px-3 py-2 shadow-xl"
      style={{ background: CHART_COLORS.tooltipBg }}
    >
      <p className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1">
        {label}
      </p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-white text-sm font-semibold">
          {p.name}: {typeof p.value === "number" && p.value < 100 ? `${p.value}%` : p.value}
        </p>
      ))}
    </div>
  );
}

export function CustomPieTooltip({ active, payload, total }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const pct = total ? ((d.value / total) * 100).toFixed(1) : "—";
  return (
    <div
      className="rounded-lg border border-zinc-700 px-3 py-2 shadow-xl"
      style={{ background: CHART_COLORS.tooltipBg }}
    >
      <p className="text-white font-semibold">{d.name}</p>
      <p className="text-zinc-400 text-sm">
        {d.value} {total ? `(${pct}%)` : ""}
      </p>
    </div>
  );
}
