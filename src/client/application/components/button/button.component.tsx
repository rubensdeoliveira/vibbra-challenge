import { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
}

export function Button({ label, ...props }: ButtonProps) {
  return <button {...props}>{label}</button>
}
