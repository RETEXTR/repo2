'use client'

import { useAuth } from '@/components/auth-provider'
import { WatchList } from '@/components/watch-list'

export default function WatchlistPage() {
  const { user } = useAuth()

  if (!user) {
    return <div>Please log in to view your watchlist.</div>
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Your Watchlist</h1>
      <WatchList userId={user.id} />
    </div>
  )
}

