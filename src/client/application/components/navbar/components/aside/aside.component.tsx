import { useRouter } from 'next/router'
import { AsideMenuItem, AsideMenuLabel } from './components'
import { asideMenuItems } from './constants'
import { FiFileText } from 'react-icons/fi'

export function Aside() {
  const { asPath } = useRouter()

  return (
    <aside className="flex h-screen w-full flex-col overflow-y-auto bg-gray-750 pt-[137px]">
      <div className="flex flex-1 flex-col justify-between">
        <nav className="flex flex-col">
          <AsideMenuLabel label="Principal" />
          {asideMenuItems.map(asideMenuItem => (
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
