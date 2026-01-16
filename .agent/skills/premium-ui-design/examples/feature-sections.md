# Feature Section Design Patterns

Patterns for showcasing app features in an engaging and elegant way.

## Pattern 1: Alternating Layout (AirBattery Style)

Features alternate between text-left/image-right and text-right/image-left.

### Visual Structure

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│  Section Title (Optional)                                  │
│                                                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│     ┌──────────────┐              ────────────────         │
│     │              │              Feature Title            │
│     │    Image     │              ────────────────         │
│     │     📱       │              Description text         │
│     │              │              that explains the        │
│     └──────────────┘              feature in detail.       │
│                                                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│     ────────────────              ┌──────────────┐         │
│     Feature Title                 │              │         │
│     ────────────────              │    Image     │         │
│     Description text              │     📱       │         │
│     that explains the             │              │         │
│     feature in detail.            └──────────────┘         │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### Code Example

```tsx
const FeatureAlternating = ({ features }) => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div 
            key={feature.title}
            className={`flex flex-col lg:flex-row items-center gap-12 py-16
                       ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
          >
            {/* Image/Illustration */}
            <div className="flex-1 flex justify-center">
              {feature.image ? (
                <img 
                  src={feature.image}
                  alt={feature.title}
                  className="max-w-full h-auto rounded-2xl shadow-lg"
                />
              ) : (
                <div className="w-64 h-64 bg-gradient-to-br from-primary-100 to-primary-200 
                               rounded-3xl flex items-center justify-center">
                  <span className="text-8xl">{feature.emoji}</span>
                </div>
              )}
            </div>
            
            {/* Text Content */}
            <div className="flex-1">
              <span className="text-4xl mb-4 block">{feature.emoji}</span>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
