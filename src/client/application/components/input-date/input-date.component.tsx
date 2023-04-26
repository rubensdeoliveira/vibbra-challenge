import { cva } from 'class-variance-authority'
import { useState } from 'react'
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form'
import Datepicker from 'tailwind-datepicker-react'

type InputDateProps = {
  label: string
  name: string
  control: Control<any>
  errors: FieldErrors<any>
  className?: string
  placeholder?: string
  defaultValue?: any
}

const inputStyles = cva(
  'h-[56px] rounded-xl text-white font-poppins flex w-full border-solid border-gray-750 bg-gray-1000 py-2.5 pl-5 pr-11 placeholder-gray-100 focus:outline-none',
)

export function InputDate({
  label,
  name,
  control,
  errors,
  className,
  placeholder,
  defaultValue,
}: InputDateProps) {
  const errorMessage = errors && errors[name]?.message

  const [show, setShow] = useState<boolean>(false)

  const handleClose = (state: boolean) => {
    setShow(state)
  }

  const options = {
    title: 'Selecione uma data',
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    maxDate: new Date('2030-01-01'),
    minDate: new Date('1950-01-01'),
    theme: {
      background: 'bg-green-500',
      todayBtn: '',
      clearBtn: 'bg-white border-none',
      icons: 'border-none',
      text: 'bg-green-500',
      disabledText: '',
      input: 'bg-gray-1000 h-full text-white pl-10 border-none focus:ring-none',
      inputIcon: 'text-white mb-1',
      selected: '',
    },
    datepickerClassNames: 'top-12',
    defaultDate: defaultValue ? new Date(defaultValue) : undefined,
    language: 'pt-BR',
  }

  return (
    <div className="relative flex w-full flex-col gap-[0.625rem]">
      <label>{label}</label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="h-[56px] w-full">
            <Datepicker
              {...field}
              options={options}
              show={show}
              setShow={handleClose}
              classNames="h-full [&>*]:h-full relative"
            />
          </div>
        )}
      />
      {typeof errorMessage === 'string' ? (
        <span className="text-red-500">{errorMessage}</span>
      ) : null}
    </div>
  )
}
