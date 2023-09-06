import classNames from 'classnames'

export const Badge: React.FC<React.HTMLProps<HTMLDivElement>> = ({
  children,
  className,
}) => (
  <div
    className={classNames(
      'badge flex h-6 flex-shrink-0 items-center justify-start overflow-hidden overflow-ellipsis whitespace-nowrap rounded px-2 font-sans text-xs font-bold uppercase shadow-sm',
      className || 'badge-primary'
    )}
  >
    {children}
  </div>
)
