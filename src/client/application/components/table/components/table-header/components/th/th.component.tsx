import { ReactNode } from 'react'
import { VariantProps, cva } from 'class-variance-authority'

export type ThVariantProps = VariantProps<typeof thStyles>
type ThProps = ThVariantProps & {
  children: ReactNode
  className?: string
}

const thStyles = cva(
  'text-lg font-medium capitalize bg-gray-700 py-[1.875rem] leading-[1]',
)

export function Th({ children, className }: ThProps) {
  return <th className={thStyles({ className })}>{children}</th>
}
