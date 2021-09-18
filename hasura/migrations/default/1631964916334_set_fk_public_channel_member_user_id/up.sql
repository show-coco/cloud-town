alter table "public"."channel_member"
  add constraint "channel_member_user_id_fkey"
  foreign key ("user_id")
  references "public"."users"
  ("id") on update restrict on delete restrict;
