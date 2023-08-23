import { forwardRef } from 'react'

import FormInput, { FormInputProps } from '../FormInput/FormInput'
import FormLabel, { FormLabelProps } from '../FormLabel/FormLabel'

export type FormItemProps = FormLabelProps &
  FormInputProps & {
    label?: React.ReactNode
  }

const FormItem = forwardRef<HTMLInputElement, FormItemProps>(
  ({ defaultValue, children, editing, name, label, ...props }, ref) => {
    if (!editing && !defaultValue) {
      return null
    }

    return (
      <div className="flex flex-col gap-1">
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
          {...props}
        />
        {children}
      </div>
    )
  }
)

export default FormItem
