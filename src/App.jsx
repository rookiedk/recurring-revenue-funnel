import { useMemo, useState } from "react";
import CrossStagePanel from "./components/CrossStagePanel";
import FunnelDiagram from "./components/FunnelDiagram";
import MetricsPanel from "./components/MetricsPanel";

const LENSES = [
  {
    id: "vl3",
    label: "VL3 Product Signals",
    tier: "Level 1 (Leading)",
    drives: "Feeds VL2",
  },
  {
    id: "vl2",
    label: "VL2 Economic Drivers",
    tier: "Level 2 (Structural)",
    drives: "Feeds VL1",
  },
  {
    id: "vl1",
    label: "VL1 Outcomes",
    tier: "Level 3 (Lagging)",
    drives: "Informs next VL3 cycle",
  },
];

const STAGES = [
  { id: "A", name: "Awareness" },
  { id: "B", name: "Education" },
  { id: "C", name: "Selection" },
  { id: "D", name: "Onboarding / Activation" },
  { id: "E", name: "Adoption" },
  { id: "F", name: "Expansion" },
];

const METRICS_BY_LENS = {
  vl1: {
    A: ["Pipeline Coverage", "Lead-to-Opportunity", "Acquisition Velocity"],
    B: ["Win Probability", "Cycle Time", "Buying Committee Progress"],
    C: ["New ARR", "Closed Won Rate", "Forecast Accuracy"],
    D: ["Time to First Value", "Early Retention", "Onboarding Completion"],
    E: ["GRR", "Renewal Rate", "Logo Retention"],
    F: ["NRR", "Expansion ARR", "Revenue Compounding"],
  },
  vl2: {
    A: ["Paid CAC", "Blended CAC", "Channel Efficiency"],
    B: ["Sales Efficiency", "Cost per Opportunity", "Deal Friction Index"],
    C: ["CAC Payback", "Gross Margin Entry", "Acquisition Burn Multiple"],
    D: ["Implementation Cost", "Support Load", "Margin Stability"],
    E: ["LTV", "LTV:CAC", "COGS per Account"],
    F: ["Unit Leverage", "Expansion Efficiency", "Contribution Margin"],
  },
  vl3: {
    A: ["Intent Signals", "ICP Match Rate", "Message Resonance"],
    B: ["Feature Interest Depth", "Champion Strength", "Risk Concerns"],
    C: ["Pre-onboarding Readiness", "Use-case Clarity", "Adoption Readiness"],
    D: ["Activation Events", "Workflow Completion", "Team Setup Progress"],
    E: ["WAU/DAU Trend", "Seat Utilization", "Feature Stickiness"],
    F: ["Cross-team Adoption", "Upsell Readiness", "Expansion Triggers"],
  },
};

export default function App() {
  const [readingMode, setReadingMode] = useState("byStage");
  const [activeLens, setActiveLens] = useState("vl1");
  const [activeStage, setActiveStage] = useState("A");

  const activeStageName = useMemo(
    () => STAGES.find((stage) => stage.id === activeStage)?.name ?? "",
    [activeStage]
  );
  const metricsByLensForStage = useMemo(
    () =>
      LENSES.reduce((acc, lens) => {
        acc[lens.id] = METRICS_BY_LENS[lens.id][activeStage];
        return acc;
      }, {}),
    [activeStage]
  );

  return (
    <main className="min-h-screen bg-ink text-slate-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-6">
        <div
          className={`flex flex-col gap-6 ${readingMode === "byStage" ? "lg:flex-row" : ""}`}
        >
          <section
            className={`rounded-2xl border border-slate-700/50 bg-panel p-4 shadow-2xl ${
              readingMode === "byStage" ? "flex-1" : "w-full"
            }`}
          >
            <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-xl font-semibold">Recurring Revenue Funnel</h1>
              <div
                className="flex rounded-lg border border-slate-700 p-0.5"
                role="group"
                aria-label="Reading mode"
              >
                <button
                  type="button"
                  onClick={() => setReadingMode("byStage")}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    readingMode === "byStage"
                      ? "bg-accent/25 text-accent"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  By stage
                </button>
                <button
                  type="button"
                  onClick={() => setReadingMode("acrossStages")}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    readingMode === "acrossStages"
                      ? "bg-accent/25 text-accent"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Across stages
                </button>
              </div>
            </header>
            <p className="mb-4 text-xs text-slate-400">
              Lens hierarchy: VL3 (leading signals) -&gt; VL2 (economics) -&gt; VL1 (outcomes)
            </p>

            <FunnelDiagram
              activeStage={activeStage}
              onStageSelect={setActiveStage}
              stages={STAGES}
              readingMode={readingMode}
            />
          </section>

          {readingMode === "byStage" ? (
            <MetricsPanel
              activeLens={activeLens}
              activeStage={activeStage}
              activeStageName={activeStageName}
              lenses={LENSES}
              metricsByLensForStage={metricsByLensForStage}
              onLensSelect={setActiveLens}
            />
          ) : null}
        </div>

        {readingMode === "acrossStages" ? (
          <CrossStagePanel
            stages={STAGES}
            lenses={LENSES}
            metricsByLens={METRICS_BY_LENS}
            activeLens={activeLens}
            activeStage={activeStage}
            onLensSelect={setActiveLens}
            onStageSelect={setActiveStage}
          />
        ) : null}
      </div>
    </main>
  );
}
