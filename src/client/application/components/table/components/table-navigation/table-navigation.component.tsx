import { ListEntitiesModel } from '@/server/domain/models/common'
import { generatePagesArray } from '../../helpers'
import { TableNavigation } from '../../table.component'

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
      <div className="btn-group self-center">
        {page > 1 + siblingsCount && (
          <>
            <button onClick={() => setPage(1)} className="">
              1
            </button>
            {page > 2 + siblingsCount && <button className="">...</button>}
          </>
        )}

        {previousPages.map(previousPage => (
          <button
            key={previousPage}
            className=""
            onClick={() => setPage(previousPage)}
          >
            {previousPage}
          </button>
        ))}

        <button key={page} className="" onClick={() => setPage(1)}>
          {page}
        </button>

        {nextPages.map(nextPage => (
          <button key={nextPage} className="" onClick={() => setPage(nextPage)}>
            {nextPage}
          </button>
        ))}

        {data && page + siblingsCount < data.lastPage && (
          <>
            {page + 1 + siblingsCount < data.lastPage && (
              <button className="">...</button>
            )}
            <button className="" onClick={() => setPage(data.lastPage)}>
              {data.lastPage}
            </button>
          </>
        )}
      </div>
    )
  }

  return (
    <nav
      className="flex w-full items-center justify-between"
      aria-label="Table navigation"
    >
      <span>
        Exibindo {(data.page - 1) * data.rowsPerPage + 1}-
        {data.page * data.rowsPerPage} de {data.recordsCount}
      </span>
      <ul className="flex items-center">{renderTablePagination()}</ul>
    </nav>
  )
}
