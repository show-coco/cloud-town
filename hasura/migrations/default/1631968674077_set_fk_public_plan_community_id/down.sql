alter table "public"."plan" drop constraint "plan_community_id_fkey",
  add constraint "plan_community_id_fkey"
  foreign key ("community_id")
  references "public"."community"
  ("id") on update restrict on delete restrict;
