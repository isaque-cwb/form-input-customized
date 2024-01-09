'use client'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { DataProps, Input, schema } from '@/components/input'
import { PatternFormat } from 'react-number-format'

export default function Home() {
  const [data, setData] = useState({} as DataProps)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataProps>({
    mode: 'all',
    resolver: zodResolver(schema),
  })

  const handleSubmitData = (data: DataProps) => {
    setData(data)
  }

  return (
    <div className="flex h-screen  items-center  justify-center bg-gray-200">
      <div className="h-auto w-[90%] rounded-lg border-2 border-slate-300 bg-white p-4 shadow-xl lg:w-[700px]">
        <form
          onSubmit={handleSubmit(handleSubmitData)}
          className="mx-4 flex flex-col gap-2 "
        >
          <h1 className="text-2xl font-bold">Input</h1>

          <Input
            {...register('name')}
            label="Nome"
            type="text"
            error={errors.name?.message}
            placeholder="Digite seu nome"
          />

          <Input
            {...register('password')}
            label="Senha"
            type="password"
            error={errors.password?.message}
            placeholder="Digite sua Senha"
            className="w-[100%] rounded-md border-2 p-2 outline-none"
          />
          <Input
            {...register('confirmPass')}
            label="Confirmar Senha"
            type="password"
            error={errors.confirmPass?.message}
            placeholder="Confirme sua Senha"
            className="w-[100%] rounded-md border-2 p-2 outline-none"
          />

          <Controller
            name="cpf"
            control={control}
            render={({ field }) => (
              <PatternFormat
                format={'###.###.###-##'}
                {...field}
                customInput={Input}
                label="CPF"
                placeholder="999.999.999-99"
                error={errors.cpf?.message}
              />
            )}
          />

          <Controller
            name="tel"
            control={control}
            render={({ field }) => (
              <PatternFormat
                format={'(##) #####-####'}
                {...field}
                customInput={Input}
                label="Fone"
                placeholder="(99) 99999-9999"
                error={errors.tel?.message}
              />
            )}
          />

          <button
            type="submit"
            className=" my-4 w-[100%] rounded-md bg-green-700  p-2 text-white outline-none"
          >
            Salvar
          </button>
        </form>
        <div className="flex items-center justify-center gap-2">
          <p>{data.name}</p>
          <p>{data.password}</p>
          <p>{data.cpf}</p>
          <p>{data.tel}</p>
        </div>
      </div>
    </div>
  )
}
