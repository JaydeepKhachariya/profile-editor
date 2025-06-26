'use client'

import { useToastStore } from '@/lib/store'
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ToastNotification() {
  const { message, type, isVisible, hideToast } = useToastStore()

  if (!isVisible) return null

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  }

  const Icon = icons[type]

  const colorClasses = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={cn(
          'flex items-center gap-3 p-4 rounded-lg border shadow-lg min-w-[300px] animate-slideInDown',
          colorClasses[type]
        )}
      >
        <Icon className="h-5 w-5 flex-shrink-0" />
        <p className="text-sm font-medium flex-1">{message}</p>
        <button
          onClick={hideToast}
          className="text-current hover:opacity-70 transition-opacity"
        >
          <XCircle className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
