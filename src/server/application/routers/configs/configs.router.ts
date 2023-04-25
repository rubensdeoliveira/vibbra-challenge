import { GetConfigByUserIdSchema, UpdateConfigSchema } from '@/shared/schemas'
import { createTRPCRouter, protectedProcedure } from '@/server/infra/trpc'
import {
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
