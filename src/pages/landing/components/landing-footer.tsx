import { BrandMark } from '@/shared/ui'

export function LandingFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl items-center px-6 py-8">
        <BrandMark />
        <span className="ml-auto text-xs text-muted-foreground">Engineering Office · Cencosud © 2026</span>
      </div>
    </footer>
  )
}
