import classNames from 'classnames'

import { Label, LabelProps } from '@redwoodjs/forms'

export type FormLabelProps = LabelProps
const FormLabel: React.FC<FormLabelProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Label
      {...props}
      className="label font-medium"
      errorClassName="label label-error font-medium"
    >
      <span className={classNames('label-text', className || 'text-lg')}>
        {children}
      </span>
    </Label>
  )
}

export default FormLabel
