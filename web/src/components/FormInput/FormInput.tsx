import { forwardRef } from 'react'

import classNames from 'classnames'

import {
  Controller,
  InputField,
  InputFieldProps,
  SelectField,
  SelectFieldProps,
  TextAreaField,
  TextAreaFieldProps,
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
  'select',
  'textarea'
]
type FormInputElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement
export type FormInputType = (typeof INPUT_TYPES)[number]
export type FormInputProps = (
  | Omit<InputFieldProps, 'type'>
  | SelectFieldProps
  | TextAreaFieldProps
) & {
  editing?: boolean
  type?: FormInputType
  options?: {
    name?: string
    value: string | number
    description?: string
    disabled?: boolean
  }[]
  hideDescription?: boolean
  onChange?: React.FormEventHandler<FormInputElement>
}
const FormInput = forwardRef<FormInputElement, FormInputProps>(
  (
    {
      editing = true,
      defaultValue,
      type = 'text',
      options,
      name,
      children,
      hideDescription,
      onChange,
      onBlur,
      onSubmit,
      className,
      ...props
    },
    ref
  ) => {
    const defaultMatchingOption = options?.find(
      (option) => option.value === defaultValue
    )

    return editing ? (
      <Controller
        name={name}
        render={({ field: { value, ...controllerProps } }) => {
          const matchingOption = options?.find(
            (option) => option.value === (value || defaultValue)
          )

          const inputProps = {
            type,
            name,
            autoComplete: 'off',
            autoCapitalize: 'off',
            defaultValue,
            ...props,
            className: classNames(
              'rounded-md border border-gray-300 border-opacity-100 focus:outline-primary dark:border-gray-500 leading-normal',
              type === 'textarea' && 'py-1',
              type === 'textarea'
                ? 'textarea'
                : type === 'select'
                ? 'select'
                : 'input',
              className
            ),
            errorClassName: classNames(
              'input input-error rounded-md',
              className
            ),
            ...controllerProps,
            onChange,
            onBlur,
            onSubmit,
            onKeyUp: (event: React.KeyboardEvent<FormInputElement>) => {
              if (event.key === 'Enter') {
                onSubmit?.(undefined)
              }
            },
            // value,
            ref,
          }

          return (
            <>
              {type === 'select' ? (
                <>
                  <SelectField {...(inputProps as SelectFieldProps)}>
                    {options?.map(({ name, value, disabled }, index) => (
                      <option key={index} value={value} disabled={disabled}>
                        {name || value}
                      </option>
                    ))}
                  </SelectField>
                  {!hideDescription && !!matchingOption?.description && (
                    <div className="p-1 text-sm text-gray-600 dark:text-gray-400">
                      {matchingOption.description}
                    </div>
                  )}
                </>
              ) : type === 'textarea' ? (
                <TextAreaField {...(inputProps as TextAreaFieldProps)} />
              ) : (
                <InputField {...(inputProps as InputFieldProps)} />
              )}
              {children}
            </>
          )
        }}
      />
    ) : (
      <>
        <p className="min-h-8 flex w-full max-w-full items-center border border-transparent px-1 text-sm">
          {defaultMatchingOption?.name || defaultValue}
        </p>
        {children}
        {!hideDescription && !!defaultMatchingOption?.description && (
          <div className="px-1 text-sm text-gray-600 dark:text-gray-400">
            {defaultMatchingOption.description}
          </div>
        )}
      </>
    )
  }
)

export default FormInput
