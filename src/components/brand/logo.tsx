import type { ImgHTMLAttributes } from 'react'

type LogoVariant = 'color' | 'white' | 'icon' | 'icon-white'

const LOGO_SOURCES: Record<LogoVariant, string> = {
  color: '/images/logo.png',
  white: '/images/logo-white.png',
  icon: '/images/icon.png',
  'icon-white': '/images/icon-white.png',
}

type LogoProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  variant?: LogoVariant
}

function Logo({
  variant = 'color',
  alt = 'SIGA',
  className,
  ...props
}: LogoProps) {
  return (
    <img
      src={LOGO_SOURCES[variant]}
      alt={alt}
      className={className}
      {...props}
    />
  )
}

export function LogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <Logo variant='icon' {...props} />
}
