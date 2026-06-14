# Product Brief

## User problem

Finance and operations users need fast help turning broad business questions into clear analysis, but AI-generated answers can be hard to trust when assumptions, calculations, and uncertainty are not visible.

## Target users

- Finance analysts preparing quick business analysis
- Operations leaders reviewing financial tradeoffs
- Product managers exploring AI workflow design
- Startup or portfolio reviewers assessing practical AI product thinking

## Jobs to be done

- When I ask a finance question, help me structure the analysis so I can review it quickly.
- When assumptions are missing, show me what information is needed before I rely on the answer.
- When calculations are involved, make the logic easy to inspect.
- When a chart would clarify the answer, generate a useful visualization.
- When the output could influence a decision, make it clear that a human should review it.

## Proposed solution

Finance Bot is an AI finance assistant prototype that converts user questions into structured, reviewable responses. It should identify assumptions, explain reasoning, produce charts when helpful, and flag areas that require human review.

## Success metrics

- Percentage of responses that follow the expected structured format
- Calculation accuracy on known test cases
- Rate of appropriate caveats when context is missing
- Human reviewer acceptance rate for low-risk analysis tasks
- User-reported clarity and usefulness of charts and summaries
- Reduction in time needed to produce a first-pass analysis draft

## Risks

- Hallucinated figures or unsupported assumptions
- Overconfident recommendations that exceed the prototype scope
- Incorrect calculations or chart interpretations
- Missing business context that changes the conclusion
- Exposure of sensitive financial or customer data
- Users treating prototype output as final advice

## PM decision

Keep the product framed as a prototype for decision support, not autonomous financial advice. Prioritize reviewability, evaluation, and guardrails before adding broader capabilities or any production claims.
