import { useState } from 'react'
import { useNavigate } from 'react-router'
import { FlowingColorBend } from '@/shared/ui'
import { EmailStep } from './components/email-step'
import { CodeStep } from './components/code-step'

export function LoginPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<'email' | 'code'>('email')
  const [email, setEmail] = useState('')

  return (
    <div className="flex min-h-screen">
      <div className="relative isolate hidden flex-1 flex-col justify-center overflow-hidden bg-background p-16 lg:flex">
        <FlowingColorBend fadeEdge="bottom" grainHighlightIntensity={0.5} speed={0.00016} />
        <div className="max-w-lg">
          <h1 className="font-heading text-6xl font-semibold tracking-tight whitespace-nowrap">
            Del prompt a{' '}
            <span className="bg-gradient-to-r from-brand-teal via-brand-cyan to-brand-blue bg-clip-text text-transparent">
              producción
            </span>
          </h1>
          <p className="mt-3 max-w-sm text-[17px] text-muted-foreground">
            Publica prototipos, comparte una URL y valida ideas sin salir de Cencosud.
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--color-primary)_16%,transparent),transparent_60%)] px-8 lg:flex-1">
        {step === 'email' ? (
          <EmailStep email={email} onEmailChange={setEmail} onSubmit={() => setStep('code')} />
        ) : (
          <CodeStep email={email} onBack={() => setStep('email')} onSubmit={() => navigate('/proyectos')} />
        )}
      </div>
    </div>
  )
}
