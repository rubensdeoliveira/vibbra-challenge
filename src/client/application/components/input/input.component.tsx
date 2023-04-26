import { cva } from 'class-variance-authority'
import { InputHTMLAttributes } from 'react'
import { Controller, FieldErrors, UseFormRegister } from 'react-hook-form'
import InputMask from 'react-input-mask'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  name: string
  register: UseFormRegister<any>
  errors: FieldErrors<any>
  mask?: string
  className?: string
  maskPlaceholder?: string
}

const inputStyles = cva(
  'h-[56px] w-full rounded-xl border-[1px] border-solid border-gray-750 bg-gray-1000 py-2.5 pl-5 pr-11 placeholder-gray-100 focus:outline-none',
)

export function Input({
  label,
  name,
  register,
  errors,
  className,
  mask,
  maskPlaceholder,
  ...props
}: InputProps) {
  const errorMessage = errors && errors[name]?.message
  return (
    <div className="relative flex w-full flex-col gap-[0.625rem]">
      <label>{label}</label>

      {mask ? (
        <InputMask
          {...props}
          className={inputStyles({ className })}
          {...register(name)}
          mask={mask}
          alwaysShowMask={false}
          maskChar={' '}
          maskPlaceholder={maskPlaceholder}
        />
      ) : (
        <input
          {...props}
          className={inputStyles({ className })}
          {...register(name)}
        />
      )}

      {typeof errorMessage === 'string' ? (
        <span className="text-red-500">{errorMessage}</span>
      ) : null}
    </div>
  )
}
