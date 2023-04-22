import { ReactNode } from 'react'
import { Header } from './components'
import Link from 'next/link'

type DrawerProps = {
  children: ReactNode
}

export function Navbar({ children }: DrawerProps) {
  return (
    <div className="drawer-mobile drawer">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <Header />
        <div className="p-[3.125rem]">{children}</div>
        <label
          htmlFor="my-drawer-2"
          className="btn-primary drawer-button btn lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu w-[345px] bg-base-100 p-4 text-base-content">
          <li>
            <Link href="/companies">Empresas Parceiras</Link>
          </li>
          <li>
            <Link href="/categories">Categorias de Despesas</Link>
          </li>
          <li>
            <a>Lançar Despesa</a>
          </li>
          <li>
            <a>Lançar Nota Fiscal</a>
          </li>
        </ul>
      </div>
    </div>
  )
}
