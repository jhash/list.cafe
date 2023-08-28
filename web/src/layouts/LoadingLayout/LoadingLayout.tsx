import Loading from 'src/components/Loading'

import MainLayout from '../MainLayout/MainLayout'

type LoadingLayoutProps = {
  children?: React.ReactNode
}

const LoadingLayout = ({ children }: LoadingLayoutProps) => {
  return (
    <MainLayout>
      <Loading />
      {children}
    </MainLayout>
  )
}

export default LoadingLayout
