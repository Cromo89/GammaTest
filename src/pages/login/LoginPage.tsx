import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { BrandMark, FlowingColorBend } from '@/shared/ui'
import { EmailStep } from './components/email-step'
import { CodeStep } from './components/code-step'

export function LoginPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<'email' | 'code'>('email')
  const [email, setEmail] = useState('')

  return (
    <div className="relative isolate flex min-h-dvh items-center justify-center overflow-hidden px-4">
      <FlowingColorBend fadeEdge="bottom" grainHighlightIntensity={0.5} speed={0.00016} />

      <div className="relative flex w-full max-w-sm flex-col items-center">
        <Link to="/" className="mb-6 inline-flex">
          <BrandMark />
        </Link>

        <div className="w-full rounded-2xl border border-white/10 bg-background/40 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl">
          {step === 'email' ? (
            <EmailStep email={email} onEmailChange={setEmail} onSubmit={() => setStep('code')} />
          ) : (
            <CodeStep email={email} onBack={() => setStep('email')} onSubmit={() => navigate('/proyectos')} />
          )}
        </div>
      </div>
    </div>
  )
}
