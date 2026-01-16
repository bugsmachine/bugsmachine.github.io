# Feature Section Template

Ready - to - use Feature section components.

## Grid Layout Component

    ```tsx
// src/components/sections/Features.tsx
import { motion } from 'framer-motion'
import { appProfile } from '../../data/appProfile'

export function Features() {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything you need
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple yet powerful features designed for your daily workflow
          </p>
        </div>
        
        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {appProfile.features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md 
                        transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1] 
              }}
            >
              {/* Emoji Icon */}
              <span className="text-4xl block mb-4">{feature.emoji}</span>
              
              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

## Alternating Layout Component

    ```tsx
// src/components/sections/FeaturesAlternating.tsx
import { motion } from 'framer-motion'
import { appProfile } from '../../data/appProfile'

export function FeaturesAlternating() {
  // Select key features for detailed showcase
  const keyFeatures = appProfile.features.filter(f => f.highlight).slice(0, 3)
  
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {keyFeatures.map((feature, index) => (
          <motion.div
            key={feature.title}
            className={`flex flex - col lg: flex - row items - center gap - 12 py - 16
                       ${ index % 2 === 1 ? 'lg:flex-row-reverse' : '' } `}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Visual/Illustration */}
            <div className="flex-1 flex justify-center">
              <div 
                className="w-64 h-64 md:w-80 md:h-80 rounded-3xl 
                          bg-gradient-to-br from-primary-100 to-primary-200
                          flex items-center justify-center"
              >
                <span className="text-8xl md:text-9xl">{feature.emoji}</span>
              </div>
            </div>
            
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
```

## Simplified Version(No Framer Motion)

    ```tsx
// src/components/sections/Features.tsx
import { appProfile } from '../../data/appProfile'

export function Features() {
  return (
    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why {appProfile.basic_info.name}?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple yet powerful features designed for your daily workflow
          </p>
        </div>
        
        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {appProfile.features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-2xl p-8 shadow-sm 
                        hover:shadow-lg transition-all duration-300"
            >
              <span className="text-4xl block mb-4">{feature.emoji}</span>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

## Feature Card Component

    ```tsx
// src/components/ui/FeatureCard.tsx
interface FeatureCardProps {
  emoji: string
  title: string
  description: string
  variant?: 'default' | 'primary' | 'bordered'
}

export function FeatureCard({ 
  emoji, 
  title, 
  description, 
  variant = 'default' 
}: FeatureCardProps) {
  const variants = {
    default: 'bg-white shadow-sm hover:shadow-md',
    primary: 'bg-primary-600 text-white',
    bordered: 'bg-white border border-gray-200 hover:border-primary-300',
  }
  
  return (
    <div 
      className={`rounded - 2xl p - 6 transition - all duration - 300
hover: -translate - y - 1 ${ variants[variant] } `}
    >
      <span className="text-4xl block mb-4">{emoji}</span>
      <h3 className={`text - lg font - semibold mb - 2 
                     ${ variant === 'primary' ? 'text-white' : 'text-gray-900' } `}>
        {title}
      </h3>
      <p className={variant === 'primary' ? 'text-primary-100' : 'text-gray-600'}>
        {description}
      </p>
    </div>
  )
}
```

## Usage

    ```tsx
// In App.tsx
import { Features } from './components/sections/Features'
import { FeaturesAlternating } from './components/sections/FeaturesAlternating'

function App() {
  return (
    <main>
      <Hero />
      <FeaturesAlternating />  {/* For key 3-4 features with images */}
      <Features />             {/* For all features in grid */}
      <Download />
    </main>
  )
}
```

## Adding Images / Screenshots

If you have actual screenshots:

```tsx
<div className="flex-1 flex justify-center">
  <img
    src={feature.screenshot}
    alt={feature.title}
    className="max-w-full h-auto rounded-2xl shadow-xl"
  />
</div>
```

## Different Grid Layouts

    ```tsx
// 2 columns
<div className="grid md:grid-cols-2 gap-8">

// 3 columns
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

// 4 columns
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

// 2-column with featured card
<div className="grid lg:grid-cols-3 gap-6">
  <div className="lg:col-span-2 lg:row-span-2">
    {/* Large featured card */}
  </div>
  {/* Smaller cards */}
</div>
```
