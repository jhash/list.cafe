import classNames from 'classnames'

interface ListFadeOutProps {
  lines?: number
  noHeight?: boolean
}

const ListFadeOut: React.FC<ListFadeOutProps> = ({
  lines = 5,
  noHeight = false,
}) => {
  return (
    <div
      className={classNames(
        'flex flex-col overflow-visible',
        noHeight && 'max-h-0 tall:max-h-none'
      )}
    >
      <div className="flex flex-col gap-6">
        {[...Array(lines).keys()].map((value) => (
          <div
            key={value}
            className="h-1.5 rounded bg-gray-400"
            style={{
              opacity: ((lines - value) / lines) * 0.15,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default ListFadeOut
