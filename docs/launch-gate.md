# Launch Gate

## Go / no-go checklist

- [ ] Prototype scope is clearly documented.
- [ ] README and docs do not claim production readiness or deployment.
- [ ] Demo data is synthetic and non-sensitive.
- [ ] Evaluation test cases cover calculations, missing context, and unsafe recommendations.
- [ ] Human review rules are visible in the product workflow.
- [ ] Known critical failure modes have mitigations.
- [ ] Pilot users understand that outputs are decision support only.

## What must be true before pilot

- Low-risk evaluation cases consistently meet the launch threshold.
- The assistant reliably flags missing context and high-risk requests.
- Reviewers can inspect assumptions, calculations, and caveats.
- No sensitive company, customer, or financial data is required for the demo.
- The pilot has a clear feedback loop and owner.

## What blocks launch

- Fabricated numbers presented as real data
- Incorrect calculations on core finance tasks
- Unsupported investment, tax, legal, or accounting recommendations
- No human review path for decision-impacting outputs
- Unclear prototype status or misleading production claims
- Use of sensitive or confidential data in demo materials

## Pilot learning goals

- Which finance workflows are most useful for AI-assisted first drafts?
- Where do users need more transparency into assumptions or calculations?
- Which chart types improve understanding rather than adding noise?
- How often does human review catch meaningful issues?
- What guardrails are needed before expanding the prototype scope?
