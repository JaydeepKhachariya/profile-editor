interface ErrorMessageProps {
  message: string
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p className="text-sm text-destructive mt-1 flex items-center gap-1">
      <span className="text-xs">⚠</span>
      {message}
    </p>
  )
}
