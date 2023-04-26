import { withSSRAuthenticated } from '@/client/application/helpers'
import { UpsertReceipt } from '@/client/application/pages'
import { api } from '@/shared/utils'
import { useRouter } from 'next/router'

export const getServerSideProps = withSSRAuthenticated(async () => {
  return {
    props: {},
  }
})

export default function EditReceipt() {
  const { query } = useRouter()
  const receiptId = String(query.id)

  const {
    data: receipt,
    isLoading,
    isError,
  } = api.receipt.getById.useQuery({
    id: receiptId,
  })

  if (isLoading) {
    return <p>carregando...</p>
  }

  if (isError || !receipt) {
    return <p>Erro</p>
  }

  return (
    <UpsertReceipt
      defaultValues={{
        ...receipt,
        companyId: { value: receipt.company.id, label: receipt.company.name },
        value: String(receipt.value),
      }}
      receiptId={receiptId}
    />
  )
}
