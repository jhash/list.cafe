import { HTMLProps } from "react";
import classNames from "classnames";
import { Disc3 } from "lucide-react";

type LoadingSize = "sm" | "md" | "lg"
type LoadingProps = HTMLProps<HTMLDivElement> & {
  size?: LoadingSize
}
const SIZE_MAP: { [key in LoadingSize]: { className?: string, size?: string } } = {
  sm: {
    className: "min-h-16",
    size: "3rem"
  },
  md: {
    className: "min-h-16",
    size: "3rem"
  },
  lg: {
    className: "min-h-16",
    size: "3rem"
  },
}
const Loading: React.FC<LoadingProps> = ({ className, size = 'md' }) => {
  return (
    <div className={classNames("flex w-full flex-grow animate-spin items-center justify-center min-h-16", className)}>
      <Disc3
        className="animate-spin"
        size="3rem"
      />
    </div>
  )
}

export default Loading
