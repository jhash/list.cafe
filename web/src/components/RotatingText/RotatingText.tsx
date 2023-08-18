import { Children, useEffect, useState } from 'react'

interface RotatingTextProps {
  size?: number
}
const RotatingText: React.FC<React.HTMLProps<RotatingTextProps>> = ({
  // size,
  children,
}) => {
  const [index, setIndex] = useState<number>(0)
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | undefined>()

  const clear = () => {
    if (intervalId) {
      clearInterval(intervalId)
    }
  }

  useEffect(() => {
    clear()

    const numberOfChildren = Children.count(children)

    setIntervalId(
      setInterval(() => {
        if (index === numberOfChildren - 1) {
          setIndex(0)
          return
        }
        setIndex(index + 1)
      }, 2000)
    )

    return () => clear()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  // + 1 because py-2 adds a total of 1rem around
  // const endSize = size + 1

  return (
    <span className={`flex h-16 flex-col overflow-hidden py-2 leading-none`}>
      <span
        className="flex flex-col flex-nowrap gap-4 whitespace-nowrap transition-transform duration-200"
        style={{ transform: `translateY(-${index * 4}rem)` }}
      >
        {children}
      </span>
    </span>
  )
}

export default RotatingText
