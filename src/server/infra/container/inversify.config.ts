import { Container } from 'inversify'

import {
  CompaniesRepositoryContract,
  CompaniesRepositoryContractType,
  CreateCompanyUseCaseContract,
  CreateCompanyUseCaseContractType,
  ListCompaniesUseCaseContract,
  ListCompaniesUseCaseContractType,
} from '@/server/domain/contracts'
import {
  CreateCompanyUseCase,
  ListCompaniesUseCase,
} from '@/server/domain/use-cases'
import { CompaniesRepository } from '@/server/infra/repositories'

const container = new Container()

container
  .bind<CompaniesRepositoryContract>(CompaniesRepositoryContractType)
  .to(CompaniesRepository)

container
  .bind<CreateCompanyUseCaseContract>(CreateCompanyUseCaseContractType)
  .to(CreateCompanyUseCase)

container
  .bind<ListCompaniesUseCaseContract>(ListCompaniesUseCaseContractType)
  .to(ListCompaniesUseCase)

export { container }
