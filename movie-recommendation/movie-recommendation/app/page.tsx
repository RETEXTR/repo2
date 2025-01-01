import { MovieSearch } from '@/components/movie-search'
import { PopularMovies } from '@/components/popular-movies'
import { RecommendedMovies } from '@/components/recommended-movies'

export default function Home() {
  return (
    <div className="space-y-8 py-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">Movie</h1>
        <MovieSearch />
      </div>
      <div className="space-y-8">
        <section>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight">Popular Now</h2>
          <PopularMovies />
        </section>
        <section>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight">Recommended for You</h2>
          <RecommendedMovies />
        </section>
      </div>
    </div>
  )
}

