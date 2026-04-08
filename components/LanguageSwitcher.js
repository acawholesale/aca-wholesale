'use client'
import { useI18n } from '../lib/i18n/context'

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => setLocale('fr')}
        className={`text-xs font-bold px-2 py-1 rounded transition-all ${
          locale === 'fr'
            ? 'bg-white/10 text-white'
            : 'text-gray-500 hover:text-white'
        }`}
        aria-label="Français"
      >
        FR
      </button>
      <span className="text-gray-600">|</span>
      <button
        onClick={() => setLocale('en')}
        className={`text-xs font-bold px-2 py-1 rounded transition-all ${
          locale === 'en'
            ? 'bg-white/10 text-white'
            : 'text-gray-500 hover:text-white'
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  )
}
