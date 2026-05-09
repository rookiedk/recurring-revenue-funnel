import { motion } from "framer-motion";

export default function CrossStagePanel({
  stages,
  lenses,
  metricsByLens,
  activeLens,
  activeStage,
  onLensSelect,
  onStageSelect,
}) {
  return (
    <section className="rounded-2xl border border-slate-700/50 bg-panel p-4 shadow-2xl">
      <header className="mb-3">
        <h2 className="text-lg font-semibold">Full system read</h2>
        <p className="mt-1 max-w-3xl text-sm text-slate-300">
          Same model as the stage-by-stage view, but every layer and every stage is visible
          together—useful for spotting coupling, drift, and leverage that never shows up in a
          single column.
        </p>
      </header>

      <p className="mb-3 text-[11px] text-slate-500">
        VL3 (leading) → VL2 (economics) → VL1 (outcomes); outcomes feed the next VL3 cycle.
        Hover or click a cell to sync the funnel highlight.
      </p>

      <div className="overflow-x-auto rounded-xl border border-slate-700/60 bg-slate-900/30">
        <table className="w-full min-w-[720px] border-separate border-spacing-0 text-left">
          <thead>
            <tr>
              <th
                scope="col"
                className="sticky left-0 z-10 border-b border-slate-700/80 bg-panel px-3 py-2 text-[11px] font-medium text-slate-500"
              >
                Layer
              </th>
              {stages.map((stage) => (
                <th
                  key={stage.id}
                  scope="col"
                  className="border-b border-l border-slate-700/80 px-2 py-2 text-[11px] font-semibold text-slate-300"
                >
                  <span className="text-accent">{stage.id}</span>
                  <span className="block font-normal text-slate-400">{stage.name}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lenses.map((lens) => (
              <tr key={lens.id}>
                <th
                  scope="row"
                  className="sticky left-0 z-10 border-b border-slate-700/60 bg-panel px-3 py-2 text-left align-top"
                >
                  <p className="text-[11px] text-slate-500">{lens.tier}</p>
                  <p className="text-xs font-semibold text-slate-200">
                    {lens.label.replace(/^VL\d\s+/, "")}
                  </p>
                </th>
                {stages.map((stage) => {
                  const metrics = metricsByLens[lens.id][stage.id];
                  const focused = lens.id === activeLens && stage.id === activeStage;
                  return (
                    <td
                      key={`${lens.id}-${stage.id}`}
                      className={`border-b border-l border-slate-700/60 align-top transition-colors ${
                        focused ? "bg-accent/15" : "bg-transparent"
                      }`}
                    >
                      <button
                        type="button"
                        className="w-full px-2 py-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/80"
                        onClick={() => {
                          onLensSelect(lens.id);
                          onStageSelect(stage.id);
                        }}
                        onMouseEnter={() => {
                          onLensSelect(lens.id);
                          onStageSelect(stage.id);
                        }}
                      >
                        <ul className="space-y-1.5">
                          {metrics.map((metric) => (
                            <motion.li
                              key={metric}
                              initial={false}
                              animate={{ opacity: focused ? 1 : 0.92 }}
                              className="rounded border border-slate-700/70 bg-slate-800/50 px-1.5 py-1 text-[11px] leading-snug text-slate-200"
                            >
                              {metric}
                            </motion.li>
                          ))}
                        </ul>
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
