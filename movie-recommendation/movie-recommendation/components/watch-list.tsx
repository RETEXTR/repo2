'use client'

import { useState, useEffect } from 'react'
import { MovieCard } from '@/components/movie-card'
import { TVShowCard } from '@/components/tv-show-card'
import { AnimeCard } from '@/components/anime-card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Movie, TVShow, Anime } from '@/types'

interface WatchListProps {
  userId: string
}

export function WatchList({ userId }: WatchListProps) {
  const [watchlist, setWatchlist] = useState<{
    movies: Movie[]
    tvShows: TVShow[]
    anime: Anime[]
  }>({ movies: [], tvShows: [], anime: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWatchlist() {
      try {
        const response = await fetch(`/api/watchlist?userId=${userId}`)
        if (!response.ok) throw new Error('Failed to fetch watchlist')
        const data = await response.json()
        setWatchlist(data)
      } catch (error) {
        console.error('Error fetching watchlist:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWatchlist()
  }, [userId])

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
    <Tabs defaultValue="movies">
      <TabsList>
        <TabsTrigger value="movies">Movies</TabsTrigger>
        <TabsTrigger value="tvShows">TV Shows</TabsTrigger>
        <TabsTrigger value="anime">Anime</TabsTrigger>
      </TabsList>
      <TabsContent value="movies">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {watchlist.movies.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="tvShows">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {watchlist.tvShows.map((tvShow) => (
            <TVShowCard key={tvShow.id} {...tvShow} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="anime">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {watchlist.anime.map((anime) => (
            <AnimeCard key={anime.id} {...anime} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}

