---
name: premium-ui-design
description: Provides Apple-inspired design principles, color systems, typography guidelines, and component patterns for creating premium, minimalist UI designs. Use this skill when designing landing pages, app interfaces, or marketing websites that require elegant, sophisticated aesthetics.
---

# Premium UI Design Skill

This skill provides comprehensive design guidance for creating premium, Apple-inspired user interfaces with a focus on elegance, minimalism, and sophisticated aesthetics.

## Design Philosophy

### Core Principles

| Principle | Description | Implementation |
|-----------|-------------|----------------|
| **Breathing Room** | Generous whitespace creates luxury feel | Min 64px between sections, 40%+ hero whitespace |
| **Clear Focus** | One primary message per screen | Defined visual hierarchy, single CTA per section |
| **Elegant Motion** | Subtle animations add life | 0.3-0.6s durations, ease-out curves |
| **Brand Consistency** | Cohesive color application | Max 3 accent colors, neutral dominance |
| **Purposeful Simplicity** | Remove unnecessary elements | Every element must earn its place |

### Visual Hierarchy

```
┌─────────────────────────────────────────┐
│                                         │
│     ████████████████████                │  ← Primary: App Icon/Logo
│     ████████████████████                │
│                                         │
│        App Name                         │  ← Secondary: Name (large, bold)
│                                         │
│   One line that captures attention      │  ← Tertiary: Tagline
│                                         │
│      ┌─────────────────┐                │
│      │   Download      │                │  ← CTA: Primary action
│      └─────────────────┘                │
│                                         │
│   macOS 14.1+ • Free • Open Source      │  ← Supporting info (subtle)
│                                         │
└─────────────────────────────────────────┘
```

## Color System

### From App Profile to Color Palette

Given an App Profile with `brand_colors.primary: "#4A7FC1"`, generate a full palette:

#### Color Scale Generation

```css
/* Primary Color Scale */
--color-primary-50:  #f0f7ff;   /* Backgrounds, hover states */
--color-primary-100: #e0efff;   /* Light backgrounds */
--color-primary-200: #b9dfff;   /* Borders, dividers */
--color-primary-300: #7cc4ff;   /* Disabled states */
--color-primary-400: #36a5ff;   /* Links, secondary elements */
--color-primary-500: #0d8aff;   /* Standard elements */
--color-primary-600: #4A7FC1;   /* PRIMARY - Main brand color */
--color-primary-700: #005fcc;   /* Hover states for primary */
--color-primary-800: #004da6;   /* Active/pressed states */
--color-primary-900: #003d85;   /* Dark mode primary */
--color-primary-950: #002557;   /* Darkest variant */
```

#### Semantic Color Mapping

```css
/* Light Mode */
--color-background: #ffffff;
--color-surface: #f8fafc;
--color-text-primary: #0f172a;
--color-text-secondary: #64748b;
--color-text-muted: #94a3b8;
--color-border: #e2e8f0;

/* Dark Mode */
--color-background-dark: #0f172a;
--color-surface-dark: #1e293b;
--color-text-primary-dark: #f8fafc;
--color-text-secondary-dark: #94a3b8;
--color-border-dark: #334155;
```

### Color Application Rules

1. **Background**: 70% - Neutral colors (white, off-white, light gray)
2. **Secondary**: 25% - Brand colors at low opacity, accent backgrounds
3. **Primary Accent**: 5% - CTAs, links, key highlights

## Typography

### Font Stack

```css
/* Primary - UI and headings */
font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 
             'Segoe UI', Roboto, sans-serif;

/* Secondary - Body text */
font-family: 'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont,
             system-ui, sans-serif;

/* Monospace - Code, technical */
font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
```

### Type Scale

| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| Hero Title | 56-72px | 700 | 1.1 | -0.02em |
| Section Title | 36-48px | 600 | 1.2 | -0.01em |
| Subsection | 24-32px | 600 | 1.3 | 0 |
| Body Large | 18-20px | 400 | 1.6 | 0 |
| Body | 16px | 400 | 1.5 | 0 |
| Caption | 14px | 400 | 1.4 | 0.01em |
| Small | 12px | 500 | 1.3 | 0.02em |

