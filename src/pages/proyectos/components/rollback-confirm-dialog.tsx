import { RotateCcw } from 'lucide-react'
import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/shared/ui'

interface RollbackConfirmDialogProps {
  version: string
  onConfirm: () => void
}

export function RollbackConfirmDialog({ version, onConfirm }: RollbackConfirmDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          <RotateCcw className="size-3" />
          Rollback
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>¿Hacer rollback a este deploy?</DialogTitle>
        <DialogDescription>
          El deploy activo actual quedará detenido y la versión "{version}" pasará a estar en línea.
        </DialogDescription>
        <div className="mt-6 flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={onConfirm}>Rollback</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
