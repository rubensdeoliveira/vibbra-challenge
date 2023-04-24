import { ReactNode } from 'react'
import { Aside, Header } from './components'

type DrawerProps = {
  children: ReactNode
}

export function Navbar({ children }: DrawerProps) {
  return (
    <div className="drawer-mobile drawer">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <Header />
        <div className="flex flex-col items-center p-[3.125rem]">
          {children}
        </div>
        <label
          htmlFor="my-drawer-2"
          className="btn-primary drawer-button btn lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu w-[345px] bg-base-100 text-base-content">
          <Aside />
        </ul>
      </div>
    </div>
  )
}
