import { Construction } from 'lucide-react'

export function DocumentacionPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold">Documentación</h1>
      <p className="mt-1 text-sm text-muted-foreground">Guías y referencias para publicar con Gamma</p>

      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-muted">
          <Construction className="size-7 text-muted-foreground" />
        </div>
        <div>
          <p className="font-medium">En construcción</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Estamos preparando la documentación de Gamma. Vuelve pronto.
          </p>
        </div>
      </div>
    </div>
  )
}
