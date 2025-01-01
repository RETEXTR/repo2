'use client'

import { useState, useEffect } from 'react'
import { TVShowCard } from '@/components/tv-show-card'
import { Skeleton } from '@/components/ui/skeleton'
import { TVShow } from '@/types'

export function TVShowList() {
  const [tvShows, setTVShows] = useState<TVShow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTVShows() {
      try {
        const response = await fetch('/api/tv-shows')
        if (!response.ok) throw new Error('Failed to fetch TV shows')
        const data = await response.json()
        setTVShows(data)
      } catch (error) {
        console.error('Error fetching TV shows:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTVShows()
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
      {tvShows.map((tvShow) => (
        <TVShowCard key={tvShow.id} {...tvShow} />
      ))}
    </div>
  )
}

