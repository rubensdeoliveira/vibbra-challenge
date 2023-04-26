import { cva } from 'class-variance-authority'
import { useState } from 'react'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { Combobox, Transition } from '@headlessui/react'

type Option = {
  value: string
  label: string
}

type InputAutoCompleteProps = {
  label: string
  name: string
  control: Control<any>
  errors: FieldErrors<any>
  options: Option[]
  className?: string
  placeholder?: string
}

const inputStyles = cva(
  'h-[56px] flex w-full rounded-xl border-[1px] border-solid border-gray-750 bg-gray-1000 py-2.5 pl-5 pr-11 placeholder-gray-100 focus:outline-none',
)

export function InputAutoComplete({
  label,
  name,
  control,
  errors,
  className,
  options,
  placeholder,
}: InputAutoCompleteProps) {
  const [selected, setSelected] = useState<Option>(
    options.length > 0 ? options[0] : { label: '', value: '' },
  )
  const [query, setQuery] = useState('')
  const errorMessage = errors && errors[name]?.message

  const filteredOptions =
    query === ''
      ? options
      : options.filter(option => {
          return option.label
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        })

  return (
    <div className="relative flex w-full flex-col gap-[0.625rem]">
      <label>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Combobox {...field}>
            {({ open, activeOption }) => (
              <div>
                <Combobox.Input
                  placeholder={placeholder}
                  className={inputStyles({ className })}
                  onChange={event => setQuery(event.target.value)}
                  displayValue={(option: Option) => option.label}
                />
                <Transition
                  show={open}
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Combobox.Options className={'mt-1'}>
                    {filteredOptions.map((option, index) => (
                      <Combobox.Option
                        key={option.value}
                        value={option}
                        className={`${index === 0 ? 'rounded-t-xl' : ''} ${
                          index === filteredOptions.length - 1
                            ? 'rounded-b-xl'
                            : ''
                        } ${
                          activeOption === option
                            ? 'bg-green-500'
                            : 'bg-gray-1000'
                        } px-5 py-4 hover:bg-green-500`}
                      >
                        {option.label}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                </Transition>
              </div>
            )}
          </Combobox>
        )}
      />
      {typeof errorMessage === 'string' ? (
        <span className="text-red-500">{errorMessage}</span>
      ) : null}
    </div>
  )
}
