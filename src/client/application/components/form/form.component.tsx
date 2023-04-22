import { FormEvent, ReactNode } from 'react'

type FormProps = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  children: ReactNode
}

export function Form({ children, onSubmit }: FormProps) {
  return <form onSubmit={onSubmit}>{children}</form>
}
