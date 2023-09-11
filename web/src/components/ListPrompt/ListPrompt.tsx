import { HTMLProps } from 'react'
import {
  ClipboardEventHandler,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react'

import classNames from 'classnames'
import { Wand2 } from 'lucide-react'

import { navigate, routes } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/toast'

import Loading from 'src/components/Loading'
import { api } from 'src/lib/api'
import { DigestedList } from 'src/pages/HomePage/HomePage'

type ListPromptProps = HTMLProps<HTMLDivElement> & {
  onStart?: () => void
  onEnd?: () => void
  onSuccess?: (list: DigestedList) => void
}

const httpsEverywhere = (text?: string) => {
  const url = (text || '').trim()

  if (url.match(/\s/g) || !url.match(/\./g)) {
    throw new Error('Not a url')
  }

  if (!url.match(/https?/g)) {
    return `https://${url}`
  }

  return url
}

export const ListPrompt = ({
  children,
  onStart,
  onEnd,
  onSuccess,
  className,
}: ListPromptProps) => {
  const [digestingLink, setDigestingLink] = useState<boolean>(false)
  const firstListItemRef = useRef<HTMLInputElement>(null)

  const onSubmit = async (event?: FormEvent, text?: string) => {
    event?.preventDefault()
    event?.stopPropagation()

    const prompt = [firstListItemRef.current.value, text].join(' ').trim()
    ;(event.target as HTMLInputElement).value = prompt

    setDigestingLink(true)
    onStart?.()

    try {
      const url = httpsEverywhere(prompt)

      // This should fail if not valid
      const link = new URL(url)

      const { data } = await api.get('/digestLink', {
        params: {
          link,
        },
      })

      if (data) {
        if (onSuccess) {
          onSuccess(data)
          return
        }
        window?.localStorage?.setItem('listDraft', JSON.stringify(data))
        navigate(routes.listDraft())
        return
      }
    } catch (error) {
      try {
        const { data } = await api.get('/digestPrompt', {
          params: {
            prompt,
          },
        })

        if (data) {
          if (onSuccess) {
            onSuccess(data)
            return
          }
          window?.localStorage?.setItem('listDraft', JSON.stringify(data))
          navigate(routes.listDraft())
          return
        }
      } catch (error) {
        toast.error('We failed to create a list')
      }
    }

    setDigestingLink(false)
    onEnd?.()
  }

  const onPaste: ClipboardEventHandler<HTMLInputElement> = (event) => {
    onSubmit(undefined, event.clipboardData.getData('text'))
  }

  useEffect(() => {
    setImmediate(() => {
      firstListItemRef?.current?.focus()
    })
  }, [])

  return (
    <form
      className={classNames(
        'flex flex-grow select-text flex-col gap-7 p-1',
        className
      )}
      onSubmit={onSubmit}
    >
      {digestingLink && <Loading />}
      <div className="flex flex-grow flex-col">
        {!digestingLink && (
          <label
            htmlFor="list-item-1"
            className="label px-1.5 font-medium opacity-90"
          >
            <span className="label-text text-lg">
              Ask a question, enter a prompt, or paste a link here:
            </span>
          </label>
        )}
        <div className="relative flex animate-pulse items-center">
          <input
            type="text"
            className="input input-ghost input-lg flex flex-grow rounded-none border-l-0 border-r-0 border-t-0 border-b-gray-400 px-1.5 pr-12 outline-transparent focus:outline-transparent active:outline-transparent sm:text-3xl"
            // TODO: run through a list of these
            placeholder="Help me start my wedding registry"
            ref={firstListItemRef}
            name="list-item-1"
            id="list-item-1"
            onPaste={onPaste}
            disabled={digestingLink}
          />
          <Wand2 className="pointer-events-none absolute right-3 animate-bounce text-gray-400" />
        </div>
      </div>
      {children}
    </form>
  )
}
