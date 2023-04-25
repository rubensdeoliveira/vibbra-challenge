import { Button } from '../../../button'
import { TableActions } from '../../table.component'
import { TableSearch } from './components'

type TableActionProps = {
  actions?: TableActions
}

export function TableAction({ actions }: TableActionProps) {
  return (
    <div className="mb-10 flex items-center justify-between">
      <TableSearch />
      {actions?.createButton && (
        <Button
          onClick={actions.createButton.action}
          label={actions.createButton.label}
        />
      )}
    </div>
  )
}
