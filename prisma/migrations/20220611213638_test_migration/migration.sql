-- DropForeignKey
ALTER TABLE `UserTest` DROP FOREIGN KEY `UserTest_testId_fkey`;

-- AlterTable
ALTER TABLE `ScheduleSubject` MODIFY `time` TIME NOT NULL;

-- AddForeignKey
ALTER TABLE `UserTest` ADD CONSTRAINT `UserTest_testId_fkey` FOREIGN KEY (`testId`) REFERENCES `Test`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
