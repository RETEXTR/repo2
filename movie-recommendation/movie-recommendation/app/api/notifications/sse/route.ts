import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder()
      const sendNotification = (data: string) => {
        controller.enqueue(encoder.encode(`data: ${data}\n\n`))
      }

      // Simulate sending notifications every 10 seconds
      const interval = setInterval(() => {
        sendNotification(JSON.stringify({
          id: Date.now().toString(),
          message: 'New content available!',
          date: new Date().toISOString(),
        }))
      }, 10000)

      // Clean up the interval when the connection is closed
      request.signal.addEventListener('abort', () => {
        clearInterval(interval)
      })
    },
  })

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}

