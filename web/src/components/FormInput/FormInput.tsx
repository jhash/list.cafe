import { forwardRef } from 'react'

import { InputField, InputFieldProps } from '@redwoodjs/forms'

export type FormInputProps = InputFieldProps & {
  editing?: boolean
}
const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ editing = true, defaultValue, ...props }, ref) => {
    return editing ? (
      <InputField
        defaultValue={defaultValue}
        {...props}
        className="input input-sm flex-grow rounded-md border border-gray-300 border-opacity-100 focus:outline-primary dark:border-gray-500"
        errorClassName="input input-error rounded-md flex-grow"
        ref={ref}
      />
    ) : (
      <p className="min-h-8 flex items-center border border-transparent px-3 text-sm">
        {defaultValue}
      </p>
    )
  }
)

export default FormInput
