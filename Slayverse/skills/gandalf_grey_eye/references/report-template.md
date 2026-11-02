# Report template

Keep it pointed. Expand only when the interval or actor count demands it.

```markdown
# Gray Eye forge — ::RUN_ID::

*Counsel of Gandalf the Gray Eye*

## Setup
- Change point:
- Cutoff:
- Interval:
- Mode: counterfactual-past | prospective | hybrid
- Domains / geographies:
- Declared assumptions:

## Baseline (canon anchors)
- …

## Causal map
### Nodes
- …

### Edges
- A → B | mechanism | sign | lag | confidence

## Propagation
Primary chain (bullet trace).

## Branches
| Branch | Weight | One-line outcome |
|--------|--------|------------------|
| B1 | likely | … |
| B2 | plausible | … |
| B3 | stretch | … |

## Human decisions (if any)
- Actor / cutoff / chosen action / rejected alternatives

## Continuity flags
- Contradictions with existing lore
- Soft spots that need bible language
- Promotion candidates (assumptions → canon?)

## Labels audit
Count or list any claim still unlabeled (must be zero for a sealed run).

— Gandalf the Gray Eye
```

## Output modes

- **Memo** (default): report only in chat + optional workspace write.
- **Workspace**: also write `report.md`, `nodes.json`, `edges.json`, `assumptions.md` under the run folder.
- **Canon patch**: when asked, draft a bible/index diff; never silently rewrite canon files.
