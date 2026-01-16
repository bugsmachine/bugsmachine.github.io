# App Profile Output Template

Use this template to generate a standardized App Profile YAML file.

## Template

```yaml
# App Profile: [APP_NAME]
# Generated: [YYYY-MM-DD]
# Source: [local | github]
# Repository: [GitHub URL if applicable]

# ============================================
# BASIC INFORMATION
# ============================================
basic_info:
  name: "[App Display Name]"
  tagline: "[One-line catchy description]"
  description: |
    [Full paragraph description of the app.
    Can be multiple lines.]
  version: "[X.Y.Z]"
  author: "[Author/Team Name]"
  author_description: "[Short bio or description]"
  license: "[License Type]"
  license_details: "[Any special license notes]"

# ============================================
# BRAND COLORS
# ============================================
# Extract from app icon or asset catalog
brand_colors:
  # Primary color - main brand identity
  primary: "#000000"
  primary_rgb: "0, 0, 0"
  
  # Lighter and darker variants for gradients/states
  primary_light: "#333333"
  primary_dark: "#000000"
  
  # Accent color - for highlights and CTAs
  accent: "#0066FF"
  
  # Background suggestions
  background_light: "#FFFFFF"
  background_dark: "#0A0A0A"
  
  # Text color suggestions
  text_primary: "#1A1A1A"
  text_secondary: "#666666"
  text_on_primary: "#FFFFFF"

# ============================================
# FEATURES
# ============================================
# List all user-facing features
features:
  - emoji: "✨"
    title: "[Feature Title]"
    description: "[One sentence description]"
    keywords: ["keyword1", "keyword2"]
    highlight: true  # Mark key features
    
  - emoji: "⚡"
    title: "[Feature Title]"
    description: "[One sentence description]"
    keywords: []
    highlight: false

# ============================================
# TECHNOLOGY STACK
# ============================================
tech_stack:
  language: "[Primary Language]"
  framework: "[Primary Framework]"
  platform: "[Target Platform]"
  architecture: "[MVC, MVVM, etc.]"
  
  dependencies:
    - name: "[Dependency Name]"
      purpose: "[What it's used for]"

# ============================================
# SYSTEM REQUIREMENTS
# ============================================
requirements:
  platforms:
    - name: "[Platform Name]"
      version: "[Minimum Version]+"
      chips: ["Chip1", "Chip2"]  # e.g., Apple Silicon, Intel
      
  additional:
    - "[Any additional requirements]"

# ============================================
# DOWNLOAD / INSTALLATION
# ============================================
download:
  # Available download sources
  github_releases: "[GitHub Releases URL]"
  app_store: null  # or App Store URL
  play_store: null  # or Play Store URL
  website: null  # or Direct download URL
  
  # Installation notes
  installation_notes: |
    [Any special installation instructions]
  
  # Code signing status
  signed: false  # true if properly code signed
  notarized: false  # true if notarized (macOS)

# ============================================
# SOCIAL / LINKS
# ============================================
social:
  github: "[GitHub URL]"
  twitter: null
  discord: null
  website: null
  documentation: null
  support_email: null

# ============================================
# ASSETS
# ============================================
assets:
  icon_path: "[Relative path to app icon]"
  icon_sizes: [16, 32, 64, 128, 256, 512, 1024]
  screenshots: []  # List of screenshot paths
  promotional_images: []

# ============================================
# MARKETING COPY
# ============================================
marketing:
  # Short descriptions for different contexts
  one_liner: "[Ultra short description - under 50 chars]"
  elevator_pitch: "[100-150 character description]"
  full_description: "[Full marketing description]"
  
  # Selling points for landing page
  selling_points:
    - "[Key selling point 1]"
    - "[Key selling point 2]"
    - "[Key selling point 3]"
  
  # Call to action text
  cta_primary: "Download Now"
  cta_secondary: "View on GitHub"

# ============================================
# SEO / METADATA
# ============================================
seo:
  title: "[Page Title for SEO]"
  description: "[Meta description - 150-160 chars]"
  keywords: ["keyword1", "keyword2", "keyword3"]
  og_image: "[Path to Open Graph image]"
```

