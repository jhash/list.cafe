interface ListFadeOutProps {
  lines?: number
}

const ListFadeOut: React.FC<ListFadeOutProps> = ({ lines = 5 }) => {
  return (
    <div className="flex max-h-0 flex-col overflow-visible">
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
