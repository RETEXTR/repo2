'use client'

import { useSearchParams } from 'next/navigation'
import { SearchResults } from '@/components/search-results'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Search Results</h1>
      {query ? (
        <SearchResults query={query} />
      ) : (
        <p>No search query provided.</p>
      )}
    </div>
  )
}

