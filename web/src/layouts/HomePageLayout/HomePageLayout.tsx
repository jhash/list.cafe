type HomePageLayoutProps = {
  children?: React.ReactNode
}

const HomePageLayout = ({ children }: HomePageLayoutProps) => {
  return (
    <div className="flex flex-grow select-none flex-col items-center justify-center">
      <div className="flex w-full max-w-2xl flex-col gap-8">{children}</div>
    </div>
  )
}

export default HomePageLayout
