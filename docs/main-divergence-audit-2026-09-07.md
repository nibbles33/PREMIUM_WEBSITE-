# Main Divergence Audit

**Date:** 2026-09-07  
**Audit type:** READ-ONLY — no branches modified, no merge, no rebase, no cherry-pick, no deployment  
**Integration branch:** `cursor/site-integration-final-7402` @ `bf7e98b` (code tip `8c5227b`)  
**main:** `3fedeca`  
**Merge-base (common ancestor):** `0f03f42` — *Audit uploaded photography, optimize WebP assets, and wire hero images* (PR #1, merged)

---

## A. Git ancestry diagram

```
                    0f03f42  ← merge-base (PR #1 photography audit, on BOTH sides)
                   /       \
                  /         \
                 /           \
    (integration stack)       (main-only path)
         63 commits               2 commits
              |                      |
              |               d62166c  Add files via upload
              |                      |     └── fancy-main.zip (1.5 MB)
              |               3fedeca  Create pilot
              |                      |     └── public/images/pilot (empty file)
              |                      |
              |                   main (3fedeca) ← current main HEAD
              |
    visual-pilot → batches → explorer → restaurant →
    contractors-static → crop-fix → integration audit docs
              |
    bf7e98b  ← cursor/site-integration-final-7402 HEAD
```

**Ancestry proof commands:**

```bash
git merge-base main cursor/site-integration-final-7402
# → 0f03f42

git log cursor/site-integration-final-7402..main --oneline
# → 3fedeca Create pilot
# → d62166c Add files via upload

git merge-base --is-ancestor d62166c cursor/site-integration-final-7402
# → NO (exit 1)

git merge-base --is-ancestor 3fedeca cursor/site-integration-final-7402
# → NO (exit 1)
```

**Counts from merge-base:**

| Branch | Commits ahead of `0f03f42` |
|--------|---------------------------|
| `main` | **2** |
| `cursor/site-integration-final-7402` | **63** |

---

## B. The 2 divergent commits (on main, NOT reachable from integration)

### Commit 1 of 2

| Field | Value |
|-------|-------|
| **Full SHA** | `d62166c489114ccdc046f1108edcf225ecaadbc4` |
| **Short SHA** | `d62166c` |
| **Author** | nibbles33 \<nibbles33@gmail.com\> |
| **Committer** | GitHub \<noreply@github.com\> |
| **Date** | 2026-09-01 23:11:12 -0400 (2026-09-02T03:11:12Z) |
| **Message** | Add files via upload |
| **Parent SHA** | `0f03f4227b866cbd9a1aa426153d82f6166ee3dd` (`0f03f42`) |
| **Files changed** | 1 |
| **Additions / deletions** | binary +1,528,288 bytes / 0 lines |

**Files changed:**

| File | Change | Type |
|------|--------|------|
| `fancy-main.zip` | Added (binary) | Asset archive |

---

### Commit 2 of 2

| Field | Value |
|-------|-------|
| **Full SHA** | `3fedecad28aa910d0cb379cabe49986adfc2b6d4` |
| **Short SHA** | `3fedeca` |
| **Author** | nibbles33 \<nibbles33@gmail.com\> |
| **Committer** | GitHub \<noreply@github.com\> |
| **Date** | 2026-09-03 10:58:02 -0400 (2026-09-03T14:58:02Z) |
| **Message** | Create pilot |
| **Parent SHA** | `d62166c489114ccdc046f1108edcf225ecaadbc4` |
| **Files changed** | 1 |
| **Additions / deletions** | +1 / −0 lines |

**Files changed:**

| File | Change | Type |
|------|--------|------|
| `public/images/pilot` | Added | Asset placeholder (empty file) |

---

## C. Exact file diffs

### `d62166c` — `fancy-main.zip`

**Full patch:** Binary file added; no text diff.

**Archive contents (364 files, ~3.2 MB uncompressed):**

- Root folder: `fancy-main/`
- Project identity: npm package `"name": "fancy"` — [Fancy Components](https://fancycomponents.dev) (third-party animated React component library)
- Includes: `package.json`, `next.config.js`, `src/app/`, fonts, favicons, registry scripts
- Date stamps inside zip: **2026-03-14** (predates this repository's pilot work)
- **Not** the Premium Insurance Brokers website codebase

**Classification:** Asset archive / uploaded artifact — unrelated third-party project snapshot.

---

### `3fedeca` — `public/images/pilot`

**Full patch:**

```diff
diff --git a/public/images/pilot b/public/images/pilot
new file mode 100644
index 0000000..8b13789
--- /dev/null
+++ b/public/images/pilot
@@ -0,0 +1 @@
+
```

**Blob SHA:** `8b137891791fe96927ad78e64b0aad7bded08bdc` (single newline — effectively empty placeholder)

**Classification:** Asset placeholder — no image data, no extension, no directory structure.

---

## D. Main vs integration comparison (per changed file)

| File | main | integration | Blob match? | Classification |
|------|------|-------------|-------------|----------------|
| `fancy-main.zip` | **Present** (via `d62166c`) | **Absent** | N/A | **A. MAIN-ONLY CHANGE STILL MISSING FROM INTEGRATION** |
| `public/images/pilot` | Present (via `3fedeca`) | Present (via `ea05257`) | **YES** — identical blob `8b13789` | **B. EQUIVALENT CHANGE ALREADY PRESENT THROUGH ANOTHER COMMIT** |

### Evidence: `public/images/pilot` on integration via different commit

```bash
git log cursor/site-integration-final-7402 -- public/images/pilot
# ea05257 Add Coverage Explorer interaction manifest and interactive master asset map

git rev-parse main:public/images/pilot
git rev-parse cursor/site-integration-final-7402:public/images/pilot
# Both → 8b137891791fe96927ad78e64b0aad7bded08bdc
```

`ea05257` added the same empty `public/images/pilot` file alongside interactive-master PNG assets. Integration did **not** need commit `3fedeca` to obtain this file.

### Tree diff: files on main but not on integration

```bash
comm -23 <(git ls-tree -r --name-only main | sort) \
         <(git ls-tree -r --name-only cursor/site-integration-final-7402 | sort)
# → fancy-main.zip   (ONLY this file)
```

**Confirmed:** The **only** path present on `main` and absent from integration is `fancy-main.zip`.

### Source-code delta on main since merge-base

```bash
git diff --name-only 0f03f42 main
# fancy-main.zip
# public/images/pilot
```

`main` contains **zero** source-code, config, or deployment-file changes beyond these two asset paths since the common ancestor.

---

## E. Origin / intent

### Commit `d62166c` — Add files via upload

| Question | Finding |
|----------|---------|
| GitHub web upload? | **YES** — Committer is `GitHub <noreply@github.com>` |
| Vercel/deployment change? | **NO** — no Vercel config, no CI changes |
| Asset upload? | **YES** — single binary zip |
| Manual hotfix? | **NO** — no code changes |
| Prior approved feature / PR? | **NO** — no matching PR; not referenced by any feature branch |
| Referenced in later branches? | **NO** — `git grep fancy-main` on integration returns nothing |

**Likely user action (evidence-based):** Owner uploaded `fancy-main.zip` via GitHub's web UI ("Add file" / drag-and-drop upload) on 2026-09-01. Archive contains an unrelated Fancy Components starter project from March 2026.

---

### Commit `3fedeca` — Create pilot

| Question | Finding |
|----------|---------|
| GitHub web upload? | **YES** — Committer is `GitHub <noreply@github.com>` |
| Vercel/deployment change? | **NO** |
| Asset upload? | **YES** — empty placeholder file at `public/images/pilot` |
| Manual hotfix? | **NO** |
| Prior approved feature / PR? | **NO PR** — but equivalent file added later in approved stack at `ea05257` (PR #16 lineage) |
| Referenced in later branches? | File recreated identically in `ea05257` |

**Likely user action (evidence-based):** Owner created a placeholder path `public/images/pilot` via GitHub web UI on 2026-09-03, possibly intending a pilot images directory. The approved feature stack later added the same empty placeholder when bulk-adding interactive-master assets.

---

## F. Runtime impact

### `d62166c` — `fancy-main.zip`

| Area | Impact |
|------|--------|
| Homepage | **NO** |
| Navigation | **NO** |
| Coverage Explorer | **NO** |
| Product routes | **NO** |
| Photography / card imagery | **NO** |
| Forms / claims / careers / resources | **NO** |
| Vercel / build / deployment config | **NO** |
| Any runtime code | **NO** — file is not imported, not in `public/`, not served by Next.js |

**Verdict: NO RUNTIME IMPACT.** Orphan zip at repository root; 1.5 MB repo bloat only.

---

### `3fedeca` — `public/images/pilot`

| Area | Impact |
|------|--------|
| All runtime areas | **NO** — empty placeholder; identical copy already on integration |

**Code reference search:**

```bash
rg 'public/images/pilot|images/pilot|fancy-main' --glob '*.{ts,tsx,js,json,css}'
# → no matches
```

**Verdict: NO RUNTIME IMPACT.** Integration already has identical blob via `ea05257`.

---

## G. Recommendation per commit

### `d62166c` — Add files via upload

**Recommendation: 5 — SAFE TO IGNORE — NON-RUNTIME / OBSOLETE**

**Reason:** `fancy-main.zip` is an unrelated third-party component-library archive uploaded via GitHub UI. It is not referenced by any code, not deployed, not part of any approved feature branch. Excluding it from integration has zero runtime effect. When integration eventually replaces `main`, this file should **not** be carried forward unless owner explicitly wants the archive in the repo.

---

### `3fedeca` — Create pilot

**Recommendation: 2 — ALREADY REPRESENTED — DO NOTHING**

**Reason:** The sole change (`public/images/pilot`, empty file) exists on integration with **identical blob content** via commit `ea05257` in the approved stack. Commit `3fedeca` itself is not an ancestor of integration, but its **content** is already present through a different, approved commit.

---

## H. Linear-stack spot-check proof

Each row verified with `git merge-base --is-ancestor <SHA> cursor/site-integration-final-7402`:

| Approved work | Branch / PR | Key commit SHA | Ancestor of integration HEAD? |
|---------------|-------------|----------------|-------------------------------|
| Homepage carousel / filmstrip | `cursor/visual-pilot-3page-7402` / PR #3 | `3e500c1` Unify homepage motion: PilotInfiniteRail | **YES** |
| Mega-menu fix | `cursor/pre-integration-upgrade-part1-7402` / PR #14 | `5fecfba` Add mega-menu viewport verification JSON | **YES** |
| Card click-vs-drag fix | `cursor/card-navigation-fix-7402` / PR #10 | `12e45b8` Extend card navigation validation | **YES** |
| Card photography wiring | `cursor/card-photography-wiring-7402` / PR #13 | `0ba681a` Wire card photography from placements.ts | **YES** |
| Homepage CTA visibility fix | `cursor/homepage-cta-broker-visibility-7402` / PR #11 | `759b152` Add full CTA verification results | **YES** |
| Restaurant Explorer (multi-image) | `cursor/coverage-explorer-wiring-7402` / PR #16 | `fcec7da` feat(restaurant): wire multi-image crossfade | **YES** |
| Restaurant magnifier | `cursor/restaurant-magnifier-7402` / PR #17 | `855bbb8` feat(restaurant): add desktop hover magnifier | **YES** |
| Contractors static-only | `cursor/contractors-static-only-7402` / PR #20 | `223e7f5` fix(contractors): remove all motion | **YES** |
| Coverage Explorer crop fix | `cursor/coverage-explorer-crop-audit-7402` / PR #21 | `8c5227b` fix(coverage-explorer): systemic crop fix | **YES** |

**Divergent main commits are NOT ancestors:**

| Commit | Ancestor of integration? |
|--------|-------------------------|
| `d62166c` | **NO** |
| `3fedeca` | **NO** |

---

## I. Final baseline recommendation

### Overall: **Integration branch is safe as-is**

**Rationale:**

1. The 2 commits on `main` not in the integration stack introduce **no source code**, **no config**, and **no deployment changes** since merge-base `0f03f42`.

2. Of the 2 files they add:
   - `public/images/pilot` — **already present identically** on integration (`ea05257`)
   - `fancy-main.zip` — **main-only orphan archive** with **NO RUNTIME IMPACT**

3. All 63 commits of approved website work on integration are **not on main**. `main` is effectively stale at photography-audit baseline plus 2 GitHub-upload artifacts.

4. **No main-only changes must be incorporated** before baseline approval for Product Content Audit.

5. **Optional owner cleanup (not blocking):** When integration eventually merges to `main`, consider **not** restoring `fancy-main.zip` (repo bloat, unrelated project). No action needed on integration branch now.

### Owner decision required?

**NO** — for baseline approval and Product Content Audit start, based on evidence above.

**Future merge note:** When replacing `main` with integration, the resulting `main` will correctly omit `fancy-main.zip` unless explicitly re-added. Document this for merge planning.

---

## Explicit compliance statement

```
NO BRANCHES MODIFIED (audit report only)
NO MERGE
NO REBASE
NO CHERRY-PICK
NO DEPLOYMENT
STOP FOR OWNER REVIEW
```

---

## Appendix: verification commands (reproducible)

```bash
# List divergent commits
git log --format="%H %h %an %ad %s" --date=iso \
  cursor/site-integration-final-7402..main

# Confirm only 2 files differ on main since merge-base
git diff --name-only 0f03f42 main

# Confirm only fancy-main.zip is main-only path
comm -23 \
  <(git ls-tree -r --name-only main | sort) \
  <(git ls-tree -r --name-only cursor/site-integration-final-7402 | sort)

# Confirm pilot blob identity
git rev-parse main:public/images/pilot \
  cursor/site-integration-final-7402:public/images/pilot
```
