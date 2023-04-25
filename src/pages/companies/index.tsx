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

export default function ListCompanies() {
  const [page] = useAtom(pageAtom)
  const [search] = useAtom(searchAtom)
  const utils = api.useContext()

  const { data } = api.company.list.useQuery({
    page,
    search,
  })
  const { mutate: deleteCompany } = api.company.delete.useMutation({
    onSuccess: () => {
      utils.company.list.invalidate()
    },
    onError: err => {
      console.log(err)
    },
  })

  async function handleNavigateToAddPage() {
    await Router.push('/companies/add')
  }

  async function handleNavigateToEditPage(id: string) {
    await Router.push(`/companies/edit/${id}`)
  }

  async function handleDeleteItem(id: string) {
    deleteCompany({ id })
  }

  return (
    <Navbar>
      <Table
        actions={{
          createButton: {
            action: handleNavigateToAddPage,
            label: 'Adicionar empresa',
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
          {
            columnLabel: 'Razāo Social',
            columnName: 'corporateName',
          },
          {
            columnLabel: 'CNPJ',
            columnName: 'cnpj',
          },
        ]}
        data={data}
      />
    </Navbar>
  )
}
