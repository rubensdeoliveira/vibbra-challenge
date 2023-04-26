import { Control, Controller, FieldErrors } from 'react-hook-form'

type InputSwitchProps = {
  label: string
  name: string
  control: Control<any>
  errors: FieldErrors<any>
}

export function InputSwitch({
  label,
  name,
  control,
  errors,
}: InputSwitchProps) {
  const errorMessage = errors && errors[name]?.message

  return (
    <div className="relative flex w-full flex-col gap-[0.625rem]">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">{label}</span>
              <input
                {...field}
                type="checkbox"
                className="toggle-accent toggle"
                checked={field.value}
              />
            </label>
          </div>
        )}
      />
      {typeof errorMessage === 'string' ? (
        <span className="text-red-500">{errorMessage}</span>
      ) : null}
    </div>
  )
}
