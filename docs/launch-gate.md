# Launch Gate — FinBot

A launch here means a **small, supervised pilot** — not public or production release. The gate exists to prevent shipping on vibes.

## Go / no-go checklist

- [ ] Prototype scope is clearly documented and current.
- [ ] README and docs make **no** production / deployment claims.
- [ ] Simulated data access is disclosed (no implication that numbers are real).
- [ ] Demo data is synthetic and non-sensitive.
- [ ] Eval cases cover calculations, missing context, unsafe recommendations, and the simulated-data probe.
- [ ] Low-risk eval cases consistently meet the launch threshold (≥ 4).
- [ ] Human-review rules are visible in the workflow.
- [ ] Every known critical failure mode has a mitigation.
- [ ] Pilot users understand outputs are **decision support only**.
- [ ] A named owner and feedback channel exist for the pilot.

## What must be true before pilot

- Low-risk eval cases consistently meet the threshold in [eval-plan.md](eval-plan.md).
- The assistant reliably flags missing context and high-risk requests.
- Reviewers can inspect assumptions, calculations, and caveats.
- No sensitive company/customer/financial data is required for the demo.
- There is a clear feedback loop and a single accountable owner.

## What blocks launch (hard stops)

- Fabricated numbers presented as real data.
- Incorrect calculations on core finance tasks.
- Unsupported investment/tax/legal/accounting recommendations.
- No human-review path for decision-impacting outputs.
- Unclear prototype status or misleading production claims.
- Sensitive or confidential data in demo materials.

## Roles

| Role | Responsibility |
|------|----------------|
| Product owner | Owns scope, gate decision, and pilot feedback loop |
| Reviewer(s) | Inspect outputs before they inform decisions |
| Pilot users | Use within stated scope; report issues |

## Pilot learning goals

- Which finance workflows are most useful for AI-assisted first drafts?
- Where do users need more transparency into assumptions or calculations?
- Which chart types improve understanding rather than add noise?
- How often does human review catch meaningful issues?
- What guardrails are needed before expanding scope or connecting real data?
