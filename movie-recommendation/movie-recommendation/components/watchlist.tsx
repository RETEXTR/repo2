'use client'

import { useEffect, useState } from 'react'
import { MovieCard } from '@/components/movie-card'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/components/auth-provider'

export function Watchlist() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetch(`/api/watchlist?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [user])

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-[400px] w-full" />
        ))}
      </div>
    )
  }

  if (movies.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        Your watchlist is empty. Start adding movies!
      </p>
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

