/*
  Warnings:

  - You are about to drop the column `dateTime` on the `Test` table. All the data in the column will be lost.
  - Added the required column `start` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ScheduleSubject` MODIFY `time` TIME NOT NULL;

-- AlterTable
ALTER TABLE `Test` DROP COLUMN `dateTime`,
    ADD COLUMN `start` TIMESTAMP NOT NULL,
    MODIFY `length` TIME NOT NULL;
