import { ListEntitiesProps, TableHeader } from '../../table.component'

type TableBodyProps = {
  header: TableHeader[]
  data: ListEntitiesProps<any>
}

export function TableBody({ data, header }: TableBodyProps) {
  return (
    <tbody>
      {data.data.map((dataItem: any, index: number) => (
        <tr key={index}>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          {header.map(headerItem => (
            <td key={headerItem.columnName}>
              {dataItem[headerItem.columnName]}
            </td>
          ))}
          <th>
            <button className="btn-ghost btn-xs btn">details</button>
          </th>
        </tr>
      ))}
    </tbody>
  )
}
