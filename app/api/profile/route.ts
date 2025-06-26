import { NextRequest, NextResponse } from 'next/server'
import { profileSchema, type ProfileData } from '@/lib/validations'

// Mock database - in a real app, this would be a database
let mockProfile: ProfileData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  bio: 'Full-stack developer passionate about creating amazing user experiences. Love working with modern technologies and building scalable applications.',
  phone: '+1-555-123-4567',
  location: 'San Francisco, CA',
}

export async function GET() {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return NextResponse.json({
      success: true,
      data: mockProfile,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the data
    const validatedData = profileSchema.parse(body)
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Update mock profile
    mockProfile = validatedData
    
    return NextResponse.json({
      success: true,
      data: mockProfile,
    })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}
