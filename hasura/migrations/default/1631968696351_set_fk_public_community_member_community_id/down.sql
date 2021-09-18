alter table "public"."community_member" drop constraint "community_member_community_id_fkey",
  add constraint "community_member_community_id_fkey"
  foreign key ("community_id")
  references "public"."community"
  ("id") on update restrict on delete restrict;
