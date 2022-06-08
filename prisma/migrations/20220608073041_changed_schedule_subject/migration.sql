/*
  Warnings:

  - You are about to drop the column `dateTime` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `scheduleId` on the `Subject` table. All the data in the column will be lost.
  - You are about to alter the column `dateTime` on the `Test` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- DropForeignKey
ALTER TABLE `Subject` DROP FOREIGN KEY `Subject_scheduleId_fkey`;

-- AlterTable
ALTER TABLE `Schedule` DROP COLUMN `dateTime`,
    DROP COLUMN `subjectId`;

-- AlterTable
ALTER TABLE `Subject` DROP COLUMN `scheduleId`;

-- AlterTable
ALTER TABLE `Test` MODIFY `dateTime` TIMESTAMP NOT NULL,
    MODIFY `length` TIME NOT NULL;

-- CreateTable
CREATE TABLE `ScheduleSubject` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subjectId` INTEGER NOT NULL,
    `scheduleId` INTEGER NOT NULL,
    `day` INTEGER NOT NULL,
    `time` TIME NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ScheduleSubject` ADD CONSTRAINT `ScheduleSubject_scheduleId_fkey` FOREIGN KEY (`scheduleId`) REFERENCES `Schedule`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScheduleSubject` ADD CONSTRAINT `ScheduleSubject_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
