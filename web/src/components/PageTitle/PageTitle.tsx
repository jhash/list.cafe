import { useAuth } from 'src/auth'
import { SidebarButton } from 'src/layouts/SidebarLayout/SidebarLayout'

type PageTitleProps = React.HTMLProps<HTMLDivElement> & {
  title?: string
}
const PageTitle: React.FC<PageTitleProps> = ({ title, children }) => {
  const { isAuthenticated } = useAuth()

  return (
    <div className="flex min-h-20 w-full min-w-0 max-w-full select-none items-center gap-3 pl-8 font-serif text-3xl font-medium sm:pl-0">
      {!!isAuthenticated && <SidebarButton />}
      <div className="flex min-w-0 flex-shrink flex-grow basis-auto flex-nowrap items-center justify-start gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
        {title || children}
      </div>

      {title ? (
        <div className="flex min-w-0 flex-shrink-0 flex-grow-0 items-center gap-2 text-ellipsis">
          {children}
        </div>
      ) : null}
    </div>
  )
}

export default PageTitle
