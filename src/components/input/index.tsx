import { InputHTMLAttributes, forwardRef, useId } from 'react'
import { twMerge } from 'tailwind-merge'

const Colors = {
  error: 'border border-red-500 shadow-[0px_0px_5px_0px_#FEB2B2] ',
  success: 'border border-green-500 shadow-[0px_0px_5px_0px_#c6f6d5]',
  none: 'border-2 shadow-[0px_0px_5px_0px_#E2E8F0]',
}

type InputProps = {
  state?: 'error' | 'success' | 'none'
  label?: string
  error?: string
} & InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label = '',
      type = 'text',
      name = '',
      state = 'none',
      error = '',
      className,
      ...props
    },
    ref,
  ) => {
    const inputId = useId()
    const hasError = error.length > 0
    const colorInputAction = Colors[state]

    return (
      <>
        <label htmlFor={inputId} className="font-bold text-neutral-600 ">
          {label}
        </label>
        <input
          id={inputId}
          name={name}
          type={type}
          ref={ref}
          {...props}
          className={twMerge(
            'w-[100%] rounded-md border-2 p-2 outline-none',
            className,
            colorInputAction,
          )}
        />
        {hasError && <p className="text-xs text-red-600">{error}</p>}
      </>
    )
  },
)
