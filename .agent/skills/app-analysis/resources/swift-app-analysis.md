# Swift/macOS/iOS App Analysis Guide

Specific guidance for analyzing Swift-based Apple platform applications.

## Project Structure Overview

A typical Swift app project structure:

```
AppName/
├── AppName.xcodeproj/          # Xcode project file
│   ├── project.pbxproj         # Project settings
│   └── xcshareddata/           # Shared schemes
├── AppName/                    # Main source directory
│   ├── Assets.xcassets/        # Asset catalog
│   │   ├── AppIcon.appiconset/ # App icons
│   │   ├── AccentColor.colorset/ # Accent color
│   │   └── *.imageset/         # Other images
│   ├── Info.plist              # App metadata
│   ├── AppNameApp.swift        # App entry point
│   ├── ContentView.swift       # Main view
│   ├── *View.swift             # UI views
│   ├── *Model.swift            # Data models
│   ├── *.entitlements          # App capabilities
│   ├── Localizable.xcstrings   # Localization (modern)
│   ├── en.lproj/               # English localization
│   │   └── Localizable.strings
│   └── zh-Hans.lproj/          # Chinese localization
├── AppNameTests/               # Unit tests
└── AppNameUITests/             # UI tests
```

## Key Files to Analyze

### 1. Info.plist

Extract app metadata:

```xml
<key>CFBundleName</key>
<string>AppName</string>

<key>CFBundleDisplayName</key>
<string>Display Name</string>

<key>CFBundleShortVersionString</key>
<string>1.0.0</string>

<key>CFBundleVersion</key>
<string>1</string>

<key>LSMinimumSystemVersion</key>
<string>14.1</string>

<key>CFBundleIdentifier</key>
<string>com.developer.appname</string>
```

**Mapping to App Profile:**
- `CFBundleDisplayName` → `basic_info.name`
- `CFBundleShortVersionString` → `basic_info.version`
- `LSMinimumSystemVersion` → `requirements.platforms[].version`

### 2. Asset Catalog (Assets.xcassets)

#### App Icon Location
```
Assets.xcassets/AppIcon.appiconset/
├── Contents.json           # Icon configuration
├── AppIcon-16.png          # 16x16 icon
├── AppIcon-32.png          # 32x32 icon
├── AppIcon-128.png         # 128x128 icon
├── AppIcon-256.png         # 256x256 icon
├── AppIcon-512.png         # 512x512 icon
└── AppIcon-1024.png        # 1024x1024 icon
```

#### Accent Color Location
```
Assets.xcassets/AccentColor.colorset/
└── Contents.json
```

Example Contents.json:
```json
{
  "colors" : [
    {
      "color" : {
        "color-space" : "srgb",
        "components" : {
          "alpha" : "1.000",
          "blue" : "0.855",
          "green" : "0.561",
          "red" : "0.290"
        }
      },
      "idiom" : "universal"
    }
  ]
}
```

**Converting to Hex:**
```
R: 0.290 * 255 = 74 → #4A
G: 0.561 * 255 = 143 → #8F
B: 0.855 * 255 = 218 → #DA
Result: #4A8FDA
```

### 3. Localization Files

#### Modern Format (Localizable.xcstrings)
JSON-based localization catalog introduced in Xcode 15.

```json
{
  "sourceLanguage" : "en",
  "strings" : {
    "app.name" : {
      "localizations" : {
        "en" : { "stringUnit" : { "value" : "TimeBar" } },
        "zh-Hans" : { "stringUnit" : { "value" : "时区栏" } }
      }
    }
  }
}
```

#### Legacy Format (.strings)
```
// en.lproj/Localizable.strings
"app.name" = "TimeBar";
"feature.timezone" = "Multiple Time Zones";
```

**Mapping:**
- Key strings often reveal feature names
- Extract user-facing text for marketing copy

### 4. App Entry Point (*App.swift)

Look for framework usage:

```swift
import SwiftUI
import Sparkle  // → Auto-update capability

@main
struct TimeBarApp: App {
    // App initialization
}
```

**Dependencies Detection:**
- `import Sparkle` → Auto-updates feature
- `import StoreKit` → In-app purchases
- `import CloudKit` → Cloud sync feature
- `import HealthKit` → Health data access

### 5. View Files (*View.swift)

Analyze UI structure:

```swift
struct SettingsView: View {
    var body: some View {
        // UI components reveal features
        Toggle("Show Flags", isOn: $showFlags)
        Picker("Language", selection: $language) { ... }
    }
}
```

**Feature Discovery:**
- Toggle/Switch → Boolean settings
- Picker → Selection options
- Button actions → App capabilities

### 6. Model Files (*Model.swift)

Understand data structures:

```swift
enum AppLanguage: String, CaseIterable {
    case english = "en"
    case simplifiedChinese = "zh-Hans"
    case traditionalChinese = "zh-Hant"
}
```

**Mapping:**
- Enum cases → Supported options (languages, themes, etc.)
- Struct properties → Feature parameters

## Color Extraction from App Icon

For Swift apps, the icon is typically located at:
- Project root: `AppIcon.png` or `AppIcon-T.png`
- Asset catalog: `Assets.xcassets/AppIcon.appiconset/`

### Visual Analysis Process

1. **Identify dominant colors** - Look at the icon and note 2-3 main colors
2. **Use color picker or estimation** - Approximate hex values
3. **Generate color scale** - Create variants for UI use

### Common Icon Color Patterns

| Pattern | Description | Color Strategy |
|---------|-------------|----------------|
| Monochrome | Single color with shades | Use as primary, generate light/dark |
| Duotone | Two complementary colors | Primary + Accent |
| Gradient | Color transition | Use endpoints as primary/accent |
| Illustrated | Multiple colors | Pick dominant + secondary |

## Framework/Dependency Detection

Check these files for dependencies:

### Swift Package Manager
```swift
// Package.swift or Project settings
dependencies: [
    .package(url: "https://github.com/sparkle-project/Sparkle", from: "2.0.0")
]
```

### CocoaPods
```ruby
# Podfile
pod 'Sparkle'
pod 'Alamofire'
```

### Carthage
```
# Cartfile
github "sparkle-project/Sparkle"
```

## Output Checklist

Before completing the analysis, verify:

- [ ] App name and display name extracted
- [ ] Version number identified
- [ ] Minimum OS version found
- [ ] App icon located and colors analyzed
- [ ] All features documented from README and source
- [ ] Supported languages identified
- [ ] Dependencies/frameworks listed
- [ ] License type confirmed
- [ ] Download/installation method documented
