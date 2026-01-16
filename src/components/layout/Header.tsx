import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, X, Github } from 'lucide-react'
import { LanguageSelector } from '../ui/LanguageSelector'
import { motion, AnimatePresence } from 'framer-motion'
import { appProfile } from '../../data/appProfile'
import appIcon from '../../assets/app-icon.png'

export function Header() {
    const { t } = useTranslation()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navItems = [
        { label: t('nav.screenshots'), href: '#screenshots' },
        { label: t('nav.features'), href: '#features' },
        { label: t('nav.download'), href: '#download' },
    ]

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-100'
                : 'bg-transparent'
                }`}
        >
            <nav className="container-wide mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <a href="#" className="flex items-center gap-3 group">
                        <img
                            src={appIcon}
                            alt={`${appProfile.basic_info.name} Icon`}
                            className="w-10 h-10 rounded-xl shadow-md group-hover:scale-105 transition-transform"
                        />
                        <span className="text-xl font-bold text-gray-900">
                            {appProfile.basic_info.name}
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                        <LanguageSelector />
                        <a
                            href={appProfile.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <Github className="w-5 h-5" />
                            <span className="font-medium">GitHub</span>
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-gray-600 hover:text-gray-900"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-gray-100"
                    >
                        <div className="px-6 py-4 space-y-3">
                            <div className="pb-2">
                                <LanguageSelector />
                            </div>
                            {navItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block text-gray-600 hover:text-primary-600 font-medium py-2"
                                >
                                    {item.label}
                                </a>
                            ))}
                            <a
                                href={appProfile.social.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 py-2"
                            >
                                <Github className="w-5 h-5" />
                                <span className="font-medium">GitHub</span>
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
