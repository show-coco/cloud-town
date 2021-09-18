alter table "public"."channel_member" drop constraint "channel_member_channel_id_fkey",
  add constraint "channel_member_channel_id_fkey"
  foreign key ("channel_id")
  references "public"."channel"
  ("id") on update restrict on delete cascade;
