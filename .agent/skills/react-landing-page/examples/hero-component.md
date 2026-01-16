# Hero Component Template

A ready-to-use Hero component for landing pages.

## Component Code

```tsx
// src/components/sections/Hero.tsx
import { motion } from 'framer-motion'
import { ChevronDown, Download } from 'lucide-react'
import { appProfile } from '../../data/appProfile'

// Import app icon - adjust path as needed
import appIcon from '../../assets/app-icon.png'

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
      {/* Background gradient (optional) */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 to-white -z-10" />
      
      <div className="max-w-4xl mx-auto text-center">
        {/* App Icon */}
        <motion.img
          src={appIcon}
          alt={`${appProfile.basic_info.name} icon`}
          className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-8 rounded-[22%] shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
        
        {/* App Name */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {appProfile.basic_info.name}
        </motion.h1>
        
        {/* Tagline */}
        <motion.p
          className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {appProfile.basic_info.tagline}
        </motion.p>
        
        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href={appProfile.download.github_releases}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 
                       text-white font-semibold rounded-xl
                       hover:bg-primary-700 transition-all duration-200
                       hover:-translate-y-0.5 hover:shadow-lg"
          >
            <Download className="w-5 h-5" />
            {appProfile.marketing.cta_primary}
          </a>
        </motion.div>
        
        {/* System Requirements */}
        <motion.p
          className="mt-6 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {appProfile.requirements.platforms[0].name} {appProfile.requirements.platforms[0].version}+
          {' • '}
          {appProfile.requirements.platforms[0].chips.join(' & ')}
        </motion.p>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  )
}
```

## Simplified Version (No Framer Motion)

```tsx
// src/components/sections/Hero.tsx
import { appProfile } from '../../data/appProfile'
import appIcon from '../../assets/app-icon.png'

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto text-center">
        {/* App Icon */}
        <img
          src={appIcon}
          alt={`${appProfile.basic_info.name} icon`}
          className="w-28 h-28 mx-auto mb-8 rounded-[22%] shadow-lg"
        />
        
        {/* App Name */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-5 tracking-tight">
          {appProfile.basic_info.name}
        </h1>
        
        {/* Tagline */}
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          {appProfile.basic_info.tagline}
        </p>
        
        {/* CTA Button */}
        <a
          href={appProfile.download.github_releases}
          className="inline-flex items-center gap-2 px-8 py-4 
                     bg-gray-900 text-white font-semibold rounded-xl
                     hover:bg-gray-800 transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {appProfile.marketing.cta_primary}
        </a>
        
        {/* System Requirements */}
        <p className="mt-6 text-sm text-gray-500">
          {appProfile.requirements.platforms[0].name} {appProfile.requirements.platforms[0].version}+ • Free • Open Source
        </p>
      </div>
    </section>
  )
}
```

## Usage

```tsx
// In App.tsx
import { Hero } from './components/sections/Hero'

function App() {
  return (
    <main>
      <Hero />
      {/* Other sections */}
    </main>
  )
}
```

## Customization Points

### Change Background

```tsx
// Solid color
<section className="... bg-slate-50">

// Gradient
<section className="... bg-gradient-to-b from-primary-50 to-white">

// Radial gradient
<section className="... bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-100 via-white to-white">
```

### Different Icon Styles

```tsx
// Rounded corners (macOS style)
<img className="... rounded-[22%]" />

// Circle
<img className="... rounded-full" />

// Square with small radius
<img className="... rounded-xl" />
```

### Button Variants

```tsx
// Filled (default)
className="bg-primary-600 text-white hover:bg-primary-700"

// Dark
className="bg-gray-900 text-white hover:bg-gray-800"

// Outline
className="border-2 border-gray-200 text-gray-700 hover:border-gray-300"

// Gradient
className="bg-gradient-to-r from-primary-500 to-primary-700 text-white"
```
