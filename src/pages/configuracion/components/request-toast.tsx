interface RequestToastProps {
  message: string
}

export function RequestToast({ message }: RequestToastProps) {
  return (
    <div className="animate-step-fade-in fixed top-20 right-6 z-50 flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-3 shadow-modal">
      <span className="size-2 shrink-0 rounded-full bg-success" />
      <p className="text-sm">{message}</p>
    </div>
  )
}
