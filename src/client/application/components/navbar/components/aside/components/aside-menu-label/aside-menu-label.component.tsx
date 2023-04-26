type AsideMenuLabelProps = {
  label: string
  className?: string
}

export function AsideMenuLabel({ label, className }: AsideMenuLabelProps) {
  return (
    <label
      className={`${className} mb-6 pl-[50px] pr-[40px] text-xl font-semibold text-white/30`}
    >
      {label}
    </label>
  )
}
