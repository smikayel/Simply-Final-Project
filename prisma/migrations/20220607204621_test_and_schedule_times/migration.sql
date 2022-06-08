/*
  Warnings:

  - You are about to drop the column `day` on the `Schedule` table. All the data in the column will be lost.
  - Added the required column `date` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finishedAt` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startedAt` to the `Test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startedDate` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Schedule` DROP COLUMN `day`,
    ADD COLUMN `date` DATE NOT NULL,
    ADD COLUMN `time` TIME NOT NULL;

-- AlterTable
ALTER TABLE `Test` ADD COLUMN `finishedAt` TIME NOT NULL,
    ADD COLUMN `startedAt` TIME NOT NULL,
    ADD COLUMN `startedDate` DATE NOT NULL;
