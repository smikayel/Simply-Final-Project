/*
  Warnings:

  - You are about to alter the column `start` on the `Test` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the `ScheduleSubject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ScheduleSubject` DROP FOREIGN KEY `ScheduleSubject_scheduleId_fkey`;

-- DropForeignKey
ALTER TABLE `ScheduleSubject` DROP FOREIGN KEY `ScheduleSubject_subjectId_fkey`;

-- AlterTable
ALTER TABLE `Schedule` ADD COLUMN `day` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `subjectId` INTEGER NULL,
    ADD COLUMN `time` TIME NULL;

-- AlterTable
ALTER TABLE `Test` MODIFY `start` TIMESTAMP NOT NULL;

-- DropTable
DROP TABLE `ScheduleSubject`;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
