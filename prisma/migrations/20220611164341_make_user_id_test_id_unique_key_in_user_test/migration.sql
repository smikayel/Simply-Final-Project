/*
  Warnings:

  - You are about to alter the column `start` on the `Test` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - A unique constraint covering the columns `[userId,testId]` on the table `UserTest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `highestScore` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mark` to the `UserTest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ScheduleSubject` MODIFY `time` TIME NOT NULL;

-- AlterTable
ALTER TABLE `Test` ADD COLUMN `highestScore` INTEGER NOT NULL,
    MODIFY `start` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `UserTest` ADD COLUMN `mark` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `UserTest_userId_testId_key` ON `UserTest`(`userId`, `testId`);
