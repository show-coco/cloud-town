/*
  Warnings:

  - The values [USER] on the enum `ChannelRole` will be removed. If these variants are still used in the database, this will fail.
  - The values [USER] on the enum `CommunityRole` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `updated_at` to the `ChannelMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ChannelRole_new" AS ENUM ('COMMON', 'ADMIN', 'OWNER');
ALTER TABLE "ChannelMember" ALTER COLUMN "role" TYPE "ChannelRole_new" USING ("role"::text::"ChannelRole_new");
ALTER TYPE "ChannelRole" RENAME TO "ChannelRole_old";
ALTER TYPE "ChannelRole_new" RENAME TO "ChannelRole";
DROP TYPE "ChannelRole_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "CommunityRole_new" AS ENUM ('COMMON', 'ADMIN', 'OWNER');
ALTER TABLE "CommunityMember" ALTER COLUMN "role" TYPE "CommunityRole_new" USING ("role"::text::"CommunityRole_new");
ALTER TYPE "CommunityRole" RENAME TO "CommunityRole_old";
ALTER TYPE "CommunityRole_new" RENAME TO "CommunityRole";
DROP TYPE "CommunityRole_old";
COMMIT;

-- AlterTable
ALTER TABLE "ChannelMember" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
