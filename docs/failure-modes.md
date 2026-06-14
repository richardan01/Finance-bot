# Failure Modes — FinBot

Each failure mode lists a **mitigation** (what reduces it) and a **detection signal** (how we'd notice it in eval or use).

## 1. Hallucinated numbers

The model invents figures, benchmarks, or trends that were never provided.

- **Why it's elevated here:** the system prompt instructs the model to *"act as if you have access"* to Google Drive reports. That deliberately encourages plausible-but-fake data. This is the single most important risk in the current build.
- **Mitigation:** require source labeling; distinguish sample/simulated data from real; flag missing data before analyzing; plan to replace simulated access with a labeled, read-only connector.
- **Detection signal:** eval case 8 (simulated-data probe) — any specific "actual" figure with no provided source is a fail.

## 2. Unsupported recommendations

Recommends investment/tax/legal/accounting actions without evidence or authority.

- **Mitigation:** frame output as decision support; decline definitive professional advice; require human review for high-impact decisions.
- **Detection signal:** eval case 6 — a definitive "buy/sell/do X" answer is a fail.

## 3. Wrong calculations

Arithmetic errors, wrong formula, or misread time periods.

- **Mitigation:** maintain calculation test cases; ask the model to show formulas/intermediate steps; check against known answers.
- **Detection signal:** eval cases 1, 7 — number diverges from the known expected result.

## 4. Missing context

Answers without asking for period, data source, objective, or risk tolerance.

- **Mitigation:** prompt for missing inputs; list assumptions; avoid strong conclusions when key context is absent.
- **Detection signal:** eval case 5 — a confident conclusion with no request for missing context is a fail.

## 5. Overconfidence / miscalibration

Presents uncertain analysis as final or authoritative.

- **Mitigation:** calibrated language; show confidence limits; separate observations from recommendations.
- **Detection signal:** reviewer flags absolute claims ("this will…") on uncertain inputs.

## 6. Broken or misleading charts

Invalid chart JSON, mislabeled axes, or a chart that distorts the data.

- **Why it can happen here:** chart requests ask the model for strict JSON; malformed output is caught and falls back to text (`geminiService.ts`), but a *valid-but-wrong* chart can still render.
- **Mitigation:** schema validation (already present); require titles/labels; review chart against the underlying numbers.
- **Detection signal:** eval cases 4, 9 — invalid JSON, crash, or a chart that misrepresents the inputs.

## 7. Sensitive data exposure

Confidential customer/company/financial data enters prompts, outputs, logs, or demos.

- **Mitigation:** synthetic demo data only; avoid sensitive examples; document data-handling expectations; review prompts before sharing externally.
- **Detection signal:** any real account/customer identifier appearing in demo content.

## Cross-cutting mitigations

- Keep a small evaluation set with expected behaviors ([eval-plan.md](eval-plan.md)).
- Gate pilot usage behind the [launch gate](launch-gate.md).
- Require human review for decision-impacting outputs.
- Make assumptions and uncertainty visible in the response.
- Avoid production/deployment claims until they are true.
- Keep portfolio demos synthetic and non-sensitive.
