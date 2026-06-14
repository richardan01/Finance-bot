# Architecture — FinBot

## Overview

FinBot is a client-only single-page app (React + Vite + TypeScript) that talks directly to the Gemini API. There is no backend, database, or real data connector in the current build — **data access is simulated by the system prompt**.

## Real data / control flow

```text
User (question + optional files)
  → ChatInterface (components/ChatInterface.tsx)
  → App.handleSendMessage (App.tsx)  ── builds conversation history
      ├─ files → base64 inlineData parts
      └─ prompt classified: chart request?  (regex: chart|graph|diagram|visual|plot)
  → generateResponse (services/geminiService.ts)
  → Gemini 2.5 Flash (@google/genai)  ── system prompt = finance analyst
      ├─ chart path:  responseMimeType=json + chartSchema  → ChartData
      │                 (on parse/JSON failure → fall back to text)
      └─ text path:   Markdown  → parse "CHART_SUGGESTION:" line
  → render
      ├─ ChatMessage (text + optional "visualize" action)
      └─ VisualizationPanel (recharts: bar | line | pie)
  → Human review
  → Decision support
```

## Components

| File | Responsibility |
|------|----------------|
| `App.tsx` | State, message history, send orchestration, active-chart panel |
| `components/ChatInterface.tsx` | Input, file attach, suggestions, send |
| `components/ChatMessage.tsx` | Render a message + chart-suggestion action |
| `components/VisualizationPanel.tsx` | Render the active chart |
| `components/ChartRenderer.tsx` | recharts bar/line/pie rendering |
| `components/ChatHistoryPanel.tsx` | New-chat / history sidebar |
| `services/geminiService.ts` | Gemini calls, system prompt, chart schema, fallbacks |
| `types.ts` | `Message`, `ChartData`, `Part` types |

## Two response paths

1. **Chart path** — when the prompt matches the chart regex, the model is asked for strict JSON matching `chartSchema`. Valid JSON becomes a `ChartData` object and renders. Invalid JSON is caught and the request falls back to the text path (no crash).
2. **Text path** — Markdown answer. A trailing `CHART_SUGGESTION: ...` line is parsed out into a one-click "visualize" prompt and removed from the displayed text.

## Trust boundaries & limitations

- **Simulated data:** the system prompt tells the model to *act as if* it can read Google Drive reports. No files are actually read from Drive; any "report" numbers are model-generated. This is the key thing to fix before treating output as real.
- **Client-side API key:** `GEMINI_API_KEY` is read in the browser via Vite env injection. Fine for a local prototype; a real deployment would need a server-side proxy so the key isn't exposed.
- **No persistence / auth / audit:** conversations live in memory only.
- **Human review is procedural, not enforced** in code — it's a documented requirement, not a gate the UI imposes yet.

## Notes for reviewers

- The structured answer should separate facts, assumptions, analysis, caveats, and next steps (a prompt/UX goal, not yet enforced).
- Charts are optional and should only appear when they improve comprehension.
- The end goal is **decision support**, not autonomous financial advice.

## Future architecture (roadmap)

- Server-side proxy for the model call (hide the key, add logging).
- A real, **read-only** data connector with explicit source labeling, replacing simulated access.
- A scripted eval harness running the test set in [eval-plan.md](eval-plan.md).
- In-UI confidence / assumption labeling and an explicit review checkpoint.
