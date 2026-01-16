import { motion } from 'framer-motion'
import { Download, Github, ChevronDown } from 'lucide-react'
import { appProfile } from '../../data/appProfile'
import { SecurityNotice } from '../ui/SecurityNotice'
import appIcon from '../../assets/app-icon.png'

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 via-white to-white" />

            {/* Decorative Blobs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-light/20 rounded-full blur-3xl" />

            <div className="relative z-10 container-narrow mx-auto px-6 pt-24 pb-16 text-center">
                {/* App Icon */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-8"
                >
                    <img
                        src={appIcon}
                        alt={`${appProfile.basic_info.name} Icon`}
                        className="w-28 h-28 md:w-36 md:h-36 mx-auto rounded-[22%] shadow-2xl shadow-primary-500/20 animate-float"
                    />
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 text-balance"
                >
                    {appProfile.marketing_copy.hero_headline}
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto mb-10 text-balance"
                >
                    {appProfile.marketing_copy.hero_subheadline}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a
                        href={appProfile.download.github_releases}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary gap-2 w-full sm:w-auto"
                    >
                        <Download className="w-5 h-5" />
                        {appProfile.marketing_copy.cta_primary}
                    </a>
                    <a
                        href={appProfile.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary gap-2 w-full sm:w-auto"
                    >
                        <Github className="w-5 h-5" />
                        {appProfile.marketing_copy.cta_secondary}
                    </a>
                </motion.div>

                {/* System Requirements */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500"
                >
                    {appProfile.requirements.platforms.map((platform) => (
                        <div key={platform.name} className="flex items-center gap-2">
                            <span className="text-xl">🍎</span>
                            <span>{platform.name} {platform.version}</span>
                        </div>
                    ))}
                    <span className="hidden sm:inline text-gray-300">•</span>
                    <span>Free & Open Source</span>
                    <span className="hidden sm:inline text-gray-300">•</span>
                    <span>Privacy First</span>
                </motion.div>

                {/* Security Notice */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <SecurityNotice />
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <a
                        href="#screenshots"
                        className="flex flex-col items-center gap-2 text-gray-400 hover:text-primary-600 transition-colors"
                    >
                        <span className="text-sm font-medium">Learn More</span>
                        <ChevronDown className="w-5 h-5 animate-bounce" />
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
