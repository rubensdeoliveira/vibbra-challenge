import { TableActionButton } from '../../table.component'

type TableActionProps = {
  actionButton: TableActionButton
}

export function TableAction({ actionButton }: TableActionProps) {
  return <button onClick={actionButton.action}>{actionButton.label}</button>
}
