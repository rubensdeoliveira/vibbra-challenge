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
  CreateCategoryUseCaseContract,
  CreateCategoryUseCaseContractType,
  DeleteCategoryUseCaseContract,
  DeleteCategoryUseCaseContractType,
  GetCategoryByIdUseCaseContract,
  GetCategoryByIdUseCaseContractType,
  ListCategoriesUseCaseContract,
  ListCategoriesUseCaseContractType,
  UpdateCategoryUseCaseContract,
  UpdateCategoryUseCaseContractType,
  CategoriesRepositoryContract,
  CategoriesRepositoryContractType,
  ToggleArchivedCategoryUseCaseContract,
  ToggleArchivedCategoryUseCaseContractType,
} from '@/server/domain/contracts'
import {
  CreateCompanyUseCase,
  DeleteCompanyUseCase,
  GetCompanyByIdUseCase,
  ListCompaniesUseCase,
  UpdateCompanyUseCase,
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  GetCategoryByIdUseCase,
  ListCategoriesUseCase,
  UpdateCategoryUseCase,
  ToggleArchivedCategoryUseCase,
} from '@/server/domain/use-cases'
import {
  CategoriesRepository,
  CompaniesRepository,
} from '@/server/infra/repositories'

const container = new Container()

// Repositories
container
  .bind<CompaniesRepositoryContract>(CompaniesRepositoryContractType)
  .to(CompaniesRepository)

container
  .bind<CategoriesRepositoryContract>(CategoriesRepositoryContractType)
  .to(CategoriesRepository)

// Use Cases
// Company
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

// Category
container
  .bind<CreateCategoryUseCaseContract>(CreateCategoryUseCaseContractType)
  .to(CreateCategoryUseCase)

container
  .bind<UpdateCategoryUseCaseContract>(UpdateCategoryUseCaseContractType)
  .to(UpdateCategoryUseCase)

container
  .bind<ListCategoriesUseCaseContract>(ListCategoriesUseCaseContractType)
  .to(ListCategoriesUseCase)

container
  .bind<GetCategoryByIdUseCaseContract>(GetCategoryByIdUseCaseContractType)
  .to(GetCategoryByIdUseCase)

container
  .bind<DeleteCategoryUseCaseContract>(DeleteCategoryUseCaseContractType)
  .to(DeleteCategoryUseCase)

container
  .bind<ToggleArchivedCategoryUseCaseContract>(
    ToggleArchivedCategoryUseCaseContractType,
  )
  .to(ToggleArchivedCategoryUseCase)

export { container }
