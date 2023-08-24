import './SidebarLayout.scss'

import React, { createContext, useContext, useEffect, useState } from 'react'

import { useWindowSize } from '@uidotdev/usehooks'
import classNames from 'classnames'
import { PanelLeft, PanelLeftClose } from 'lucide-react'

import { useLocation } from '@redwoodjs/router'

import HomeLink from 'src/components/HomeLink/HomeLink'

import MainLayout from '../MainLayout/MainLayout'

export const SidebarContext = createContext(null)

export interface SidebarProps {
  open: boolean
  toggle: () => void
}
export type SidebarType = React.ElementType<SidebarProps>

type SidebarLayoutProps = React.HTMLProps<HTMLDivElement> & {
  Sidebar: SidebarType
}
const SidebarLayout = ({ children, Sidebar }: SidebarLayoutProps) => {
  const { width } = useWindowSize()
  const { pathname } = useLocation()

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
    if (!width || !open || width >= 768) {
      return
    }

    close()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, pathname])

  return (
    <SidebarContext.Provider value={sidebarProps}>
      <MainLayout>
        <div className="relative flex w-full max-w-full flex-grow overflow-x-hidden">
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
          </div>
          <div
            className={classNames(
              'flex w-full max-w-full flex-grow flex-col items-center gap-y-2 overflow-x-visible px-4 transition-padding duration-300',
              open ? 'sm:pl-sidebar' : 'sm:pl-0'
            )}
          >
            <div className="container flex w-full flex-grow flex-col items-center justify-center sm:pl-12">
              <div className="flex min-h-full w-full max-w-full flex-col gap-y-6 sm:min-h-[85%]">
                {children}
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
        'btn btn-ghost fixed top-[0.475rem] z-30 flex h-12 min-h-0 w-10 flex-shrink-0 flex-grow-0 items-center rounded-lg rounded-l-none p-0 transition-left duration-300 sm:bottom-[0.475rem] sm:top-auto',
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
