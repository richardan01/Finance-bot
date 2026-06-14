# Failure Modes

## Hallucinated numbers

The assistant may invent financial figures, benchmarks, or trends that were not provided.

**Mitigation:** Require source labeling for numbers, distinguish sample data from real data, and flag missing data before analysis.

## Unsupported recommendations

The assistant may recommend financial, investment, tax, legal, or accounting actions without enough evidence or authority.

**Mitigation:** Frame outputs as decision support, avoid definitive professional advice, and require human review for high-impact decisions.

## Wrong calculations

The assistant may make arithmetic errors, apply the wrong formula, or misread time periods.

**Mitigation:** Add calculation test cases, show formulas or intermediate steps, and review outputs against known expected answers.

## Missing context

The assistant may answer without asking for critical context such as time period, data source, business objective, or risk tolerance.

**Mitigation:** Prompt for missing inputs, list assumptions, and avoid strong conclusions when key context is absent.

## Overconfidence

The assistant may present uncertain analysis as if it is final or authoritative.

**Mitigation:** Use calibrated language, show confidence limits, and separate observations from recommendations.

## Sensitive data exposure

The assistant may process or reveal confidential customer, company, or financial data in prompts, outputs, logs, or demos.

**Mitigation:** Use synthetic demo data, avoid sensitive examples, document data handling expectations, and review prompts before sharing externally.

## Mitigations

- Maintain a small evaluation set with expected behaviors.
- Add launch gates before pilot usage.
- Require human review for decision-impacting outputs.
- Make assumptions and uncertainty visible.
- Avoid production or deployment claims until they are true.
- Keep portfolio demos synthetic and non-sensitive.
