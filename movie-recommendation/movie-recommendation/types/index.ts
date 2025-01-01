export interface User {
  id: string
  name: string
  email: string
  image?: string
}

export interface Movie {
  id: string
  title: string
  description: string
  rating: number
  poster: string
  year: number
  genre: string[]
  director: string
  cast: string[]
}

export interface TVShow extends Omit<Movie, 'director'> {
  creator: string
  seasons: number
  episodes: number
}

export interface Anime extends Movie {
  episodes: number
  studio: string
}

export interface Notification {
  id: string
  userId: string
  message: string
  date: string
  read: boolean
  type: 'movie' | 'tvshow' | 'anime' | 'system'
  link?: string
}

