'use client'

import { useState, useEffect } from 'react'
import { AnimeCard } from '@/components/anime-card'
import { Skeleton } from '@/components/ui/skeleton'
import { Anime } from '@/types'

export function AnimeList() {
  const [animeList, setAnimeList] = useState<Anime[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAnime() {
      try {
        const response = await fetch('/api/anime')
        if (!response.ok) throw new Error('Failed to fetch anime')
        const data = await response.json()
        setAnimeList(data)
      } catch (error) {
        console.error('Error fetching anime:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnime()
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
      {animeList.map((anime) => (
        <AnimeCard key={anime.id} {...anime} />
      ))}
    </div>
  )
}

