'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/auth-provider'

export function NotificationIndicator() {
  const [hasUnread, setHasUnread] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    const checkUnread = async () => {
      try {
        const res = await fetch(`/api/notifications/unread?userId=${user.id}`)
        if (!res.ok) throw new Error('Failed to fetch notifications')
        const data = await res.json()
        setHasUnread(data.hasUnread)
      } catch (error) {
        console.error('Error checking notifications:', error)
      }
    }

    checkUnread()

    const eventSource = new EventSource(`/api/notifications/sse?userId=${user.id}`)
    
    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        if (!data.read) setHasUnread(true)
      } catch (error) {
        console.error('Error parsing notification:', error)
      }
    }

    eventSource.onerror = (error) => {
      console.error('SSE error:', error)
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [user])

  if (!hasUnread) return null

  return (
    <span 
      className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" 
      aria-hidden="true"
    />
  )
}

