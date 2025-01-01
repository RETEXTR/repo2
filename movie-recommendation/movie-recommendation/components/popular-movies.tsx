'use client'

import { useEffect, useState } from 'react'
import { MovieCard } from '@/components/movie-card'
import { Skeleton } from '@/components/ui/skeleton'

export function PopularMovies() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/movies/popular')
      .then((res) => res.json())
      .then((data) => {
        setMovies(data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-[400px] w-full" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </div>
  )
}

