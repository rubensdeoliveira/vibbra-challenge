import { VariantProps, cva } from 'class-variance-authority'
import Link from 'next/link'
import { IconBaseProps } from 'react-icons'

export type AsideMenuItemItem = {
  label: string
  link: string
  icon: React.ComponentType<IconBaseProps>
}

export type AsideMenuItemVariantProps = VariantProps<typeof asideMenuItemStyles>
type AsideMenuItemProps = AsideMenuItemVariantProps &
  AsideMenuItemItem & {
    className?: string
  }

const asideMenuItemStyles = cva(
  'flex  transform items-center gap-[1.875rem] py-[1.375rem] pl-[50px] pr-[40px] transition-colors duration-300',
  {
    variants: {
      isActive: {
        true: 'text-white bg-[linear-gradient(269.97deg,rgba(19,180,151,0.13)0.01%,rgba(19,180,151,0)99.96%)]',
        false:
          'text-gray-250 hover:bg-[linear-gradient(269.97deg,rgba(19,180,151,0.13)0.01%,rgba(19,180,151,0)99.96%)]',
      },
    },
    defaultVariants: {
      isActive: false,
    },
  },
)

export function AsideMenuItem({
  label,
  className,
  isActive,
  icon: Icon,
  link,
}: AsideMenuItemProps) {
  return (
    <Link className={asideMenuItemStyles({ className, isActive })} href={link}>
      <Icon size={24} />

      <span className="font-semibold">{label}</span>

      {isActive && (
        <div className="absolute right-0 h-full w-[8px] rounded-l-[6px] bg-green-500" />
      )}
    </Link>
  )
}
