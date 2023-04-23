import { VariantProps, cva } from 'class-variance-authority'
import { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariantProps = VariantProps<typeof buttonStyles>
type ButtonProps = ButtonVariantProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string
    label: string
  }

const buttonStyles = cva(
  'py-4 px-[4.875rem] rounded-xl font-semibold flex items-center justify-center',
  {
    variants: {
      variant: {
        success: 'bg-green-600 hover:bg-green-600/70 transition-all',
        warning: 'bg-orange-600',
        danger: 'bg-red-600',
      },
    },
    defaultVariants: {
      variant: 'success',
    },
  },
)

export function Button({ label, variant, className, ...props }: ButtonProps) {
  return (
    <button {...props} className={buttonStyles({ className, variant })}>
      {label}
    </button>
  )
}
