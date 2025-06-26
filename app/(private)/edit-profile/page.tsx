'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileSchema, type ProfileData } from '@/lib/validations'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useToastStore } from '@/lib/store'
import { profileApi } from '@/lib/api'

// API wrapper functions for React Query
const fetchProfile = () => profileApi.getProfile()
const updateProfile = (data: ProfileData) => profileApi.updateProfile(data)
import { Save, ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function EditProfilePage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()
  
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  })

  const form = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
      bio: '',
      phone: '',
      location: '',
    },
  })

  // Update form when profile data is loaded
  React.useEffect(() => {
    if (profile) {
      form.reset(profile)
    }
  }, [profile, form])

  const updateMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(['profile'], data)
      showToast('Profile updated successfully!', 'success')
      router.push('/profile')
    },
    onError: (error: Error) => {
      showToast(error.message, 'error')
    },
  })

  const onSubmit = (data: ProfileData) => {
    updateMutation.mutate(data)
  }

  if (isLoadingProfile) {
    return (
      <div className="px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Profile</h1>
            <p className="text-muted-foreground">Update your profile information</p>
          </div>
          <Link href="/profile">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Profile
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Make changes to your profile here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  {...form.register('name')}
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  {...form.register('email')}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  className="min-h-[100px]"
                  {...form.register('bio')}
                />
                {form.formState.errors.bio && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.bio.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  {form.watch('bio')?.length || 0}/500 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  {...form.register('phone')}
                />
                {form.formState.errors.phone && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.phone.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Enter your location"
                  {...form.register('location')}
                />
                {form.formState.errors.location && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.location.message}
                  </p>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  type="submit" 
                  disabled={updateMutation.isPending}
                  className="gap-2"
                >
                  {updateMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => router.push('/profile')}
                  disabled={updateMutation.isPending}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
