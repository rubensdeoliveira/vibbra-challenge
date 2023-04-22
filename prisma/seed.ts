import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  try {
    const userId = 'clgs69x51000015lq5damp9jb'
    const findUser = await prisma.user.findUnique({ where: { id: userId } })
    if (findUser) {
      const findedCompaniesCount = await prisma.company.count()
      if (findedCompaniesCount < 100) {
        const numberOfCompaniesToAdd = 100 - findedCompaniesCount
        const promises = []
        for (let i = 0; i < numberOfCompaniesToAdd; i++) {
          promises.push(
            prisma.company.create({
              data: {
                cnpj: faker.random.numeric(),
                corporateName: faker.company.name(),
                name: faker.company.name(),
                userId,
              },
            }),
          )
        }
        await Promise.all(promises)
        console.log(
          `${numberOfCompaniesToAdd} empresas adicionadas com sucesso!`,
        )
      } else {
        console.log(`Nenhuma empresa adicionada!`)
      }
    }

    !findUser &&
      console.log(
        'Nāo foi possível adicionar empresas pelo seed porque o usuário nāo existe no banco',
      )
  } catch {
    console.log('Ocorreu um erro inesperado na criaçāo das empresas!')
  }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
