import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/navigation'
import { AuthProvider } from '@/components/auth-provider'
import { Toaster } from '@/components/ui/toaster'

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  )
}

