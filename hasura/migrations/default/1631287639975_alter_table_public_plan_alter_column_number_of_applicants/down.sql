alter table "public"."plan" alter column "number_of_applicants" set not null;
alter table "public"."plan" alter column "number_of_applicants" set default '50';
