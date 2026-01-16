---
name: app-analysis
description: Analyzes app source code, GitHub repositories, and README files to extract comprehensive app information including features, brand colors, icons, system requirements, and marketing copy. Use this skill when preparing to create a landing page, marketing materials, or documentation for an existing app.
---

# App Analysis Skill

This skill provides a systematic approach to extract all relevant information from an app's source code, GitHub repository, and documentation to generate a comprehensive **App Profile** that can be used for creating landing pages, marketing materials, or documentation.

## When to Use This Skill

- Creating a landing page for an existing app
- Generating marketing copy or press releases
- Building documentation that needs accurate feature descriptions
- Extracting brand colors from app icons for consistent design

## Analysis Workflow

### Step 1: Identify Available Sources

First, determine what sources are available for analysis:

```
[ ] Source code directory (Swift, Kotlin, JavaScript, etc.)
[ ] GitHub repository URL
[ ] README.md file
[ ] App Icon / Asset files
[ ] Package/Project configuration files
```

### Step 2: Basic Information Extraction

#### From README.md
Look for and extract:
- **App Name**: Usually in the first heading or title
- **Tagline**: Short description, often right after the title
- **Full Description**: More detailed paragraph about the app
- **Features List**: Often marked with emojis or bullet points
- **System Requirements**: Platform versions, hardware requirements
- **Installation Instructions**: Download links, setup steps
- **License**: License type and restrictions
- **Author/Team**: Creator information

#### From Project Configuration Files

| Platform | File | Information |
|----------|------|-------------|
| iOS/macOS | `Info.plist` | Bundle ID, version, min OS version |
| iOS/macOS | `*.xcodeproj` | Project name, targets |
| Android | `build.gradle` | App ID, version, min SDK |
| Web/Node | `package.json` | Name, version, dependencies |
| React Native | `app.json` | Name, display name, version |

### Step 3: Feature Analysis

Features should be extracted and structured as:

```yaml
features:
  - emoji: "🌍"           # Visual indicator (from README or inferred)
    title: "Feature Name"  # Concise title
    description: "..."     # One-sentence description
    keywords: ["keyword1", "keyword2"]  # For SEO
```

**Feature Discovery Methods:**

1. **README Feature Sections**: Look for "Features", "Highlights", "What's New"
2. **Source Code Analysis**: 
   - View/ViewController files for UI features
   - Model files for data capabilities
   - Service files for backend integrations
3. **Localization Files**: Often contain user-facing feature strings

### Step 4: Brand Color Extraction

#### From App Icon

1. **Locate the icon file**:
   - iOS/macOS: `Assets.xcassets/AppIcon.appiconset/`
   - Android: `res/mipmap-*/ic_launcher.png`
   - Web: `public/favicon.ico`, `public/logo.png`

2. **Visual Analysis**:
   - Identify the 2-3 dominant colors in the icon
   - Note the color relationships (complementary, analogous, etc.)
   - Determine primary vs. accent colors

3. **Color Extraction Output**:
   ```yaml
   brand_colors:
     primary: "#HEXCODE"        # Main brand color
     primary_light: "#HEXCODE"  # Lighter variant
     primary_dark: "#HEXCODE"   # Darker variant
     accent: "#HEXCODE"         # Secondary/accent color
     background: "#HEXCODE"     # Suggested background
   ```

#### From Asset Catalog (iOS/macOS)
Check `AccentColor.colorset/Contents.json` for defined accent colors.

### Step 5: Technical Stack Analysis

Identify the technology stack by examining:

| Indicator | Technology |
|-----------|------------|
| `*.swift`, `*.xcodeproj` | Swift / iOS / macOS |
| `*.kt`, `build.gradle` | Kotlin / Android |
| `package.json` + React | React / React Native |
| `pubspec.yaml` | Flutter / Dart |
| `*.vue` | Vue.js |
| `Cargo.toml` | Rust |

### Step 6: Generate App Profile

Compile all extracted information into a structured App Profile:

```yaml
# App Profile: [App Name]
# Generated: [Date]
# Source: [Source type - local/GitHub]

basic_info:
  name: "App Name"
  tagline: "Short catchy description"
  description: "Full paragraph description"
  version: "1.0.0"
  author: "Author Name"
  license: "License Type"

brand_colors:
  primary: "#HEXCODE"
  primary_light: "#HEXCODE"
  primary_dark: "#HEXCODE"
  accent: "#HEXCODE"
  background: "#FFFFFF"

features:
  - emoji: "🌍"
    title: "Feature 1"
    description: "Description of feature 1"
  - emoji: "⚡"
    title: "Feature 2"
    description: "Description of feature 2"

tech_stack:
  language: "Swift"
  framework: "SwiftUI"
  platform: "macOS"
  min_version: "14.1"

requirements:
  platforms:
    - name: "macOS"
      version: "14.1+"
      chips: ["Apple Silicon", "Intel"]

download:
  github_releases: "https://github.com/..."
  app_store: null  # or App Store URL
  
social:
  github: "https://github.com/..."
  twitter: null
  website: null
```

## Platform-Specific Analysis Guides

### Swift/macOS/iOS Apps

Key files to examine:
- `Info.plist` - App metadata
- `*.entitlements` - App capabilities
- `Assets.xcassets/` - Icons and colors
- `Localizable.xcstrings` or `*.strings` - Localized strings
- `*View.swift` - UI components and features
- `*Model.swift` - Data models

### Android Apps

Key files to examine:
- `app/build.gradle` - App configuration
- `AndroidManifest.xml` - Permissions and features
- `res/mipmap-*/` - App icons
- `res/values/strings.xml` - Localized strings
- `res/values/colors.xml` - Brand colors

### Web/JavaScript Apps

Key files to examine:
- `package.json` - Project metadata
- `public/` - Static assets including icons
- `src/App.*` - Main application structure
- `README.md` - Documentation

## Output Format

The final App Profile should be saved as a YAML file that can be consumed by other skills:

**Filename**: `app-profile.yaml`

This profile will be used by:
- `premium-ui-design` skill for color palette and design decisions
- `react-landing-page` skill for content population

## Best Practices

1. **Be thorough**: Check all available sources before finalizing
2. **Verify colors**: Ensure extracted colors are accurate hex values
3. **Prioritize README**: User-facing descriptions are often best in README
4. **Note missing info**: Mark fields as `null` or `"TBD"` if not found
5. **Maintain structure**: Follow the YAML format exactly for compatibility
