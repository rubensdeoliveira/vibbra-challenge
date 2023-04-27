import { ReactNode } from 'react'
import { Navbar } from '../navbar'

type DataHandlerProps = {
  children: ReactNode
  isLoading: boolean
  isError: boolean
}

export function DataHandler({
  children,
  isLoading,
  isError,
}: DataHandlerProps) {
  if (isLoading) {
    return (
      <Navbar>
        <p>carregando...</p>
      </Navbar>
    )
  }

  if (isError) {
    return (
      <Navbar>
        <p>Erro...</p>
      </Navbar>
    )
  }

  return <>{children}</>
}
