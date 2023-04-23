import { ListEntitiesModel } from '@/server/domain/models/common'
import { TableHeader } from '../../table.component'
import { Td } from './components'

type TableBodyProps = {
  header: TableHeader[]
  data: ListEntitiesModel<any>
}

export function TableBody({ data, header }: TableBodyProps) {
  return (
    <tbody>
      {data.data.map((dataItem: any, index: number) => (
        <tr key={index}>
          <Td className="w-[80px] pl-8">
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </Td>
          {header.map(headerItem => (
            <Td key={headerItem.columnName} className="min-w-[200px]">
              {dataItem[headerItem.columnName]}
            </Td>
          ))}
          <Td>
            <button className="btn-ghost btn-xs btn w-[80px]">d</button>
          </Td>
        </tr>
      ))}
    </tbody>
  )
}