## Example: TimeBar App Profile

```yaml
# App Profile: TimeBar
# Generated: 2026-01-16
# Source: local
# Repository: https://github.com/bugsmachine/TimeBar

basic_info:
  name: "TimeBar"
  tagline: "Elegantly display additional time zones in your macOS menu bar"
  description: |
    A lightweight, elegant macOS menu bar application for tracking 
    time zones of colleagues, family, and friends around the world.
  version: "1.0.0"
  author: "bugsmachine"
  author_description: "A student passionate about macOS development"
  license: "CC BY-NC-SA 4.0"
  license_details: "Non-commercial use only, attribution required"

brand_colors:
  primary: "#4A7FC1"
  primary_rgb: "74, 127, 193"
  primary_light: "#A8C5E5"
  primary_dark: "#2B5A8F"
  accent: "#6B9BD1"
  background_light: "#FFFFFF"
  background_dark: "#0F172A"
  text_primary: "#1A1A1A"
  text_secondary: "#64748B"
  text_on_primary: "#FFFFFF"

features:
  - emoji: "🌍"
    title: "Multiple Time Zones"
    description: "Display additional time zones directly in your menu bar"
    keywords: ["timezone", "world clock", "global"]
    highlight: true
    
  - emoji: "🚩"
    title: "Country Flags"
    description: "Visual indicators showing the country/region flag"
    keywords: ["flags", "countries", "visual"]
    highlight: true
    
  - emoji: "⏱️"
    title: "Time Difference"
    description: "See the offset from your local timezone instantly"
    keywords: ["offset", "difference", "calculation"]
    highlight: false
    
  - emoji: "🌐"
    title: "Multi-Language"
    description: "English, Simplified Chinese, and Traditional Chinese support"
    keywords: ["i18n", "localization", "chinese"]
    highlight: false
    
  - emoji: "⚙️"
    title: "Highly Customizable"
    description: "Drag-and-drop component reordering and flexible display options"
    keywords: ["customization", "settings", "preferences"]
    highlight: true
    
  - emoji: "🔄"
    title: "Auto Updates"
    description: "Built-in update checks via Sparkle framework"
    keywords: ["updates", "sparkle", "automatic"]
    highlight: false
    
  - emoji: "💡"
    title: "Lightweight"
    description: "Minimal resource usage, sits quietly in your menu bar"
    keywords: ["performance", "lightweight", "efficient"]
    highlight: false
    
  - emoji: "🔒"
    title: "Privacy First"
    description: "Fully open source and offline-first"
    keywords: ["privacy", "offline", "open source"]
    highlight: true

tech_stack:
  language: "Swift"
  framework: "SwiftUI"
  platform: "macOS"
  architecture: "MVVM"
  dependencies:
    - name: "Sparkle"
      purpose: "Auto-update framework"

requirements:
  platforms:
    - name: "macOS"
      version: "14.1"
      chips: ["Apple Silicon", "Intel"]

download:
  github_releases: "https://github.com/bugsmachine/TimeBar/releases"
  app_store: null
  signed: false
  notarized: false
  installation_notes: |
    Since TimeBar is not signed with an Apple Developer subscription,
    you may need to allow it in System Settings > Privacy & Security.

social:
  github: "https://github.com/bugsmachine/TimeBar"

assets:
  icon_path: "TimeBarIcon.png"
  icon_sizes: [128, 256, 512, 1024]
  screenshots: []

marketing:
  one_liner: "World time zones in your menu bar"
  elevator_pitch: "A lightweight macOS app that displays additional time zones in your menu bar. Perfect for remote teams."
  cta_primary: "Download TimeBar"
  cta_secondary: "View on GitHub"

seo:
  title: "TimeBar - macOS Menu Bar Time Zone App"
  description: "A lightweight, elegant macOS menu bar app to display additional time zones. Perfect for remote teams and global connections."
  keywords: ["macos", "menu bar", "time zone", "world clock", "productivity"]
```
