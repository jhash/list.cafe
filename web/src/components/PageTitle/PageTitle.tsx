import { SidebarButton } from 'src/layouts/SidebarLayout/SidebarLayout'

type PageTitleProps = React.HTMLProps<HTMLDivElement> & {
  title?: string
}
const PageTitle: React.FC<PageTitleProps> = ({ title, children }) => {
  return (
    <div className="flex h-16 select-none items-center gap-3 font-bricolageGrotesque text-3xl font-bold">
      <SidebarButton />
      <div className="flex flex-grow items-center whitespace-nowrap">
        {title || children}
      </div>
      {title ? children : null}
    </div>
  )
}

export default PageTitle
