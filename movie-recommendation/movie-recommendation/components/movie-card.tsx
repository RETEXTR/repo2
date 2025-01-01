import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ShareButton } from '@/components/share-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { type Movie } from '@/types'

interface MovieCardProps extends Movie {
  aspectRatio?: 'portrait' | 'video'
  width?: number
  height?: number
}

export function MovieCard({
  id,
  title,
  description,
  rating,
  poster,
  year,
  aspectRatio = 'portrait',
  width,
  height,
}: MovieCardProps) {
  return (
    <Card className="group relative overflow-hidden">
      <div className={cn(
        'relative',
        aspectRatio === 'portrait' ? 'aspect-[2/3]' : 'aspect-video'
      )}>
        <Image
          src={poster}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes={width && height 
            ? `(max-width: ${width}px) 100vw, ${height}px`
            : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          }
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <CardHeader className="bg-gradient-to-t from-background pb-2">
          <CardTitle className="line-clamp-1">{title}</CardTitle>
          <CardDescription>{year}</CardDescription>
        </CardHeader>
        <CardContent className="bg-background">
          <p className="line-clamp-2 text-sm">{description}</p>
          <div className="mt-2 flex items-center gap-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between gap-2 bg-background pb-4">
          <Button asChild className="flex-1">
            <Link href={`/movie/${id}`}>
              View Details
              <span className="sr-only">{title}</span>
            </Link>
          </Button>
          <ShareButton 
            title={title} 
            url={`${process.env.NEXT_PUBLIC_BASE_URL}/movie/${id}`} 
          />
        </CardFooter>
      </div>
    </Card>
  )
}

