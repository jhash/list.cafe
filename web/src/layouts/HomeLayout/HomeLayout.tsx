import classNames from 'classnames'
import { Coffee } from 'lucide-react'

import { DarkModeToggle } from 'src/components/DarkModeToggle'
import { useFontFacesLoaded } from 'src/hooks/useFontFacesLoaded'

type HomeLayoutProps = {
  children?: React.ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  const fontsLoaded = useFontFacesLoaded()

  return (
    <div
      className={classNames(
        'flex h-full min-h-full flex-grow flex-col transition-opacity duration-500 ease-in',
        fontsLoaded ? 'opacity-100' : 'opacity-0'
      )}
    >
      <nav className="flex flex-grow-0 items-center px-4 py-3">
        <div className="flex flex-grow select-none flex-nowrap items-center gap-3">
          <h1 className="font-bricolageGrotesque text-3xl">list.cafe</h1>
          <Coffee />
        </div>
        <DarkModeToggle />
      </nav>
      <div className="flex flex-grow flex-col px-4">{children}</div>
    </div>
  )
}

export default HomeLayout
