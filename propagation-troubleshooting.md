# Troubleshooting Dependency Propagation Issue

This document explains why a version release of `pattern-collector-anyjs-pull-lines` did not trigger the downstream dependency update workflow in `pattern-collector-anyjs`, the changes made to improve visibility, and the steps to resolve and test it.

---

## 1. Problem Analysis

When a package version is manually triggered and published, the workflow run succeeds:
* The **`publish`** job succeeds (deploying to NPM).
* The **`notify-dependents`** job also succeeds.

However, the downstream repository `pattern-collector-anyjs` does **not** trigger its `Update dependency` workflow. 

### Silent Curl Failure
The Callee workflow calls the GitHub Repository Dispatches API via `curl`:
```bash
curl -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${{ secrets.REPO_DISPATCH_TOKEN }}" \
  https://api.github.com/repos/keshavsoft/pattern-collector-anyjs/dispatches \
  -d '{"event_type":"dependency-updated"}'
```
By default, `curl` exits with status code `0` (success) even when the API returns an error status code (such as `401 Unauthorized` or `404 Not Found`). Because `curl` did not fail the build step, the workflow ran completely green, hiding the authorization/dispatch failure.

---

## 2. Changes Implemented

To bring visibility to the API dispatch responses and make debugging possible, the `-i` flag (or standard conditional check blocks) has been added to `curl` in the notification workflows across these repositories:
* `pattern-collector-anyjs-extract/.github/workflows/publish-conditional.yml`
* `pattern-collector-anyjs-pull-lines/.github/workflows/publish-conditional.yml`
* `pattern-collector-anyjs/.github/workflows/publish-conditional.yml`

Using `curl -i` or response checks dumps the HTTP response status, headers, and JSON error responses directly into the GitHub Actions step logs.

---

## 3. Resolution Steps

Follow these steps to check, update, and verify the propagation:

### Step 1: Verify the Repository Secrets
The `REPO_DISPATCH_TOKEN` must be a valid GitHub Personal Access Token (PAT) with write access to the destination repository.
1. Go to the **`pattern-collector-anyjs-pull-lines`** repository on GitHub.
2. Click **Settings** -> **Secrets and variables** -> **Actions**.
3. Under **Repository secrets**, ensure that **`REPO_DISPATCH_TOKEN`** exists.
4. If it has expired or is invalid:
   * Create a new GitHub Personal Access Token (classic) with `repo` scope.
   * Update the value of `REPO_DISPATCH_TOKEN` in the repository settings.

### Step 2: Trigger the Workflow and Inspect Logs
1. Go to the **Actions** tab in `pattern-collector-anyjs-pull-lines`.
2. Select **NPM Check, Publish and Notify**.
3. Click **Run workflow** (run on the `main` branch).
4. Wait for the workflow to reach the `notify-dependents` job, click it, and expand the **Notify pattern-collector-anyjs** step.
5. Inspect the response headers:
   * **`HTTP/2 204`**: Success! The downstream dispatch has successfully triggered the update.
   * **`HTTP/2 401` or `HTTP/2 404`**: The token is invalid, expired, or lacks write access permissions on the destination repository.
