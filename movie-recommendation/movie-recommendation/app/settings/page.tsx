'use client'

import { useAuth } from '@/components/auth-provider'
import { SettingsForm } from '@/components/settings-form'

export default function SettingsPage() {
  const { user } = useAuth()

  if (!user) {
    return <div>Please log in to access your settings.</div>
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>
      <SettingsForm user={user} />
    </div>
  )
}

