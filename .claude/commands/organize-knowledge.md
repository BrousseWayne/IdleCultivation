---
description: Recompose all project knowledge into a cohesive, theme-organized set of source-of-truth docs. Interactive, claim-level, resumable.
---

# Organize Knowledge

You are a **knowledge-recomposition engine** for this repository. Your job: read every scattered knowledge source, break it down to atomic facts, regroup those facts by theme into a cohesive set of source-of-truth documents that serve **both AI agents and human readers**, and retire the old docs. You are interactive — when classification is uncertain you **stop and ask**, you never guess.

This command is **living and re-runnable**. A run is **resumable**: progress lives in the manifest, so you may stop and continue across sessions.

---

## Non-negotiable rules (decided, do not deviate)

1. **Fact grain = claim level.** The unit you sort is an atomic claim/fact, NOT a file or a section. You break sources into facts, dedup them, and compose fresh docs. One fact has exactly one home (cross-link elsewhere, never duplicate).
2. **Fact SOURCES = docs only.** Mine facts only from documentation (`docs/**`, `CLAUDE.md`, any `*.md`/`*.docx` in the tree). **Code and the knowledge graph are VERIFIERS only** — they confirm or contradict doc facts, they never contribute new facts.
3. **Conflicts → flag and ask. Never auto-edit.** If a doc fact contradicts the code, the graph, or another doc fact, you do not silently resolve it. You ask the user which is canonical.
4. **Pacing = one decision at a time.** Ask a single question, get the answer, then proceed to the next. Do not batch. Each answer is recorded to the manifest before you ask the next.
5. **Taxonomy: emergent on first run, then locked.** First run: derive a candidate taxonomy from the fact clusters and get it approved one category at a time. Persist it. Later runs reuse the locked taxonomy and only classify new/changed facts; ask before adding any category.
6. **Completion bar.** A run is done only when: every fact is placed, every triggered question is answered, and the user has approved the full proposed doc set in a final review — before anything is written.
7. **No auto-commit.** After approval you write docs, update the manifest, archive superseded sources, and delete `CLAUDE.md`. You leave all changes staged/unstaged for the user to review and commit. You do not run `git commit`.

---

## Inputs

- **Fact sources:** `docs/**`, the project `CLAUDE.md`, and any other `*.md` / `*.docx` in the repo (excluding `node_modules`, `dist`, `.understand-anything`, and the archive dir).
- **Verifiers (read, never mine for facts):**
  - **Code:** `src/**` — ground truth. "When docs conflict with code, the code is the real state."
  - **Graph:** `.understand-anything/**` — the knowledge graph; use as a structured index to locate code truth and to detect relationships for cross-linking.
- **Global instructions:** `~/.claude/CLAUDE.md` is the user's personal global config — **out of scope, never touch it.** It keeps auto-loading regardless; only the *project* `CLAUDE.md` is being retired.

---

## Output

- **Source-of-truth docs** under `docs/`, organized by the locked emergent taxonomy (one folder/doc per top-level category; split a doc only when it grows unwieldy).
- **An index/entrypoint doc** (e.g. `docs/README.md`) that maps the whole set — this replaces the deleted `CLAUDE.md` as the discoverable entrypoint.
- **A manifest:** `docs/.knowledge-manifest.json` (schema below).
- **Archived old sources:** moved to the sibling dir `../IdleCultivationFront-archive/` (outside the repo), with an `old→new` mapping recorded.

### Per-doc shape (every output doc)

```
---
purpose: <one line — what this doc is the source of truth for>
status: <stable | active | draft | parked>
last-verified: <ISO date of the run that last reconciled it>
related: [<other doc paths>]
---

## Key facts
- <dense, declarative bullet facts — front-loaded for fast agent priming>
- ...

## <Narrative sections>
<readable prose explaining the why, the flows, the reasoning — for humans>
```

The **Key facts** block is for agents (skimmable, declarative). The narrative below is for humans (the why). Both must stay in sync — they describe the same facts at different densities.

---

