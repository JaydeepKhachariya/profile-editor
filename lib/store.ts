import { create } from 'zustand'

interface ToastState {
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  isVisible: boolean
  showToast: (message: string, type?: 'success' | 'error' | 'warning' | 'info') => void
  hideToast: () => void
}

export const useToastStore = create<ToastState>((set) => ({
  message: '',
  type: 'success',
  isVisible: false,
  showToast: (message, type = 'success') => {
    set({ message, type, isVisible: true })
    // Auto-hide after 3 seconds
    setTimeout(() => {
      set({ isVisible: false })
    }, 3000)
  },
  hideToast: () => set({ isVisible: false }),
}))
