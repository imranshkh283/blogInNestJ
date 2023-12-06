/*
  Warnings:

  - Added the required column `firstname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `fullname` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `firstname` VARCHAR(150) NOT NULL,
    ADD COLUMN `lastname` VARCHAR(150) NOT NULL,
    MODIFY `fullname` VARCHAR(250) NOT NULL;
