# Finance Bot 💰 (FinBot)

![Status](https://img.shields.io/badge/status-prototype-blue)
![CI](https://github.com/richardan01/Finance-bot/actions/workflows/ci.yml/badge.svg)
![Focus](https://img.shields.io/badge/focus-AI%20product%20management-purple)
![Human Review](https://img.shields.io/badge/human--in--the--loop-required-orange)
![Data](https://img.shields.io/badge/data-simulated-lightgrey)

An AI finance-analyst **prototype** that turns finance questions into structured, reviewable answers — with charts when they help and a human in the loop before anything informs a decision.

> **Honest framing:** This is a learning / portfolio project, not a deployed product. The current build **simulates** access to finance reports (the model is prompted to *act as if* it can read Google Drive files). There is no real data connection yet. Treat all output as illustrative.

---

## What this is

FinBot is a single-page React app that calls Google's Gemini model to answer finance and operations questions, optionally analyze uploaded files (PDF/DOCX/XLSX/CSV), and render simple charts (bar/line/pie). It exists to demonstrate **AI product thinking** — problem framing, assistant design, evaluation, failure-mode analysis, and launch readiness — not to give financial advice.

## Why it exists

Most AI tools applied to finance optimise for sounding helpful. The real problem is **reviewability** — a finance answer is only useful if someone can check the assumptions, follow the math, and decide whether to trust it *before* it drives a decision. FinBot prototypes a different pattern: structured, inspectable answers with a human between the output and any decision. See [docs/product-brief.md](docs/product-brief.md) for the full problem framing and differentiation from generic LLM chat.

## Demo

> Demo GIF / screenshots not yet added — the app runs locally with a Gemini API key (`npm run dev`). Recording a walkthrough is on the roadmap.

Suggested prompts to try once running:
- *"Revenue was $80k Jan, $95k Feb, $88k Mar. Summarise the trend and flag any concern."*
- *"Show a bar chart of those three months."*
- *"Should I cut the marketing budget?" (deliberately under-specified — watch the caveat behaviour)*

## How it works (real flow)

1. User asks a question and/or uploads a file in the chat UI (`components/ChatInterface.tsx`).
2. The request + conversation history is sent to **Gemini 2.5 Flash** with a finance-analyst system prompt (`services/geminiService.ts`).
3. If the prompt looks like a chart request, the model is asked to return **structured JSON** matching a chart schema; otherwise it returns Markdown text.
4. Text responses may include a `CHART_SUGGESTION:` line, which the client parses into a one-click "visualize" action.
5. Valid chart JSON is rendered with `recharts` in the visualization panel.
6. A human reviews the output before it supports any decision.

See [docs/architecture.md](docs/architecture.md) for the full diagram and trust boundaries.

## Tech stack

React 19 · TypeScript · Vite · `@google/genai` (Gemini 2.5 Flash) · recharts · lucide-react.

## Product thinking

- Make uncertainty and assumptions **visible** instead of hiding them.
- Separate analysis support from final financial recommendations.
- Design for reviewability and traceability, not autonomy.
- Define eval criteria and launch gates *before* expanding scope.
- Be honest about what's real (UI + model call) vs. simulated (data access).

## Eval approach

The [eval plan](docs/eval-plan.md) checks whether the assistant is useful, accurate, calibrated, and safe enough for a small pilot. Key checks:

- Calculation correctness on known inputs
- Clear separation of facts, estimates, and recommendations
- Appropriate caveats when context is missing
- Valid, well-labeled chart JSON
- **Honesty about simulated data** (does it imply fabricated numbers are real?)
- Escalation to human review for high-risk requests

## Human review / guardrails

- Human review required before any business or financial decision.
- No definitive investment, tax, legal, or accounting advice.
- Explicit caveats when context is incomplete.
- Synthetic, non-sensitive data only in demos.
- Failure-mode review before any pilot expansion (see [failure modes](docs/failure-modes.md)).

## How to run

```bash
npm install
# add your key to .env  (see .env.example)
echo "GEMINI_API_KEY=your_key_here" > .env
npm run dev
```

Production-style build check:

```bash
npm run build
```

> Requires a Gemini API key. The app throws on startup if `GEMINI_API_KEY` is unset.

## Documentation

- [Product brief](docs/product-brief.md) — problem, insight, users, scope, metrics
- [Eval plan](docs/eval-plan.md) — dimensions, rubric, test cases, threshold
- [Eval results](docs/eval-results.md) — graded outputs (template, not yet run)
- [Failure modes](docs/failure-modes.md) — risks, mitigations, detection signals
- [Launch gate](docs/launch-gate.md) — go/no-go checklist and blockers
- [Architecture](docs/architecture.md) — real data/control flow and limits

## Roadmap

- Replace simulated data access with a real, read-only connector (and label sources per response)
- Run the evaluation set and publish graded results, including failures

## Status

Prototype / learning project. Not deployed, not production-ready, data access is simulated, and it is **not** intended for autonomous financial decisions.
