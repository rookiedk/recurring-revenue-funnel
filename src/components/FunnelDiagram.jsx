import { motion } from "framer-motion";

const BARS = [
  { id: "A", width: 320 },
  { id: "B", width: 250 },
  { id: "C", width: 180 },
  { id: "D", width: 180 },
  { id: "E", width: 250 },
  { id: "F", width: 340 },
];

export default function FunnelDiagram({ activeStage, onStageSelect, stages }) {
  return (
    <div className="overflow-x-auto">
      <svg
        viewBox="0 0 640 740"
        className="h-[640px] w-full min-w-[620px] rounded-xl bg-slate-900/40 p-2"
        role="img"
        aria-label="Revenue funnel diagram"
      >
        <line x1="70" y1="365" x2="570" y2="365" stroke="#334155" strokeWidth="2" />
        <text x="320" y="355" textAnchor="middle" fill="#94a3b8" fontSize="12">
          Mutual Commit
        </text>

        {BARS.map((bar, index) => {
          const stage = stages[index];
          const isActive = activeStage === stage.id;
          const barHeight = 74;
          const gap = 30;
          const commitGap = 56;
          const y =
            36 + index * (barHeight + gap) + (index >= 3 ? commitGap : 0);
          const x = (640 - bar.width) / 2;

          return (
            <g
              key={stage.id}
              onClick={() => onStageSelect(stage.id)}
              onMouseEnter={() => onStageSelect(stage.id)}
              className="cursor-pointer"
            >
              <motion.rect
                x={x}
                y={y}
                width={bar.width}
                height={barHeight}
                rx="10"
                animate={{
                  fill: isActive ? "#6ea8fe" : "#334155",
                  opacity: isActive ? 1 : 0.75,
                }}
                transition={{ duration: 0.2 }}
              />
              <text
                x={x + 18}
                y={y + 48}
                textAnchor="start"
                fill={isActive ? "#0a0f1d" : "#e2e8f0"}
                fontSize="32"
                fontWeight="700"
              >
                {stage.id}
              </text>
              <text
                x={x + 64}
                y={y + 48}
                textAnchor="start"
                fill={isActive ? "#0a0f1d" : "#cbd5e1"}
                fontSize="24"
              >
                {stage.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
