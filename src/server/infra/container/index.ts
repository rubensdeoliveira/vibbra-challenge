import { container } from 'tsyringe'

import { CompaniesRepository } from '@/server/infra/repositories'
import { CompaniesRepositoryContract } from '@/server/domain/contracts'

container.registerSingleton<CompaniesRepositoryContract>(
  CompaniesRepositoryContract,
  CompaniesRepository,
)
