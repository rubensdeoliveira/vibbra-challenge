import { cva } from 'class-variance-authority'
import { SelectHTMLAttributes, useState } from 'react'

type InputProps = SelectHTMLAttributes<HTMLSelectElement> & {
  className?: string
  options: string[]
}

const inputStyles = cva(
  'px-5 h-[56px] w-full rounded-xl border-[1px] border-solid border-gray-750 bg-gray-1000 placeholder-gray-100 focus:outline-none',
)

export function InputSelect({
  className,
  options,
  value,
  ...props
}: InputProps) {
  return (
    <select {...props} className={inputStyles({ className })}>
      {options.map(option => (
        <option key={option} selected={option === value}>
          {option}
        </option>
      ))}
    </select>
  )
}
