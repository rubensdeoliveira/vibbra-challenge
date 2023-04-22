import { generatePagesArray } from '../../helpers'
import { ListEntitiesProps, TableNavigation } from '../../table.component'

export type TableNavigationProps = TableNavigation & {
  data: ListEntitiesProps<any>
}

export function TableNavigation({ data, page, setPage }: TableNavigationProps) {
  function renderTablePagination() {
    const siblingsCount = 1
    const previousPages =
      page > 1 ? generatePagesArray(page - 1 - siblingsCount, page - 1) : []
    const nextPages =
      data && page < data.last_page
        ? generatePagesArray(
            page,
            Math.min(page + siblingsCount, data.last_page),
          )
        : []
    return (
      <div className="btn-group self-center">
        {page > 1 + siblingsCount && (
          <>
            <button
              onClick={() => setPage(1)}
              className="  border border-gray-300 bg-white leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              1
            </button>
            {page > 2 + siblingsCount && (
              <button className="  border border-gray-300 bg-white leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                ...
              </button>
            )}
          </>
        )}

        {previousPages.map(previousPage => (
          <button
            key={previousPage}
            className="  border border-gray-300 bg-white leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={() => setPage(previousPage)}
          >
            {previousPage}
          </button>
        ))}

        <button
          key={page}
          className="  z-10 border border-blue-300 bg-blue-50 leading-tight text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          onClick={() => setPage(1)}
        >
          {page}
        </button>

        {nextPages.map(nextPage => (
          <button
            key={nextPage}
            className="  border border-gray-300 bg-white leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={() => setPage(nextPage)}
          >
            {nextPage}
          </button>
        ))}

        {data && page + siblingsCount < data.last_page && (
          <>
            {page + 1 + siblingsCount < data.last_page && (
              <button className="  border border-gray-300 bg-white leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                ...
              </button>
            )}
            <button
              className="  border border-gray-300 bg-white leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => setPage(data.last_page)}
            >
              {data.last_page}
            </button>
          </>
        )}
      </div>
    )
  }

  return (
    <nav
      className="flex items-center justify-between"
      aria-label="Table navigation"
    >
      <span>
        Exibindo {(data.page - 1) * 20 + 1}-{data.page * 20} de{' '}
        {data.record_count}
      </span>
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <a
            href="#"
            className="block rounded-l-lg border border-gray-300 bg-white leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </li>

        {renderTablePagination()}

        <li>
          <a
            href="#"
            className="  block rounded-r-lg border border-gray-300 bg-white leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Next</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  )
}
