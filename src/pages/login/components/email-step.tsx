import { Info } from 'lucide-react'
import { Link } from 'react-router'
import { BrandMark, Button } from '@/shared/ui'

interface EmailStepProps {
  email: string
  onEmailChange: (value: string) => void
  onSubmit: () => void
}

export function EmailStep({ email, onEmailChange, onSubmit }: EmailStepProps) {
  return (
    <div className="flex w-full max-w-xs flex-col items-start text-left">
      <Link to="/" className="mb-6 inline-flex">
        <BrandMark />
      </Link>

      <form
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
      >
        <label className="mb-2 block text-left text-sm">Correo de trabajo</label>
        <input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="tu@cencosud.cl"
          className="mb-4 w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
        <Button type="submit" className="w-full" disabled={!email.includes('@')}>
          Continuar
        </Button>
      </form>

      <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Info className="size-3.5" />
        Solo se permiten correos Cencosud
      </p>
    </div>
  )
}
