import { useState } from 'react'
import { Check, Copy, Globe, Share2, X } from 'lucide-react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Textarea,
} from '@/shared/ui'
import { cn } from '@/shared/lib/utils'

const LINK_ACCESS_LABEL = 'Cualquiera que haya iniciado sesión con el enlace'

/** Switch accesible: el portal original usa un <button role="switch"> con aria-checked. */
function Switch({
  checked,
  onCheckedChange,
  label,
}: {
  checked: boolean
  onCheckedChange: (value: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        'relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors',
        checked ? 'bg-primary' : 'bg-muted-foreground/30',
      )}
    >
      <span
        className={cn(
          'inline-block size-3.5 rounded-full bg-white transition-transform',
          checked ? 'translate-x-[18px]' : 'translate-x-[3px]',
        )}
      />
    </button>
  )
}

function ShareUrlRow({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)

  function handleCopyUrl() {
    navigator.clipboard.writeText(`https://${url}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mt-5 flex items-center justify-between gap-2 rounded-lg border border-border px-3 py-2">
      <span className="flex items-center gap-2 truncate font-mono text-sm text-muted-foreground">
        <Globe className="size-4 shrink-0" />
        {url}
      </span>
      <Button variant="outline" className="shrink-0" onClick={handleCopyUrl}>
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        {copied ? 'Copiado' : 'Copiar'}
      </Button>
    </div>
  )
}

/** El original guarda al salir del campo (onBlur), sin botón de guardar. */
function ShareDescriptionField() {
  const [description, setDescription] = useState('')

  return (
    <div className="mt-5">
      <label htmlFor="share-description" className="text-sm font-medium">
        Descripción
      </label>
      <Textarea
        id="share-description"
        rows={3}
        className="mt-2"
        placeholder="¿De qué se trata este proyecto?"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        onBlur={(event) => setDescription(event.target.value.trim())}
      />
      <p className="mt-1.5 text-xs text-muted-foreground">Se muestra en Descubrir. Se guarda al salir del campo.</p>
    </div>
  )
}

function LinkAccessRow() {
  const [linkAccess, setLinkAccess] = useState(true)

  return (
    <div className="mt-5 flex items-start justify-between gap-4 rounded-lg border border-border p-3">
      <div className="min-w-0">
        <p className="text-sm font-medium">{LINK_ACCESS_LABEL}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          Cualquier persona que haya iniciado sesión en Gamma puede abrir este enlace. Sigue siendo privado: nunca es
          público en internet.
        </p>
      </div>
      <Switch checked={linkAccess} onCheckedChange={setLinkAccess} label={LINK_ACCESS_LABEL} />
    </div>
  )
}

function PeopleWithAccess({ people, onRemove }: { people: string[]; onRemove: (email: string) => void }) {
  return (
    <section className="mt-5">
      <h3 className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Personas con acceso</h3>
      {people.length === 0 ? (
        <p className="mt-2 text-sm text-muted-foreground">Aún no has invitado a nadie.</p>
      ) : (
        <ul className="mt-2 flex flex-col gap-1">
          {people.map((email) => (
            <li key={email} className="flex items-center justify-between gap-2 rounded-md border border-border px-3 py-1.5">
              <span className="truncate text-sm">{email}</span>
              <button
                type="button"
                aria-label={`Quitar acceso a ${email}`}
                onClick={() => onRemove(email)}
                className="shrink-0 text-muted-foreground hover:text-destructive"
              >
                <X className="size-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

/** El input acepta varios correos separados por coma, como en el portal original. */
function InviteSection() {
  const [emailInput, setEmailInput] = useState('')
  const [people, setPeople] = useState<string[]>([])

  function handleInvite() {
    const nuevos = emailInput
      .split(',')
      .map((email) => email.trim())
      .filter((email) => email.includes('@') && !people.includes(email))
    if (!nuevos.length) return
    setPeople([...people, ...nuevos])
    setEmailInput('')
  }

  return (
    <>
      <form
        className="mt-5"
        onSubmit={(event) => {
          event.preventDefault()
          handleInvite()
        }}
      >
        <label htmlFor="share-invite" className="text-sm font-medium">
          Invitar por correo
        </label>
        <div className="mt-2 flex gap-2">
          <input
            id="share-invite"
            type="text"
            value={emailInput}
            onChange={(event) => setEmailInput(event.target.value)}
            placeholder="nombre@cencosud.cl, otro@cencosud.cl"
            className="h-8 w-full rounded-md border border-border bg-transparent px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
          <Button type="submit" disabled={!emailInput.trim()} className="shrink-0">
            Invitar
          </Button>
        </div>
      </form>

      <PeopleWithAccess people={people} onRemove={(email) => setPeople(people.filter((p) => p !== email))} />
    </>
  )
}

interface ShareProjectDialogProps {
  projectName: string
  url: string
}

export function ShareProjectDialog({ projectName, url }: ShareProjectDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Share2 className="size-4" />
          Compartir
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100dvh-2rem)] max-w-lg overflow-y-auto">
        <DialogTitle>Compartir "{projectName}"</DialogTitle>
        <DialogDescription>Gestiona quién puede abrir este despliegue.</DialogDescription>

        <ShareUrlRow url={url} />
        <ShareDescriptionField />
        <LinkAccessRow />
        <InviteSection />

        <section className="mt-5">
          <h3 className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Solicitudes de acceso</h3>
          <p className="mt-2 text-sm text-muted-foreground">No hay solicitudes pendientes.</p>
        </section>
      </DialogContent>
    </Dialog>
  )
}
