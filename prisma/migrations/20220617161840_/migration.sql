/*
  Warnings:

  - You are about to alter the column `start` on the `Test` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `ScheduleSubject` MODIFY `time` TIME NOT NULL;

-- AlterTable
ALTER TABLE `Test` MODIFY `start` TIMESTAMP NOT NULL;

-- AddForeignKey
ALTER TABLE `UserTestAnswers` ADD CONSTRAINT `UserTestAnswers_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTestAnswers` ADD CONSTRAINT `UserTestAnswers_answerId_fkey` FOREIGN KEY (`answerId`) REFERENCES `Answer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
