alter table "public"."community_hashtag" drop constraint "community_hashtag_community_id_fkey",
  add constraint "community_hashtag_community_id_fkey"
  foreign key ("community_id")
  references "public"."community"
  ("id") on update restrict on delete restrict;
