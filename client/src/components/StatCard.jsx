import { motion } from "framer-motion";

const COLOR_MAP = {
  cyan: {
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
  },
  blue: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
  },
  green: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
  },
  purple: {
    bg: "bg-violet-500/10",
    text: "text-violet-400",
  },
};

export default function StatCard({
  title,
  value,
  icon,
  color = "cyan",
}) {
  const palette = COLOR_MAP[color] || COLOR_MAP.cyan;

  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{ duration: 0.25 }}
      className="
      bg-[#16213A]
      border
      border-[#253652]
      rounded-3xl
      px-7
      py-6
      min-h-[145px]
      shadow-lg
      hover:shadow-cyan-500/10
      transition-all
      duration-300
      "
    >
      <div className="flex justify-between items-start h-full">
        <div className="flex flex-col justify-between">
          <p
            className="
            text-sm
            font-medium
            tracking-wide
            text-slate-400
            "
          >
            {title}
          </p>

          <h2
            className="
            text-[34px]
            font-bold
            tracking-tight
            text-white
            mt-6
            "
          >
            {value}
          </h2>
        </div>

        <div
          className={`
          ${palette.bg}
          ${palette.text}
          w-14
          h-14
          rounded-2xl
          flex
          items-center
          justify-center
          `}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
}