import { Upload } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

interface WizardStepUploadProps {
  fileName: string | null
  onSelectFile: () => void
}

export function WizardStepUpload({ fileName, onSelectFile }: WizardStepUploadProps) {
  return (
    <div className="rounded-xl border border-border p-6">
      <button
        type="button"
        onClick={onSelectFile}
        className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-10 text-center"
      >
        <Upload className={cn('size-6', fileName ? 'text-primary' : 'text-muted-foreground')} />
        {fileName ? (
          <span className="font-medium text-primary">{fileName}</span>
        ) : (
          <>
            <span className="text-sm font-medium">Arrastra un archivo o carpeta aquí</span>
            <span className="text-xs text-muted-foreground">
              Soporta .html, .zip, o cualquier carpeta de proyecto
            </span>
            <span className="mt-2 flex gap-2">
              <span className="rounded-md border border-border px-2.5 py-1 text-xs">Subir archivo</span>
              <span className="rounded-md border border-border px-2.5 py-1 text-xs">Subir carpeta</span>
            </span>
          </>
        )}
      </button>
    </div>
  )
}
