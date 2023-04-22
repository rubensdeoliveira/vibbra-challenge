import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { FaCaretDown } from 'react-icons/fa'

export function Header() {
  const { data } = useSession()

  return (
    <header className="flex justify-between">
      <h1>Dashboard</h1>
      <div className="flex gap-6">
        {data?.user.image ? (
          <Image alt="" src={data.user.image} width={56} height={56} />
        ) : (
          <div className="placeholder avatar">
            <div className="w-14 rounded-full bg-neutral-focus text-neutral-content">
              <span>MX</span>
            </div>
          </div>
        )}
        <span>{data?.user.name}</span>
        <FaCaretDown size={12} />
      </div>
    </header>
  )
}
