import { FormEvent, ReactNode } from 'react'

type FormProps = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  children: ReactNode
}

export function Form({ children, onSubmit }: FormProps) {
  return (
    <form
      className="flex w-full max-w-[800px] flex-col items-end gap-6 rounded-[14px] bg-gray-800 p-16"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  )
}
