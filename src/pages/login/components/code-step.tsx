import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { Button } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'

const CODE_LENGTH = 6
const RESEND_SECONDS = 26

interface CodeStepProps {
  email: string
  onBack: () => void
  onSubmit: () => void
}

export function CodeStep({ email, onBack, onSubmit }: CodeStepProps) {
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(''))
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS)
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])
  const isComplete = digits.every((digit) => digit !== '')

  useEffect(() => {
    if (secondsLeft <= 0) return
    const id = window.setInterval(() => setSecondsLeft((value) => value - 1), 1000)
    return () => window.clearInterval(id)
  }, [secondsLeft])

  function handleResend() {
    setSecondsLeft(RESEND_SECONDS)
  }

  function handleChange(index: number, value: string) {
    const char = value.slice(-1)
    const next = [...digits]
    next[index] = char
    setDigits(next)
    if (char && index < CODE_LENGTH - 1) inputsRef.current[index + 1]?.focus()
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) inputsRef.current[index - 1]?.focus()
  }

  return (
    <div className="flex w-full flex-col items-center text-center">
      <p className="mb-4 text-sm text-muted-foreground">
        Ingresa el código de 6 dígitos enviado a
        <br />
        <span className="font-medium text-foreground">{email}</span>
      </p>

      <div className="mb-4 flex gap-2">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el
            }}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            maxLength={1}
            className={cn(
              'size-12 rounded-md border bg-muted text-center font-mono text-lg focus:outline-none',
              digit ? 'border-primary' : 'border-border',
            )}
          />
        ))}
      </div>

      <Button className="w-full" disabled={!isComplete} onClick={onSubmit}>
        Iniciar sesión
      </Button>

      <button type="button" onClick={onBack} className="mt-3 text-sm hover:text-foreground">
        Usar otro correo
      </button>

      {secondsLeft > 0 ? (
        <p className="mt-3 text-xs text-muted-foreground">Reenviar código en {secondsLeft}s</p>
      ) : (
        <button type="button" onClick={handleResend} className="mt-3 text-xs text-primary hover:underline">
          Reenviar código
        </button>
      )}
    </div>
  )
}
