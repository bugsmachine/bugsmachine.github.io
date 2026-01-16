// src/data/appProfile.ts
// Generated from TimeBar App Analysis

export interface Feature {
    emoji: string
    title: string
    description: string
}

export interface Screenshot {
    filename: string
    description: string
    type: string
}

export interface AppProfile {
    basic_info: {
        name: string
        tagline: string
        description: string
        version: string
        author: string
        author_description: string
        license: string
    }
    brand_colors: {
        primary: string
        primary_light: string
        primary_dark: string
        accent: string
        background: string
    }
    features: Feature[]
    requirements: {
        platforms: Array<{
            name: string
            version: string
            chips: string[]
        }>
    }
    download: {
        github_releases: string
    }
    social: {
        github: string
    }
    marketing_copy: {
        hero_headline: string
        hero_subheadline: string
        cta_primary: string
        cta_secondary: string
        value_propositions: string[]
    }
    screenshots: Screenshot[]
}

export const appProfile: AppProfile = {
    basic_info: {
        name: "TimeBar",
        tagline: "Elegantly display additional time zones in your macOS menu bar",
        description: "A lightweight, elegant macOS menu bar application for tracking time zones of colleagues, family, and friends around the world. Perfect for remote teams and global connections.",
        version: "1.0.0",
        author: "bugsmachine",
        author_description: "A student passionate about macOS development",
        license: "CC BY-NC-SA 4.0",
    },
    brand_colors: {
        primary: "#4A7EB5",
        primary_light: "#8AB4E8",
        primary_dark: "#3D6A9A",
        accent: "#5C91C7",
        background: "#ECF5FF",
    },
    features: [
        {
            emoji: "🌍",
            title: "Multiple Time Zones",
            description: "Display additional time zones directly in your menu bar. Perfect for remote teams and global connections.",
        },
        {
            emoji: "🚩",
            title: "Country Flags",
            description: "Visual indicators showing the country/region flag for quick identification at a glance.",
        },
        {
            emoji: "⏱️",
            title: "Time Difference",
            description: "See the offset from your local timezone instantly. Know who's awake without doing math.",
        },
        {
            emoji: "🌐",
            title: "Multi-Language",
            description: "English, Simplified Chinese, and Traditional Chinese support with more languages coming soon.",
        },
        {
            emoji: "⚙️",
            title: "Highly Customizable",
            description: "Drag-and-drop component reordering, custom location names, and flexible display options.",
        },
        {
            emoji: "🔄",
            title: "Auto Updates",
            description: "Built-in update checks via Sparkle framework. Always stay up to date with new features.",
        },
        {
            emoji: "💡",
            title: "Lightweight",
            description: "Minimal resource usage. Sits quietly in your menu bar without slowing down your Mac.",
        },
        {
            emoji: "🔒",
            title: "Privacy First",
            description: "Fully open source and offline-first. Your data never leaves your computer.",
        },
    ],
    requirements: {
        platforms: [
            {
                name: "macOS",
                version: "14.1+ (Sonoma)",
                chips: ["Apple Silicon", "Intel"],
            },
        ],
    },
    download: {
        github_releases: "https://github.com/bugsmachine/TimeBar/releases",
    },
    social: {
        github: "https://github.com/bugsmachine/TimeBar",
    },
    marketing_copy: {
        hero_headline: "Time Zones, Simplified",
        hero_subheadline: "Track the time anywhere in the world, right from your Mac menu bar",
        cta_primary: "Download Free",
        cta_secondary: "View on GitHub",
        value_propositions: [
            "Never miss a meeting with international colleagues",
            "Know when your remote team is online at a glance",
            "Stay connected with family and friends across time zones",
            "Lightweight app that respects your privacy",
        ],
    },
    screenshots: [
        {
            filename: "menubar.png",
            description: "Menu bar integration showing time zone with country flag and day/night indicator",
            type: "menu-bar",
        },
        {
            filename: "settings.png",
            description: "Settings panel with appearance customization, component ordering, and timezone selection",
            type: "settings",
        },
        {
            filename: "about.png",
            description: "About window showing app version, description, and license information",
            type: "about",
        },
    ],
}
