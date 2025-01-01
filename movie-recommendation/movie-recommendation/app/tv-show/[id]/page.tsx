'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { TVShowDetails } from '@/components/tv-show-details'
import { Skeleton } from '@/components/ui/skeleton'
import { TVShow } from '@/types'

export default function TVShowPage() {
  const { id } = useParams()
  const [tvShow, setTVShow] = useState<TVShow | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTVShow() {
      try {
        const response = await fetch(`/api/tv-show/${id}`)
        if (!response.ok) throw new Error('Failed to fetch TV show')
        const data = await response.json()
        setTVShow(data)
      } catch (error) {
        console.error('Error fetching TV show:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTVShow()
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

  if (!tvShow) {
    return <div>TV show not found</div>
  }

  return <TVShowDetails tvShow={tvShow} />
}

