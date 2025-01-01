'use client'

import { useState, useEffect } from 'react'
import { MovieCard } from '@/components/movie-card'
import { TVShowCard } from '@/components/tv-show-card'
import { AnimeCard } from '@/components/anime-card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Movie, TVShow, Anime } from '@/types'

type RandomContent = (Movie | TVShow | Anime) & { type: 'movie' | 'tvShow' | 'anime' }

export default function RandomPage() {
  const [content, setContent] = useState<RandomContent | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchRandomContent = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/random')
      if (!response.ok) throw new Error('Failed to fetch random content')
      const data = await response.json()
      setContent(data)
    } catch (error) {
      console.error('Error fetching random content:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRandomContent()
  }, [])

  const renderContent = () => {
    if (!content) return null

    switch (content.type) {
      case 'movie':
        return <MovieCard {...(content as Movie)} />
      case 'tvShow':
        return <TVShowCard {...(content as TVShow)} />
      case 'anime':
        return <AnimeCard {...(content as Anime)} />
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Random Recommendation</h1>
      <div className="flex justify-center">
        {loading ? (
          <Skeleton className="h-[400px] w-[300px]" />
        ) : (
          renderContent()
        )}
      </div>
      <div className="flex justify-center">
        <Button onClick={fetchRandomContent} disabled={loading}>
          Get Another Recommendation
        </Button>
      </div>
    </div>
  )
}

