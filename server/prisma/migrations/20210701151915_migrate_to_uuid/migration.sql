/*
  Warnings:

  - The primary key for the `Channel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `role` on the `ChannelMember` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `role` to the `CommunityMember` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CommunityRole" AS ENUM ('USER', 'ADMIN', 'OWNER');

-- CreateEnum
CREATE TYPE "ChannelRole" AS ENUM ('USER', 'ADMIN', 'OWNER');

-- DropForeignKey
ALTER TABLE "ChannelMember" DROP CONSTRAINT "ChannelMember_channel_id_fkey";

-- DropForeignKey
ALTER TABLE "ChannelMember" DROP CONSTRAINT "ChannelMember_user_id_fkey";

-- DropForeignKey
ALTER TABLE "CommunityMember" DROP CONSTRAINT "CommunityMember_user_id_fkey";

-- AlterTable
ALTER TABLE "Channel" DROP CONSTRAINT "Channel_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "Channel_id_seq";

-- AlterTable
ALTER TABLE "ChannelMember" ALTER COLUMN "channel_id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
DROP COLUMN "role",
ADD COLUMN     "role" "ChannelRole" NOT NULL;

-- AlterTable
ALTER TABLE "CommunityMember" ADD COLUMN     "role" "CommunityRole" NOT NULL,
ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "CommunityMember" ADD FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelMember" ADD FOREIGN KEY ("channel_id") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelMember" ADD FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
