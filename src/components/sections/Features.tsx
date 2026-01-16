import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

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
    const { t } = useTranslation()

    const features = [
        { key: 'multiple_time_zones', emoji: '🌍' },
        { key: 'country_flags', emoji: '🚩' },
        { key: 'time_difference', emoji: '⏱️' },
        { key: 'multi_language', emoji: '🌐' },
        { key: 'highly_customizable', emoji: '⚙️' },
        { key: 'auto_updates', emoji: '🔄' },
        { key: 'lightweight', emoji: '💡' },
        { key: 'privacy_first', emoji: '🔒' },
    ]

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
                        {t('features.title')}
                        <br />
                        <span className="gradient-text">{t('features.subtitle')}</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {t('features.description')}
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
                    {features.map((feature) => (
                        <motion.div
                            key={feature.key}
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
                                {t(`features.list.${feature.key}.title`)}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {t(`features.list.${feature.key}.description`)}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
