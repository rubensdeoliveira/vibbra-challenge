import { Button } from '../../../button'
import { TableActionButton } from '../../table.component'
import { TableSearch } from './components'

type TableActionProps = {
  actionButton: TableActionButton
}

export function TableAction({ actionButton }: TableActionProps) {
  return (
    <div className="mb-10 flex items-center justify-between">
      <TableSearch />
      <Button onClick={actionButton.action} label={actionButton.label} />
    </div>
  )
}
