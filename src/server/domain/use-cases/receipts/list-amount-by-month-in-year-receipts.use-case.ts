import { injectable, inject } from 'inversify'

import {
  type ListAmountByMonthInYearReceiptsUseCaseContract,
  type ReceiptsRepositoryContract,
  ReceiptsRepositoryContractType,
} from '@/server/domain/contracts'

@injectable()
export class ListAmountByMonthInYearReceiptsUseCase
  implements ListAmountByMonthInYearReceiptsUseCaseContract
{
  constructor(
    @inject(ReceiptsRepositoryContractType)
    private readonly receiptsRepository: ReceiptsRepositoryContract,
  ) {}

  public async listAmountByMonthInYear({
    year,
    userId,
  }: ListAmountByMonthInYearReceiptsUseCaseContract.Input): Promise<ListAmountByMonthInYearReceiptsUseCaseContract.Output> {
    const totalReceiptsByYear = await this.receiptsRepository.listByYear({
      year,
      userId,
    })
    const months = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ]
    const listAmountByMonthInYearReceipts: ListAmountByMonthInYearReceiptsUseCaseContract.Output =
      totalReceiptsByYear.reduce(
        (
          acc: ListAmountByMonthInYearReceiptsUseCaseContract.Output,
          { competenceDate, value },
        ) => {
          const month: number = competenceDate.getMonth()
          acc[month] = acc[month] || {
            month: months[month],
            value: 0,
          }
          acc[month].value += Number(value)
          return acc
        },
        [],
      )
    return listAmountByMonthInYearReceipts.filter(value => Boolean(value))
  }
}
