import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/navigation'
import { AuthProvider } from '@/components/auth-provider'
import { Toaster } from '@/components/ui/toaster'
import { Sidebar } from '@/components/sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MovieAI - Your Personal Movie Recommendation Platform',
  description: 'Discover your next favorite movie with AI-powered recommendations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex-1">
                <Navigation />
                <main className="container mx-auto px-4 py-4">
                  {children}
                </main>
              </div>
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

