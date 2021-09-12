ALTER TABLE "public"."plan" ALTER COLUMN "number_of_applicants" drop default;
alter table "public"."plan" alter column "number_of_applicants" drop not null;
