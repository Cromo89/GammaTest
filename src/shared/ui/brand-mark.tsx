import { useId } from 'react'

export function BrandMark() {
  const id = useId()
  const gradient1 = `${id}-brand-mark-gradient-1`
  const gradient2 = `${id}-brand-mark-gradient-2`
  const clip = `${id}-brand-mark-clip`

  return (
    <div className="flex items-center gap-2.5">
      <svg width="30" height="30" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        <g clipPath={`url(#${clip})`}>
          <path
            d="M42 84C18.843 84 0 65.157 0 42C0 18.843 18.843 0 42 0C47.7067 0 53.2461 1.12597 58.4645 3.35078L55.8929 9.3837C53.6894 14.5529 47.6193 16.7313 42 16.7313C28.0678 16.7313 16.7313 28.0678 16.7313 42C16.7313 55.9322 28.0678 67.2687 42 67.2687C53.0019 67.2687 62.385 60.2009 65.8443 50.3656H54.7313C45.4909 50.3656 38 42.8748 38 33.6344L75.6344 33.6344C80.2546 33.6344 84 37.3798 84 42C84 65.157 65.157 84 42 84Z"
            fill={`url(#${gradient1})`}
          />
          <path
            d="M42 84C18.843 84 0 65.157 0 42C0 18.843 18.843 0 42 0C47.7067 0 53.2461 1.12597 58.4645 3.35078L55.8929 9.3837C53.6894 14.5529 47.6193 16.7313 42 16.7313C28.0678 16.7313 16.7313 28.0678 16.7313 42C16.7313 42 15.863 63.2171 42 84Z"
            fill={`url(#${gradient2})`}
          />
          <path
            d="M70.1738 5.20778L71.2699 8.24721C72.4865 11.6199 75.1405 14.2779 78.5172 15.4945L81.5566 16.5906C81.8296 16.687 81.8296 17.0764 81.5566 17.1768L78.5172 18.2729C75.1445 19.4895 72.4865 22.1435 71.2699 25.5202L70.1738 28.5596C70.0774 28.8326 69.688 28.8326 69.5876 28.5596L68.4915 25.5202C67.2749 22.1475 64.6209 19.4895 61.2442 18.2729L58.2048 17.1768C57.9317 17.0804 57.9317 16.691 58.2048 16.5906L61.2442 15.4945C64.6169 14.2779 67.2749 11.6239 68.4915 8.24721L69.5876 5.20778C69.688 4.93074 70.0774 4.93074 70.1738 5.20778Z"
            fill="#10D7C4"
          />
        </g>
        <defs>
          <linearGradient id={gradient1} x1="92.5" y1="32" x2="14.1548" y2="78.345" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0666D8" />
            <stop offset="0.446232" stopColor="#0A84FF" />
            <stop offset="1" stopColor="#10D7C4" />
          </linearGradient>
          <linearGradient id={gradient2} x1="8.24881" y1="90.4063" x2="41.4466" y2="4.25975" gradientUnits="userSpaceOnUse">
            <stop stopColor="#008A7B" />
            <stop offset="1" stopColor="#10D7C4" />
          </linearGradient>
          <clipPath id={clip}>
            <rect width="84" height="84" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <div>
        <p className="font-heading text-lg font-bold leading-none">Gamma</p>
        <p className="mt-1 text-[8px] tracking-[0.14em] text-muted-foreground uppercase">AI Publisher</p>
      </div>
    </div>
  )
}
