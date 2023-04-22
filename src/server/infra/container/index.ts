import { Container } from 'inversify'

import {
  CreateCompanyUseCaseContract,
  CreateCompanyUseCaseContractTypes,
  ListCompaniesUseCaseContract,
  ListCompaniesUseCaseContractTypes,
} from '@/server/domain/contracts'
import {
  CreateCompanyUseCase,
  ListCompaniesUseCase,
} from '@/server/domain/use-cases'

export const container = new Container()

container
  .bind<CreateCompanyUseCaseContract>(
    CreateCompanyUseCaseContractTypes.CreateCompanyUseCase,
  )
  .to(CreateCompanyUseCase)
  .inSingletonScope()

container
  .bind<ListCompaniesUseCaseContract>(
    ListCompaniesUseCaseContractTypes.ListCompaniesUseCase,
  )
  .to(ListCompaniesUseCase)
  .inSingletonScope()
