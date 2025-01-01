'use client'

import { useState, useEffect } from 'react'
import { MovieCard } from '@/components/movie-card'
import { Skeleton } from '@/components/ui/skeleton'
import { Movie } from '@/types'

export function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch('/api/movies')
        if (!response.ok) throw new Error('Failed to fetch movies')
        const data = await response.json()
        setMovies(data)
      } catch (error) {
        console.error('Error fetching movies:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
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