### Typography Examples

```css
/* Hero Title */
.hero-title {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--color-text-primary);
}

/* Tagline */
.tagline {
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-text-secondary);
  max-width: 600px;
}
```

## Spacing System

### Base Unit: 4px

```css
--space-0: 0;
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
--space-24: 6rem;    /* 96px */
--space-32: 8rem;    /* 128px */
```

### Section Spacing

| Context | Spacing | Usage |
|---------|---------|-------|
| Page Padding | 24-48px | Side margins |
| Section Gap | 80-120px | Between major sections |
| Component Gap | 32-48px | Between components |
| Element Gap | 16-24px | Between related elements |
| Text Gap | 8-16px | Between text blocks |

## Component Patterns

### Hero Section

See [hero-patterns.md](./examples/hero-patterns.md) for detailed examples.

**Types:**
1. **Centered Hero** - Icon + Name + Tagline + CTA (Apple-style)
2. **Split Hero** - Text left, Image/Screenshot right
3. **Full-screen Hero** - Large background with overlay

**Best Practices:**
- Center content vertically and horizontally
- App icon: 96-128px on desktop, 64-80px on mobile
- Generous padding: min 80px top, 120px bottom
- Max content width: 800px for text, 1200px for layout

### Feature Sections

See [feature-sections.md](./examples/feature-sections.md) for detailed examples.

**Types:**
1. **Alternating** - Image and text alternate left/right
2. **Card Grid** - Features in cards (2-4 columns)
3. **Icon List** - Minimal icon + text list

**Best Practices:**
- 3-4 features in first section
- Lead with the most compelling feature
- Keep descriptions under 2 sentences
- Use consistent icon style (filled or outlined)

### CTA / Download Section

See [cta-patterns.md](./examples/cta-patterns.md) for detailed examples.

**Button Styles:**
```css
/* Primary CTA */
.btn-primary {
  background: var(--color-primary-600);
  color: white;
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 18px;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: var(--color-primary-700);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}
```

## Animation Guidelines

### Timing

```css
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 400ms;
--duration-slower: 600ms;

--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
--spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Entrance Animations

```css
/* Fade up on scroll */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-up {
  animation: fadeUp 0.6s var(--ease-out) forwards;
}
```

### Hover Effects

```css
/* Subtle lift */
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
}

/* Scale */
.icon:hover {
  transform: scale(1.05);
}
```

## Responsive Breakpoints

```css
/* Mobile first approach */
--breakpoint-sm: 640px;   /* Large phones */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Small laptops */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-2xl: 1536px; /* Large screens */
```

### Responsive Adjustments

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Hero Title | 32-40px | 48px | 56-72px |
| Section Padding | 48px | 80px | 120px |
| Side Padding | 24px | 48px | 64px |
| Grid Columns | 1 | 2 | 3-4 |
| Icon Size | 64px | 96px | 128px |

## Dark Mode

### Principles

1. **Not just inverted** - Carefully crafted dark palette
2. **Reduced contrast** - Pure white (#fff) is too harsh, use #f8fafc
3. **Elevated surfaces** - Lighter shades for cards/modals
4. **Accent adjustment** - Slightly brighter primary for dark backgrounds

### Implementation

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: var(--color-background-dark);
    --color-surface: var(--color-surface-dark);
    --color-text-primary: var(--color-text-primary-dark);
    --color-text-secondary: var(--color-text-secondary-dark);
    --color-border: var(--color-border-dark);
  }
}
```

## Design Checklist

Before finalizing any design:

- [ ] Whitespace is generous (40%+ on hero)
- [ ] Typography hierarchy is clear
- [ ] Only 1-2 CTAs per section
- [ ] Colors are consistent with brand
- [ ] Animations are subtle and purposeful
- [ ] Responsive design tested
- [ ] Contrast ratios meet WCAG AA
- [ ] Focus states are visible
- [ ] Images/icons are high quality
- [ ] Loading states are designed
