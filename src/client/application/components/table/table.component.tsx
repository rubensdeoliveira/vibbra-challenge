import { SetStateAction } from 'jotai'
import {
  TableAction,
  TableBody,
  TableHeader,
  TableNavigation,
} from './components'
import { ListEntitiesModel } from '@/server/domain/models/common'

export type TableHeader = {
  columnName: string
  columnLabel: string
}

export type TableActions = {
  create?: {
    label: string
    action: () => void
  }
  update?: {
    action: (id: string) => void
  }
  delete?: {
    action: (id: string) => void
  }
}

export type TableProps = {
  header: TableHeader[]
  data: ListEntitiesModel<any> | undefined
  actions?: TableActions
}

export function Table({ header, data, actions }: TableProps) {
  if (!data) {
    return null
  }

  return (
    <>
      <div className="w-full max-w-[1465px] overflow-x-auto">
        <TableAction actions={actions} />
        <table className="table w-full rounded-[14px] bg-gray-800">
          <TableHeader header={header} actions={actions} />
          <TableBody data={data} header={header} actions={actions} />
        </table>
      </div>
      <TableNavigation data={data} />
    </>
  )
}
