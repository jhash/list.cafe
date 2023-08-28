import MainLayout from "../MainLayout/MainLayout";

import Loading from 'src/components/Loading'

type LoadingLayoutProps = {
  children?: React.ReactNode
}

const LoadingLayout = ({ children }: LoadingLayoutProps) => {
  return <MainLayout><Loading /></MainLayout>
}

export default LoadingLayout
