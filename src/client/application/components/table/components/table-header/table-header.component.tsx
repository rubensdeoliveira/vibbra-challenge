import { TableHeader } from '../../table.component'

type TableHeaderProps = {
  header: TableHeader[]
}

export function TableHeader({ header }: TableHeaderProps) {
  return (
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        {header.map(headerItem => (
          <th key={headerItem.columnName}>{headerItem.columnLabel}</th>
        ))}
        <th>Action</th>
      </tr>
    </thead>
  )
}
