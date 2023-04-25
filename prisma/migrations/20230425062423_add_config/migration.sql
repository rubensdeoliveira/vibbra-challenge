-- CreateTable
CREATE TABLE `Config` (
    `id` VARCHAR(191) NOT NULL,
    `notifyByEmail` BOOLEAN NULL DEFAULT false,
    `notifyBySms` BOOLEAN NULL DEFAULT false,
    `meiLimit` DECIMAL(10, 2) NULL DEFAULT 81000,
    `userId` VARCHAR(191) NOT NULL,

    INDEX `Config_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
