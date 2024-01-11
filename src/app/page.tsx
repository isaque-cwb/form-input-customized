'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeEvent, useState } from 'react'
import { Input } from '@/components/input'
import { z } from 'zod'
import { InputCustomMask } from '@/components/input-mask'

export const schema = z
  .object({
    name: z.string().min(3, 'Campo "Nome" é obrigatório'),
    password: z.string().min(6, 'informe um senha com 6 dígitos no mínimo'),
    confirmPass: z.string().min(6, 'informe um senha com 6 dígitos no mínimo'),
    cpf: z.coerce.string(), // .min(5, 'CPF deve conter 11 dígitos'),
    tel: z.coerce.string(),
    cep: z.coerce.string(),
    //   .min(11, 'digite o número de telefone completo com DDD'),
  })
  .refine((data) => data.password === data.confirmPass, {
    path: ['confirmPass'],
    message: 'As senhas precisam ser iguais',
  })

export type DataProps = z.infer<typeof schema>

export default function Home() {
  const [data, setData] = useState({} as DataProps)
  const [cpf, setCpf] = useState('')
  const [tel, setTel] = useState('')
  const [cep, setCep] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [isValidTel, setIsValidTel] = useState(false)
  const [isValidCep, setIsValidCep] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataProps>({
    mode: 'all',
    resolver: zodResolver(schema),
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const cleanedCpf = e.target.value // .replace(/[^0-9]/g, '') // Remove pontos e traço
    setCpf(cleanedCpf)

    if (cleanedCpf.length === 14) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }
  const handleChangeTel = (e: ChangeEvent<HTMLInputElement>) => {
    const cleanedTel = e.target.value // .replace(/[^0-9]/g, '') // Remove pontos e traço
    setTel(cleanedTel)

    if (cleanedTel.length === 15) {
      setIsValidTel(true)
    } else {
      setIsValidTel(false)
    }
  }
  const handleChangeCep = (e: ChangeEvent<HTMLInputElement>) => {
    const cleanedCep = e.target.value // .replace(/[^0-9]/g, '') // Remove pontos e traço
    setCep(cleanedCep)

    if (cleanedCep.length === 10) {
      setIsValidCep(true)
    } else {
      setIsValidCep(false)
    }
  }

  const handleSubmitData = (data: DataProps) => {
    if (isValid && isValidTel && isValidCep) {
      setData({
        ...data,
        cpf,
        tel,
        cep,
      })
    }
  }

  return (
    <div className="flex h-screen  items-center  justify-center bg-gray-200">
      <div className="h-auto w-[90%] rounded-lg  bg-white p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] lg:w-[700px]">
        <form
          onSubmit={handleSubmit(handleSubmitData)}
          className="mx-4 flex flex-col gap-2"
        >
          <h1 className="text-2xl font-bold">Form - com Input Customizados</h1>
          <Input
            {...register('name')}
            label="Nome"
            type="text"
            error={errors.name?.message}
            placeholder="Digite seu nome"
            state={errors.name?.message ? 'error' : 'success'}
          />
          <Input
            {...register('password')}
            label="Senha"
            type="password"
            error={errors.password?.message}
            placeholder="Digite sua Senha"
            className="w-[100%] rounded-md border-2 p-2 outline-none"
            state={errors.password?.message ? 'error' : 'success'}
          />
          <Input
            {...register('confirmPass')}
            label="Confirmar Senha"
            type="password"
            error={errors.confirmPass?.message}
            placeholder="Confirme sua Senha"
            className="w-[100%] rounded-md border-2 p-2 outline-none"
            state={errors.confirmPass?.message ? 'error' : 'success'}
          />
          <InputCustomMask
            name="cpf"
            mask="999.999.999-99"
            label="CPF"
            error={cpf ? (isValid ? '' : 'CPF deve conter 11 dígitos') : ''}
            state={cpf ? (isValid ? 'success' : 'error') : 'none'}
            value={cpf}
            placeholder="999.999.999-99"
            onChange={handleChange}
          />
          <InputCustomMask
            name="tel"
            mask="(99) 99999-9999"
            label="Telefone"
            placeholder="(99) 99999-9999"
            error={
              tel
                ? isValidTel
                  ? ''
                  : 'número do telefone deve conter DDD'
                : ''
            }
            state={tel ? (isValidTel ? 'success' : 'error') : 'none'}
            value={tel}
            onChange={handleChangeTel}
          />
          <InputCustomMask
            name="cep"
            mask="99.999-999"
            label="CEP"
            error={cep ? (isValidCep ? '' : 'cep deve conter 8 dígitos') : ''}
            state={cep ? (isValidCep ? 'success' : 'error') : 'none'}
            value={cep}
            placeholder="99.999-999"
            onChange={handleChangeCep}
          />

          <button
            type="submit"
            className=" my-4 w-[100%] rounded-md bg-green-700  p-2 text-white outline-none"
          >
            Salvar
          </button>
          {data.name ? (
            <pre className="flex items-center justify-center ">
              {JSON.stringify(data, null, 2)}
            </pre>
          ) : (
            <p></p>
          )}
        </form>
      </div>
    </div>
  )
}
