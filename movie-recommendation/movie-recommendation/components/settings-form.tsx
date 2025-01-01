'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/components/ui/use-toast'
import { User } from '@/types'

interface SettingsFormProps {
  user: User
}

export function SettingsForm({ user }: SettingsFormProps) {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, notifications, darkMode }),
      })

      if (!response.ok) throw new Error('Failed to update settings')

      toast({
        title: 'Settings updated',
        description: 'Your settings have been successfully updated.',
      })

      router.refresh()
    } catch (error) {
      console.error('Error updating settings:', error)
      toast({
        title: 'Error',
        description: 'Failed to update settings. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="notifications"
          checked={notifications}
          onCheckedChange={setNotifications}
        />
        <Label htmlFor="notifications">Enable notifications</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="darkMode"
          checked={darkMode}
          onCheckedChange={setDarkMode}
        />
        <Label htmlFor="darkMode">Dark mode</Label>
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  )
}

