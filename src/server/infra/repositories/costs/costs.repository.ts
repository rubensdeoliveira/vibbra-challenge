import { injectable } from 'inversify'

import { prisma } from '@/server/infra/database'
import {
  GetCostByIdRepositoryContract,
  type CostsRepositoryContract,
  type CountCostsRepositoryContract,
  type UpsertCostRepositoryContract,
  type ListCostsRepositoryContract,
  DeleteCostRepositoryContract,
} from '@/server/domain/contracts'

@injectable()
export class CostsRepository implements CostsRepositoryContract {
  async getById({
    id,
  }: GetCostByIdRepositoryContract.Input): Promise<GetCostByIdRepositoryContract.Output> {
    const cost = await prisma.cost.findUnique({ where: { id } })
    return cost
  }

  async upsert({
    id,
    ...upsertData
  }: UpsertCostRepositoryContract.Input): Promise<UpsertCostRepositoryContract.Output> {
    const cost = await prisma.cost.upsert({
      where: {
        id: id ?? '',
      },
      update: {
        ...upsertData,
      },
      create: {
        ...upsertData,
      },
    })
    return cost
  }

  async list({
    page,
    rowsPerPage,
    search,
  }: ListCostsRepositoryContract.Input): Promise<ListCostsRepositoryContract.Output> {
    const costs = await prisma.cost.findMany({
      take: rowsPerPage,
      skip: (page - 1) * rowsPerPage,
      where: this.getWhereCondition(search),
    })
    return costs
  }

  async count({
    search,
  }: CountCostsRepositoryContract.Input): Promise<CountCostsRepositoryContract.Output> {
    const costsCount = await prisma.cost.count({
      where: this.getWhereCondition(search),
    })
    return costsCount
  }

  async delete({ id }: DeleteCostRepositoryContract.Input): Promise<void> {
    await prisma.cost.delete({
      where: { id },
    })
  }

  getWhereCondition(search: string): Object {
    return {
      OR: [
        {
          name: {
            contains: search,
          },
        },
      ],
    }
  }
}
