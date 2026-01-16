# CTA & Download Section Patterns

Patterns for effective call-to-action and download sections.

## Pattern 1: Simple Download (Recommended)

Clean, focused download section with platform information.

### Visual Structure

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│                    Ready to get started?                   │
│                                                            │
│                  ┌─────────────────────┐                   │
│                  │  Download AppName   │                   │
│                  └─────────────────────┘                   │
│                                                            │
│              macOS 14.1+ • Apple Silicon & Intel           │
│                                                            │
│                     View on GitHub →                       │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### Code Example

```tsx
const SimpleDownload = ({ appProfile }) => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-2xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Ready to get started?
        </h2>
        
        {/* Primary CTA */}
        <a 
          href={appProfile.download.github_releases}
          className="inline-flex items-center justify-center px-10 py-4 
                     bg-primary-600 text-white text-lg font-semibold rounded-xl
                     hover:bg-primary-700 transition-all hover:-translate-y-0.5
                     hover:shadow-lg"
        >
          <DownloadIcon className="w-5 h-5 mr-2" />
          Download {appProfile.basic_info.name}
        </a>
        
        {/* System Requirements */}
        <p className="mt-6 text-gray-500">
          {appProfile.requirements.platforms[0].name} {appProfile.requirements.platforms[0].version}+ 
          • {appProfile.requirements.platforms[0].chips.join(' & ')}
        </p>
        
        {/* Secondary Link */}
        <a 
          href={appProfile.social.github}
          className="inline-flex items-center mt-4 text-primary-600 hover:text-primary-700
                     font-medium transition-colors"
        >
          View on GitHub
          <ArrowRightIcon className="w-4 h-4 ml-1" />
        </a>
      </div>
    </section>
  );
};
```

---

## Pattern 2: Download with Installation Steps

For apps that require manual installation (not code-signed).

### Visual Structure

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│                   Download & Install                       │
│                                                            │
│                  ┌─────────────────────┐                   │
│                  │  Download AppName   │                   │
│                  └─────────────────────┘                   │
│                                                            │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│  │     ①       │ │     ②       │ │     ③       │        │
│  │   Download   │ │    Extract   │ │   Allow in   │       │
│  │    .zip      │ │  to Apps     │ │   Settings   │       │
│  └──────────────┘ └──────────────┘ └──────────────┘       │
│                                                            │
│  ⚠️ First launch may require permission in Settings       │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### Code Example

```tsx
const DownloadWithSteps = ({ appProfile }) => {
  const steps = [
    { number: 1, title: "Download", description: "Get the latest .zip from GitHub" },
    { number: 2, title: "Extract", description: "Move to Applications folder" },
    { number: 3, title: "Allow", description: "Approve in Privacy & Security" },
  ];

  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Download & Install
          </h2>
        </div>
        
        {/* Download Button */}
        <div className="text-center mb-12">
          <a 
            href={appProfile.download.github_releases}
            className="inline-flex items-center px-10 py-4 bg-gray-900 text-white
                       text-lg font-semibold rounded-xl hover:bg-gray-800 transition-all"
          >
            <DownloadIcon className="w-5 h-5 mr-2" />
            Download {appProfile.basic_info.name}
          </a>
          <p className="mt-3 text-sm text-gray-500">
            Version {appProfile.basic_info.version} • Free
          </p>
        </div>
        
        {/* Installation Steps */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {steps.map((step) => (
            <div key={step.number} className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full
                             flex items-center justify-center mx-auto mb-4 font-bold">
                {step.number}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
        
        {/* Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
          <p className="text-amber-800 text-sm">
            <span className="font-semibold">Note:</span> Since this app isn't code-signed, 
            macOS may ask for permission. This is normal for open-source apps.
          </p>
        </div>
      </div>
    </section>
  );
};
```

---

## Pattern 3: Multi-Platform Download

For apps available on multiple platforms.

### Visual Structure

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│                   Get AppName Today                        │
│                                                            │
│  ┌─────────────────┐      ┌─────────────────┐             │
│  │                 │      │                 │              │
│  │  Download for   │      │  Download for   │              │
│  │     macOS       │      │    Windows      │              │
│  │   14.1+         │      │    10+          │              │
│  └─────────────────┘      └─────────────────┘             │
│                                                            │
│         ─────────── or ───────────                         │
│                                                            │
│                   View on GitHub                           │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### Code Example

