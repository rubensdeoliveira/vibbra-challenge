import { injectable } from 'inversify'

import { prisma } from '@/server/infra/database'
import {
  GetReceiptByIdRepositoryContract,
  type ReceiptsRepositoryContract,
  type CountReceiptsRepositoryContract,
  type UpsertReceiptRepositoryContract,
  type ListReceiptsRepositoryContract,
  DeleteReceiptRepositoryContract,
} from '@/server/domain/contracts'

@injectable()
export class ReceiptsRepository implements ReceiptsRepositoryContract {
  async getById({
    id,
  }: GetReceiptByIdRepositoryContract.Input): Promise<GetReceiptByIdRepositoryContract.Output> {
    const receipt = await prisma.receipt.findUnique({
      where: { id },
      include: { company: true },
    })
    return receipt
  }

  async upsert({
    id,
    ...upsertData
  }: UpsertReceiptRepositoryContract.Input): Promise<UpsertReceiptRepositoryContract.Output> {
    const receipt = await prisma.receipt.upsert({
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
    return receipt
  }

  async list({
    page,
    rowsPerPage,
    search,
    userId,
  }: ListReceiptsRepositoryContract.Input): Promise<ListReceiptsRepositoryContract.Output> {
    const receipts = await prisma.receipt.findMany({
      take: rowsPerPage,
      skip: (page - 1) * rowsPerPage,
      where: this.getWhereCondition(search, userId),
      include: { company: true },
    })
    return receipts
  }

  async count({
    search,
    userId,
  }: CountReceiptsRepositoryContract.Input): Promise<CountReceiptsRepositoryContract.Output> {
    const receiptsCount = await prisma.receipt.count({
      where: this.getWhereCondition(search, userId),
    })
    return receiptsCount
  }

  async delete({ id }: DeleteReceiptRepositoryContract.Input): Promise<void> {
    await prisma.receipt.delete({
      where: { id },
    })
  }

  getWhereCondition(search: string, userId: string): Object {
    return {
      OR: [
        {
          number: {
            contains: search,
          },
        },
        {
          description: {
            contains: search,
          },
        },
      ],
      userId,
    }
  }
}
