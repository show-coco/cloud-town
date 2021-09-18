alter table "public"."channel" drop constraint "channel_community_id_fkey",
  add constraint "channel_community_id_fkey"
  foreign key ("community_id")
  references "public"."community"
  ("id") on update restrict on delete cascade;
