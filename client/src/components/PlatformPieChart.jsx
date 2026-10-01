import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Google", value: 45 },
  { name: "Facebook", value: 25 },
  { name: "Instagram", value: 18 },
  { name: "LinkedIn", value: 12 },
];

const COLORS = [
  "#22D3EE",
  "#3B82F6",
  "#8B5CF6",
  "#22C55E",
];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-[#111B2E] border border-[#253652] rounded-2xl px-5 py-4 shadow-xl">
      <p className="text-white text-sm font-semibold">
        {payload[0].name}
      </p>

      <p className="text-cyan-400 text-sm mt-2">
        {payload[0].value}% of traffic
      </p>
    </div>
  );
};

export default function PlatformPieChart() {
  return (
    <div
      className="
      bg-[#16213A]
      border
      border-[#253652]
      rounded-3xl
      px-8
      py-8
      shadow-lg
      h-full
      "
    >
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Platform Distribution
        </h2>

        <p className="text-sm text-slate-400 mt-2">
          Campaign traffic sources
        </p>
      </div>

      <ResponsiveContainer width="100%" height={330}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={72}
            outerRadius={108}
            paddingAngle={3}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />

          <Legend
            verticalAlign="bottom"
            iconType="circle"
            iconSize={10}
            wrapperStyle={{
              paddingTop: 20,
              color: "#94A3B8",
              fontSize: "13px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}