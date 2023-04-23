import { VariantProps, cva } from 'class-variance-authority'
import { ReactNode } from 'react'

export type TdVariantProps = VariantProps<typeof tdStyles>
type TdProps = TdVariantProps & {
  children: ReactNode
  className?: string
}

const tdStyles = cva(
  'text-sm text-white/80 break-words border-gray-600 bg-gray-800 whitespace-break-spaces py-6 leading-[1.5]',
)

export function Td({ children, className }: TdProps) {
  return <td className={tdStyles({ className })}>{children}</td>
}
