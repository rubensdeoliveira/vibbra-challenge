import { injectable } from 'inversify'

import { prisma } from '@/server/infra/database'
import {
  GetCompanyByIdRepositoryContract,
  type CompaniesRepositoryContract,
  type CountCompaniesRepositoryContract,
  type UpsertCompanyRepositoryContract,
  type ListCompaniesRepositoryContract,
  DeleteCompanyRepositoryContract,
} from '@/server/domain/contracts'

@injectable()
export class CompaniesRepository implements CompaniesRepositoryContract {
  async getById({
    id,
  }: GetCompanyByIdRepositoryContract.Input): Promise<GetCompanyByIdRepositoryContract.Output> {
    const company = await prisma.company.findUnique({ where: { id } })
    return company
  }

  async upsert({
    id,
    ...upsertData
  }: UpsertCompanyRepositoryContract.Input): Promise<UpsertCompanyRepositoryContract.Output> {
    const company = await prisma.company.upsert({
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
    return company
  }

  async list({
    page,
    rowsPerPage,
    search,
    userId,
  }: ListCompaniesRepositoryContract.Input): Promise<ListCompaniesRepositoryContract.Output> {
    const companies = await prisma.company.findMany({
      take: rowsPerPage,
      skip: (page - 1) * rowsPerPage,
      where: this.getWhereCondition(search, userId),
    })
    return companies
  }

  async count({
    search,
    userId,
  }: CountCompaniesRepositoryContract.Input): Promise<CountCompaniesRepositoryContract.Output> {
    const companiesCount = await prisma.company.count({
      where: this.getWhereCondition(search, userId),
    })
    return companiesCount
  }

  async delete({ id }: DeleteCompanyRepositoryContract.Input): Promise<void> {
    await prisma.company.delete({
      where: { id },
    })
  }

  getWhereCondition(search: string, userId: string): Object {
    return {
      OR: [
        {
          name: {
            contains: search,
          },
        },
        {
          corporateName: {
            contains: search,
          },
        },
        {
          cnpj: {
            contains: search,
          },
        },
      ],
      userId,
    }
  }
}
