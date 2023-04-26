import { injectable, inject } from 'inversify'

import {
  type ListAmountByMonthInYearCostsUseCaseContract,
  type CostsRepositoryContract,
  CostsRepositoryContractType,
} from '@/server/domain/contracts'

@injectable()
export class ListAmountByMonthInYearCostsUseCase
  implements ListAmountByMonthInYearCostsUseCaseContract
{
  constructor(
    @inject(CostsRepositoryContractType)
    private readonly costsRepository: CostsRepositoryContract,
  ) {}

  public async listAmountByMonthInYear({
    year,
    userId,
  }: ListAmountByMonthInYearCostsUseCaseContract.Input): Promise<ListAmountByMonthInYearCostsUseCaseContract.Output> {
    console.log(year, userId)
    const totalCostsByYear = await this.costsRepository.listByYear({
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
    const listAmountByMonthInYearCosts: ListAmountByMonthInYearCostsUseCaseContract.Output =
      totalCostsByYear.reduce(
        (
          acc: ListAmountByMonthInYearCostsUseCaseContract.Output,
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
    return listAmountByMonthInYearCosts.filter(value => Boolean(value))
  }
}
