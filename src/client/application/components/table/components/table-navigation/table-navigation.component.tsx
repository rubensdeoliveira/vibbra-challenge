import { ListEntitiesModel } from '@/server/domain/models/common'
import { generatePagesArray } from '../../helpers'
import { TableNavigation } from '../../table.component'
import { PaginationButton } from './components'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export type TableNavigationProps = TableNavigation & {
  data: ListEntitiesModel<any>
}

export function TableNavigation({ data, page, setPage }: TableNavigationProps) {
  function renderTablePagination() {
    const siblingsCount = 1
    const previousPages =
      page > 1 ? generatePagesArray(page - 1 - siblingsCount, page - 1) : []
    const nextPages =
      data && page < data.lastPage
        ? generatePagesArray(
            page,
            Math.min(page + siblingsCount, data.lastPage),
          )
        : []
    return (
      <>
        <PaginationButton
          onClick={() => page > 1 && setPage(page - 1)}
          className={`${
            page === 1 ? 'cursor-not-allowed text-gray-300/30' : 'text-gray-300'
          }`}
        >
          <FiChevronLeft size={12} />
        </PaginationButton>

        {page > 1 + siblingsCount && (
          <>
            <PaginationButton onClick={() => setPage(1)}>1</PaginationButton>
            {page > 2 + siblingsCount && (
              <PaginationButton className="cursor-not-allowed text-gray-300/30">
                ...
              </PaginationButton>
            )}
          </>
        )}

        {previousPages.map(previousPage => (
          <PaginationButton
            key={previousPage}
            onClick={() => setPage(previousPage)}
          >
            {previousPage}
          </PaginationButton>
        ))}

        <PaginationButton isActive>{page}</PaginationButton>

        {nextPages.map(nextPage => (
          <PaginationButton key={nextPage} onClick={() => setPage(nextPage)}>
            {nextPage}
          </PaginationButton>
        ))}

        {data && page + siblingsCount < data.lastPage && (
          <>
            {page + 1 + siblingsCount < data.lastPage && (
              <PaginationButton className="cursor-not-allowed text-gray-300/30">
                ...
              </PaginationButton>
            )}
            <PaginationButton onClick={() => setPage(data.lastPage)}>
              {data.lastPage}
            </PaginationButton>
          </>
        )}

        <PaginationButton
          onClick={() => page < data.lastPage && setPage(page + 1)}
          className={`${
            page === data.lastPage
              ? 'cursor-not-allowed text-gray-300/30'
              : 'text-gray-300'
          }`}
        >
          <FiChevronRight size={12} />
        </PaginationButton>
      </>
    )
  }

  const pagesCountText = `Exibindo ${(data.page - 1) * data.rowsPerPage + 1} -
  ${
    data.page * data.rowsPerPage < data.recordsCount
      ? data.page * data.rowsPerPage
      : data.recordsCount
  } de ${data.recordsCount}`

  return (
    <nav
      className="mt-[1.875rem] flex w-full w-full max-w-[1465px] items-center justify-between"
      aria-label="Table navigation"
    >
      <span className="font-medium">{pagesCountText}</span>
      <ul className="flex items-center rounded-[11px] bg-gray-950">
        {renderTablePagination()}
      </ul>
    </nav>
  )
}
