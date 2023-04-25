/*
  Warnings:

  - You are about to alter the column `value` on the `Receipt` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE `Receipt` MODIFY `value` DECIMAL(10, 2) NOT NULL;
