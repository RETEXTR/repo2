import { MovieList } from '@/components/movie-list'

export default function MoviesPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Movies</h1>
      <MovieList />
    </div>
  )
}

