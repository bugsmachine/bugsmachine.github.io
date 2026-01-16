# Hero Section Design Patterns

Comprehensive patterns for designing premium hero sections.

## Pattern 1: Centered Hero (Recommended for App Landing Pages)

This is the Apple-style centered layout, perfect for showcasing a single app.

### Visual Structure

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│                        [Nav Bar]                           │
│                                                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│                                                            │
│                      ┌────────┐                            │
│                      │  ICON  │   ← 96-128px              │
│                      │   📱   │                            │
│                      └────────┘                            │
│                                                            │
│                      App Name                              │
│                   ────────────────                         │
│              Short tagline goes here                       │
│                                                            │
│                    ┌──────────────┐                        │
│                    │   Download   │   ← Primary CTA       │
│                    └──────────────┘                        │
│                                                            │
│              macOS 14.1+ • Open Source                     │
│                                                            │
│                          ↓                                 │
│                   Scroll to learn more                     │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### Code Example

```tsx
const CenteredHero = ({ appProfile }) => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      {/* App Icon */}
      <img 
        src={appProfile.assets.icon_path}
        alt={`${appProfile.basic_info.name} icon`}
        className="w-24 h-24 md:w-32 md:h-32 rounded-[22%] shadow-lg mb-8"
      />
      
      {/* App Name */}
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
        {appProfile.basic_info.name}
      </h1>
      
      {/* Tagline */}
      <p className="text-lg md:text-xl text-gray-600 text-center max-w-xl mb-8">
        {appProfile.basic_info.tagline}
      </p>
      
      {/* CTA Button */}
      <a 
        href={appProfile.download.github_releases}
        className="inline-flex items-center px-8 py-4 bg-primary-600 text-white 
                   font-semibold rounded-xl hover:bg-primary-700 
                   transition-all hover:-translate-y-0.5 hover:shadow-lg"
      >
        {appProfile.marketing.cta_primary}
      </a>
      
      {/* Supporting Info */}
      <p className="mt-6 text-sm text-gray-500">
        {appProfile.requirements.platforms[0].name} {appProfile.requirements.platforms[0].version}+ 
        • {appProfile.basic_info.license}
      </p>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 animate-bounce">
        <ChevronDown className="w-6 h-6 text-gray-400" />
      </div>
    </section>
  );
};
```

### CSS Styling

```css
.hero-centered {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 1.5rem;
  text-align: center;
}

.hero-icon {
  width: 128px;
  height: 128px;
  border-radius: 22%;
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.hero-tagline {
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  color: #64748b;
  max-width: 560px;
  margin-bottom: 2rem;
}
```

---

## Pattern 2: Split Hero (Image + Text)

Best for when you have app screenshots to showcase.

### Visual Structure

```
┌────────────────────────────────────────────────────────────┐
│                        [Nav Bar]                           │
├───────────────────────────┬────────────────────────────────┤
│                           │                                │
│     ┌──────┐              │                                │
│     │ ICON │              │       ┌──────────────┐         │
│     └──────┘              │       │              │         │
│                           │       │  Screenshot  │         │
│     App Name              │       │              │         │
│     ──────────            │       │     📱       │         │
│     Description text      │       │              │         │
│     that can be longer    │       │              │         │
│     and wrap to multiple  │       └──────────────┘         │
│     lines.                │                                │
│                           │                                │
│     ┌────────────┐        │                                │
│     │  Download  │        │                                │
│     └────────────┘        │                                │
│                           │                                │
└───────────────────────────┴────────────────────────────────┘
```

### Code Example

```tsx
const SplitHero = ({ appProfile, screenshot }) => {
  return (
    <section className="min-h-screen flex items-center py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="order-2 lg:order-1">
          <img 
            src={appProfile.assets.icon_path}
            alt={appProfile.basic_info.name}
            className="w-16 h-16 rounded-xl mb-6"
          />
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {appProfile.basic_info.name}
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
            {appProfile.basic_info.description}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a 
              href={appProfile.download.github_releases}
              className="px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl
                         hover:bg-primary-700 transition-all"
            >
              {appProfile.marketing.cta_primary}
            </a>
            <a 
              href={appProfile.social.github}
              className="px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold 
                         rounded-xl hover:border-gray-300 transition-all"
            >
              {appProfile.marketing.cta_secondary}
            </a>
          </div>
        </div>
        
        {/* Screenshot */}
        <div className="order-1 lg:order-2 flex justify-center">
          <img 
            src={screenshot}
            alt="App screenshot"
            className="max-w-full h-auto rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};
```

---

## Pattern 3: Gradient Hero

Premium feel with subtle gradient background.

### Code Example

```tsx
const GradientHero = ({ appProfile }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-100" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary-200 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-50" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <img 
          src={appProfile.assets.icon_path}
          alt={appProfile.basic_info.name}
          className="w-28 h-28 mx-auto rounded-[22%] shadow-xl mb-8"
        />
        
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 
                       to-gray-600 bg-clip-text text-transparent mb-6">
          {appProfile.basic_info.name}
        </h1>
        
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          {appProfile.basic_info.tagline}
        </p>
        
        <a 
          href={appProfile.download.github_releases}
          className="inline-flex items-center px-10 py-5 bg-gray-900 text-white text-lg
                     font-semibold rounded-2xl hover:bg-gray-800 transition-all
                     shadow-xl hover:shadow-2xl hover:-translate-y-1"
        >
          {appProfile.marketing.cta_primary}
        </a>
      </div>
    </section>
  );
};
```

---

## Responsive Considerations

### Mobile (< 768px)
- Icon: 64-80px
- Title: 32-40px
- Reduce padding to 48px vertical
- Full-width CTAs
- Stack split layouts

### Tablet (768px - 1024px)
- Icon: 80-96px
- Title: 40-48px
- 60px vertical padding
- Side-by-side CTAs

### Desktop (> 1024px)
- Icon: 96-128px
- Title: 48-72px
- 80-120px vertical padding
- Full layout options

---

## Animation Suggestions

```css
/* Staggered entrance */
.hero-icon { animation-delay: 0ms; }
.hero-title { animation-delay: 100ms; }
.hero-tagline { animation-delay: 200ms; }
.hero-cta { animation-delay: 300ms; }
.hero-meta { animation-delay: 400ms; }

/* Entrance animation */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-hero {
  animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
}
```

---

## A/B Testing Suggestions

Consider testing:
1. Icon size (96px vs 128px)
2. Tagline length (short vs detailed)
3. CTA text ("Download" vs "Get Started" vs "Try Free")
4. Background (solid vs gradient)
5. With/without scroll indicator
