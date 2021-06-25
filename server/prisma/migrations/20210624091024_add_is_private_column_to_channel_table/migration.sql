/*
  Warnings:

  - Added the required column `is_private` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "is_private" BOOLEAN NOT NULL;
