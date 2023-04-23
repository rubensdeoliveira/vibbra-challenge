import { VariantProps, cva } from 'class-variance-authority'
import { ButtonHTMLAttributes, ReactNode } from 'react'

export type PaginationButtonVariantProps = VariantProps<
  typeof paginationButtonStyles
>
type PaginationButtonProps = PaginationButtonVariantProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode
    isActive?: boolean
    className?: string
  }

const paginationButtonStyles = cva(
  'h-[43px] w-[43px] text-lg font-medium flex items-center justify-center',
  {
    variants: {
      isActive: {
        true: 'bg-green-500 rounded-[11px]',
        false: 'text-gray-300',
      },
    },
    defaultVariants: {
      isActive: false,
    },
  },
)

export function PaginationButton({
  children,
  isActive = false,
  className,
  ...props
}: PaginationButtonProps) {
  return (
    <button
      {...props}
      className={paginationButtonStyles({ className, isActive })}
    >
      {children}
    </button>
  )
}
