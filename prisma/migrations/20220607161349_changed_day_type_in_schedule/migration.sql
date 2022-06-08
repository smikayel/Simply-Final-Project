/*
  Warnings:

  - You are about to alter the column `day` on the `Schedule` table. The data in that column could be lost. The data in that column will be cast from `VarChar(30)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `Schedule` MODIFY `day` TIMESTAMP NOT NULL;
