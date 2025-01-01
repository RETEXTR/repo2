'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { AnimeDetails } from '@/components/anime-details'
import { Skeleton } from '@/components/ui/skeleton'
import { Anime } from '@/types'

export default function AnimePage() {
  const { id } = useParams()
  const [anime, setAnime] = useState<Anime | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAnime() {
      try {
        const response = await fetch(`/api/anime/${id}`)
        if (!response.ok) throw new Error('Failed to fetch anime')
        const data = await response.json()
        setAnime(data)
      } catch (error) {
        console.error('Error fetching anime:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnime()
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

  if (!anime) {
    return <div>Anime not found</div>
  }

  return <AnimeDetails anime={anime} />
}

