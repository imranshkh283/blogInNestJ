/*
  Warnings:

  - Added the required column `status` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` CHANGE `name` `fullname` VARCHAR(225);
