'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/auth-provider'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Play, X } from 'lucide-react'

interface Trailer {
  id: string
  title: string
  thumbnail: string
  duration: string
}

export function TrailerWatchlist() {
  const [trailers, setTrailers] = useState<Trailer[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetch(`/api/trailer-watchlist?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setTrailers(data)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [user])

  const removeTrailer = async (id: string) => {
    await fetch(`/api/trailer-watchlist/${id}`, { method: 'DELETE' })
    setTrailers(trailers.filter((trailer) => trailer.id !== id))
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

  if (trailers.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        Your trailer watchlist is empty. Add some trailers to watch later!
      </p>
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
            <Button variant="secondary" size="icon">
              <Play className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-2 text-white">
            <p className="text-sm font-semibold">{trailer.title}</p>
            <p className="text-xs">{trailer.duration}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
            onClick={() => removeTrailer(trailer.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}

