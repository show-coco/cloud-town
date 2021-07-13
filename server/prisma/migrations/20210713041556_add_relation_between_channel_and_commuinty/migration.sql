/*
  Warnings:

  - Added the required column `community_id` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "community_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Channel" ADD FOREIGN KEY ("community_id") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;
