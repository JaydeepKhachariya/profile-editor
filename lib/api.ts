import { ProfileData } from './validations'

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? process.env.NEXT_PUBLIC_API_URL 
  : 'http://localhost:3000'

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message)
    this.name = 'ApiError'
  }
}

export const profileApi = {
  async getProfile(): Promise<ProfileData> {
    const response = await fetch(`${API_BASE_URL}/api/profile`, {
      cache: 'no-store',
    })
    
    if (!response.ok) {
      throw new ApiError('Failed to fetch profile', response.status)
    }
    
    const result = await response.json()
    return result.data
  },

  async updateProfile(data: ProfileData): Promise<ProfileData> {
    const response = await fetch(`${API_BASE_URL}/api/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new ApiError(error.error || 'Failed to update profile', response.status)
    }
    
    const result = await response.json()
    return result.data
  },
}
