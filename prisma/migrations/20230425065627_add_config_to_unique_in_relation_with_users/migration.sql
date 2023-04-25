/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Config` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Config_userId_key` ON `Config`(`userId`);
