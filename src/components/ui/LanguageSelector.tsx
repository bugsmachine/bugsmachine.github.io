import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export function LanguageSelector() {
    const { i18n } = useTranslation()

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'zh-CN', name: '简体中文' },
        { code: 'zh-TW', name: '繁體中文' },
    ]

    const currentLanguage = languages.find(l => l.code === i18n.language) || languages[0]

    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none active:bg-gray-100">
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium">{currentLanguage.name}</span>
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute left-1/2 -translate-x-1/2 mt-2 w-32 origin-top divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="px-1 py-1">
                        {languages.map((lang) => (
                            <Menu.Item key={lang.code}>
                                {({ active }) => (
                                    <button
                                        onClick={() => i18n.changeLanguage(lang.code)}
                                        className={`${active ? 'bg-primary-50 text-primary-600' : 'text-gray-900'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm ${i18n.language === lang.code ? 'font-bold' : ''
                                            }`}
                                    >
                                        {lang.name}
                                    </button>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
