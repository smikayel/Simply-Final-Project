/*
  Warnings:

  - You are about to drop the column `subjectId` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Schedule` table. All the data in the column will be lost.
  - You are about to alter the column `start` on the `Test` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- DropForeignKey
ALTER TABLE `Schedule` DROP FOREIGN KEY `Schedule_subjectId_fkey`;

-- AlterTable
ALTER TABLE `Schedule` DROP COLUMN `subjectId`,
    DROP COLUMN `time`,
    ALTER COLUMN `day` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Test` MODIFY `start` TIMESTAMP NOT NULL;

-- CreateTable
CREATE TABLE `ScheduleSubject` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `time` TIME NOT NULL,
    `scheduleId` INTEGER NOT NULL,
    `subjectId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ScheduleSubject` ADD CONSTRAINT `ScheduleSubject_scheduleId_fkey` FOREIGN KEY (`scheduleId`) REFERENCES `Schedule`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScheduleSubject` ADD CONSTRAINT `ScheduleSubject_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
