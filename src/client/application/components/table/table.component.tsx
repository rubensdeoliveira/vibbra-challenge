import { SetStateAction } from 'jotai'
import {
  TableAction,
  TableBody,
  TableHeader,
  TableNavigation,
} from './components'
import { ListEntitiesModel } from '@/server/domain/models/common'
import { IconBaseProps } from 'react-icons'

export type TableHeader = {
  columnName: string
  columnLabel: string
}

type TableRowActionItem = {
  action: (id: string) => void
  icon: React.ComponentType<IconBaseProps>
  renderConditionally?: {
    column: string
    valueToRender: any
  }
}

export type TableActions = {
  createButton?: {
    label: string
    action: () => void
  }
  tableRowActions?: TableRowActionItem[]
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
