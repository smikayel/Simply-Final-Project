/*
  Warnings:

  - You are about to drop the column `mark` on the `UserTest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ScheduleSubject` MODIFY `time` TIME NOT NULL;

-- AlterTable
ALTER TABLE `UserTest` DROP COLUMN `mark`;
