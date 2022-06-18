/*
  Warnings:

  - You are about to alter the column `start` on the `Test` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - A unique constraint covering the columns `[userId,testId,questionId,answerId]` on the table `UserTestAnswers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `ScheduleSubject` MODIFY `time` TIME NOT NULL;

-- AlterTable
ALTER TABLE `Test` MODIFY `start` TIMESTAMP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `UserTestAnswers_userId_testId_questionId_answerId_key` ON `UserTestAnswers`(`userId`, `testId`, `questionId`, `answerId`);
