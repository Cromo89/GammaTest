export function BrandMark() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative size-[30px] shrink-0">
        <span
          className="absolute"
          style={{
            inset: '2px 13px 2px 3px',
            borderRadius: 'var(--radius-brand-mark)',
            transform: 'skew(-13deg)',
            background: 'linear-gradient(100deg, var(--color-brand-teal), var(--color-brand-cyan) 48%, var(--color-brand-blue))',
            boxShadow: '0 0 18px color-mix(in srgb, var(--color-brand-cyan) 33%, transparent)',
          }}
        />
        <span
          className="absolute"
          style={{
            inset: '9px 3px 2px 14px',
            borderRadius: 'var(--radius-brand-mark)',
            transform: 'skew(-13deg)',
            background: 'linear-gradient(150deg, var(--color-brand-cyan), var(--color-brand-blue))',
          }}
        />
      </div>
      <div>
        <p className="font-heading text-lg font-bold leading-none">Gamma</p>
        <p className="mt-1 text-[8px] tracking-[0.14em] text-muted-foreground uppercase">AI Publisher</p>
      </div>
    </div>
  )
}
