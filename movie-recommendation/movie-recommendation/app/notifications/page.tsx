'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/auth-provider'
import { Bell, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

interface Notification {
  id: string
  message: string
  date: string
  read: boolean
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetch(`/api/notifications?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setNotifications(data)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [user])

  const markAsRead = async (id: string) => {
    await fetch(`/api/notifications/${id}/read`, { method: 'POST' })
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const deleteNotification = async (id: string) => {
    await fetch(`/api/notifications/${id}`, { method: 'DELETE' })
    setNotifications(notifications.filter(n => n.id !== id))
  }

  if (!user) {
    return <div className="container mx-auto px-4 py-8">Please log in to view your notifications.</div>
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Your Notifications</h1>
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="mb-4 h-20 w-full" />
        ))}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Your Notifications</h1>
      {notifications.length > 0 ? (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`flex items-center justify-between rounded-lg border p-4 ${
                notification.read ? 'bg-muted' : 'bg-background'
              }`}
            >
              <div className="flex items-center space-x-4">
                <Bell className={notification.read ? 'text-muted-foreground' : 'text-primary'} />
                <div>
                  <p className={notification.read ? 'text-muted-foreground' : ''}>{notification.message}</p>
                  <p className="text-sm text-muted-foreground">{notification.date}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                {!notification.read && (
                  <Button variant="outline" size="sm" onClick={() => markAsRead(notification.id)}>
                    Mark as Read
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-muted-foreground">You have no notifications.</p>
      )}
    </div>
  )
}

