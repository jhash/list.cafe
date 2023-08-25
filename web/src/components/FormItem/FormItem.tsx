import { forwardRef } from 'react'

import { FieldError } from '@redwoodjs/forms'

import FormInput, { FormInputProps } from '../FormInput/FormInput'
import FormLabel, { FormLabelProps } from '../FormLabel/FormLabel'

export type FormItemProps = FormLabelProps &
  FormInputProps & {
    label?: React.ReactNode
    description?: React.ReactNode
  }

const FormItem = forwardRef<HTMLInputElement, FormItemProps>(
  (
    {
      description,
      defaultValue,
      children,
      editing = true,
      name,
      label,
      options,
      ...props
    },
    ref
  ) => {
    if (!editing && !defaultValue) {
      return null
    }

    return (
      <div className="flex w-full max-w-xl flex-col gap-1">
        {!!label && (
          <FormLabel name={`${name}-label`} htmlFor={name} {...props}>
            {label}
          </FormLabel>
        )}
        <FormInput
          name={name}
          editing={editing}
          defaultValue={defaultValue}
          ref={ref}
          options={options}
          {...props}
        >
          <FieldError name={name} className="px-1 py-1 text-error" />
          {!!description && (
            <div className="p-1 text-sm text-gray-600 dark:text-gray-400">
              {description}
            </div>
          )}
          {children}
        </FormInput>
      </div>
    )
  }
)

export default FormItem
