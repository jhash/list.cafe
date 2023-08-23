import { SidebarButton } from 'src/layouts/SidebarLayout/SidebarLayout'

type PageTitleProps = React.HTMLProps<HTMLDivElement> & {
  title?: string
}
const PageTitle: React.FC<PageTitleProps> = ({ title, children }) => {
  return (
    <div className="flex h-16 w-full min-w-0 max-w-full select-none items-center gap-3 pl-8 font-bricolageGrotesque text-3xl font-bold sm:pl-0">
      <SidebarButton />
      <div className="flex min-w-0 flex-shrink flex-grow basis-auto flex-nowrap items-center justify-start overflow-hidden text-ellipsis whitespace-nowrap">
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
