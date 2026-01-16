import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, ChevronDown, Shield, Github, ExternalLink } from 'lucide-react'

export function SecurityNotice() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="w-full max-w-xl mx-auto mt-6 mb-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 
                   bg-amber-50 hover:bg-amber-100 border border-amber-200 
                   rounded-xl transition-all duration-200 group"
            >
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-800">
                    Security warning on first launch? Click to learn more
                </span>
                <ChevronDown
                    className={`w-4 h-4 text-amber-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                        }`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="mt-3 p-5 bg-white rounded-xl border border-gray-200 shadow-lg">
                            {/* Symmetric layout with invisible spacer on right */}
                            <div className="flex items-start">
                                {/* Left icon */}
                                <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                                    <Shield className="w-5 h-5 text-amber-600" />
                                </div>

                                {/* Center content */}
                                <div className="flex-1 px-4 text-center">
                                    <h4 className="text-base font-semibold text-gray-900 mb-2">
                                        About the macOS Security Warning
                                    </h4>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                                        As a student developer without an Apple Developer account ($99/year),
                                        TimeBar is not code-signed. On first launch, macOS may display an
                                        "unverified developer" warning.
                                    </p>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                        <strong className="text-gray-800">Rest assured:</strong> TimeBar is
                                        completely open source. All code is available on GitHub for review.
                                        There is no malicious code—you can audit the source anytime.
                                    </p>

                                    <div className="bg-gray-50 rounded-lg p-3 mb-4 text-left">
                                        <p className="text-xs text-gray-600 font-medium mb-2 text-center">How to open the app:</p>
                                        <ol className="text-xs text-gray-600 space-y-1 text-center">
                                            <li>1. Open <strong>System Settings</strong> → <strong>Privacy & Security</strong></li>
                                            <li>2. Find TimeBar and click <strong>"Open Anyway"</strong></li>
                                            <li>3. Launch TimeBar again to use normally</li>
                                        </ol>
                                    </div>

                                    {/* Centered links */}
                                    <div className="flex items-center justify-center gap-6">
                                        <a
                                            href="https://github.com/bugsmachine/TimeBar"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                                        >
                                            <Github className="w-4 h-4" />
                                            View Source Code
                                        </a>
                                        <a
                                            href="https://support.apple.com/en-us/102445#openanyway"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            Apple Support
                                        </a>
                                    </div>
                                </div>

                                {/* Right invisible spacer (same size as left icon for symmetry) */}
                                <div className="flex-shrink-0 w-10 h-10 opacity-0">
                                    <Shield className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
