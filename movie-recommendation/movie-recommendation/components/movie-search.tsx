'use client'

import { useState } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'

interface SearchFilters {
  genre?: string
  year?: number
  rating?: number
  director?: string
}

export function MovieSearch() {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<SearchFilters>({})
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      const searchParams = new URLSearchParams({
        q: query,
        ...filters,
      })
      router.push(`/search?${searchParams.toString()}`)
    }
  }

  const handleRandom = () => {
    router.push('/random')
  }

  const handleRecommendation = () => {
    router.push('/recommendation')
  }

  const handleFilter = (type: keyof SearchFilters, value: string | number) => {
    setFilters((prev) => ({ ...prev, [type]: value }))
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <form onSubmit={handleSearch} className="relative">
        <Input
          type="search"
          placeholder="Search movies, TV shows, or anime..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-12 rounded-full pl-12 pr-32"
        />
        <Search 
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              ADVANCE SEARCH
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onSelect={() => handleFilter('genre', 'action')}>
              By Genre
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleFilter('year', new Date().getFullYear())}>
              By Year
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleFilter('rating', 8)}>
              By Rating
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleFilter('director', '')}>
              By Director
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </form>
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Button
          type="submit"
          variant="outline"
          className="h-12 rounded-full px-8"
          onClick={handleSearch}
        >
          SEARCH
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-12 rounded-full px-8"
          onClick={handleRandom}
        >
          RANDOM
        </Button>
      </div>
      <Button
        type="button"
        variant="outline"
        className="h-12 w-full rounded-full px-8 sm:w-auto"
        onClick={handleRecommendation}
      >
        RECOMMENDATION
      </Button>
    </div>
  )
}

