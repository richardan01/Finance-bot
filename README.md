# Finance Bot 💰

![Status](https://img.shields.io/badge/status-prototype-blue)
![Product](https://img.shields.io/badge/focus-AI%20product%20management-purple)
![Human Review](https://img.shields.io/badge/human--in--the--loop-required-orange)

AI finance assistant prototype for structured analysis, reasoning, charting, and human review.

## What this is

Finance Bot is a learning project that explores how an AI assistant could help finance and operations users turn messy business questions into structured, reviewable analysis. It is framed as a product prototype, not a production financial advisor.

## Who it is for

- Finance and business operations teams exploring AI-assisted analysis
- Product managers evaluating AI workflow design and launch readiness
- Analysts who need clearer answer structure, charts, and review checkpoints
- Portfolio reviewers looking for practical AI product thinking

## Problem

Finance questions often mix incomplete context, unclear assumptions, calculations, and decision pressure. A basic chatbot response can sound confident while hiding gaps, unsupported numbers, or reasoning errors.

## Solution

Finance Bot demonstrates a safer assistant pattern: collect context, reason through the request, produce a structured answer, show charts when useful, and keep a human reviewer in the loop before decisions are made.

## How it works

1. User asks a finance or business analysis question.
2. Assistant identifies the relevant context, assumptions, and analysis path.
3. Data or user-provided context is used to shape a structured response.
4. The output highlights reasoning, caveats, and next steps.
5. Charts or visualizations are generated when they make the answer clearer.
6. A human reviews the answer before it supports a decision.

## Demo

Demo assets are not included yet. Planned additions:

- Short walkthrough video or GIF
- Example prompt set
- Before / after comparison of unstructured vs. structured analysis
- Screenshot of chart-supported output

## Product thinking

This project emphasizes product decisions, not just implementation:

- Make uncertainty visible instead of hiding it
- Separate analysis support from final financial recommendations
- Design for reviewability, traceability, and user trust
- Define launch gates before expanding usage
- Treat evaluation and failure modes as core product requirements

## Eval approach

The evaluation plan focuses on whether the assistant is useful, accurate, calibrated, and safe enough for a prototype pilot. See the full [eval plan](docs/eval-plan.md).

Key checks include:

- Correctness of calculations and assumptions
- Clear separation of facts, estimates, and recommendations
- Appropriate caveats when context is missing
- Consistent structure and chart usefulness
- Escalation to human review for high-risk outputs

## Human review / guardrails

Finance Bot should not be treated as autonomous decision-making software. The intended guardrail pattern is:

- Human review before business or financial decisions
- No unsupported investment, legal, tax, or accounting advice
- Explicit caveats for incomplete context
- No sensitive customer, company, or financial data in demo content
- Failure-mode review before pilot expansion

## How to run

```bash
npm install
npm run dev
```

Optional production-style build check:

```bash
npm run build
```

## Documentation

- [Product brief](docs/product-brief.md)
- [Eval plan](docs/eval-plan.md)
- [Failure modes](docs/failure-modes.md)
- [Launch gate](docs/launch-gate.md)
- [Architecture](docs/architecture.md)

## Roadmap

- Add demo prompts and sample outputs
- Add evaluation dataset with expected behaviors
- Improve citation and source traceability
- Add more explicit confidence and assumption labeling
- Expand chart examples for common finance workflows
- Document pilot feedback and iteration decisions

## Status

Prototype / learning project. Not deployed, not production-ready, and not intended for autonomous financial decisions.
