'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Play, X } from 'lucide-react'

interface Trailer {
  id: string
  title: string
  thumbnail: string
  videoUrl: string
}

interface TrailerListProps {
  userId: string
}

export function TrailerList({ userId }: TrailerListProps) {
  const [trailers, setTrailers] = useState<Trailer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTrailers() {
      try {
        const response = await fetch(`/api/trailers?userId=${userId}`)
        if (!response.ok) throw new Error('Failed to fetch trailers')
        const data = await response.json()
        setTrailers(data)
      } catch (error) {
        console.error('Error fetching trailers:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTrailers()
  }, [userId])

  const removeTrailer = async (id: string) => {
    try {
      const response = await fetch(`/api/trailers/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Failed to remove trailer')
      setTrailers(trailers.filter((trailer) => trailer.id !== id))
    } catch (error) {
      console.error('Error removing trailer:', error)
    }
  }

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[200px] w-full" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {trailers.map((trailer) => (
        <div key={trailer.id} className="relative overflow-hidden rounded-lg">
          <img
            src={trailer.thumbnail}
            alt={trailer.title}
            className="h-[200px] w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity hover:opacity-100">
            <Button variant="secondary" size="icon" asChild>
              <a href={trailer.videoUrl} target="_blank" rel="noopener noreferrer">
                <Play className="h-6 w-6" />
                <span className="sr-only">Play {trailer.title}</span>
              </a>
            </Button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-2 text-white">
            <p className="text-sm font-semibold">{trailer.title}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
            onClick={() => removeTrailer(trailer.id)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove {trailer.title}</span>
          </Button>
        </div>
      ))}
    </div>
  )
}

