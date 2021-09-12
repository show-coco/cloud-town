alter table "public"."community"
  add constraint "community_category_id_fkey"
  foreign key ("category_id")
  references "public"."category"
  ("id") on update restrict on delete restrict;