```

---

## Pattern 2: Card Grid

Features displayed in a clean grid of cards.

### Visual Structure

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│                   Why Choose AppName?                      │
│               Everything you need, nothing you don't       │
│                                                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │     🌍      │  │     🚩      │  │     ⏱️      │        │
│  │             │  │             │  │             │        │
│  │ Feature 1   │  │ Feature 2   │  │ Feature 3   │        │
│  │ Description │  │ Description │  │ Description │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
│                                                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │     🌐      │  │     ⚙️      │  │     🔒      │        │
│  │             │  │             │  │             │        │
│  │ Feature 4   │  │ Feature 5   │  │ Feature 6   │        │
│  │ Description │  │ Description │  │ Description │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### Code Example

```tsx
const FeatureGrid = ({ features, sectionTitle, sectionSubtitle }) => {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {sectionTitle}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {sectionSubtitle}
          </p>
        </div>
        
        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg 
                        transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <span className="text-4xl block mb-4">{feature.emoji}</span>
              
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

### Card Variants

#### Bordered Card
```css
.feature-card-bordered {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 32px;
}

.feature-card-bordered:hover {
  border-color: var(--color-primary-300);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
```

#### Gradient Background Card
```css
.feature-card-gradient {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 20px;
  padding: 32px;
}
```

#### Icon Background Card
```css
.feature-card-icon-bg {
  position: relative;
  background: white;
  border-radius: 24px;
  padding: 40px;
}

.feature-card-icon-bg::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, var(--color-primary-100) 0%, transparent 100%);
  border-radius: 0 24px 0 100%;
}
```

---

## Pattern 3: Icon List (Compact)

Minimal list-style feature display for secondary features.

### Visual Structure

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│   More Features                                            │
│                                                            │
│   ✨ Feature One — Brief description                       │
│   ⚡ Feature Two — Brief description                       │
│   🔒 Feature Three — Brief description                     │
│   💡 Feature Four — Brief description                      │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### Code Example

```tsx
const FeatureList = ({ features, title }) => {
  return (
    <section className="py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">{title}</h3>
        
        <div className="space-y-4">
          {features.map((feature) => (
            <div 
              key={feature.title}
              className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl flex-shrink-0">{feature.emoji}</span>
              <div>
                <span className="font-semibold text-gray-900">{feature.title}</span>
                <span className="text-gray-600"> — {feature.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

---

## Pattern 4: Bento Grid

Modern asymmetric grid layout (Apple-inspired).

### Visual Structure

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│  ┌───────────────────────────┐  ┌─────────────────────┐   │
│  │                           │  │                     │   │
│  │    Large Feature Card     │  │   Medium Card 1     │   │
│  │    (Primary Feature)      │  │                     │   │
│  │                           │  ├─────────────────────┤   │
│  │                           │  │   Medium Card 2     │   │
│  └───────────────────────────┘  └─────────────────────┘   │
│                                                            │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────┐   │
│  │ Small 1 │  │ Small 2 │  │ Small 3 │  │  Wide Card  │   │
│  └─────────┘  └─────────┘  └─────────┘  └─────────────┘   │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### Code Example

```tsx
const FeatureBento = ({ features }) => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-4 grid-rows-3 gap-6">
          {/* Large Card - Primary Feature */}
          <div className="col-span-2 row-span-2 bg-gradient-to-br from-primary-500 to-primary-700 
                         rounded-3xl p-8 text-white flex flex-col justify-end">
            <span className="text-5xl mb-4">{features[0].emoji}</span>
            <h3 className="text-3xl font-bold mb-2">{features[0].title}</h3>
            <p className="text-primary-100">{features[0].description}</p>
          </div>
          
          {/* Medium Cards */}
          <div className="col-span-2 bg-gray-100 rounded-3xl p-6">
            <span className="text-3xl">{features[1].emoji}</span>
            <h3 className="text-xl font-bold mt-4">{features[1].title}</h3>
            <p className="text-gray-600 mt-2">{features[1].description}</p>
          </div>
          
          <div className="col-span-2 bg-gray-100 rounded-3xl p-6">
            <span className="text-3xl">{features[2].emoji}</span>
            <h3 className="text-xl font-bold mt-4">{features[2].title}</h3>
            <p className="text-gray-600 mt-2">{features[2].description}</p>
          </div>
          
          {/* Small Cards */}
          {features.slice(3, 6).map((feature) => (
            <div key={feature.title} className="bg-white border border-gray-200 rounded-2xl p-4">
              <span className="text-2xl">{feature.emoji}</span>
              <h4 className="font-semibold mt-2">{feature.title}</h4>
            </div>
          ))}
          
          {/* Wide Card */}
          <div className="col-span-1 bg-gray-900 text-white rounded-2xl p-4">
            <span className="text-2xl">{features[6]?.emoji || '🔒'}</span>
            <h4 className="font-semibold mt-2">{features[6]?.title || 'Privacy First'}</h4>
          </div>
        </div>
      </div>
    </section>
  );
};
```

---

## Styling Tips

### Gradient Icons
```css
.feature-icon-gradient {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, var(--color-primary-100), var(--color-primary-200));
  border-radius: 14px;
}
```

### Hover Lift Effect
```css
.feature-card {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.08);
}
```

### Staggered Animation
```css
.feature-card:nth-child(1) { animation-delay: 0ms; }
.feature-card:nth-child(2) { animation-delay: 100ms; }
.feature-card:nth-child(3) { animation-delay: 200ms; }
.feature-card:nth-child(4) { animation-delay: 300ms; }
.feature-card:nth-child(5) { animation-delay: 400ms; }
.feature-card:nth-child(6) { animation-delay: 500ms; }
```

---

## Content Best Practices

1. **Lead with impact** - Put the most compelling feature first
2. **Highlight 3-4 key features** - Don't overwhelm
3. **Use action verbs** - "Display", "Track", "Customize"
4. **Keep descriptions short** - 1-2 sentences max
5. **Group related features** - Create logical sections
6. **Visual variety** - Mix large and small cards for interest
