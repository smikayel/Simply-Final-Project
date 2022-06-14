/*
  Warnings:

  - You are about to drop the column `correctAnswer` on the `Question` table. All the data in the column will be lost.
  - You are about to alter the column `start` on the `Test` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `Answer` ADD COLUMN `isCorrect` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Question` DROP COLUMN `correctAnswer`;

-- AlterTable
ALTER TABLE `ScheduleSubject` MODIFY `time` TIME NOT NULL;

-- AlterTable
ALTER TABLE `Test` MODIFY `start` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `UserTest` ADD COLUMN `isComplete` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `mark` INTEGER NOT NULL DEFAULT -1;
