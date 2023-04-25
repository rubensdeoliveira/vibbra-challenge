/*
  Warnings:

  - You are about to drop the column `competenceMonth` on the `Receipt` table. All the data in the column will be lost.
  - Added the required column `competenceDate` to the `Receipt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Receipt` DROP COLUMN `competenceMonth`,
    ADD COLUMN `competenceDate` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `Cost` (
    `id` VARCHAR(191) NOT NULL,
    `value` DECIMAL(10, 2) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `competenceDate` DATETIME(3) NOT NULL,
    `paymentDate` DATETIME(3) NOT NULL,
    `companyId` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    INDEX `Cost_userId_idx`(`userId`),
    INDEX `Cost_companyId_idx`(`companyId`),
    INDEX `Cost_categoryId_idx`(`categoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
