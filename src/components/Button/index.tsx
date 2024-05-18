interface ButtonProps {
  onClick: () => void
  label: string
  secondary?: boolean
  fullWidth?: boolean
  large?: boolean
  disabled?: boolean
  outlined?: boolean
}

export function Button({
  label,
  secondary,
  fullWidth,
  large,
  onClick,
  disabled,
  outlined,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
      ${fullWidth ? 'w-full' : 'w-fit'}
      ${secondary ? 'bg-white' : 'bg-sky-500'}
      ${secondary ? 'text-black' : 'text-white'}
      ${secondary ? 'border-black' : 'border-sky-500'}
      ${large ? 'text-xl' : 'text-md'}
      ${large ? 'px-5' : 'px-4'}
      ${large ? 'py-3' : 'py-2'}
      ${outlined && 'bg-transparent'}
      ${outlined && 'border-white'}
      ${outlined && 'text-white'}
      rounded-full
      border-2
      font-semibold
      transition
      hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70
      `}
    >
      {label}
    </button>
  )
}
