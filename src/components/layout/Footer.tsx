import { Github, Heart } from 'lucide-react'
import { appProfile } from '../../data/appProfile'

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gray-50 border-t border-gray-100">
            <div className="container-wide mx-auto px-6 lg:px-8 py-12 lg:py-16">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo and Description */}
                    <div className="flex flex-col items-center md:items-start gap-3">
                        <div className="flex items-center gap-3">
                            <img
                                src="/app-icon.png"
                                alt={`${appProfile.basic_info.name} Icon`}
                                className="w-10 h-10 rounded-xl shadow-md"
                            />
                            <span className="text-xl font-bold text-gray-900">
                                {appProfile.basic_info.name}
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm text-center md:text-left max-w-sm">
                            {appProfile.basic_info.tagline}
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-6">
                        <a
                            href={appProfile.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <Github className="w-5 h-5" />
                            <span className="font-medium">GitHub</span>
                        </a>
                        <a
                            href={appProfile.download.github_releases}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
                        >
                            Releases
                        </a>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm flex items-center gap-1">
                        Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by{' '}
                        <a
                            href={appProfile.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:underline font-medium"
                        >
                            {appProfile.basic_info.author}
                        </a>
                    </p>
                    <p className="text-gray-400 text-sm">
                        © {currentYear} {appProfile.basic_info.name}. Licensed under{' '}
                        <span className="text-gray-500">{appProfile.basic_info.license}</span>
                    </p>
                </div>
            </div>
        </footer>
    )
}
