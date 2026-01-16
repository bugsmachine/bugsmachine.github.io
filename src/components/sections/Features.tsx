import { motion } from 'framer-motion'
import { appProfile } from '../../data/appProfile'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
    },
}

export function Features() {
    // Take first 8 features for display
    const displayFeatures = appProfile.features.slice(0, 8)

    return (
        <section id="features" className="section-padding bg-white">
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
                        Everything you need,
                        <br />
                        <span className="gradient-text">right in your menu bar</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        TimeBar combines powerful features with elegant simplicity to keep you connected across time zones.
                    </p>
                </motion.div>

                {/* Feature Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
                >
                    {displayFeatures.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="group relative p-6 lg:p-8 bg-gradient-to-b from-gray-50 to-white 
                         rounded-2xl border border-gray-100 
                         hover:border-primary-200 hover:shadow-xl hover:shadow-primary-100/50
                         transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Emoji Icon */}
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                {feature.emoji}
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
