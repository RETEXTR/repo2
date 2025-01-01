'use client'

import { useState, useEffect } from 'react'
import { MovieCard } from '@/components/movie-card'
import { TVShowCard } from '@/components/tv-show-card'
import { AnimeCard } from '@/components/anime-card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Movie, TVShow, Anime } from '@/types'

export function TrendingList() {
  const [trendingItems, setTrendingItems] = useState<{
    movies: Movie[]
    tvShows: TVShow[]
    anime: Anime[]
  }>({ movies: [], tvShows: [], anime: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTrending() {
      try {
        const [moviesRes, tvShowsRes, animeRes] = await Promise.all([
          fetch('/api/trending/movies'),
          fetch('/api/trending/tv-shows'),
          fetch('/api/trending/anime'),
        ])

        if (!moviesRes.ok || !tvShowsRes.ok || !animeRes.ok) {
          throw new Error('Failed to fetch trending items')
        }

        const [movies, tvShows, anime] = await Promise.all([
          moviesRes.json(),
          tvShowsRes.json(),
          animeRes.json(),
        ])

        setTrendingItems({ movies, tvShows, anime })
      } catch (error) {
        console.error('Error fetching trending items:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTrending()
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
    <Tabs defaultValue="movies">
      <TabsList>
        <TabsTrigger value="movies">Movies</TabsTrigger>
        <TabsTrigger value="tvShows">TV Shows</TabsTrigger>
        <TabsTrigger value="anime">Anime</TabsTrigger>
      </TabsList>
      <TabsContent value="movies">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trendingItems.movies.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="tvShows">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trendingItems.tvShows.map((tvShow) => (
            <TVShowCard key={tvShow.id} {...tvShow} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="anime">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trendingItems.anime.map((anime) => (
            <AnimeCard key={anime.id} {...anime} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}

