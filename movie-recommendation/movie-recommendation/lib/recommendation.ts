import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function getRecommendations(userId: string, preferences: any) {
  const prompt = `Based on the user's preferences:
    - Favorite genres: ${preferences.genres.join(', ')}
    - Recently watched: ${preferences.recentlyWatched.join(', ')}
    - Ratings: ${JSON.stringify(preferences.ratings)}
    
    Recommend 5 movies or TV shows they might enjoy.`

  const { text } = await generateText({
    model: openai('gpt-4o'),
    prompt,
  })

  // Parse the recommendations from the AI response
  const recommendations = JSON.parse(text)

  return recommendations
}

