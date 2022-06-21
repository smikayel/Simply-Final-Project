/*
  Warnings:

  - You are about to alter the column `start` on the `Test` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `ScheduleSubject` MODIFY `time` TIME NOT NULL;

-- AlterTable
ALTER TABLE `Test` MODIFY `start` TIMESTAMP NOT NULL;

-- CreateTable
CREATE TABLE `GroupTest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `testId` INTEGER NOT NULL,
    `groupId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GroupTest` ADD CONSTRAINT `GroupTest_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GroupTest` ADD CONSTRAINT `GroupTest_testId_fkey` FOREIGN KEY (`testId`) REFERENCES `Test`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
