import { motion } from 'framer-motion'
import { Download as DownloadIcon, Github, CheckCircle } from 'lucide-react'
import { appProfile } from '../../data/appProfile'

export function DownloadSection() {
    return (
        <section id="download" className="section-padding bg-gradient-to-b from-gray-50 to-primary-50/30">
            <div className="container-narrow mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 
                          rounded-full text-sm font-medium mb-8">
                        <span className="text-lg">🎉</span>
                        Free & Open Source
                    </div>

                    {/* Headline */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Ready to simplify your
                        <br />
                        <span className="gradient-text">global time tracking?</span>
                    </h2>

                    {/* Description */}
                    <p className="text-lg text-gray-600 max-w-xl mx-auto mb-10">
                        Download TimeBar now and never miss a meeting with your international colleagues again.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                        <a
                            href={appProfile.download.github_releases}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary gap-2 text-lg"
                        >
                            <DownloadIcon className="w-5 h-5" />
                            Download for macOS
                        </a>
                        <a
                            href={appProfile.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary gap-2"
                        >
                            <Github className="w-5 h-5" />
                            View Source Code
                        </a>
                    </div>

                    {/* Value Propositions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                        {appProfile.marketing_copy.value_propositions.map((prop, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -16 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="flex items-center gap-3 text-left"
                            >
                                <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                                <span className="text-gray-700">{prop}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* System Requirements Note */}
                    <div className="mt-12 p-6 bg-white rounded-2xl border border-gray-100 max-w-md mx-auto">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">System Requirements</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center justify-center gap-2">
                                <span>🍎</span>
                                <span>{appProfile.requirements.platforms[0].name} {appProfile.requirements.platforms[0].version}</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <span>💻</span>
                                <span>{appProfile.requirements.platforms[0].chips.join(' or ')}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
