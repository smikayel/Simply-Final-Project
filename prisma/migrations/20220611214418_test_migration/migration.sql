/*
  Warnings:

  - Added the required column `start` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ScheduleSubject` MODIFY `time` TIME NOT NULL;

-- AlterTable
ALTER TABLE `Test` ADD COLUMN `start` TIMESTAMP NOT NULL;
