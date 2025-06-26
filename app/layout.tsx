import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { QueryProvider } from '@/components/query-provider'
import { ToastNotification } from '@/components/ui/toast-notification'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Profile Editor - Mini App',
  description: 'A simple profile editor with public and private views',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <div className="min-h-screen bg-background">
            <nav className="border-b border-border bg-card">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex items-center">
                    <h1 className="text-xl font-semibold">Profile Editor</h1>
                  </div>
                  <div className="flex items-center space-x-4">
                    <a
                      href="/profile"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      View Profile
                    </a>
                    <a
                      href="/edit-profile"
                      className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                      Edit Profile
                    </a>
                  </div>
                </div>
              </div>
            </nav>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
          <ToastNotification />
        </QueryProvider>
      </body>
    </html>
  )
}
