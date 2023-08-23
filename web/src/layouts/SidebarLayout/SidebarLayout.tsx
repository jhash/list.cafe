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
  const { open, closing } = state
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
        <div className="relative flex flex-grow">
          {!open && (
            <div
              className={classNames(
                'pointer-events-auto absolute bottom-0 left-0 top-0 hidden w-2 cursor-pointer md:flex'
              )}
              onMouseEnter={startHovering}
              // onMouseLeave={stopHovering}
            />
          )}
          {open && (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div
              className={classNames(
                'pointer-events-auto absolute bottom-0 left-0 right-0 top-0 z-10 flex flex-grow transition-opacity md:hidden',
                open ? 'opacity-80' : 'opacity-0'
              )}
              onClick={() => setState({ open: false, closing: false })}
              style={{ background: 'hsl(var(--b1) / var(--tw-bg-opacity, 1))' }}
            />
          )}
          <div
            className={classNames(
              'absolute bottom-0 left-0 top-0 z-10 flex w-sidebar flex-shrink-0 flex-grow flex-col flex-nowrap gap-y-2 overflow-hidden whitespace-nowrap border-r transition-maxWidth duration-300',
              !open && !hovering && 'max-w-0 -translate-x-[1px]',
              (open || closing) && 'md:static md:bottom-auto md:left-auto',
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
          <div className="flex flex-grow flex-col gap-y-2 px-4">
            <div className="flex flex-grow flex-col gap-y-10">{children}</div>
          </div>
        </div>
      </MainLayout>
    </SidebarContext.Provider>
  )
}

export const SidebarButton = () => {
  const { open, toggle } = useContext(SidebarContext)

  return (
    <button
      className="btn btn-ghost flex items-center p-2"
      onClick={toggle}
      type="button"
    >
      {open ? <PanelLeftClose /> : <PanelLeft />}
    </button>
  )
}

export default SidebarLayout
