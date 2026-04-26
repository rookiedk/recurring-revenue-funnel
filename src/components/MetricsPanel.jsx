import { motion } from "framer-motion";

const LENS_TITLES = {
  vl1: "Outcomes",
  vl2: "Economic Drivers",
  vl3: "Product Signals",
};

export default function MetricsPanel({
  activeLens,
  activeStage,
  activeStageName,
  lenses,
  metricsByLensForStage,
  onLensSelect,
}) {
  const activeLensInfo = lenses.find((lens) => lens.id === activeLens);

  return (
    <aside className="w-full rounded-2xl border border-slate-700/50 bg-panel p-4 lg:w-60">
      <p className="text-xs uppercase tracking-wide text-slate-400">Lens Layers</p>
      <h2 className="text-lg font-semibold">Three-layer model</h2>
      <p className="mt-1 text-sm text-slate-300">
        Stage {activeStage}: {activeStageName}
      </p>

      <div className="mt-4 space-y-3">
        {lenses.map((lens, index) => (
          <div key={lens.id}>
            <button
              type="button"
              onClick={() => onLensSelect(lens.id)}
              className={`w-full rounded-lg border px-3 py-2 text-left ${
                lens.id === activeLens
                  ? "border-accent bg-accent/20"
                  : "border-slate-700 bg-slate-900/50"
              }`}
            >
              <p className="text-xs text-slate-400">{lens.tier}</p>
              <p className="text-sm font-semibold">
                {lens.label.replace("VL1 ", "").replace("VL2 ", "").replace("VL3 ", "")}
              </p>
              <p className="text-xs text-slate-400">{lens.drives}</p>

              <div className="mt-2 space-y-2">
                {metricsByLensForStage[lens.id].map((metric) => (
                  <motion.div
                    key={`${lens.id}-${metric}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-md border border-slate-700/70 bg-slate-800/60 px-2 py-1 text-xs"
                  >
                    {metric}
                  </motion.div>
                ))}
              </div>
            </button>
            {index < lenses.length - 1 ? (
              <p className="py-1 text-center text-[11px] text-slate-500">drives</p>
            ) : null}
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Focused layer: {LENS_TITLES[activeLens]} ({activeLensInfo?.tier})
      </p>
    </aside>
  );
}
