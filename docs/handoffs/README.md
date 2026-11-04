# Handoffs

One file per major milestone. Read the newest one before starting work. The rules for when and how to write
them are in `CLAUDE.md` under "Handoffs".

## Index (newest first)

| Date | Handoff | Summary |
| --- | --- | --- |
| 2026-11-04 | [Scaffold and design tokens](2026-11-04-scaffold-and-design-tokens.md) | Next.js 16 app, API client and types, Tuon design tokens, rename to Tuon |

## Template

Copy this into `YYYY-MM-DD-<short-slug>.md`, then add a row to the index above (newest first).

````markdown
# <Milestone title>

- **Date**: YYYY-MM-DD
- **Status**: complete | in progress | blocked
- **Repos touched**: <this repo>, <siblings>
- **Supersedes**: <earlier handoff, or "none">

## Summary

Two or three sentences: what this milestone delivered and why.

## Current state

What works now, and how you verified it (commands and their results). Name the date of any data you quote.

## Decisions

Each decision with its reason. These hold for later work unless the user changes them.

## Changes

Key files added, changed or removed, one line each.

## Known issues

Bugs, gaps, shortcuts, and anything you didn't verify.

## Next steps

An ordered list. Mark the items that need the user's input.

## Related

Handoffs in sibling repos, PRs, issues, design files.
````
