# Architecture

## Prototype flow

```text
User question
  → Assistant reasoning
  → Data/context layer
  → Structured answer
  → Chart/output if needed
  → Human review
  → Decision support
```

## Notes

- The user provides the finance or business question.
- The assistant reasons through the request and identifies assumptions or missing context.
- The data/context layer represents user-provided inputs, examples, or future connected sources.
- The structured answer should separate facts, assumptions, analysis, caveats, and next steps.
- Charts are optional and should only be used when they improve comprehension.
- Human review is required before outputs influence real decisions.
- The final purpose is decision support, not autonomous financial advice.
