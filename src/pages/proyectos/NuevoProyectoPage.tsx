import { useState } from 'react'
import { useNavigate } from 'react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/shared/ui'
import { WizardStepper } from './components/wizard-stepper'
import { WizardStepUpload } from './components/wizard-step-upload'
import { WizardStepDetect } from './components/wizard-step-detect'
import { WizardStepConfigure } from './components/wizard-step-configure'
import { WizardStepDeploy } from './components/wizard-step-deploy'

const MOCK_FILE_NAME = 'index.html'
const TOTAL_STEPS = 4

const STEP_DESCRIPTIONS: Record<number, string> = {
  1: 'Sube el archivo o carpeta de tu proyecto. Aceptamos HTML, .zip o cualquier carpeta de código — Gamma se encarga del resto.',
  2: 'Gamma revisa tu proyecto para identificar automáticamente su tipo (HTML, React/Vite, Next.js) y dejarlo listo para configurar.',
  3: 'Dale un nombre a tu proyecto. Este nombre define la URL pública donde tu equipo podrá verlo.',
  4: 'Revisa que todo esté correcto. Al publicar, tu proyecto queda disponible de inmediato en la URL de abajo.',
}

export function NuevoProyectoPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [fileName, setFileName] = useState<string | null>(null)
  const [name, setName] = useState('')

  const canContinue = step === 1 ? fileName !== null : step === 3 ? name.trim().length > 0 : true

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

      {step === 1 && <WizardStepUpload fileName={fileName} onSelectFile={() => setFileName(MOCK_FILE_NAME)} />}
      {step === 2 && <WizardStepDetect fileName={fileName ?? MOCK_FILE_NAME} />}
      {step === 3 && <WizardStepConfigure name={name} onNameChange={setName} />}
      {step === 4 && <WizardStepDeploy name={name} fileName={fileName ?? MOCK_FILE_NAME} />}

      <div className="flex justify-end">
        <Button disabled={!canContinue} onClick={handlePrimaryAction}>
          {step < TOTAL_STEPS ? 'Continuar' : 'Desplegar'}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
