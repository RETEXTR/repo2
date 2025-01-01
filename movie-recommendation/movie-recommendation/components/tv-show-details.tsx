import Image from 'next/image'
import { ShareButton } from '@/components/share-button'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Star, Plus, Check } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/components/auth-provider'
import { TVShow } from '@/types'

interface TVShowDetailsProps {
  tvShow: TVShow
}

export function TVShowDetails({ tvShow }: TVShowDetailsProps) {
  const [inWatchlist, setInWatchlist] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  const handleWatchlistToggle = async () => {
    if (!user) {
      toast({
        title: 'Login Required',
        description: 'Please log in to add TV shows to your watchlist.',
        variant: 'destructive',
      })
      return
    }

    try {
      const response = await fetch('/api/watchlist', {
        method: inWatchlist ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, tvShowId: tvShow.id }),
      })

      if (!response.ok) throw new Error('Failed to update watchlist')

      setInWatchlist(!inWatchlist)
      toast({
        title: inWatchlist ? 'Removed from Watchlist' : 'Added to Watchlist',
        description: inWatchlist
          ? `${tvShow.title} has been removed from your watchlist.`
          : `${tvShow.title} has been added to your watchlist.`,
      })
    } catch (error) {
      console.error('Error updating watchlist:', error)
      toast({
        title: 'Error',
        description: 'Failed to update watchlist. Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="space-y-8">
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <Image
          src={tvShow.poster}
          alt={tvShow.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">{tvShow.title}</h1>
          <div className="flex items-center gap-2">
            <ShareButton title={tvShow.title} url={`${process.env.NEXT_PUBLIC_BASE_URL}/tv-show/${tvShow.id}`} />
            <Button onClick={handleWatchlistToggle}>
              {inWatchlist ? (
                <>
                  <Check className="mr-2 h-4 w-4" /> In Watchlist
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" /> Add to Watchlist
                </>
              )}
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{tvShow.year}</span>
          <span>{tvShow.genre.join(', ')}</span>
          <div className="flex items-center">
            <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{tvShow.rating.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-lg">{tvShow.description}</p>
        <div>
          <h2 className="text-xl font-semibold">Creator</h2>
          <p>{tvShow.creator}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Cast</h2>
          <p>{tvShow.cast.join(', ')}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Seasons</h2>
          <p>{tvShow.seasons}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Episodes</h2>
          <p>{tvShow.episodes}</p>
        </div>
      </div>
    </div>
  )
}

