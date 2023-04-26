import { cva } from 'class-variance-authority'
import { useState } from 'react'
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form'
import CurrencyInput from 'react-currency-input-field'

type InputCurrencyProps = {
  label: string
  name: string
  control: Control<any>
  errors: FieldErrors<any>
  className?: string
  placeholder?: string
}

const inputStyles = cva(
  'h-[56px] flex w-full rounded-xl border-[1px] border-solid border-gray-750 bg-gray-1000 py-2.5 pl-5 pr-11 placeholder-gray-100 focus:outline-none',
)

export function InputCurrency({
  label,
  name,
  control,
  errors,
  className,
  placeholder,
}: InputCurrencyProps) {
  const errorMessage = errors && errors[name]?.message

  return (
    <div className="relative flex w-full flex-col gap-[0.625rem]">
      <label>{label}</label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <CurrencyInput
            value={field.value}
            onValueChange={field.onChange}
            decimalSeparator=","
            groupSeparator="."
            prefix="R$ "
            className={inputStyles({ className })}
            allowNegativeValue={false}
            placeholder={placeholder}
          />
        )}
      />

      {typeof errorMessage === 'string' ? (
        <span className="text-red-500">{errorMessage}</span>
      ) : null}
    </div>
  )
}
