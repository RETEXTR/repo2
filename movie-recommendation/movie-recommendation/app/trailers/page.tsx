'use client'

import { useAuth } from '@/components/auth-provider'
import { TrailerList } from '@/components/trailer-list'

export default function TrailersPage() {
  const { user } = useAuth()

  if (!user) {
    return <div>Please log in to view your trailer watchlist.</div>
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Your Trailer Watchlist</h1>
      <TrailerList userId={user.id} />
    </div>
  )
}

