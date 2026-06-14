# Product Brief — FinBot

## Problem

Finance and operations users regularly turn broad business questions ("why did expenses jump last month?") into analysis under time pressure. Generic AI chat can produce confident-sounding answers while hiding the assumptions, calculations, and uncertainty that finance work depends on. The risk is not "the bot is wrong" — it's "the bot is wrong in a way nobody can see before a decision is made."

## Target users

- **Finance analysts** preparing a first-pass analysis they will refine.
- **Operations leaders** weighing financial tradeoffs quickly.
- **Product managers** studying AI workflow and guardrail design.
- **Portfolio reviewers** assessing practical, honest AI PM thinking.

Primary user for this prototype: the **analyst** producing a reviewable draft.

## Jobs to be done

- When I ask a finance question, **structure** the analysis so I can review it fast.
- When context is missing, **tell me what's needed** before I rely on the answer.
- When there's math, **make the logic inspectable** rather than a single number.
- When a chart clarifies, **generate a useful, labeled one**.
- When output could drive a decision, **make it clear a human must review it**.

## Proposed solution

A chat assistant that converts questions into structured, reviewable responses: state assumptions, show reasoning, offer charts when helpful, and flag what needs human review. The UI separates the conversation from the visualization so a reviewer can read the argument and the chart side by side.

## Scope decisions (what's in / out)

**In scope (current prototype)**
- Natural-language Q&A over finance topics via Gemini 2.5 Flash
- File upload for ad-hoc analysis (PDF/DOCX/XLSX/CSV)
- Structured chart generation (bar/line/pie) and chart suggestions
- Honest prototype framing and guardrail documentation

**Deliberately out of scope (for now)**
- Real data connections (Google Drive access is **simulated** by the prompt)
- Autonomous recommendations or actions
- Regulated advice (investment / tax / legal / accounting)
- Auth, multi-user, persistence, audit logging

Calling these out is itself a PM decision: the value of the prototype is the *workflow and guardrails*, not breadth.

## Success metrics

Because this is a prototype, metrics are framed as pilot-readiness signals rather than business KPIs:

| Metric | Why it matters |
|--------|----------------|
| % responses in expected structured format | Reviewability |
| Calculation accuracy on known test cases | Trust in the math |
| % appropriate caveats when context is missing | Calibration |
| Valid chart-JSON rate on chart requests | Feature reliability |
| Simulated-data honesty rate | Safety / no false grounding |
| Reviewer acceptance rate (low-risk tasks) | Net usefulness |
| Time-to-first-draft reduction | The actual user benefit |

## Risks

- Hallucinated figures presented as real (amplified by the "simulate data access" prompt).
- Overconfident recommendations beyond prototype scope.
- Calculation or chart-interpretation errors.
- Missing context that changes the conclusion.
- Sensitive financial/customer data entering prompts or demos.
- Users mistaking prototype output for final advice.

See [failure-modes.md](failure-modes.md) for mitigations and detection signals.

## PM decision

Keep FinBot framed as **decision support, not autonomous advice**. Prioritize reviewability, evaluation, and guardrails over new capabilities. Do not make production or deployment claims until they are true, and replace simulated data with a labeled, read-only connector before treating any number as real.
