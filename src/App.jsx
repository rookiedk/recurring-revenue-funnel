import { useMemo, useState } from "react";
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
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-6 lg:flex-row">
        <section className="flex-1 rounded-2xl border border-slate-700/50 bg-panel p-4 shadow-2xl">
          <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-xl font-semibold">Recurring Revenue Funnel</h1>
          </header>
          <p className="mb-4 text-xs text-slate-400">
            Lens hierarchy: VL3 (leading signals) -&gt; VL2 (economics) -&gt; VL1 (outcomes)
          </p>

          <FunnelDiagram
            activeStage={activeStage}
            onStageSelect={setActiveStage}
            stages={STAGES}
          />
        </section>

        <MetricsPanel
          activeLens={activeLens}
          activeStage={activeStage}
          activeStageName={activeStageName}
          lenses={LENSES}
          metricsByLensForStage={metricsByLensForStage}
          onLensSelect={setActiveLens}
        />
      </div>
    </main>
  );
}
