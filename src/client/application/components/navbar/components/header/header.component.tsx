import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { FaCaretDown } from 'react-icons/fa'

export function Header() {
  const { data } = useSession()

  return (
    <header className="m-[0_auto] flex w-full max-w-[1465px] items-center justify-between px-[3.125rem] py-8">
      <h1 className="text-[1.875rem] font-semibold">Dashboard</h1>

      <div className="dropdown-end dropdown dropdown-hover">
        <label tabIndex={0} className="flex cursor-pointer items-center gap-4">
          {data?.user.image ? (
            <Image
              alt=""
              src={data.user.image}
              width={56}
              height={56}
              className="m-1 h-14 w-14 rounded-xl"
            />
          ) : (
            <div className="placeholder avatar">
              <div className="w-14 rounded-full bg-neutral-focus text-neutral-content">
                <span>{data?.user.name?.charAt(0)}</span>
              </div>
            </div>
          )}
          <span>{data?.user.name?.split(' ')[0]}</span>
          <FaCaretDown size={12} />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
        >
          <li>
            <button onClick={() => signOut()}>Sair</button>
          </li>
        </ul>
      </div>
    </header>
  )
}
