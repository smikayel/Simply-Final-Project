-- DropForeignKey
ALTER TABLE `Test` DROP FOREIGN KEY `Test_userId_fkey`;

-- AlterTable
ALTER TABLE `Test` MODIFY `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Test` ADD CONSTRAINT `Test_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
