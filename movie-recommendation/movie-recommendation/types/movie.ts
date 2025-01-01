export interface Movie {
  id: number
  title: string
  year: number
  genre: string[]
  director: string
  rating: number
  poster: string
}

export interface SearchFilters {
  genre?: string
  year?: number
  rating?: number
  director?: string
}

