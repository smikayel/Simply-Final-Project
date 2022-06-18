/*
  Warnings:

  - You are about to alter the column `start` on the `Test` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- DropIndex
DROP INDEX `UserTestAnswers_answerId_key` ON `UserTestAnswers`;

-- DropIndex
DROP INDEX `UserTestAnswers_questionId_key` ON `UserTestAnswers`;

-- AlterTable
ALTER TABLE `ScheduleSubject` MODIFY `time` TIME NOT NULL;

-- AlterTable
ALTER TABLE `Test` MODIFY `start` TIMESTAMP NOT NULL;
