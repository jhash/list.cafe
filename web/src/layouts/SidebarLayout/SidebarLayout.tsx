import './SidebarLayout.scss'

import React, { createContext, useContext, useEffect, useState } from 'react'

import classNames from 'classnames'
import { LogOut, PanelLeft, PanelLeftClose } from 'lucide-react'

import { useIsBrowser } from '@redwoodjs/prerender/browserUtils'
import { useLocation } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import HomeLink from 'src/components/HomeLink/HomeLink'
import Loading from 'src/components/Loading'
import PersonAvatar from 'src/components/PersonAvatar/PersonAvatar'

import MainLayout from '../MainLayout/MainLayout'

export const SidebarContext = createContext(null)

export interface SidebarProps {
  open: boolean
  toggle: () => void
}
export type SidebarType = React.ElementType<SidebarProps>

type SidebarLayoutProps = React.HTMLProps<HTMLDivElement> & {
  Sidebar: SidebarType
  skeleton?: boolean
}
const SidebarLayout = ({ children, Sidebar, skeleton }: SidebarLayoutProps) => {
  const browser = useIsBrowser()

  const { pathname } = useLocation()
  const { logOut, currentUser } = useAuth()

  const [state, setState] = useState<{ open: boolean; closing: boolean }>({
    open: true,
    closing: false,
  })
  const { open } = state
  const [hovering, setHovering] = useState<boolean>(false)

  const toggle = () => {
    if (open) {
      return close()
    }

    setState({ open: true, closing: false })
  }
  const sidebarProps: SidebarProps = { open, toggle }

  const close = () => {
    setState({ open: false, closing: true })
    setTimeout(() => setState({ open: false, closing: false }), 300)
  }

  const startHovering = (event) => {
    event?.stopPropagation()

    if (hovering) {
      return
    }

    setHovering(true)
  }
  const stopHovering = (event) => {
    event?.stopPropagation()
    setHovering(false)
  }

  useEffect(() => {
    if (!browser) {
      return
    }

    if (!window?.innerWidth || !open || window?.innerWidth >= 768) {
      return
    }

    close()
    setHovering(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [browser ? window?.innerWidth : undefined, pathname])

  useEffect(() => {
    setHovering(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <SidebarContext.Provider value={sidebarProps}>
      <MainLayout>
        <div className="relative flex w-full max-w-full flex-grow overflow-x-hidden overflow-y-visible">
          {!open && (
            <div
              className={classNames(
                'pointer-events-auto fixed bottom-0 left-0 top-0 hidden w-10 cursor-pointer bg-gray-500 opacity-[2%] shadow md:flex'
              )}
              onMouseEnter={startHovering}
              // onMouseLeave={stopHovering}
            />
          )}
          <button
            className={classNames(
              'fixed bottom-0 left-0 right-0 top-0 z-20 flex flex-grow transition-opacity md:hidden',
              open
                ? 'pointer-events-auto opacity-80'
                : 'pointer-events-none opacity-0'
            )}
            onClick={() => setState({ open: false, closing: false })}
            style={{ background: 'hsl(var(--b1) / var(--tw-bg-opacity, 1))' }}
          />
          <div
            className={classNames(
              'fixed bottom-0 left-0 top-0 z-40 flex max-h-full w-sidebar flex-shrink-0 flex-grow flex-col flex-nowrap gap-y-2 overflow-y-auto overflow-x-hidden whitespace-nowrap border-r transition-maxWidth duration-300',
              !open && !hovering && 'max-w-0 -translate-x-[1px]',
              // (open || closing) && 'md:static md:bottom-auto md:left-auto',
              (open || hovering) && 'max-w-sidebar'
            )}
            onMouseLeave={stopHovering}
            style={{
              background: 'hsl(var(--b1) / var(--tw-bg-opacity, 1))',
            }}
          >
            <div className="flex h-16 flex-grow-0 items-center justify-start px-4">
              <HomeLink />
            </div>
            <Sidebar {...sidebarProps} />
            <div className="flex w-full max-w-full flex-shrink-0 px-2 pb-[0.475rem]">
              <div className="dropdown-left dropdown-top dropdown relative ml-auto flex h-12 items-center">
                <button className="btn btn-ghost h-8 min-h-0 rounded-full p-0">
                  <PersonAvatar
                    person={currentUser?.person}
                    className="h-8 w-8 text-[0.375rem]"
                  />
                </button>
                <ul
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                  tabIndex={0}
                  className="dropdown-content z-[1] w-52 translate-x-[2.16rem] rounded-md border bg-base-100 p-0 shadow"
                >
                  <li className="m-0 flex h-10 items-center justify-start p-0">
                    <button
                      className="btn btn-ghost flex h-full min-h-0 w-full items-center justify-start gap-3 rounded-md p-0 px-3 text-base font-medium lowercase text-black no-underline dark:text-white"
                      onClick={() =>
                        window?.confirm('Are you sure you want to log out?') &&
                        logOut()
                      }
                      title="Log out"
                    >
                      <LogOut size="1.25rem" />
                      {'log out'}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className={classNames(
              'flex min-h-full w-full max-w-full flex-grow flex-col items-center gap-y-2 overflow-x-hidden overflow-y-visible px-4 transition-padding duration-300 sm:pl-0 sm:pr-14',
              open ? 'sm:pl-sidebar' : ''
            )}
          >
            <div
              className={classNames(
                'container flex min-h-full w-full max-w-full flex-grow flex-col items-center justify-start overflow-x-visible overflow-y-visible sm:pl-14'
              )}
            >
              <div className="flex min-h-full w-full max-w-full flex-col gap-y-6 overflow-x-visible overflow-y-visible sm:min-h-[85%]">
                {skeleton ? <Loading /> : children}
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </SidebarContext.Provider>
  )
}

export const SidebarButton = () => {
  const { open, toggle } = useContext(SidebarContext) || {}

  return (
    <button
      className={classNames(
        'btn btn-ghost absolute top-[0.475rem] z-30 flex h-12 min-h-0 w-10 flex-shrink-0 flex-grow-0 items-center rounded-lg rounded-l-none p-0 transition-left duration-300 sm:fixed sm:bottom-[0.475rem] sm:top-auto',
        open ? 'left-sidebar' : 'left-0'
      )}
      onClick={toggle}
      type="button"
    >
      {open ? <PanelLeftClose /> : <PanelLeft />}
    </button>
  )
}

export default SidebarLayout
