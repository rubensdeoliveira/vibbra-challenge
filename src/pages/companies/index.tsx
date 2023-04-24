import { useAtom } from 'jotai'

import { pageAtom, searchAtom } from '@/client/application/atoms'
import { Navbar, Table } from '@/client/application/components'
import { withSSRAuthenticated } from '@/client/application/helpers'
import { api } from '@/shared/utils'
import Router from 'next/router'

export const getServerSideProps = withSSRAuthenticated(async () => {
  return {
    props: {},
  }
})

export default function Companies() {
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
          create: {
            action: handleNavigateToAddPage,
            label: 'Adicionar empresa',
          },
          update: {
            action: handleNavigateToEditPage,
          },
          delete: {
            action: handleDeleteItem,
          },
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
