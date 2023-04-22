import { useAtom } from 'jotai'

import { pageAtom } from '@/client/application/atoms'
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
  const [page, setPage] = useAtom(pageAtom)

  const { data, isError, isLoading } = api.company.list.useQuery({
    page,
  })

  async function handleNavigateToAddPage() {
    await Router.push('/companies/add')
  }

  return (
    <Navbar>
      <Table
        actionButton={{
          action: handleNavigateToAddPage,
          label: 'Adicionar empresa',
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
        page={page}
        setPage={setPage}
      />
    </Navbar>
  )
}
