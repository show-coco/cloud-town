alter table "public"."community" add column "created_at" timestamptz
 not null default now();
