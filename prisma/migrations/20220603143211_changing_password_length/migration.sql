-- AlterTable
ALTER TABLE `User` MODIFY `password` VARCHAR(100) NOT NULL,
    MODIFY `refreshToken` VARCHAR(191) NULL;
