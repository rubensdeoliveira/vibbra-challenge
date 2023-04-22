import { prisma } from '@/server/infra/database'
import {
  type CompaniesRepositoryContract,
  type CountCompaniesRepositoryContract,
  type CreateCompanyRepositoryContract,
  type ListCompaniesRepositoryContract,
} from '@/server/domain/contracts'
import { injectable } from 'inversify'

@injectable()
export class CompaniesRepository implements CompaniesRepositoryContract {
  async create(
    data: CreateCompanyRepositoryContract.Input,
  ): Promise<CreateCompanyRepositoryContract.Output> {
    const company = await prisma.company.create({ data })
    return company
  }

  getWhereCondition(search: string): Object {
    return {
      name: {
        contains: search,
        mode: 'insensitive',
      },
    }
  }

  async list({
    page,
    rowsPerPage,
    search,
  }: ListCompaniesRepositoryContract.Input): Promise<ListCompaniesRepositoryContract.Output> {
    const companies = await prisma.company.findMany({
      take: rowsPerPage,
      skip: (page - 1) * rowsPerPage,
      where: this.getWhereCondition(search),
    })
    return companies
  }

  async count({
    search,
  }: CountCompaniesRepositoryContract.Input): Promise<CountCompaniesRepositoryContract.Output> {
    const companiesCount = await prisma.company.count({
      where: this.getWhereCondition(search),
    })
    return companiesCount
  }
}
