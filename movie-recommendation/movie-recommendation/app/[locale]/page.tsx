import { useTranslations } from 'next-intl'
import MovieSearch from './MovieSearch';

function HomePage() {
  const t = useTranslations('home')

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
            {t('hero.title')}
          </h1>
          <p className="mb-8 text-lg text-white/80">
            {t('hero.subtitle')}
          </p>
          <MovieSearch />
        </div>

        <div className="mt-16">
          <h2 className="mb-8 text-3xl font-bold">{t('popular')}</h2>
          {/* Popular movies section */}
        </div>

        <div className="mt-16">
          <h2 className="mb-8 text-3xl font-bold">{t('recommended')}</h2>
          {/* Recommended movies section */}
        </div>
      </div>
    </div>
  )
}

export default HomePage

