import { Upload } from 'lucide-react'
import { Button } from './button'

interface DropzoneProps {
  title: string
  subtitle?: string
}

export function Dropzone({ title, subtitle }: DropzoneProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-10 text-center">
      <Upload className="size-6 text-muted-foreground" />
      <div>
        <p className="text-sm font-medium">{title}</p>
        {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex gap-2">
        <Button variant="outline" className="h-7 px-2.5 text-xs">
          Subir archivo
        </Button>
        <Button variant="outline" className="h-7 px-2.5 text-xs">
          Subir carpeta
        </Button>
      </div>
    </div>
  )
}
