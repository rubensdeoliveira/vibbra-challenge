/*
  Warnings:

  - Made the column `notifyByEmail` on table `Config` required. This step will fail if there are existing NULL values in that column.
  - Made the column `notifyBySms` on table `Config` required. This step will fail if there are existing NULL values in that column.
  - Made the column `meiLimit` on table `Config` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Config` MODIFY `notifyByEmail` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `notifyBySms` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `meiLimit` DECIMAL(10, 2) NOT NULL DEFAULT 81000;
