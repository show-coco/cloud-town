/*
  Warnings:

  - The values [COMMON,ADMIN,OWNER,LEAVED] on the enum `ChannelRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ChannelRole_new" AS ENUM ('Common', 'Admin', 'Owner', 'Leaved');
ALTER TABLE "ChannelMember" ALTER COLUMN "role" TYPE "ChannelRole_new" USING ("role"::text::"ChannelRole_new");
ALTER TYPE "ChannelRole" RENAME TO "ChannelRole_old";
ALTER TYPE "ChannelRole_new" RENAME TO "ChannelRole";
DROP TYPE "ChannelRole_old";
COMMIT;
