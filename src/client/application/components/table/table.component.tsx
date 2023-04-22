import { SetStateAction } from 'jotai'
import {
  TableAction,
  TableBody,
  TableHeader,
  TableNavigation,
  TableSearch,
} from './components'
import { ListEntitiesModel } from '@/server/domain/models/common'

export type TableHeader = {
  columnName: string
  columnLabel: string
}

export type TableActionButton = {
  label: string
  action: () => void
}

export type TableNavigation = {
  page: number
  setPage: (update: SetStateAction<number>) => void
}

export type TableProps = TableNavigation & {
  header: TableHeader[]
  data: ListEntitiesModel<any> | undefined
  actionButton: TableActionButton
}

export function Table({
  header,
  page,
  data,
  setPage,
  actionButton,
}: TableProps) {
  if (!data) {
    return null
  }

  return (
    <>
      <div className="w-full overflow-x-auto">
        <div className="flex justify-between">
          <TableSearch />
          <TableAction actionButton={actionButton} />
        </div>
        <table className="table w-full rounded-[14px] bg-gray-800">
          <TableHeader header={header} />
          <TableBody data={data} header={header} />
        </table>
      </div>
      <TableNavigation data={data} page={page} setPage={setPage} />
    </>
  )
}
