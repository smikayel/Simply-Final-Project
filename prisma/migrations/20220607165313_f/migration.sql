/*
  Warnings:

  - You are about to alter the column `dateTime` on the `Schedule` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - A unique constraint covering the columns `[scheduleId]` on the table `Subject` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `subjectId` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateTime` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `length` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Schedule` ADD COLUMN `subjectId` INTEGER NOT NULL,
    MODIFY `dateTime` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `Test` ADD COLUMN `dateTime` TIMESTAMP NOT NULL,
    ADD COLUMN `length` TIME NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Subject_scheduleId_key` ON `Subject`(`scheduleId`);
