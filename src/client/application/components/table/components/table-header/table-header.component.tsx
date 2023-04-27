import { TableActions, TableHeader } from '../../table.component'
import { Th } from './components'

type TableHeaderProps = {
  header: TableHeader[]
  actions?: TableActions
}

export function TableHeader({ header, actions }: TableHeaderProps) {
  return (
    <thead className="rounded-[14px]">
      <tr>
        {header.map(headerItem => (
          <Th key={headerItem.columnName} className="min-w-[200px]">
            {headerItem.columnLabel}
          </Th>
        ))}
        {actions?.tableRowActions && actions.tableRowActions.length > 0 && (
          <Th className="w-[80px] rounded-r-[14px]">{''}</Th>
        )}
      </tr>
    </thead>
  )
}
