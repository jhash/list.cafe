import { Children, useEffect, useState } from 'react'

const RotatingText = ({ children }) => {
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

  return (
    <div className="flex h-16 flex-col overflow-hidden py-2">
      <div
        className="flex flex-col flex-nowrap gap-4 whitespace-nowrap transition-transform duration-200"
        style={{ transform: `translateY(-${index * 4}rem)` }}
      >
        {children}
      </div>
    </div>
  )
}

export default RotatingText
