import { forwardRef } from 'react'

import {
  Controller,
  InputField,
  InputFieldProps,
  SelectField,
  SelectFieldProps,
} from '@redwoodjs/forms'

declare const INPUT_TYPES: readonly [
  'button',
  'color',
  'date',
  'datetime-local',
  'email',
  'file',
  'hidden',
  'image',
  'month',
  'number',
  'password',
  'radio',
  'range',
  'reset',
  'search',
  'submit',
  'tel',
  'text',
  'time',
  'url',
  'week',
  'select'
]
export type FormInputType = (typeof INPUT_TYPES)[number]
export type FormInputProps = (
  | Omit<InputFieldProps, 'type'>
  | SelectFieldProps
) & {
  editing?: boolean
  type?: FormInputType
  options?: { name?: string; value: string | number; description?: string }[]
}
const FormInput = forwardRef<
  HTMLInputElement | HTMLSelectElement,
  FormInputProps
>(
  (
    { editing = true, defaultValue, type = 'text', options, name, ...props },
    ref
  ) => {
    const defaultMatchingOption = options?.find(
      (option) => option.value === defaultValue
    )

    return editing ? (
      <Controller
        name={name}
        render={({ field: { onChange, onBlur, value, name } }) => {
          const matchingOption = options?.find(
            (option) => option.value === (value || defaultValue)
          )

          const inputProps = {
            type,
            name,
            autoComplete: 'off',
            defaultValue: defaultValue,
            ...props,
            className:
              'input input-sm flex-grow rounded-md border border-gray-300 border-opacity-100 focus:outline-primary dark:border-gray-500',
            errorClassName: 'input input-error rounded-md flex-grow',
            onChange,
            onBlur,
            value,
          }

          return type === 'select' ? (
            <>
              <SelectField
                {...(inputProps as SelectFieldProps)}
                ref={ref as React.ForwardedRef<HTMLSelectElement>}
              >
                {options?.map(({ name, value }, index) => (
                  <option key={index} value={value}>
                    {name || value}
                  </option>
                ))}
              </SelectField>
              {!!matchingOption?.description && (
                <div className="px-1 py-1 text-sm text-gray-600 dark:text-gray-400">
                  {matchingOption.description}
                </div>
              )}
            </>
          ) : (
            <InputField
              autoComplete="off"
              defaultValue={defaultValue}
              {...(inputProps as InputFieldProps)}
              className="input input-sm flex-grow rounded-md border border-gray-300 border-opacity-100 focus:outline-primary dark:border-gray-500"
              errorClassName="input input-error rounded-md flex-grow"
              ref={ref as React.ForwardedRef<HTMLInputElement>}
            />
          )
        }}
      ></Controller>
    ) : (
      <>
        <p className="min-h-8 flex w-full max-w-full items-center border border-transparent px-1 text-sm">
          {defaultMatchingOption?.name || defaultValue}
        </p>
        {!!defaultMatchingOption?.description && (
          <div className="px-1 text-sm text-gray-600 dark:text-gray-400">
            {defaultMatchingOption.description}
          </div>
        )}
      </>
    )
  }
)

export default FormInput