```tsx
const MultiPlatformDownload = ({ appProfile }) => {
  const platforms = [
    { 
      name: 'macOS', 
      icon: <AppleIcon />,
      minVersion: '14.1+',
      link: appProfile.download.github_releases,
    },
    { 
      name: 'Windows', 
      icon: <WindowsIcon />,
      minVersion: '10+',
      link: '#', // Coming soon
      disabled: true,
    },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          Get {appProfile.basic_info.name} Today
        </h2>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {platforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.link}
              className={`flex items-center justify-center gap-3 px-8 py-4 rounded-xl
                         font-semibold transition-all
                         ${platform.disabled 
                           ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                           : 'bg-gray-900 text-white hover:bg-gray-800 hover:-translate-y-0.5'
                         }`}
            >
              <span className="w-6 h-6">{platform.icon}</span>
              <div className="text-left">
                <div className="text-sm opacity-80">Download for</div>
                <div className="text-lg">
                  {platform.name}
                  {platform.disabled && <span className="text-xs ml-2">(Soon)</span>}
                </div>
              </div>
            </a>
          ))}
        </div>
        
        <div className="flex items-center justify-center gap-4 mt-8">
          <span className="h-px w-12 bg-gray-300" />
          <span className="text-gray-400 text-sm">or</span>
          <span className="h-px w-12 bg-gray-300" />
        </div>
        
        <a 
          href={appProfile.social.github}
          className="inline-flex items-center mt-6 text-primary-600 hover:text-primary-700"
        >
          <GithubIcon className="w-5 h-5 mr-2" />
          View on GitHub
        </a>
      </div>
    </section>
  );
};
```

---

## Pattern 4: Floating/Sticky CTA

Always-visible download button for long pages.

### Code Example

```tsx
const FloatingCTA = ({ appProfile, isVisible }) => {
  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
    >
      <a 
        href={appProfile.download.github_releases}
        className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white
                   font-semibold rounded-full shadow-lg hover:bg-primary-700
                   hover:shadow-xl transition-all"
      >
        <DownloadIcon className="w-5 h-5" />
        Download
      </a>
    </div>
  );
};

// Usage with scroll detection
const Page = () => {
  const [showFloating, setShowFloating] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowFloating(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      <Hero />
      <Features />
      <Download />
      <FloatingCTA isVisible={showFloating} />
    </>
  );
};
```

---

## Button Styles

### Primary Button

```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  background-color: var(--color-primary-600);
  color: white;
  font-size: 18px;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background-color: var(--color-primary-700);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.btn-primary:active {
  transform: translateY(0);
}
```

### Secondary Button (Outline)

```css
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  background-color: transparent;
  color: var(--color-gray-700);
  font-size: 18px;
  font-weight: 600;
  border: 2px solid var(--color-gray-200);
  border-radius: 12px;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  border-color: var(--color-gray-300);
  background-color: var(--color-gray-50);
}
```

### Ghost Button (Text Link)

```css
.btn-ghost {
  display: inline-flex;
  align-items: center;
  color: var(--color-primary-600);
  font-weight: 500;
  transition: color 0.2s ease;
}

.btn-ghost:hover {
  color: var(--color-primary-700);
}

.btn-ghost svg {
  transition: transform 0.2s ease;
}

.btn-ghost:hover svg {
  transform: translateX(4px);
}
```

---

## CTA Copy Best Practices

| Action | Good Examples | Avoid |
|--------|---------------|-------|
| Download | "Download Now", "Get TimeBar", "Download Free" | "Click Here", "Submit" |
| Trial | "Start Free Trial", "Try for Free" | "Free Trial" (noun) |
| Explore | "Learn More", "See Features", "Explore" | "Click for More" |
| Source | "View on GitHub", "See the Code" | "GitHub" (just link) |

---

## Responsive Considerations

### Mobile (< 640px)
```css
.cta-container {
  flex-direction: column;
}

.btn-primary,
.btn-secondary {
  width: 100%;
  padding: 16px;
}
```

### Desktop
```css
.cta-container {
  flex-direction: row;
  gap: 16px;
}

.btn-primary,
.btn-secondary {
  width: auto;
  padding: 16px 32px;
}
```
