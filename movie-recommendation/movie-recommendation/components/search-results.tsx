'use client'

import { useState, useEffect } from 'react'
import { MovieCard } from '@/components/movie-card'
import { TVShowCard } from '@/components/tv-show-card'
import { AnimeCard } from '@/components/anime-card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Movie, TVShow, Anime } from '@/types'

interface SearchResultsProps {
  query: string
}

export function SearchResults({ query }: SearchResultsProps) {
  const [results, setResults] = useState<{
    movies: Movie[]
    tvShows: TVShow[]
    anime: Anime[]
  }>({ movies: [], tvShows: [], anime: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSearchResults() {
      setLoading(true)
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        if (!response.ok) throw new Error('Failed to fetch search results')
        const data = await response.json()
        setResults(data)
      } catch (error) {
        console.error('Error fetching search results:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSearchResults()
  }, [query])

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-[400px] w-full" />
        ))}
      </div>
    )
  }

  const totalResults = results.movies.length + results.tvShows.length + results.anime.length

  if (totalResults === 0) {
    return <p>No results found for "{query}"</p>
  }

  return (
    <div className="space-y-8">
      <p>Showing {totalResults} results for "{query}"</p>
      <Tabs defaultValue="movies">
        <TabsList>
          <TabsTrigger value="movies">Movies ({results.movies.length})</TabsTrigger>
          <TabsTrigger value="tvShows">TV Shows ({results.tvShows.length})</TabsTrigger>
          <TabsTrigger value="anime">Anime ({results.anime.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="movies">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {results.movies.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="tvShows">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {results.tvShows.map((tvShow) => (
              <TVShowCard key={tvShow.id} {...tvShow} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="anime">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {results.anime.map((anime) => (
              <AnimeCard key={anime.id} {...anime} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

