import { injectable } from 'inversify'

import { prisma } from '@/server/infra/database'
import {
  GetCategoryByIdRepositoryContract,
  type CategoriesRepositoryContract,
  type CountCategoriesRepositoryContract,
  type UpsertCategoryRepositoryContract,
  type ListCategoriesRepositoryContract,
  DeleteCategoryRepositoryContract,
} from '@/server/domain/contracts'

@injectable()
export class CategoriesRepository implements CategoriesRepositoryContract {
  async getById({
    id,
  }: GetCategoryByIdRepositoryContract.Input): Promise<GetCategoryByIdRepositoryContract.Output> {
    const category = await prisma.category.findUnique({ where: { id } })
    return category
  }

  async upsert({
    id,
    ...upsertData
  }: UpsertCategoryRepositoryContract.Input): Promise<UpsertCategoryRepositoryContract.Output> {
    const category = await prisma.category.upsert({
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
    return category
  }

  async list({
    page,
    rowsPerPage,
    search,
  }: ListCategoriesRepositoryContract.Input): Promise<ListCategoriesRepositoryContract.Output> {
    const categories = await prisma.category.findMany({
      take: rowsPerPage,
      skip: (page - 1) * rowsPerPage,
      where: this.getWhereCondition(search),
    })
    return categories
  }

  async count({
    search,
  }: CountCategoriesRepositoryContract.Input): Promise<CountCategoriesRepositoryContract.Output> {
    const categoriesCount = await prisma.category.count({
      where: this.getWhereCondition(search),
    })
    return categoriesCount
  }

  async delete({ id }: DeleteCategoryRepositoryContract.Input): Promise<void> {
    await prisma.category.delete({
      where: { id },
    })
  }

  getWhereCondition(search: string): Object {
    return {
      OR: [
        {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ],
    }
  }
}
