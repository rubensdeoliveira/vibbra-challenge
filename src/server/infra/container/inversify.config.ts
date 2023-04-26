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
  CreateReceiptUseCaseContract,
  CreateReceiptUseCaseContractType,
  UpdateReceiptUseCaseContract,
  UpdateReceiptUseCaseContractType,
  ListReceiptsUseCaseContract,
  ListReceiptsUseCaseContractType,
  GetReceiptByIdUseCaseContract,
  GetReceiptByIdUseCaseContractType,
  DeleteReceiptUseCaseContract,
  DeleteReceiptUseCaseContractType,
  ReceiptsRepositoryContract,
  ReceiptsRepositoryContractType,
  CreateCostUseCaseContract,
  CreateCostUseCaseContractType,
  UpdateCostUseCaseContract,
  UpdateCostUseCaseContractType,
  ListCostsUseCaseContract,
  ListCostsUseCaseContractType,
  GetCostByIdUseCaseContract,
  GetCostByIdUseCaseContractType,
  DeleteCostUseCaseContract,
  DeleteCostUseCaseContractType,
  CostsRepositoryContract,
  CostsRepositoryContractType,
  UpdateConfigUseCaseContract,
  UpdateConfigUseCaseContractType,
  GetConfigByUserIdUseCaseContract,
  GetConfigByUserIdUseCaseContractType,
  ConfigsRepositoryContract,
  ConfigsRepositoryContractType,
  CreateConfigUseCaseContract,
  CreateConfigUseCaseContractType,
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
  CreateReceiptUseCase,
  UpdateReceiptUseCase,
  ListReceiptsUseCase,
  GetReceiptByIdUseCase,
  DeleteReceiptUseCase,
  CreateCostUseCase,
  UpdateCostUseCase,
  ListCostsUseCase,
  GetCostByIdUseCase,
  DeleteCostUseCase,
  UpdateConfigUseCase,
  GetConfigByUserIdUseCase,
  CreateConfigUseCase,
} from '@/server/domain/use-cases'
import {
  CategoriesRepository,
  CompaniesRepository,
  ConfigsRepository,
  CostsRepository,
  ReceiptsRepository,
} from '@/server/infra/repositories'

export const container = new Container()

// Repositories
container
  .bind<CompaniesRepositoryContract>(CompaniesRepositoryContractType)
  .to(CompaniesRepository)

container
  .bind<CategoriesRepositoryContract>(CategoriesRepositoryContractType)
  .to(CategoriesRepository)

container
  .bind<ReceiptsRepositoryContract>(ReceiptsRepositoryContractType)
  .to(ReceiptsRepository)

container
  .bind<CostsRepositoryContract>(CostsRepositoryContractType)
  .to(CostsRepository)

container
  .bind<ConfigsRepositoryContract>(ConfigsRepositoryContractType)
  .to(ConfigsRepository)

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

// Receipts
container
  .bind<CreateReceiptUseCaseContract>(CreateReceiptUseCaseContractType)
  .to(CreateReceiptUseCase)

container
  .bind<UpdateReceiptUseCaseContract>(UpdateReceiptUseCaseContractType)
  .to(UpdateReceiptUseCase)

container
  .bind<ListReceiptsUseCaseContract>(ListReceiptsUseCaseContractType)
  .to(ListReceiptsUseCase)

container
  .bind<GetReceiptByIdUseCaseContract>(GetReceiptByIdUseCaseContractType)
  .to(GetReceiptByIdUseCase)

container
  .bind<DeleteReceiptUseCaseContract>(DeleteReceiptUseCaseContractType)
  .to(DeleteReceiptUseCase)

// Costs
container
  .bind<CreateCostUseCaseContract>(CreateCostUseCaseContractType)
  .to(CreateCostUseCase)

container
  .bind<UpdateCostUseCaseContract>(UpdateCostUseCaseContractType)
  .to(UpdateCostUseCase)

container
  .bind<ListCostsUseCaseContract>(ListCostsUseCaseContractType)
  .to(ListCostsUseCase)

container
  .bind<GetCostByIdUseCaseContract>(GetCostByIdUseCaseContractType)
  .to(GetCostByIdUseCase)

container
  .bind<DeleteCostUseCaseContract>(DeleteCostUseCaseContractType)
  .to(DeleteCostUseCase)

// Configs

container
  .bind<CreateConfigUseCaseContract>(CreateConfigUseCaseContractType)
  .to(CreateConfigUseCase)

container
  .bind<UpdateConfigUseCaseContract>(UpdateConfigUseCaseContractType)
  .to(UpdateConfigUseCase)

container
  .bind<GetConfigByUserIdUseCaseContract>(GetConfigByUserIdUseCaseContractType)
  .to(GetConfigByUserIdUseCase)
