'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { MovieDetails } from '@/components/movie-details'
import { Skeleton } from '@/components/ui/skeleton'
import { Movie } from '@/types'

export default function MoviePage() {
  const { id } = useParams()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await fetch(`/api/movie/${id}`)
        if (!response.ok) throw new Error('Failed to fetch movie')
        const data = await response.json()
        setMovie(data)
      } catch (error) {
        console.error('Error fetching movie:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovie()
  }, [id])

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[400px] w-full" />
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-32 w-full" />
      </div>
    )
  }

  if (!movie) {
    return <div>Movie not found</div>
  }

  return <MovieDetails movie={movie} />
}

