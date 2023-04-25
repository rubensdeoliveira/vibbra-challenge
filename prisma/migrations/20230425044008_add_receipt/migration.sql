-- CreateTable
CREATE TABLE `Receipt` (
    `id` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `competenceMonth` DATETIME(3) NOT NULL,
    `paymentDate` DATETIME(3) NOT NULL,
    `companyId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    INDEX `Receipt_userId_idx`(`userId`),
    INDEX `Receipt_companyId_idx`(`companyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
