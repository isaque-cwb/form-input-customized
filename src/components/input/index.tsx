import { InputHTMLAttributes, forwardRef, useId } from 'react'
import { z } from 'zod'

export const schema = z
  .object({
    name: z.string().min(3, 'Por favor, informe um nome válido'),
    password: z.string().min(6, 'informe um senha com 6 dígitos no mínimo'),
    confirmPass: z.string().min(6, 'informe um senha com 6 dígitos no mínimo'),
    cpf: z.string().min(5, 'CPF deve conter 11 dígitos'),
    tel: z.string().min(5, 'digite o número de telefone completo com DDD'),
  })
  .refine((data) => data.password === data.confirmPass, {
    path: ['confirmPass'],
    message: 'As senhas precisam ser iguais',
  })

export type DataProps = z.infer<typeof schema>

type InputProps = {
  label?: string
  error?: string
} & InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label = '', type = 'text', name = '', error = '', ...props }, ref) => {
    const inputId = useId()
    const hasError = error.length > 0

    const styleInput = `w-[100%] rounded-md border-2 p-2 
    ${hasError ? 'border-red-600' : 'border-green-400'} outline-none`

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
          className={styleInput}
        />
        {hasError && <p className="text-xs text-red-600">{error}</p>}
      </>
    )
  },
)
