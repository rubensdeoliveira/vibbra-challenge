import { ListEntitiesModel } from '@/server/domain/models/common'
import { TableActions, TableHeader } from '../../table.component'
import { Td } from './components'
import { FiEdit2, FiTrash } from 'react-icons/fi'

type TableBodyProps = {
  header: TableHeader[]
  data: ListEntitiesModel<any>
  actions?: TableActions
}

export function TableBody({ data, header, actions }: TableBodyProps) {
  return (
    <tbody>
      {data.data.map((dataItem: any, index: number) => (
        <tr
          key={index}
          className={`${
            index < data.data.length - 1
              ? 'border-b-[1px] border-solid border-gray-600'
              : ''
          }`}
        >
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
          {actions && (
            <Td className="min-w-[130px]">
              <div className="flex items-center gap-[1.625rem]">
                {actions?.update && (
                  <button
                    className="text-gray-350 transition-all hover:text-gray-350/70"
                    onClick={() =>
                      actions.update && actions.update.action(dataItem.id)
                    }
                  >
                    <FiEdit2 size={24} />
                  </button>
                )}
                {actions?.delete && (
                  <button
                    className="text-gray-350 transition-all hover:text-gray-350/70"
                    onClick={() =>
                      actions.delete && actions.delete.action(dataItem.id)
                    }
                  >
                    <FiTrash size={24} />
                  </button>
                )}
              </div>
            </Td>
          )}
        </tr>
      ))}
    </tbody>
  )
}
