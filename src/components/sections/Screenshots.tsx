import { motion } from 'framer-motion'
import menubarScreenshot from '../../assets/screenshots/menubar.png'
import settingsScreenshot from '../../assets/screenshots/settings.png'
import aboutScreenshot from '../../assets/screenshots/about.png'

const screenshots = [
    {
        src: menubarScreenshot,
        alt: 'TimeBar Menu Bar',
        title: 'Menu Bar Integration',
        description: 'See time zones at a glance with country flags and day/night indicators',
    },
    {
        src: settingsScreenshot,
        alt: 'TimeBar Settings',
        title: 'Customizable Settings',
        description: 'Drag and drop to reorder components, choose any timezone worldwide',
    },
    {
        src: aboutScreenshot,
        alt: 'TimeBar About',
        title: 'Open Source',
        description: 'Fully transparent and open source under CC BY-NC-SA 4.0 license',
    },
]

export function Screenshots() {
    return (
        <section id="screenshots" className="section-padding bg-gradient-to-b from-white to-gray-50">
            <div className="container-wide mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 lg:mb-20"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        See it in action
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        A native macOS app designed with elegance and simplicity in mind
                    </p>
                </motion.div>

                {/* Screenshot Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {screenshots.map((screenshot, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group"
                        >
                            {/* Image Container */}
                            <div className="relative mb-6 rounded-2xl overflow-hidden bg-white shadow-lg
                            group-hover:shadow-2xl transition-all duration-500
                            group-hover:-translate-y-2">
                                <img
                                    src={screenshot.src}
                                    alt={screenshot.alt}
                                    className="w-full h-auto"
                                />
                                {/* Subtle gradient overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            {/* Text Content */}
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {screenshot.title}
                            </h3>
                            <p className="text-gray-600">
                                {screenshot.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
