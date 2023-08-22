import FormInput, { FormInputProps } from '../FormInput/FormInput'
import FormLabel, { FormLabelProps } from '../FormLabel/FormLabel'

export type FormItemProps = FormLabelProps & FormInputProps
const FormItem: React.FC<FormItemProps> = ({
  defaultValue,
  children,
  editing,
  name,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1">
      <FormLabel name={`${name}-label`} htmlFor={name} {...props}>
        {children}
      </FormLabel>
      <FormInput
        name={name}
        editing={editing}
        defaultValue={defaultValue}
        {...props}
      />
    </div>
  )
}

export default FormItem
