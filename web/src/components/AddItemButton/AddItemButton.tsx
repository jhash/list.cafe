import { PlusCircle } from 'lucide-react'

type AddItemButtonProps = Omit<React.HTMLProps<HTMLButtonElement>, 'type'> & {
  type?: 'submit' | 'reset' | 'submit'
}
export const AddItemButton: React.FC<AddItemButtonProps> = ({ ...props }) => (
  <button
    {...props}
    type="button"
    className="btn btn-secondary flex h-8 min-h-0 w-8 items-center justify-center rounded-full p-0"
  >
    <PlusCircle size="1.25rem" />
  </button>
)
