---
name: github-pages-deploy
description: Automates deployment of Vite/React static websites to GitHub Pages using GitHub Actions. Creates deploy.yml workflow that triggers on push to main branch, runs pnpm/npm build, and publishes the dist directory. Use this skill when you need to set up automatic deployment for any static site.
---

# GitHub Pages Deploy Skill

This skill provides automated deployment configuration for static websites (Vite, React, Vue, etc.) to GitHub Pages using GitHub Actions.

## When to Use This Skill

- Setting up automatic deployment for a Vite/React project
- Deploying any static site build output (dist folder) to GitHub Pages
- When you want push-to-deploy workflow

## Prerequisites

- GitHub repository created
- Project has a build script that outputs to `dist/`
- Package manager: pnpm (recommended) or npm

## Quick Setup

### Step 1: Create Workflow Directory

```bash
mkdir -p .github/workflows
```

### Step 2: Create deploy.yml

Create `.github/workflows/deploy.yml` with the content below.

### Step 3: Configure Vite Base Path

Update `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/repository-name/',  // Replace with your actual repo name
})
```

> **Note**: Use `base: '/'` if deploying to a custom domain or username.github.io (user site).

### Step 4: Enable GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Push to main branch to trigger deployment

## Workflow Configuration

### For pnpm (Recommended)

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### For npm

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Workflow Explanation

### Triggers

```yaml
on:
  push:
    branches: [main]    # Trigger on push to main
  workflow_dispatch:    # Allow manual trigger from GitHub UI
```

### Permissions

```yaml
permissions:
  contents: read        # Read repo contents
  pages: write          # Write to GitHub Pages
  id-token: write       # Required for Pages deployment
```

### Concurrency

```yaml
concurrency:
  group: "pages"
  cancel-in-progress: false  # Don't cancel ongoing deployments
```

### Build Steps

1. **Checkout**: Clone the repository
2. **Setup pnpm/Node.js**: Install runtime and package manager
3. **Install dependencies**: `pnpm install` or `npm ci`
4. **Build**: Run build script (outputs to `dist/`)
5. **Upload artifact**: Package `dist/` for deployment

### Deploy Steps

1. **Deploy to GitHub Pages**: Publish the uploaded artifact

## Customization

### Different Output Directory

If your build outputs to a different directory:

```yaml
- name: Upload artifact
  uses: actions/upload-pages-artifact@v3
  with:
    path: './build'  # or './out' for Next.js static export
```

### Environment Variables

Add build-time environment variables:

```yaml
- name: Build
  run: pnpm build
  env:
    VITE_API_URL: ${{ secrets.API_URL }}
```

### Build on Multiple Branches

To also build on develop for preview:

```yaml
on:
  push:
    branches: [main, develop]
```

## Troubleshooting

### Deployment Failed

1. Check **Actions** tab for error logs
2. Ensure repository Settings → Pages → Source is "GitHub Actions"
3. Verify `dist/` folder is created during build

### 404 on Assets

- Check `vite.config.ts` has correct `base` path
- Rebuild and redeploy

### Permission Denied

- Ensure `permissions` block is in workflow file
- May need to enable Actions in repository settings

### Build Fails Locally

Always test build locally first:

```bash
pnpm build
# or
npm run build
```

## URL Format

After deployment, your site will be at:

```
https://<username>.github.io/<repository-name>/
```

Example:
```
https://bugsmachine.github.io/timebar/
```

## Deployment Status

Check deployment status:
1. Go to repository → **Actions** tab
2. Click on the latest workflow run
3. See build and deploy job status

Successful deployments show a green checkmark and provide the live URL.
