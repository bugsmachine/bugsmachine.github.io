---
name: react-landing-page
description: Complete workflow for building app landing pages with Vite, React, and TailwindCSS v3, including project setup and component architecture. Use this skill when creating marketing websites or app showcase pages. For deployment, use the github-pages-deploy skill.
---

# React Landing Page Skill

This skill provides a complete workflow for building modern, performant landing pages using **Vite, React (TypeScript), and TailwindCSS v3**.

> **Note**: For deployment to GitHub Pages, see the `github-pages-deploy` skill.

## Technology Choices

| Choice | Reason |
|--------|--------|
| **TypeScript** | Better AI code generation, type safety, IDE support |
| **TailwindCSS v3** | Better AI compatibility than v4, stable, well-documented |
| **Vite** | Fast dev server, optimized builds |
| **React 18** | Modern hooks, concurrent features |

## Prerequisites

- Node.js 18+ installed
- Git configured
- pnpm (recommended) or npm

## Project Setup

### Step 1: Create New Project

```bash
# Create Vite + React + TypeScript project
npm create vite@latest my-landing-page -- --template react-ts

# Navigate to project
cd my-landing-page

# Install dependencies
npm install
```

### Step 2: Install TailwindCSS v3

```bash
# Install TailwindCSS v3 and dependencies
npm install -D tailwindcss@3 postcss autoprefixer

# Initialize Tailwind config (creates tailwind.config.js and postcss.config.js)
npx tailwindcss init -p
```

### Step 3: Configure TailwindCSS

Update `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Brand colors from App Profile
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#b9dfff',
          300: '#7cc4ff',
          400: '#36a5ff',
          500: '#0d8aff',
          600: '#4A7FC1',  // Base brand color
          700: '#005fcc',
          800: '#004da6',
          900: '#003d85',
          950: '#002557',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'icon': '22%',  // macOS icon style
      },
    },
  },
  plugins: [],
}
```

### Step 4: Update CSS Entry Point

Replace `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Import Inter font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* Custom base styles */
@layer base {
  html {
    scroll-behavior: smooth;
  }
  
  body {
    @apply antialiased text-gray-900 bg-white;
    font-feature-settings: 'cv11', 'ss01';
  }
}

/* Custom utilities */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

### Step 5: Install Optional Dependencies

```bash
# Animation library (optional but recommended)
npm install framer-motion

# Icons (optional)
npm install lucide-react
```

## Project Structure

```
my-landing-page/
├── public/
│   ├── favicon.ico           # App icon (16x16, 32x32)
│   ├── apple-touch-icon.png  # 180x180 for iOS
│   └── og-image.png          # 1200x630 for social sharing
├── src/
│   ├── assets/
│   │   ├── app-icon.png      # Main app icon (512px+)
│   │   └── screenshots/      # App screenshots (optional)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx    # Navigation header
│   │   │   └── Footer.tsx    # Page footer
│   │   ├── sections/
│   │   │   ├── Hero.tsx      # Hero section
│   │   │   ├── Features.tsx  # Features section
│   │   │   └── Download.tsx  # Download/CTA section
│   │   └── ui/
│   │       ├── Button.tsx    # Reusable button
│   │       └── FeatureCard.tsx
│   ├── data/
│   │   └── appProfile.ts     # App data from analysis
│   ├── hooks/
│   │   └── useScrollAnimation.ts
│   ├── App.tsx               # Main app component
│   ├── index.css             # Global styles
│   └── main.tsx              # Entry point
├── .github/
│   └── workflows/
│       └── deploy.yml        # See github-pages-deploy skill
├── index.html                # HTML template
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # TailwindCSS configuration
├── postcss.config.js         # PostCSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json
```

## Component Templates

### App.tsx

```tsx
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { Features } from './components/sections/Features'
import { Download } from './components/sections/Download'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <Download />
      </main>
      <Footer />
    </div>
  )
}

export default App
```

### Data Structure (appProfile.ts)

```typescript
// src/data/appProfile.ts

interface Platform {
  name: string
  version: string
  chips: string[]
}

interface Feature {
  emoji: string
  title: string
  description: string
}

interface AppProfile {
  basic_info: {
    name: string
    tagline: string
    description: string
    version: string
    author: string
    license: string
  }
  brand_colors: {
    primary: string
    primary_light: string
    primary_dark: string
  }
  features: Feature[]
  requirements: {
    platforms: Platform[]
  }
  download: {
    github_releases: string
  }
  social: {
    github: string
  }
  assets: {
    icon_path: string
  }
  marketing: {
    cta_primary: string
    cta_secondary: string
  }
}

export const appProfile: AppProfile = {
  basic_info: {
    name: "TimeBar",
    tagline: "Elegantly display additional time zones in your macOS menu bar",
    description: "A lightweight, elegant macOS menu bar app...",
    version: "1.0.0",
    author: "bugsmachine",
    license: "CC BY-NC-SA 4.0",
  },
  brand_colors: {
    primary: "#4A7FC1",
    primary_light: "#A8C5E5",
    primary_dark: "#2B5A8F",
  },
  features: [
    {
      emoji: "🌍",
      title: "Multiple Time Zones",
      description: "Display additional time zones directly in your menu bar",
    },
    // ... more features
  ],
  requirements: {
    platforms: [
      {
        name: "macOS",
        version: "14.1",
        chips: ["Apple Silicon", "Intel"],
      }
    ]
  },
  download: {
    github_releases: "https://github.com/bugsmachine/TimeBar/releases",
  },
  social: {
    github: "https://github.com/bugsmachine/TimeBar",
  },
  assets: {
    icon_path: "/app-icon.png",
  },
  marketing: {
    cta_primary: "Download TimeBar",
    cta_secondary: "View on GitHub",
  }
}
```

### index.html Template

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Primary Meta Tags -->
    <title>TimeBar - macOS Menu Bar Time Zone App</title>
    <meta name="title" content="TimeBar - macOS Menu Bar Time Zone App" />
    <meta name="description" content="A lightweight, elegant macOS menu bar app to display additional time zones." />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://yourusername.github.io/timebar/" />
    <meta property="og:title" content="TimeBar - macOS Menu Bar Time Zone App" />
    <meta property="og:description" content="A lightweight, elegant macOS menu bar app to display additional time zones." />
    <meta property="og:image" content="/og-image.png" />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:title" content="TimeBar" />
    <meta property="twitter:description" content="A lightweight, elegant macOS menu bar app to display additional time zones." />
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/favicon.ico" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    
    <!-- Preload fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## Vite Configuration

Update `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // For GitHub Pages: set base to '/<repository-name>/'
  // For custom domain or root: set base to '/'
  base: '/repository-name/',
})
```

## Best Practices

### Performance
- Use `webp` format for images
- Lazy load images below the fold
- Minimize bundle size with tree shaking

### SEO
- Include all meta tags in index.html
- Use semantic HTML tags
- Add alt text to all images

### Accessibility
- Ensure sufficient color contrast (WCAG AA)
- Add focus states to interactive elements
- Use proper heading hierarchy (h1 → h2 → h3)

### Mobile
- Test on actual devices
- Ensure tap targets are 44px minimum
- Use responsive images with srcset

## Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Next Steps

After building your landing page:
1. Use the `github-pages-deploy` skill to set up automatic deployment
2. Configure your custom domain (optional)
3. Set up analytics (Google Analytics, Plausible, etc.)

## Component Examples

See the `examples/` directory for ready-to-use component templates:
- `hero-component.md` - Hero section patterns
- `feature-section.md` - Feature grid and alternating layouts
- `download-button.md` - CTA and download section patterns
