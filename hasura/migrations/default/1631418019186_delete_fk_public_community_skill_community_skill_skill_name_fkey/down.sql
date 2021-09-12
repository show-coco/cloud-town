alter table "public"."community_skill"
  add constraint "community_skill_skill_name_fkey"
  foreign key ("skill_name")
  references "public"."skill"
  ("name") on update restrict on delete restrict;
