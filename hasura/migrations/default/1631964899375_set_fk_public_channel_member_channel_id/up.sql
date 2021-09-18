alter table "public"."channel_member"
  add constraint "channel_member_channel_id_fkey"
  foreign key ("channel_id")
  references "public"."channel"
  ("id") on update restrict on delete restrict;
