import { useAtom } from 'jotai'

import { pageAtom, searchAtom } from '@/client/application/atoms'
import { Navbar, Table } from '@/client/application/components'
import { withSSRAuthenticated } from '@/client/application/helpers'
import { api } from '@/shared/utils'
import Router from 'next/router'
import { FiEdit2, FiTrash } from 'react-icons/fi'

export const getServerSideProps = withSSRAuthenticated(async () => {
  return {
    props: {},
  }
})

export default function ListCosts() {
  const [page] = useAtom(pageAtom)
  const [search] = useAtom(searchAtom)
  const utils = api.useContext()

  const { data } = api.cost.list.useQuery({
    page,
    search,
  })
  const { mutate: deleteCost } = api.cost.delete.useMutation({
    onSuccess: () => {
      utils.cost.list.invalidate()
    },
    onError: err => {
      console.log(err)
    },
  })

  async function handleNavigateToAddPage() {
    await Router.push('/costs/add')
  }

  async function handleNavigateToEditPage(id: string) {
    await Router.push(`/costs/edit/${id}`)
  }

  async function handleDeleteItem(id: string) {
    deleteCost({ id })
  }

  return (
    <Navbar>
      <Table
        actions={{
          createButton: {
            action: handleNavigateToAddPage,
            label: 'Lançar despesa',
          },
          tableRowActions: [
            { action: handleNavigateToEditPage, icon: FiEdit2 },
            { action: handleDeleteItem, icon: FiTrash },
          ],
        }}
        header={[
          {
            columnLabel: 'Nome',
            columnName: 'name',
          },
        ]}
        data={data}
      />
    </Navbar>
  )
}
