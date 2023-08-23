import { SidebarButton } from 'src/layouts/SidebarLayout/SidebarLayout'

type PageTitleProps = React.HTMLProps<HTMLDivElement> & {
  title?: string
}
const PageTitle: React.FC<PageTitleProps> = ({ title, children }) => {
  return (
    <div className="flex h-16 w-full min-w-0 max-w-full select-none items-center gap-3 overflow-x-hidden font-bricolageGrotesque text-3xl font-bold">
      <SidebarButton />
      <div className="flex min-w-0 flex-1 flex-shrink flex-grow flex-nowrap items-center justify-start overflow-hidden overflow-ellipsis whitespace-nowrap">
        {title || children}
      </div>

      {title ? (
        <div className="flex min-w-0 flex-shrink-0 flex-grow-0 items-center">
          {children}
        </div>
      ) : null}
    </div>
  )
}

export default PageTitle
