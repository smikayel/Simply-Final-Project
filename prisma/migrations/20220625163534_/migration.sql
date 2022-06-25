/*
  Warnings:

  - You are about to alter the column `start` on the `Test` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- DropForeignKey
ALTER TABLE `GroupTest` DROP FOREIGN KEY `GroupTest_testId_fkey`;

-- AlterTable
ALTER TABLE `ScheduleSubject` MODIFY `time` TIME NOT NULL;

-- AlterTable
ALTER TABLE `Test` MODIFY `start` TIMESTAMP NOT NULL;

-- AddForeignKey
ALTER TABLE `GroupTest` ADD CONSTRAINT `GroupTest_testId_fkey` FOREIGN KEY (`testId`) REFERENCES `Test`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
