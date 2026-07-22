import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/shared/ui'
import { proyectos } from '@/data/proyectos'
import { WizardStepper } from './components/wizard-stepper'
import { WizardStepUpload } from './components/wizard-step-upload'
import { WizardStepDetect } from './components/wizard-step-detect'
import { WizardStepConfigure } from './components/wizard-step-configure'

const MOCK_FILE_NAME = 'index.html'

export function NuevoProyectoPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [fileName, setFileName] = useState<string | null>(null)
  const [name, setName] = useState('')

  const canContinue = step === 1 ? fileName !== null : step === 3 ? name.trim().length > 0 : true

  function handlePrimaryAction() {
    if (step < 3) {
      setStep(step + 1)
      return
    }
    navigate(`/proyectos/${proyectos[0].id}`)
  }

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold">Nuevo deploy</h1>
        <p className="mt-1 text-sm text-muted-foreground">Sube tu proyecto y despliégalo con una URL.</p>
      </div>

      <WizardStepper current={step} />

      {step === 1 && <WizardStepUpload fileName={fileName} onSelectFile={() => setFileName(MOCK_FILE_NAME)} />}
      {step === 2 && <WizardStepDetect fileName={fileName ?? MOCK_FILE_NAME} />}
      {step === 3 && <WizardStepConfigure name={name} onNameChange={setName} />}

      <div className="flex items-center justify-between">
        <Link
          to="/proyectos"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Volver a proyectos
        </Link>
        <Button disabled={!canContinue} onClick={handlePrimaryAction}>
          {step < 3 ? 'Continuar' : 'Deploy'}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
