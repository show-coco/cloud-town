alter table "public"."community" add column "updated_at" timestamptz
 not null default now();
