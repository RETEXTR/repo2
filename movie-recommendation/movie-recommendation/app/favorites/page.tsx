'use client'

import { useAuth } from '@/components/auth-provider'
import { FavoritesList } from '@/components/favorites-list'

export default function FavoritesPage() {
  const { user } = useAuth()

  if (!user) {
    return <div>Please log in to view your favorites.</div>
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Your Favorites</h1>
      <FavoritesList userId={user.id} />
    </div>
  )
}

