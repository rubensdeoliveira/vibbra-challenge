import { useRouter } from 'next/router'
import { AsideMenuItem, AsideMenuLabel } from './components'
import { asideMenuItemsInAndOut, asideMenuItemsPreferences } from './constants'
import Image from 'next/image'

export function Aside() {
  const { asPath } = useRouter()

  return (
    <aside className="flex h-screen w-full flex-col overflow-y-auto bg-gray-750">
      <Image src="/logo.png" alt="logo" width={400} height={400} />
      <div className="flex flex-1 flex-col justify-between">
        <nav className="flex flex-col">
          <AsideMenuLabel label="Entradas e Saídas" />
          {asideMenuItemsInAndOut.map(asideMenuItem => (
            <AsideMenuItem
              {...asideMenuItem}
              key={asideMenuItem.link}
              isActive={asPath.includes(asideMenuItem.link)}
            />
          ))}
          <AsideMenuLabel label="Preferências" className="mt-8" />
          {asideMenuItemsPreferences.map(asideMenuItem => (
            <AsideMenuItem
              {...asideMenuItem}
              key={asideMenuItem.link}
              isActive={asPath.includes(asideMenuItem.link)}
            />
          ))}
        </nav>
      </div>
    </aside>
  )
}
