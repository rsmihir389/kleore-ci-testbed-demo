# Kleore CI Testbed — Demo Strategy

## Goal

Use this repo as a **controlled testbed** to validate Kleore end-to-end, and eventually flip it public as a **proof-of-concept** people can reference.

## Plan

### Phase 1: Private Testing (now)

1. Repo stays **private** while we debug
2. A GitHub Actions workflow runs a test suite every 30 minutes via cron
3. The test suite has ~10 tests — 7 always pass, 3 randomly fail ~30% of the time
4. Failed runs get auto-retried, generating the "rerun" data Kleore analyzes
5. After 24–48 hours we'll have ~50–100 workflow runs with realistic flaky patterns
6. Install the Kleore GitHub App on this repo and generate a health report
7. Debug and fix any issues in the Kleore engine until reports look correct

### Phase 2: Public Showcase (once stable)

1. Flip the repo to **public** (Settings → Danger Zone → Change visibility)
2. All workflow run history is preserved — people can see real CI data
3. Pin a Kleore report link in the README as a live demo
4. Use it in marketing: "Here's what Kleore found on a real repo"

## Why This Approach

- **Private first** = no one sees bugs while we're still debugging
- **Public later** = instant proof-of-concept with real data, not screenshots
- **Cron-driven** = builds up history automatically without manual effort
- **Controlled flakiness** = we know exactly what's flaky, so we can validate Kleore's detection accuracy

## What's in This Repo

```
tests/
  suite.test.mjs      — 10 tests (7 stable, 3 flaky at ~30% failure rate)
.github/
  workflows/
    ci.yml             — runs tests on push + every 30 min cron
    retry.yml          — auto-retries failed CI runs (generates rerun data)
package.json           — minimal, uses Node's built-in test runner
```

## Key Numbers to Validate

Once Kleore generates a report, check:

- [ ] Flaky tests detected: should find the 3 intentionally flaky tests
- [ ] Rerun count: should match GitHub's actual retry history
- [ ] Estimated cost: should be reasonable given run durations (~1-2 min each)
- [ ] Test-level report: should correctly attribute failures to the flaky tests
