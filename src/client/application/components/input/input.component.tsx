import { InputHTMLAttributes } from 'react'
import { UseFormRegister } from 'react-hook-form'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  name: string
  register: UseFormRegister<any>
}

export function Input({ label, name, register, ...props }: InputProps) {
  return (
    <div>
      <label>
        {label}
        <input {...props} {...register(name)} />
      </label>
    </div>
  )
}
