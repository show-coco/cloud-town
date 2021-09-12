alter table "public"."community_skill"
  add constraint "community_skill_community_id_fkey"
  foreign key ("community_id")
  references "public"."community"
  ("id") on update restrict on delete restrict;
