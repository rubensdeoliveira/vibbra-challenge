import { useAtom } from 'jotai'

import { pageAtom, searchAtom } from '@/client/application/atoms'
import { Navbar, Table } from '@/client/application/components'
import { withSSRAuthenticated } from '@/client/application/helpers'
import { api } from '@/shared/utils'
import Router from 'next/router'
import { FiEdit2, FiEye, FiEyeOff, FiTrash } from 'react-icons/fi'

export const getServerSideProps = withSSRAuthenticated(async () => {
  return {
    props: {},
  }
})

export default function ListCategories() {
  const [page] = useAtom(pageAtom)
  const [search] = useAtom(searchAtom)
  const utils = api.useContext()

  const { data } = api.category.list.useQuery({
    page,
    search,
  })

  const { mutate: deleteCategory } = api.category.delete.useMutation({
    onSuccess: () => {
      utils.category.list.invalidate()
    },
    onError: err => {
      console.log(err)
    },
  })

  const { mutate: toggleArchived } = api.category.toggleArchived.useMutation({
    onSuccess: () => {
      utils.category.list.invalidate()
    },
    onError: err => {
      console.log(err)
    },
  })

  async function handleNavigateToAddPage() {
    await Router.push('/categories/add')
  }

  async function handleToggleArchivedCategory(id: string) {
    toggleArchived({ id })
  }

  async function handleNavigateToEditPage(id: string) {
    await Router.push(`/categories/edit/${id}`)
  }

  async function handleDeleteItem(id: string) {
    deleteCategory({ id })
  }

  return (
    <Navbar>
      <Table
        actions={{
          createButton: {
            action: handleNavigateToAddPage,
            label: 'Adicionar categoria',
          },
          tableRowActions: [
            {
              action: handleToggleArchivedCategory,
              icon: FiEyeOff,
              renderConditionally: { column: 'archived', valueToRender: true },
            },
            {
              action: handleToggleArchivedCategory,
              icon: FiEye,
              renderConditionally: { column: 'archived', valueToRender: false },
            },
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
            columnLabel: 'Descriçāo',
            columnName: 'description',
          },
        ]}
        data={data}
      />
    </Navbar>
  )
}
