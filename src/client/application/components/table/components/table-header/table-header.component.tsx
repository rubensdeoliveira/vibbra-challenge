import { TableHeader } from '../../table.component'
import { Th } from './components'

type TableHeaderProps = {
  header: TableHeader[]
}

export function TableHeader({ header }: TableHeaderProps) {
  return (
    <thead className="rounded-[14px]">
      <tr>
        <Th className="w-[80px] rounded-l-[14px] pl-8">
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </Th>
        {header.map(headerItem => (
          <Th key={headerItem.columnName} className="min-w-[200px]">
            {headerItem.columnLabel}
          </Th>
        ))}
        <Th className="w-[80px] rounded-r-[14px]">{''}</Th>
      </tr>
    </thead>
  )
}
