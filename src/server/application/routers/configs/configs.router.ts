import { CreateConfigSchema, UpdateConfigSchema } from '@/shared/schemas'
import { createTRPCRouter, protectedProcedure } from '@/server/infra/trpc'
import {
  CreateConfigUseCaseContract,
  CreateConfigUseCaseContractType,
  GetConfigByUserIdUseCaseContract,
  GetConfigByUserIdUseCaseContractType,
  UpdateConfigUseCaseContract,
  UpdateConfigUseCaseContractType,
} from '@/server/domain/contracts'
import { container } from '@/server/infra/container'

export const configsRouter = createTRPCRouter({
  getByUser: protectedProcedure.query(async ({ ctx }) => {
    const getConfigByUserIdUseCase =
      container.get<GetConfigByUserIdUseCaseContract>(
        GetConfigByUserIdUseCaseContractType,
      )
    const config = await getConfigByUserIdUseCase.getByUserId({
      userId: ctx.session.user.id,
    })
    return config
  }),
  create: protectedProcedure
    .input(CreateConfigSchema)
    .mutation(async ({ input, ctx }) => {
      const createConfigUseCase = container.get<CreateConfigUseCaseContract>(
        CreateConfigUseCaseContractType,
      )
      const createdConfig = await createConfigUseCase.create({
        ...input,
        userId: ctx.session.user.id,
      })
      return createdConfig
    }),
  update: protectedProcedure
    .input(UpdateConfigSchema)
    .mutation(async ({ input, ctx }) => {
      const updateConfigUseCase = container.get<UpdateConfigUseCaseContract>(
        UpdateConfigUseCaseContractType,
      )
      const updatedConfig = await updateConfigUseCase.update({
        ...input,
        userId: ctx.session.user.id,
      })
      return updatedConfig
    }),
})
