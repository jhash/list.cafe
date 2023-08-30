type HomeContainerLayoutProps = {
  children?: React.ReactNode
}

const HomeContainerLayout = ({ children }: HomeContainerLayoutProps) => {
  return (
    <div className="flex flex-grow flex-col items-center justify-center">
      <div className="container flex flex-col gap-12">{children}</div>
    </div>
  )
}

export default HomeContainerLayout
