# TailwindCSS v3 Configuration

Optimized TailwindCSS v3 configuration for landing pages.

## Why TailwindCSS v3?

TailwindCSS v3.4.x is recommended over v4 for these reasons:
- **Better AI/LLM compatibility**: Most AI models are trained on v3 syntax
- **Stable and battle-tested**: Widely used in production
- **Extensive documentation**: More resources and examples available
- **Fewer breaking changes**: v4 introduces significant syntax changes

## Installation

```bash
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

## Configuration Files

### tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      // ============================================
      // COLORS
      // ============================================
      colors: {
        // Primary brand color (replace with App Profile colors)
        primary: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#b9dfff',
          300: '#7cc4ff',
          400: '#36a5ff',
          500: '#0d8aff',
          600: '#4A7FC1',  // Base color from app icon
          700: '#005fcc',
          800: '#004da6',
          900: '#003d85',
          950: '#002557',
        },
      },
      
      // ============================================
      // TYPOGRAPHY
      // ============================================
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      
      fontSize: {
        // Custom sizes for hero section
        '4.5xl': ['2.5rem', { lineHeight: '1.1' }],
        '5.5xl': ['3.5rem', { lineHeight: '1.1' }],
      },
      
      letterSpacing: {
        tighter: '-0.04em',
      },
      
      // ============================================
      // SPACING & SIZING
      // ============================================
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      
      maxWidth: {
        '8xl': '88rem',
      },
      
      // ============================================
      // BORDERS
      // ============================================
      borderRadius: {
        'icon': '22%',      // macOS app icon style
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      
      // ============================================
      // SHADOWS
      // ============================================
      boxShadow: {
        'sm-up': '0 -1px 2px 0 rgb(0 0 0 / 0.05)',
        'soft': '0 2px 15px -3px rgb(0 0 0 / 0.07), 0 10px 20px -2px rgb(0 0 0 / 0.04)',
        'glow': '0 0 20px -5px var(--tw-shadow-color)',
      },
      
      // ============================================
      // ANIMATIONS
      // ============================================
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
        'bounce-slow': 'bounce 2s infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      
      // ============================================
      // TRANSITIONS
      // ============================================
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  
  plugins: [],
}
```

### postcss.config.js

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ======================================
   FONT IMPORT
   ====================================== */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* ======================================
   BASE STYLES
   ====================================== */
@layer base {
  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  body {
    @apply text-gray-900 bg-white;
    font-feature-settings: 'cv11', 'ss01';
  }
  
  /* Better focus styles */
  *:focus-visible {
    @apply outline-none ring-2 ring-primary-500 ring-offset-2;
  }
  
  /* Remove default button styles */
  button {
    @apply cursor-pointer;
  }
}

/* ======================================
   COMPONENT STYLES
   ====================================== */
@layer components {
  /* Primary button */
  .btn-primary {
    @apply inline-flex items-center justify-center gap-2 
           px-6 py-3 bg-primary-600 text-white font-semibold 
           rounded-xl transition-all duration-200
           hover:bg-primary-700 hover:-translate-y-0.5 hover:shadow-lg
           active:translate-y-0;
  }
  
  /* Secondary button */
  .btn-secondary {
    @apply inline-flex items-center justify-center gap-2 
           px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold 
           rounded-xl transition-all duration-200
           hover:border-gray-300 hover:bg-gray-50;
  }
  
  /* Ghost button */
  .btn-ghost {
    @apply inline-flex items-center gap-1 
           text-primary-600 font-medium transition-colors
           hover:text-primary-700;
  }
  
  /* Section container */
  .section {
    @apply py-20 md:py-24 px-6;
  }
  
  /* Content container */
  .container-content {
    @apply max-w-6xl mx-auto;
  }
  
  /* Feature card */
  .feature-card {
    @apply bg-white rounded-2xl p-6 md:p-8 
           shadow-sm hover:shadow-md 
           transition-all duration-300 hover:-translate-y-1;
  }
}

/* ======================================
   UTILITY STYLES
   ====================================== */
@layer utilities {
  /* Text balance for headings */
  .text-balance {
    text-wrap: balance;
  }
  
  /* Hide scrollbar but keep functionality */
  .scrollbar-hide {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  /* Animation delays */
  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-400 { animation-delay: 400ms; }
  .delay-500 { animation-delay: 500ms; }
}
```

## Usage Examples

### Hero Title
```tsx
<h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
  TimeBar
</h1>
```

### Primary Button
```tsx
<a href="#" className="btn-primary text-lg px-8 py-4">
  Download Now
</a>
```

### Feature Card
```tsx
<div className="feature-card">
  <span className="text-4xl">🌍</span>
  <h3 className="text-xl font-bold mt-4">Multiple Time Zones</h3>
  <p className="text-gray-600 mt-2">Display time zones in your menu bar</p>
</div>
```

### Section Layout
```tsx
<section className="section bg-gray-50">
  <div className="container-content">
    {/* Content */}
  </div>
</section>
```

### Animated Elements
```tsx
<div className="animate-fade-up delay-200">
  Animated content
</div>
```

## Updating Brand Colors

When you have colors from App Profile, update the primary scale:

```javascript
// In tailwind.config.js
colors: {
  primary: {
    50: '#f0f7ff',   // Lightest
    100: '#e0efff',
    200: '#b9dfff',
    300: '#7cc4ff',
    400: '#36a5ff',
    500: '#0d8aff',
    600: '#4A7FC1',  // ← Base: from App Profile brand_colors.primary
    700: '#3d6aa8',
    800: '#2d5489',
    900: '#1e3f6a',
    950: '#051525',  // Darkest
  },
}
```

Use a tool like [UI Colors](https://uicolors.app/) to generate the full scale from your base color.
