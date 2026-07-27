import { useRef, type ChangeEvent, type DragEvent } from 'react'
import { Upload } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import type { ProjectType } from '@/data/proyectos'

const ACCEPTED_EXTENSIONS = '.html,.htm,.zip'

function detectProjectType(path: string): ProjectType {
  const lower = path.toLowerCase()
  if (lower.endsWith('.html') || lower.endsWith('.htm')) return 'HTML'
  if (lower.includes('next')) return 'Next.js'
  if (lower.includes('vite') || lower.includes('react')) return 'React/Vite'
  return 'HTML'
}

function fileDisplayName(file: File): string {
  const relativePath = (file as File & { webkitRelativePath?: string }).webkitRelativePath
  if (!relativePath) return file.name
  return relativePath.split('/')[0]
}

interface WizardStepUploadProps {
  fileName: string | null
  onSelectFile: (fileName: string, type: ProjectType) => void
}

export function WizardStepUpload({ fileName, onSelectFile }: WizardStepUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const folderInputRef = useRef<HTMLInputElement>(null)

  function handleFiles(files: FileList | null) {
    const file = files?.[0]
    if (!file) return
    const relativePath = (file as File & { webkitRelativePath?: string }).webkitRelativePath || file.name
    onSelectFile(fileDisplayName(file), detectProjectType(relativePath))
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    handleFiles(event.target.files)
    event.target.value = ''
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    handleFiles(event.dataTransfer.files)
  }

  return (
    <div className="rounded-xl border border-border p-6" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
      <input ref={fileInputRef} type="file" accept={ACCEPTED_EXTENSIONS} className="hidden" onChange={handleChange} />
      <input
        ref={folderInputRef}
        type="file"
        // @ts-expect-error webkitdirectory no está tipado en React pero sí soportado en Chrome/Edge/Firefox
        webkitdirectory=""
        className="hidden"
        onChange={handleChange}
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-10 text-center"
      >
        <Upload className={cn('size-6', fileName ? 'text-primary' : 'text-muted-foreground')} />
        {fileName ? (
          <span className="font-medium text-primary">{fileName}</span>
        ) : (
          <>
            <span className="text-sm font-medium">Arrastra un archivo o carpeta aquí</span>
            <span className="text-xs text-muted-foreground">Soporta .html, .zip, o cualquier carpeta de proyecto</span>
          </>
        )}
      </button>

      <span className="mt-3 flex justify-center gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="rounded-md border border-border px-2.5 py-1 text-xs hover:bg-muted"
        >
          Subir archivo
        </button>
        <button
          type="button"
          onClick={() => folderInputRef.current?.click()}
          className="rounded-md border border-border px-2.5 py-1 text-xs hover:bg-muted"
        >
          Subir carpeta
        </button>
      </span>
    </div>
  )
}
