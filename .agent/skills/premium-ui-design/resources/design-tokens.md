# Design Tokens

Comprehensive design tokens for premium UI implementation.

## Colors

### Neutral Colors

```css
:root {
  /* Gray scale */
  --color-gray-50: #f8fafc;
  --color-gray-100: #f1f5f9;
  --color-gray-200: #e2e8f0;
  --color-gray-300: #cbd5e1;
  --color-gray-400: #94a3b8;
  --color-gray-500: #64748b;
  --color-gray-600: #475569;
  --color-gray-700: #334155;
  --color-gray-800: #1e293b;
  --color-gray-900: #0f172a;
  --color-gray-950: #020617;
}
```

### Semantic Colors

```css
:root {
  /* Light Mode */
  --color-background: #ffffff;
  --color-surface: #f8fafc;
  --color-surface-raised: #ffffff;
  --color-border: #e2e8f0;
  --color-border-light: #f1f5f9;
  
  --color-text-primary: #0f172a;
  --color-text-secondary: #64748b;
  --color-text-muted: #94a3b8;
  --color-text-inverse: #ffffff;
  
  /* Dark Mode (use with prefers-color-scheme) */
  --color-background-dark: #0f172a;
  --color-surface-dark: #1e293b;
  --color-surface-raised-dark: #334155;
  --color-border-dark: #334155;
  
  --color-text-primary-dark: #f8fafc;
  --color-text-secondary-dark: #94a3b8;
  --color-text-muted-dark: #64748b;
}
```

### Brand Color Generation

When you have a primary brand color (e.g., from app icon), generate a full scale:

```javascript
// Example: Generate color scale from #4A7FC1
const generateColorScale = (baseHex) => {
  // Use a tool like polished.js or generate manually
  return {
    50:  lighten(0.45, baseHex),   // #f0f7ff
    100: lighten(0.35, baseHex),   // #e0efff
    200: lighten(0.25, baseHex),   // #b9dfff
    300: lighten(0.15, baseHex),   // #8bc4f6
    400: lighten(0.05, baseHex),   // #5da9ec
    500: baseHex,                   // #4A7FC1 (base)
    600: darken(0.05, baseHex),    // #3d6aa8
    700: darken(0.15, baseHex),    // #2d5489
    800: darken(0.25, baseHex),    // #1e3f6a
    900: darken(0.35, baseHex),    // #102a4c
    950: darken(0.45, baseHex),    // #051525
  };
};
```

## Typography

### Font Families

```css
:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 
               Roboto, 'Helvetica Neue', Arial, sans-serif;
  --font-mono: 'SF Mono', 'Fira Code', 'Consolas', 'Monaco', monospace;
}
```

### Font Sizes

```css
:root {
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */
  --text-6xl: 3.75rem;   /* 60px */
  --text-7xl: 4.5rem;    /* 72px */
}
```

### Font Weights

```css
:root {
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}
```

### Line Heights

```css
:root {
  --leading-none: 1;
  --leading-tight: 1.1;
  --leading-snug: 1.3;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
}
```

### Letter Spacing

```css
:root {
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
}
```

## Spacing

```css
:root {
  /* Base unit: 4px */
  --space-0: 0;
  --space-px: 1px;
  --space-0-5: 0.125rem;  /* 2px */
  --space-1: 0.25rem;     /* 4px */
  --space-2: 0.5rem;      /* 8px */
  --space-3: 0.75rem;     /* 12px */
  --space-4: 1rem;        /* 16px */
  --space-5: 1.25rem;     /* 20px */
  --space-6: 1.5rem;      /* 24px */
  --space-7: 1.75rem;     /* 28px */
  --space-8: 2rem;        /* 32px */
  --space-9: 2.25rem;     /* 36px */
  --space-10: 2.5rem;     /* 40px */
  --space-12: 3rem;       /* 48px */
  --space-14: 3.5rem;     /* 56px */
  --space-16: 4rem;       /* 64px */
  --space-20: 5rem;       /* 80px */
  --space-24: 6rem;       /* 96px */
  --space-28: 7rem;       /* 112px */
  --space-32: 8rem;       /* 128px */
  --space-36: 9rem;       /* 144px */
  --space-40: 10rem;      /* 160px */
}
```

## Border Radius

```css
:root {
  --radius-none: 0;
  --radius-sm: 0.125rem;   /* 2px */
  --radius-default: 0.25rem; /* 4px */
  --radius-md: 0.375rem;   /* 6px */
  --radius-lg: 0.5rem;     /* 8px */
  --radius-xl: 0.75rem;    /* 12px */
  --radius-2xl: 1rem;      /* 16px */
  --radius-3xl: 1.5rem;    /* 24px */
  --radius-full: 9999px;
  
  /* Specific use cases */
  --radius-button: 0.75rem;  /* 12px */
  --radius-card: 1rem;       /* 16px */
  --radius-modal: 1.5rem;    /* 24px */
  --radius-icon: 22%;        /* macOS icon style */
}
```

## Shadows

```css
:root {
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  
  /* Colored shadows */
  --shadow-primary: 0 8px 24px -4px rgb(var(--color-primary-600-rgb) / 0.3);
  
  /* Inset */
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
}
```

## Animation

### Durations

```css
:root {
  --duration-75: 75ms;
  --duration-100: 100ms;
  --duration-150: 150ms;
  --duration-200: 200ms;
  --duration-300: 300ms;
  --duration-500: 500ms;
  --duration-700: 700ms;
  --duration-1000: 1000ms;
}
```

### Timing Functions

```css
:root {
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Custom curves */
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

## Z-Index Scale

```css
:root {
  --z-auto: auto;
  --z-0: 0;
  --z-10: 10;      /* Dropdowns */
  --z-20: 20;      /* Sticky elements */
  --z-30: 30;      /* Fixed elements */
  --z-40: 40;      /* Modals backdrop */
  --z-50: 50;      /* Modals */
  --z-max: 9999;   /* Tooltips, toasts */
}
```

## Breakpoints

```css
/* For use with min-width media queries (mobile-first) */
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}

/* Usage example */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

## Container Widths

```css
:root {
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-prose: 65ch;  /* Optimal reading width */
}
```

## Applying in TailwindCSS v3

You can extend these tokens in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          // ... etc
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      borderRadius: {
        'icon': '22%',
      },
      boxShadow: {
        'primary': 'var(--shadow-primary)',
      },
      transitionTimingFunction: {
        'spring': 'var(--ease-spring)',
        'smooth': 'var(--ease-smooth)',
      },
    },
  },
};
```
