'use client'

import { useAuth } from '@/components/auth-provider'
import { RecommendedMovies } from '@/components/recommended-movies'
import { Watchlist } from '@/components/watchlist'
import { TrailerWatchlist } from '@/components/trailer-watchlist'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) {
    return <div>Please log in to view your dashboard.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Welcome, {user.name}!</h1>
      <Tabs defaultValue="recommendations" className="w-full">
        <TabsList>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
          <TabsTrigger value="trailers">Trailer Watchlist</TabsTrigger>
        </TabsList>
        <TabsContent value="recommendations">
          <RecommendedMovies />
        </TabsContent>
        <TabsContent value="watchlist">
          <Watchlist />
        </TabsContent>
        <TabsContent value="trailers">
          <TrailerWatchlist />
        </TabsContent>
      </Tabs>
    </div>
  )
}

