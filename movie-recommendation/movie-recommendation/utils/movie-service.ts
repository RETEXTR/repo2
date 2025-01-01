import type { Movie, SearchFilters } from '../types/movie'

// Simulated movie data
const movies: Movie[] = [
  {
    id: 1,
    title: "The Matrix",
    year: 1999,
    genre: ["Action", "Sci-Fi"],
    director: "Lana Wachowski",
    rating: 8.7,
    poster: "/placeholder.svg"
  },
  // Add more movies as needed
]

export async function searchMovies(query: string, filters?: SearchFilters): Promise<Movie[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return movies.filter(movie => 
    movie.title.toLowerCase().includes(query.toLowerCase()) &&
    (!filters?.genre || movie.genre.includes(filters.genre)) &&
    (!filters?.year || movie.year === filters.year) &&
    (!filters?.rating || movie.rating >= filters.rating) &&
    (!filters?.director || movie.director === filters.director)
  )
}

export async function getRandomMovie(): Promise<Movie> {
  await new Promise(resolve => setTimeout(resolve, 500))
  const randomIndex = Math.floor(Math.random() * movies.length)
  return movies[randomIndex]
}

export async function getRecommendations(): Promise<Movie[]> {
  await new Promise(resolve => setTimeout(resolve, 500))
  // In a real app, this would use an algorithm to recommend movies
  return movies.slice(0, 5)
}

