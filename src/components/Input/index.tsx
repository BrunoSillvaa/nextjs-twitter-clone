import { ChangeEvent } from 'react'

interface InputProps {
  placeholder?: string
  value?: string
  type?: string
  error?: boolean
  errorMessage?: string
  disabled?: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function Input({
  placeholder,
  value,
  type,
  disabled,
  onChange
}: InputProps) {
  return (
    <input
      type={type}
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      onChange={onChange}
      className='
        w-full
        rounded-md
        border-2
        border-neutral-800
        bg-black
        p-4
        text-lg
        text-white
        outline-none
        transition
        focus:border-2
        focus:border-sky-500
        disabled:cursor-not-allowed
        disabled:bg-neutral-900
        disabled:opacity-70
      '
    />
  )
}
