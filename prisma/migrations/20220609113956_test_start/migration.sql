/*
  Warnings:

  - You are about to drop the column `start` on the `Test` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ScheduleSubject` MODIFY `time` TIME NOT NULL;

-- AlterTable
ALTER TABLE `Test` DROP COLUMN `start`;
