import { InputField, InputFieldProps } from '@redwoodjs/forms'

export type FormInputProps = InputFieldProps & {
  editing?: boolean
}
const FormInput: React.FC<FormInputProps> = ({
  editing = true,
  defaultValue,
  ...props
}) => {
  return editing ? (
    <InputField
      defaultValue={defaultValue}
      {...props}
      className="input input-sm flex-grow rounded-md border border-gray-300 border-opacity-100 focus:outline-info dark:border-gray-500"
      errorClassName="input input-error rounded-md flex-grow"
    />
  ) : (
    <p className="min-h-8 flex items-center border border-transparent px-3 text-sm">
      {defaultValue}
    </p>
  )
}

export default FormInput
