import Image from 'next/image'
import { ShareButton } from '@/components/share-button'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Star, Plus, Check } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/components/auth-provider'
import { Movie } from '@/types'

interface MovieDetailsProps {
  movie: Movie
}

export function MovieDetails({ movie }: MovieDetailsProps) {
  const [inWatchlist, setInWatchlist] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  const handleWatchlistToggle = async () => {
    if (!user) {
      toast({
        title: 'Login Required',
        description: 'Please log in to add movies to your watchlist.',
        variant: 'destructive',
      })
      return
    }

    try {
      const response = await fetch('/api/watchlist', {
        method: inWatchlist ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, movieId: movie.id }),
      })

      if (!response.ok) throw new Error('Failed to update watchlist')

      setInWatchlist(!inWatchlist)
      toast({
        title: inWatchlist ? 'Removed from Watchlist' : 'Added to Watchlist',
        description: inWatchlist
          ? `${movie.title} has been removed from your watchlist.`
          : `${movie.title} has been added to your watchlist.`,
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
          src={movie.poster}
          alt={movie.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <div className="flex items-center gap-2">
            <ShareButton title={movie.title} url={`${process.env.NEXT_PUBLIC_BASE_URL}/movie/${movie.id}`} />
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
          <span>{movie.year}</span>
          <span>{movie.genre.join(', ')}</span>
          <div className="flex items-center">
            <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{movie.rating.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-lg">{movie.description}</p>
        <div>
          <h2 className="text-xl font-semibold">Director</h2>
          <p>{movie.director}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Cast</h2>
          <p>{movie.cast.join(', ')}</p>
        </div>
      </div>
    </div>
  )
}

