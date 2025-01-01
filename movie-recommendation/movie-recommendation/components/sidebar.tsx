'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Home, Film, Tv2, Zap, Heart, ListVideo, Clapperboard, TrendingUp, Settings, TypeIcon as type, LucideIcon } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface NavItem {
  href: string
  icon: LucideIcon
  label: string
}

const topNavItems: NavItem[] = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/movies', icon: Film, label: 'Movies' },
  { href: '/tv-shows', icon: Tv2, label: 'TV Shows' },
  { href: '/anime', icon: Zap, label: 'Anime' },
  { href: '/trending', icon: TrendingUp, label: 'Trending' },
]

const bottomNavItems: NavItem[] = [
  { href: '/favorites', icon: Heart, label: 'Favorites' },
  { href: '/watchlist', icon: ListVideo, label: 'Watchlist' },
  { href: '/trailers', icon: Clapperboard, label: 'Trailers' },
  { href: '/settings', icon: Settings, label: 'Settings' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex h-screen w-16 flex-col border-r bg-background">
        <Link
          href="/"
          className="flex h-14 items-center justify-center border-b font-bold"
        >
          M
        </Link>
        <nav className="flex flex-1 flex-col gap-2 p-2">
          {topNavItems.map(({ href, icon: Icon, label }) => (
            <Tooltip key={href}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'h-12 w-12',
                    pathname === href && 'bg-muted'
                  )}
                  asChild
                >
                  <Link href={href}>
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{label}</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">{label}</TooltipContent>
            </Tooltip>
          ))}
          <div className="mt-auto space-y-2">
            {bottomNavItems.map(({ href, icon: Icon, label }) => (
              <Tooltip key={href}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      'h-12 w-12',
                      pathname === href && 'bg-muted'
                    )}
                    asChild
                  >
                    <Link href={href}>
                      <Icon className="h-5 w-5" />
                      <span className="sr-only">{label}</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">{label}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </nav>
      </div>
    </TooltipProvider>
  )
}

