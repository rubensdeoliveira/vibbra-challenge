import { injectable } from 'inversify'

import { prisma } from '@/server/infra/database'
import {
  GetConfigByUserIdRepositoryContract,
  type ConfigsRepositoryContract,
  type UpdateConfigRepositoryContract,
  CreateConfigRepositoryContract,
} from '@/server/domain/contracts'

@injectable()
export class ConfigsRepository implements ConfigsRepositoryContract {
  async getByUserId({
    userId,
  }: GetConfigByUserIdRepositoryContract.Input): Promise<GetConfigByUserIdRepositoryContract.Output> {
    const config = await prisma.config.findUnique({ where: { userId } })
    return config
  }

  async create(
    data: CreateConfigRepositoryContract.Input,
  ): Promise<CreateConfigRepositoryContract.Output> {
    const config = await prisma.config.create({ data })
    return config
  }

  async update({
    id,
    ...upsertData
  }: UpdateConfigRepositoryContract.Input): Promise<UpdateConfigRepositoryContract.Output> {
    const config = await prisma.config.update({
      where: {
        id,
      },
      data: {
        ...upsertData,
      },
    })
    return config
  }
}
