import classNames from 'classnames'

export const Badge: React.FC<React.HTMLProps<HTMLDivElement>> = ({
  children,
  className,
}) => (
  <div
    className={classNames(
      'badge flex h-6 items-center rounded px-2 text-xs font-bold uppercase',
      className || 'badge-primary'
    )}
  >
    {children}
  </div>
)
