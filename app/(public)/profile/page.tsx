import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, Phone, MapPin, User, Edit3 } from 'lucide-react'
import Link from 'next/link'
import { ProfileData } from '@/lib/validations'

async function getProfile(): Promise<ProfileData> {
  try {
    // In a real app, this would be a database call
    // For demo purposes, we'll use the API route
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_API_URL 
      : 'http://localhost:3000'
    
    const response = await fetch(`${baseUrl}/api/profile`, {
      cache: 'no-store', // Always fetch fresh data
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch profile')
    }
    
    const result = await response.json()
    return result.data
  } catch (error) {
    // Fallback data if API fails
    return {
      name: 'John Doe',
      email: 'john.doe@example.com',
      bio: 'Full-stack developer passionate about creating amazing user experiences.',
      phone: '+1-555-123-4567',
      location: 'San Francisco, CA',
    }
  }
}

export default async function ProfilePage() {
  const profile = await getProfile()

  return (
    <div className="px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
            <p className="text-muted-foreground">Public profile information</p>
          </div>
          <Link href="/edit-profile">
            <Button className="gap-2">
              <Edit3 className="h-4 w-4" />
              Edit Profile
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-10 w-10 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">{profile.name}</CardTitle>
                <CardDescription className="text-base mt-1">
                  Welcome to my profile
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {profile.bio && (
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">
                  About
                </h3>
                <p className="text-foreground leading-relaxed">{profile.bio}</p>
              </div>
            )}

            <div className="grid gap-4">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Contact Information
              </h3>
              
              <div className="grid gap-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Email:</span>
                  <a 
                    href={`mailto:${profile.email}`}
                    className="text-primary hover:underline"
                  >
                    {profile.email}
                  </a>
                </div>

                {profile.phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Phone:</span>
                    <a 
                      href={`tel:${profile.phone}`}
                      className="text-primary hover:underline"
                    >
                      {profile.phone}
                    </a>
                  </div>
                )}

                {profile.location && (
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Location:</span>
                    <span>{profile.location}</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
