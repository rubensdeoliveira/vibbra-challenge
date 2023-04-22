import { ReactNode } from 'react'

type TdProps = {
  children: ReactNode
}

export function Td({ children }: TdProps) {
  return (
    <td className="min-h-[91px] border-gray-600 bg-gray-800">{children}</td>
  )
}
