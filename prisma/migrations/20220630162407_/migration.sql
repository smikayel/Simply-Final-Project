/*
  Warnings:

  - You are about to alter the column `start` on the `Test` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - A unique constraint covering the columns `[userId,groupId]` on the table `UserGroup` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `GroupTest` DROP FOREIGN KEY `GroupTest_groupId_fkey`;

-- AlterTable
ALTER TABLE `ScheduleSubject` MODIFY `time` TIME NOT NULL;

-- AlterTable
ALTER TABLE `Test` MODIFY `start` TIMESTAMP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `UserGroup_userId_groupId_key` ON `UserGroup`(`userId`, `groupId`);

-- AddForeignKey
ALTER TABLE `GroupTest` ADD CONSTRAINT `GroupTest_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
