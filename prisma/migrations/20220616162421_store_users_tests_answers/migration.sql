/*
  Warnings:

  - You are about to alter the column `start` on the `Test` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `ScheduleSubject` MODIFY `time` TIME NOT NULL;

-- AlterTable
ALTER TABLE `Test` MODIFY `start` TIMESTAMP NOT NULL;

-- CreateTable
CREATE TABLE `UserTestAnswers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userTestId` INTEGER NOT NULL,
    `questionId` INTEGER NOT NULL,
    `answerId` INTEGER NOT NULL,

    UNIQUE INDEX `UserTestAnswers_questionId_key`(`questionId`),
    UNIQUE INDEX `UserTestAnswers_answerId_key`(`answerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserTestAnswers` ADD CONSTRAINT `UserTestAnswers_userTestId_fkey` FOREIGN KEY (`userTestId`) REFERENCES `UserTest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTestAnswers` ADD CONSTRAINT `UserTestAnswers_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTestAnswers` ADD CONSTRAINT `UserTestAnswers_answerId_fkey` FOREIGN KEY (`answerId`) REFERENCES `Answer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
