// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   { day: "Mon", value: 3000 },
//   { day: "Tue", value: 4500 },
//   { day: "Wed", value: 3800 },
//   { day: "Thu", value: 6200 },
//   { day: "Fri", value: 5800 },
//   { day: "Sat", value: 7300 },
//   { day: "Sun", value: 6900 },
// ];

// const CustomTooltip = ({ active, payload, label }) => {
//   if (!active || !payload || !payload.length) return null;

//   return (
//     <div className="bg-[#0F172A] border border-[#2A3B57] rounded-2xl px-5 py-4">
//       <p className="text-sm font-semibold text-white">{label}</p>

//       <p className="text-cyan-400 text-sm mt-2">
//         Value : {payload[0].value.toLocaleString()}
//       </p>
//     </div>
//   );
// };

// export default function PerformanceChart() {
//   return (
//     <div
//       className="
//       bg-[#17223B]
//       border
//       border-[#2A3B57]
//       rounded-3xl
//       px-8
//       py-8
//       shadow-lg
//       h-full
//       "
//     >
//       <div className="mb-10">

//         <h2 className="text-2xl font-semibold">
//           Weekly Performance
//         </h2>

//         <p className="text-slate-400 mt-2">
//           Engagement over the last 7 days
//         </p>

//       </div>

//       <ResponsiveContainer width="100%" height={340}>
//         <AreaChart
//           data={data}
//           margin={{
//             top: 10,
//             right: 15,
//             left: 5,
//             bottom: 5,
//           }}
//         >
//           <defs>
//             <linearGradient
//               id="perfGradient"
//               x1="0"
//               y1="0"
//               x2="0"
//               y2="1"
//             >
//               <stop
//                 offset="0%"
//                 stopColor="#06b6d4"
//                 stopOpacity={0.35}
//               />

//               <stop
//                 offset="100%"
//                 stopColor="#06b6d4"
//                 stopOpacity={0}
//               />
//             </linearGradient>
//           </defs>

//           <CartesianGrid
//             stroke="#23324B"
//             vertical={false}
//           />

//           <XAxis
//             dataKey="day"
//             stroke="#94A3B8"
//             axisLine={false}
//             tickLine={false}
//             tick={{ fontSize: 13 }}
//           />

//           <YAxis
//             stroke="#94A3B8"
//             axisLine={false}
//             tickLine={false}
//             tick={{ fontSize: 13 }}
//             tickFormatter={(v) => v.toLocaleString()}
//           />

//           <Tooltip
//             cursor={{
//               stroke: "#23324B",
//               strokeWidth: 1,
//             }}
//             content={<CustomTooltip />}
//           />

//           <Area
//             type="monotone"
//             dataKey="value"
//             stroke="#06b6d4"
//             strokeWidth={3}
//             fill="url(#perfGradient)"
//             dot={{
//               r: 3,
//               fill: "#06b6d4",
//             }}
//             activeDot={{
//               r: 5,
//               fill: "#06b6d4",
//             }}
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", value: 3000 },
  { day: "Tue", value: 4500 },
  { day: "Wed", value: 3800 },
  { day: "Thu", value: 6200 },
  { day: "Fri", value: 5800 },
  { day: "Sat", value: 7300 },
  { day: "Sun", value: 6900 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-[#111B2E] border border-[#253652] rounded-2xl px-5 py-4 shadow-xl">
      <p className="text-sm font-semibold text-white">{label}</p>
      <p className="text-cyan-400 text-sm mt-2">
        {payload[0].value.toLocaleString()} clicks
      </p>
    </div>
  );
};

export default function PerformanceChart() {
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
          Weekly Performance
        </h2>

        <p className="text-sm text-slate-400 mt-2">
          Campaign engagement during the last 7 days
        </p>
      </div>

      <ResponsiveContainer width="100%" height={330}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 12,
            left: -15,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="perfGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            stroke="#24344F"
            vertical={false}
            strokeDasharray="4 4"
          />

          <XAxis
            dataKey="day"
            tick={{ fill: "#94A3B8", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fill: "#94A3B8", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="value"
            stroke="#22D3EE"
            strokeWidth={3}
            fill="url(#perfGradient)"
            dot={{
              r: 3,
              fill: "#22D3EE",
            }}
            activeDot={{
              r: 6,
              fill: "#22D3EE",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}