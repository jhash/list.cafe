import { PlusCircle } from 'lucide-react'

type AddItemButtonProps = Omit<React.HTMLProps<HTMLButtonElement>, 'type'> & {
  type?: 'submit' | 'reset' | 'submit'
}
export const AddItemButton: React.FC<AddItemButtonProps> = ({ ...props }) => (
  <button
    {...props}
    className="btn btn-secondary flex h-10 min-h-0 w-10 items-center justify-center rounded-full p-0"
  >
    <PlusCircle />
  </button>
)
