'use client'

import { useState } from 'react'
import { Search, Menu, User, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

export default function MovieSearch() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
      <header className="flex items-center justify-between p-4">
        <div className="w-8" /> {/* Spacer */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-6 w-6" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl px-4 py-12">
        <h1 className="mb-12 text-center text-6xl font-bold tracking-tight">
          Movie
        </h1>

        <div className="relative mb-8">
          <Input
            type="search"
            placeholder="Search movies..."
            className="h-12 rounded-full pl-12 pr-32 text-lg shadow-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                ADVANCE SEARCH
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>By Genre</DropdownMenuItem>
              <DropdownMenuItem>By Year</DropdownMenuItem>
              <DropdownMenuItem>By Rating</DropdownMenuItem>
              <DropdownMenuItem>By Director</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-12 rounded-full text-lg font-medium"
              onClick={() => console.log('Search clicked')}
            >
              SEARCH
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-full text-lg font-medium"
              onClick={() => console.log('Random clicked')}
            >
              RANDOM
            </Button>
          </div>
          <Button
            variant="outline"
            className="h-12 rounded-full text-lg font-medium"
            onClick={() => console.log('Recommendation clicked')}
          >
            RECOMMENDATION
          </Button>
        </div>
      </main>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-8 right-8 h-12 w-12 rounded-full shadow-lg"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <Button variant="ghost" className="justify-start">
              Home
            </Button>
            <Button variant="ghost" className="justify-start">
              Watchlist
            </Button>
            <Button variant="ghost" className="justify-start">
              Favorites
            </Button>
            <Button variant="ghost" className="justify-start">
              Settings
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

