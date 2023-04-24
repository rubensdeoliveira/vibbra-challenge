import { Container } from 'inversify'

import {
  CompaniesRepositoryContract,
  CompaniesRepositoryContractType,
  CreateCompanyUseCaseContract,
  CreateCompanyUseCaseContractType,
  DeleteCompanyUseCaseContract,
  DeleteCompanyUseCaseContractType,
  GetCompanyByIdUseCaseContract,
  GetCompanyByIdUseCaseContractType,
  ListCompaniesUseCaseContract,
  ListCompaniesUseCaseContractType,
  UpdateCompanyUseCaseContract,
  UpdateCompanyUseCaseContractType,
} from '@/server/domain/contracts'
import {
  CreateCompanyUseCase,
  DeleteCompanyUseCase,
  GetCompanyByIdUseCase,
  ListCompaniesUseCase,
  UpdateCompanyUseCase,
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
  .bind<UpdateCompanyUseCaseContract>(UpdateCompanyUseCaseContractType)
  .to(UpdateCompanyUseCase)

container
  .bind<ListCompaniesUseCaseContract>(ListCompaniesUseCaseContractType)
  .to(ListCompaniesUseCase)

container
  .bind<GetCompanyByIdUseCaseContract>(GetCompanyByIdUseCaseContractType)
  .to(GetCompanyByIdUseCase)

container
  .bind<DeleteCompanyUseCaseContract>(DeleteCompanyUseCaseContractType)
  .to(DeleteCompanyUseCase)

export { container }
