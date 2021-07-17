-- CreateEnum
CREATE TYPE "TrialPeriod" AS ENUM ('FREE_FOR_THE_FIRST_MONTH');

-- AlterTable
ALTER TABLE
    "CommunityMember"
ADD
    COLUMN "plan_id" TEXT;

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "introduction" TEXT NOT NULL,
    "price_per_month" INTEGER NOT NULL,
    "trial_period" "TrialPeriod",
    "number_of_applicants" INTEGER,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityPlan" (
    "community_id" TEXT NOT NULL,
    "plan_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    PRIMARY KEY ("community_id", "plan_id")
);

-- AddForeignKey
ALTER TABLE
    "CommunityMember"
ADD
    FOREIGN KEY ("plan_id") REFERENCES "Plan"("id") ON DELETE
SET
    NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    "CommunityPlan"
ADD
    FOREIGN KEY ("community_id") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    "CommunityPlan"
ADD
    FOREIGN KEY ("plan_id") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
