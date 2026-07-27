import { useRef, useState, type TouchEvent } from 'react'
import { useNavigate } from 'react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/shared/ui'
import type { ProjectType } from '@/data/proyectos'
import { WizardStepper } from './components/wizard-stepper'
import { WizardStepUpload } from './components/wizard-step-upload'
import { WizardStepDetect } from './components/wizard-step-detect'
import { WizardStepConfigure } from './components/wizard-step-configure'
import { WizardStepDeploy } from './components/wizard-step-deploy'

const TOTAL_STEPS = 4
const SWIPE_THRESHOLD = 60

const STEP_DESCRIPTIONS: Record<number, string> = {
  1: 'Sube el archivo o carpeta de tu proyecto. Aceptamos HTML, .zip o cualquier carpeta de código — Gamma se encarga del resto.',
  2: 'Gamma revisa tu proyecto para identificar automáticamente su tipo (HTML, React/Vite, Next.js) y dejarlo listo para configurar.',
  3: 'Dale un nombre a tu proyecto. Este nombre define la URL pública donde tu equipo podrá verlo.',
  4: 'Revisa que todo esté correcto. Al publicar, tu proyecto queda disponible de inmediato en la URL de abajo.',
}

function useSwipeStep({ onNext, onBack, canGoNext }: { onNext: () => void; onBack: () => void; canGoNext: boolean }) {
  const start = useRef<{ x: number; y: number } | null>(null)

  function onTouchStart(event: TouchEvent) {
    const touch = event.touches[0]
    start.current = { x: touch.clientX, y: touch.clientY }
  }

  function onTouchEnd(event: TouchEvent) {
    if (!start.current) return
    const touch = event.changedTouches[0]
    const dx = touch.clientX - start.current.x
    const dy = touch.clientY - start.current.y
    start.current = null
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return
    if (dx < 0) {
      if (canGoNext) onNext()
    } else {
      onBack()
    }
  }

  return { onTouchStart, onTouchEnd }
}

export function NuevoProyectoPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [fileName, setFileName] = useState<string | null>(null)
  const [projectType, setProjectType] = useState<ProjectType>('HTML')
  const [name, setName] = useState('')

  const canContinue = step === 1 ? fileName !== null : step === 3 ? name.trim().length > 0 : true
  const swipe = useSwipeStep({ onNext: () => handlePrimaryAction(), onBack: () => handleBack(), canGoNext: canContinue })

  function handlePrimaryAction() {
    if (step < TOTAL_STEPS) {
      setStep(step + 1)
      return
    }
    navigate('/proyectos', { state: { toast: `"${name}" se publicó correctamente.` } })
  }

  function handleBack() {
    if (step === 1) {
      navigate('/proyectos')
      return
    }
    setStep(step - 1)
  }

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <button
        type="button"
        onClick={handleBack}
        className="inline-flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Volver
      </button>

      <div>
        <h1 className="font-heading text-2xl font-semibold">Nuevo deploy</h1>
        <p className="mt-1 text-sm text-muted-foreground">Sube tu proyecto y despliégalo con una URL.</p>
      </div>

      <WizardStepper current={step} />

      <p className="-mt-2 text-sm text-muted-foreground">{STEP_DESCRIPTIONS[step]}</p>

      <div onTouchStart={swipe.onTouchStart} onTouchEnd={swipe.onTouchEnd}>
        {step === 1 && (
          <WizardStepUpload
            fileName={fileName}
            onSelectFile={(selectedName, type) => {
              setFileName(selectedName)
              setProjectType(type)
            }}
          />
        )}
        {step === 2 && <WizardStepDetect fileName={fileName ?? ''} type={projectType} />}
        {step === 3 && <WizardStepConfigure name={name} onNameChange={setName} />}
        {step === 4 && <WizardStepDeploy name={name} fileName={fileName ?? ''} type={projectType} />}
      </div>

      <div className="flex sm:justify-end">
        <Button disabled={!canContinue} onClick={handlePrimaryAction} className="w-full sm:w-auto">
          {step < TOTAL_STEPS ? 'Continuar' : 'Desplegar'}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
