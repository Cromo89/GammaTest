import { Trash2 } from 'lucide-react'
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui'

interface DeleteProjectDialogProps {
  projectName: string
  onConfirm: () => void
}

export function DeleteProjectDialog({ projectName, onConfirm }: DeleteProjectDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-destructive hover:bg-destructive/10">
          <Trash2 className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Eliminar proyecto</DialogTitle>
        <DialogDescription>
          Esta acción no se puede deshacer. Se eliminará permanentemente "{projectName}" junto con todos sus deploys
          y la URL dejará de estar disponible.
        </DialogDescription>
        <div className="mt-6 flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button className="bg-destructive text-destructive-foreground hover:opacity-90" onClick={onConfirm}>
            Eliminar proyecto
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
