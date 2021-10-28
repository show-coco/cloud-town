/*
  Warnings:

  - The primary key for the `Read` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `updated_at` to the `Read` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Read" DROP CONSTRAINT "Read_pkey",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "Read_id_seq";
