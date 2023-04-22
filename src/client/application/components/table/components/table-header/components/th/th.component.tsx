import { ReactNode } from 'react'
import { VariantProps, cva } from 'class-variance-authority'

export type ButtonVariantProps = VariantProps<typeof thStyles>
type ThProps = ButtonVariantProps & {
  children: ReactNode
  className?: string
}

const thStyles = cva('text-lg font-medium capitalize', {
  variants: {
    type: {
      header: 'bg-gray-700 min-h-[87px]',
      body: 'bg-gray-800 border-gray-600 min-h-[91px]',
    },
  },
  defaultVariants: {
    type: 'header',
  },
})

export function Th({ children, className, type }: ThProps) {
  return <th className={thStyles({ className, type })}>{children}</th>
}
