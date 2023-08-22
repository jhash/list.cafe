import { SidebarButton } from 'src/layouts/SidebarLayout/SidebarLayout'

const PageTitle = ({ children }) => {
  return (
    <h1 className="flex h-16 select-none items-center gap-3 font-bricolageGrotesque text-3xl font-bold">
      <SidebarButton />
      {children}
    </h1>
  )
}

export default PageTitle
