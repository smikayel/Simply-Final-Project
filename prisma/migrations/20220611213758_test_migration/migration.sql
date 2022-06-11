-- AlterTable
ALTER TABLE `ScheduleSubject` MODIFY `time` TIME NOT NULL;

-- AlterTable
ALTER TABLE `UserTest` ADD COLUMN `mark` INTEGER NOT NULL DEFAULT 0;
