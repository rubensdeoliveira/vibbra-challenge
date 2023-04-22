import { ListEntitiesModel } from '@/server/domain/models/common'
import { TableHeader } from '../../table.component'
import { Td, Th } from '../table-header/components'

type TableBodyProps = {
  header: TableHeader[]
  data: ListEntitiesModel<any>
}

export function TableBody({ data, header }: TableBodyProps) {
  return (
    <tbody>
      {data.data.map((dataItem: any, index: number) => (
        <tr key={index}>
          <Th type={'body'} className="pl-8 pr-0">
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </Th>
          {header.map(headerItem => (
            <Td key={headerItem.columnName}>
              {dataItem[headerItem.columnName]}
            </Td>
          ))}
          <Th type={'body'}>
            <button className="btn-ghost btn-xs btn">details</button>
          </Th>
        </tr>
      ))}
    </tbody>
  )
}