## Manifest schema (`docs/.knowledge-manifest.json`)

```json
{
  "version": 1,
  "taxonomy": [
    { "id": "category-id", "title": "...", "doc": "docs/<path>.md", "description": "..." }
  ],
  "facts": [
    {
      "id": "fact-<stable-hash>",
      "claim": "<the atomic fact, normalized>",
      "category": "category-id",
      "doc": "docs/<path>.md",
      "provenance": [
        { "source": "docs/old/file.md", "locator": "section/line", "kind": "doc" }
      ],
      "verification": "verified | contradicted | unverifiable | pending",
      "verifiedAgainst": "src/... | graph-node-id | null",
      "decisions": [ "<user ruling that shaped this fact, if any>" ]
    }
  ],
  "mapping": [
    { "from": "docs/old/file.md", "into": ["docs/new/a.md", "docs/new/b.md"], "archivedTo": "../IdleCultivationFront-archive/..." }
  ],
  "progress": {
    "phase": "<current phase id>",
    "factsProcessed": 0,
    "factsTotal": 0,
    "openQuestions": []
  }
}
```

Provenance is mandatory (per-fact source + verification status). `progress` makes runs resumable — on start, if the manifest exists, continue from `progress.phase`.

---

## Procedure

### Phase 0 — Mode detection
- If `docs/.knowledge-manifest.json` exists → **delta run**: load it, reuse the locked taxonomy, and process only sources new/changed since `last-verified`. Resume from `progress.phase` if a prior run was interrupted.
- Else → **first run**: full pass, taxonomy is emergent.

### Phase 1 — Ingest
- Load all fact sources. Build the code/graph index for verification.

### Phase 2 — Extract facts
- Break each source into atomic claims. Normalize wording. Record provenance (source file + locator) for every fact. Assign stable ids.

### Phase 3 — Dedup & detect conflict
- Cluster equivalent facts (collapse duplicates into one, union their provenance). Detect contradictions (doc-vs-doc).

### Phase 4 — Verify
- For each verifiable fact, check against code/graph. Mark `verified`, `contradicted`, or `unverifiable`.

### Phase 5 — Taxonomy
- **First run:** propose a candidate taxonomy from the fact clusters. Walk it with the user **one category at a time** (`AskUserQuestion`): approve / rename / merge / drop. Lock the approved set into the manifest.
- **Delta run:** load the locked taxonomy.

### Phase 6 — Classify (interactive)
- Assign each fact to exactly one category. **Stop and ask (one at a time)** whenever:
  - **Ambiguous classification** — fits 2+ categories or none.
  - **Contradictory facts** — sources disagree (doc-vs-doc or doc-vs-code/graph); ask which is canonical.
  - **Stale/obsolete candidate** — a fact looks outdated; ask keep / update / drop.
  - **New category needed** — genuinely doesn't fit the locked taxonomy; ask to approve a new one before filing.
- Record every ruling to the manifest immediately (so the run is resumable).

### Phase 7 — Compose
- Write each category's doc in the per-doc shape. One fact = one home; cross-link related facts across docs. Build the index/entrypoint doc.

### Phase 8 — Final review (the completion gate)
- Present the full proposed doc set + a change summary (facts placed, conflicts resolved, sources to be archived, `CLAUDE.md` to be deleted). Get explicit approval. **Nothing is written until approved.**

### Phase 9 — Apply (no commit)
- Write the new docs and the manifest.
- Move superseded sources to `../IdleCultivationFront-archive/`, preserving relative paths; record the `old→new` mapping in the manifest.
- Delete the project `CLAUDE.md`.
- Report what moved where, conflicts resolved, and any open items. **Do not commit** — leave changes for the user.

---

## Hard DO-NOTs
- Do not invent facts, or mine facts from code/graph.
- Do not auto-resolve any conflict.
- Do not batch questions or guess to avoid asking.
- Do not write or move anything before final approval.
- Do not commit, and never touch `~/.claude/CLAUDE.md`.
- Do not duplicate a fact across docs — one home, cross-link the rest.
