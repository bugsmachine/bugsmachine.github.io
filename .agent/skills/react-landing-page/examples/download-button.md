# Download Button / CTA Template

Ready - to - use Download and CTA components.

## Download Section Component

    ```tsx
// src/components/sections/Download.tsx
import { Download, Github, ExternalLink } from 'lucide-react'
import { appProfile } from '../../data/appProfile'

export function DownloadSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-2xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Ready to get started?
        </h2>
        
        {/* Primary Download Button */}
        <a
          href={appProfile.download.github_releases}
          className="inline-flex items-center gap-3 px-8 py-4 
                     bg-primary-600 text-white text-lg font-semibold rounded-xl
                     hover:bg-primary-700 transition-all duration-200
                     hover:-translate-y-0.5 hover:shadow-lg"
        >
          <Download className="w-5 h-5" />
          {appProfile.marketing.cta_primary}
        </a>
        
        {/* System Requirements */}
        <p className="mt-6 text-gray-500">
          {appProfile.requirements.platforms[0].name}{' '}
          {appProfile.requirements.platforms[0].version}+
          {' • '}
          {appProfile.requirements.platforms[0].chips.join(' & ')}
        </p>
        
        {/* Secondary Link */}
        <a
          href={appProfile.social.github}
          className="inline-flex items-center gap-2 mt-4 
                     text-primary-600 hover:text-primary-700 font-medium"
        >
          <Github className="w-4 h-4" />
          {appProfile.marketing.cta_secondary}
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </section>
  )
}
```

## Download With Installation Steps

    ```tsx
// src/components/sections/DownloadWithSteps.tsx
import { Download, FolderOpen, Shield } from 'lucide-react'
import { appProfile } from '../../data/appProfile'

export function DownloadWithSteps() {
  const steps = [
    {
      icon: <Download className="w-6 h-6" />,
      title: "Download",
      description: "Get the latest .zip from GitHub Releases"
    },
    {
      icon: <FolderOpen className="w-6 h-6" />,
      title: "Extract & Move",
      description: "Unzip and move to Applications folder"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Allow in Settings",
      description: "Approve in Privacy & Security if prompted"
    }
  ]

  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Download & Install
          </h2>
          <p className="text-gray-600">
            Get up and running in under a minute
          </p>
        </div>
        
        {/* Download Button */}
        <div className="text-center mb-12">
          <a
            href={appProfile.download.github_releases}
            className="inline-flex items-center gap-3 px-10 py-5
                       bg-gray-900 text-white text-lg font-semibold rounded-2xl
                       hover:bg-gray-800 transition-all duration-200
                       shadow-lg hover:shadow-xl"
          >
            <Download className="w-6 h-6" />
            Download {appProfile.basic_info.name}
          </a>
          <p className="mt-4 text-sm text-gray-500">
            Version {appProfile.basic_info.version} • Free
          </p>
        </div>
        
        {/* Installation Steps */}
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div key={step.title} className="bg-white rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 
                             rounded-full flex items-center justify-center mx-auto mb-4">
                {step.icon}
              </div>
              <div className="text-xs text-primary-600 font-medium mb-2">
                Step {index + 1}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
        
        {/* Notice for unsigned apps */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
          <p className="text-amber-800 text-sm">
            <span className="font-medium">Note:</span> This app is open-source and not signed with 
            an Apple Developer certificate. macOS may require permission in Settings.
          </p>
        </div>
      </div>
    </section>
  )
}
```

## Button Components

    ```tsx
// src/components/ui/Button.tsx
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: ReactNode
  className?: string
}

export function Button({ 
  children, 
  href, 
  variant = 'primary', 
  size = 'md',
  icon,
  className = ''
}: ButtonProps) {
  const baseStyles = `
inline - flex items - center justify - center gap - 2 font - semibold
rounded - xl transition - all duration - 200
    `
  
  const variantStyles = {
    primary: `
bg - primary - 600 text - white
hover: bg - primary - 700 hover: -translate - y - 0.5 hover: shadow - lg
    `,
    secondary: `
bg - white border - 2 border - gray - 200 text - gray - 700
hover: border - gray - 300 hover: bg - gray - 50
    `,
    ghost: `
text - primary - 600 hover: text - primary - 700
    `
  }
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  
  const combinedStyles = `
    ${ baseStyles } 
    ${ variantStyles[variant] } 
    ${ sizeStyles[size] }
    ${ className }
`
  
  if (href) {
    return (
      <a href={href} className={combinedStyles}>
        {icon}
        {children}
      </a>
    )
  }
  
  return (
    <button className={combinedStyles}>
      {icon}
      {children}
    </button>
  )
}
```

## Download Badge Component

    ```tsx
// src/components/ui/DownloadBadge.tsx
import { Download } from 'lucide-react'

interface DownloadBadgeProps {
  platform: string
  version: string
  href: string
}

export function DownloadBadge({ platform, version, href }: DownloadBadgeProps) {
  // Platform icons (simplified)
  const platformIcons: Record<string, string> = {
    macOS: '🍎',
    Windows: '🪟',
    Linux: '🐧',
  }
  
  return (
    <a
      href={href}
      className="flex items-center gap-4 px-6 py-4 bg-gray-900 text-white 
                 rounded-xl hover:bg-gray-800 transition-colors"
    >
      <span className="text-3xl">{platformIcons[platform] || '📦'}</span>
      <div className="text-left">
        <div className="text-sm text-gray-400">Download for</div>
        <div className="font-semibold text-lg">{platform}</div>
      </div>
      <Download className="w-5 h-5 ml-auto" />
    </a>
  )
}
```

## Usage Examples

### Basic Download Section
    ```tsx
import { DownloadSection } from './components/sections/Download'

// In App.tsx
<DownloadSection />
```

### With Installation Steps(for unsigned apps)
    ```tsx
import { DownloadWithSteps } from './components/sections/DownloadWithSteps'

<DownloadWithSteps />
```

### Using Button Component
    ```tsx
import { Button } from './components/ui/Button'
import { Download, Github } from 'lucide-react'

<div className="flex gap-4">
  <Button 
    href="/download"
    variant="primary"
    size="lg"
    icon={<Download className="w-5 h-5" />}
  >
    Download Now
  </Button>
  
  <Button 
    href="https://github.com/..."
    variant="secondary"
    size="lg"
    icon={<Github className="w-5 h-5" />}
  >
    View Source
  </Button>
</div>
```

## Simplified Version(No Icons Library)

    ```tsx
// Using inline SVG instead of lucide-react
export function DownloadSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">
          Ready to get started?
        </h2>
        
        <a
          href={appProfile.download.github_releases}
          className="inline-flex items-center gap-2 px-8 py-4 
                     bg-gray-900 text-white font-semibold rounded-xl
                     hover:bg-gray-800 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download {appProfile.basic_info.name}
        </a>
        
        <p className="mt-6 text-gray-500">
          macOS 14.1+ • Free • Open Source
        </p>
      </div>
    </section>
  )
}
```
