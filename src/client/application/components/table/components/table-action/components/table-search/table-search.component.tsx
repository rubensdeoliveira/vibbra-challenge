import { pageAtom, searchAtom } from '@/client/application/atoms'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'

export function TableSearch() {
  const [atomSearch, setAtomSearch] = useAtom(searchAtom)
  const [_, setPage] = useAtom(pageAtom)
  const [search, setSearch] = useState(atomSearch)

  useEffect(() => {
    if (search !== atomSearch) {
      const timerId = setTimeout(() => {
        setAtomSearch(search)
        setPage(1)
      }, 750)
      return () => clearTimeout(timerId)
    }
  }, [search, setAtomSearch, setPage, atomSearch])

  return (
    <div className="relative flex h-[56px] w-full max-w-[414px] items-center">
      <button className="absolute right-4 cursor-default text-gray-200 focus:outline-none">
        <FiSearch size={24} />
      </button>

      <input
        placeholder="Pesquisar..."
        className="h-full w-full rounded-xl border-[1px] border-solid border-gray-750 bg-gray-1000 py-2.5 pl-5 pr-11 placeholder-gray-100 focus:outline-none"
        value={search}
        onChange={({ target: { value } }) => setSearch(value)}
        autoFocus={Boolean(search)}
      />
    </div>
  )
}
