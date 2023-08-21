import classNames from 'classnames'

import { Toaster } from '@redwoodjs/web/dist/toast'

import { useFontFacesLoaded } from 'src/hooks/useFontFacesLoaded'

const MainLayout = ({ children }) => {
  const fontsLoaded = useFontFacesLoaded()

  return (
    <main
      className={classNames(
        'flex h-full min-h-full w-full max-w-full flex-grow flex-col overflow-x-hidden transition-opacity duration-500 ease-in',
        fontsLoaded ? 'opacity-100' : 'opacity-0'
      )}
    >
      <Toaster toastOptions={{ className: 'rw-toast', duration: 3000 }} />
      {children}
    </main>
  )
}

export default MainLayout
