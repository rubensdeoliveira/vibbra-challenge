import { useAtom } from 'jotai'

import { pageAtom, searchAtom } from '@/client/application/atoms'
import { DataHandler, Navbar, Table } from '@/client/application/components'
import { withSSRAuthenticated } from '@/client/application/helpers'
import { api } from '@/shared/utils'
import Router from 'next/router'
import { FiEdit2, FiTrash } from 'react-icons/fi'

export const getServerSideProps = withSSRAuthenticated(async () => {
  return {
    props: {},
  }
})

export default function ListReceipts() {
  const [page] = useAtom(pageAtom)
  const [search] = useAtom(searchAtom)
  const utils = api.useContext()

  const { data, isLoading, isError } = api.receipt.list.useQuery({
    page,
    search,
  })
  const { mutate: deleteReceipt } = api.receipt.delete.useMutation({
    onSuccess: () => {
      utils.receipt.list.invalidate()
    },
    onError: err => {
      console.log(err)
    },
  })

  async function handleNavigateToAddPage() {
    await Router.push('/receipts/add')
  }

  async function handleNavigateToEditPage(id: string) {
    await Router.push(`/receipts/edit/${id}`)
  }

  async function handleDeleteItem(id: string) {
    deleteReceipt({ id })
  }

  return (
    <DataHandler isLoading={isLoading} isError={isError}>
      <Navbar>
        <Table
          actions={{
            createButton: {
              action: handleNavigateToAddPage,
              label: 'Lançar Nota Fiscal',
            },
            tableRowActions: [
              { action: handleNavigateToEditPage, icon: FiEdit2 },
              { action: handleDeleteItem, icon: FiTrash },
            ],
          }}
          header={[
            {
              columnLabel: 'Número da NF',
              columnName: 'number',
            },
            {
              columnLabel: 'Descriçāo',
              columnName: 'description',
            },
          ]}
          data={data}
        />
      </Navbar>
    </DataHandler>
  )
}
