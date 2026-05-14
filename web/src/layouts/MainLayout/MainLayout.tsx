import { X } from 'lucide-react'

import { ToastBar, Toaster, toast } from '@redwoodjs/web/dist/toast'

type MainLayoutProps = React.HTMLProps<HTMLDivElement>
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <main className="flex min-h-full w-full max-w-full flex-grow flex-col overflow-x-hidden">
      {children}
      <Toaster
        containerClassName="min-w-screen max-w-screen sm:min-w-auto sm:max-w-auto z-50"
        toastOptions={{
          className:
            'min-w-[12rem] text-left justify-start min-h-12 py-0 flex items-center pr-2 z-50',
          duration: 3000,
          position: 'top-left',
        }}
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                <div className="flex flex-grow items-center justify-start">
                  {message}
                </div>
                {t.type !== 'loading' && (
                  <button
                    onClick={() => toast.dismiss(t.id)}
                    className="btn btn-ghost h-7 min-h-0 w-7 p-0"
                  >
                    <X size="1.125rem" />
                  </button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
    </main>
  )
}

export default MainLayout
