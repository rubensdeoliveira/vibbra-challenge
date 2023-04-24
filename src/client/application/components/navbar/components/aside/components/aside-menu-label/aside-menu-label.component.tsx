type AsideMenuLabelProps = {
  label: string
}

export function AsideMenuLabel({ label }: AsideMenuLabelProps) {
  return (
    <label className="mb-6 pl-[50px] pr-[40px] text-xl font-semibold text-white/30">
      {label}
    </label>
  )
}
