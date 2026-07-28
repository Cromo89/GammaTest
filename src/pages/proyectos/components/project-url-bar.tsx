import { useState } from 'react'
import { Check, Copy, ExternalLink, Globe } from 'lucide-react'
import { Button } from '@/shared/ui'

export function ProjectUrlBar({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)

  function handleCopyUrl() {
    navigator.clipboard.writeText(`https://${url}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border border-border px-3 py-2">
      <span className="flex items-center gap-2 truncate font-mono text-sm text-muted-foreground">
        <Globe className="size-4 shrink-0" />
        {url}
      </span>
      <div className="flex shrink-0 gap-2">
        <Button variant="outline" onClick={handleCopyUrl}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied ? 'Copiado' : 'Copiar'}
        </Button>
        <Button variant="outline" asChild>
          <a href={`https://${url}`} target="_blank" rel="noreferrer">
            <ExternalLink className="size-4" />
            Visitar
          </a>
        </Button>
      </div>
    </div>
  )
}
