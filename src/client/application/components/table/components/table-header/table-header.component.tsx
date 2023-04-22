import { TableHeader } from '../../table.component'
import { Th } from './components'

type TableHeaderProps = {
  header: TableHeader[]
}

export function TableHeader({ header }: TableHeaderProps) {
  return (
    <thead className="rounded-[14px]">
      <tr>
        <Th className="rounded-l-[14px] pl-8">
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </Th>
        {header.map(headerItem => (
          <Th key={headerItem.columnName}>{headerItem.columnLabel}</Th>
        ))}
        <Th className="rounded-r-[14px]">{''}</Th>
      </tr>
    </thead>
  )
}
