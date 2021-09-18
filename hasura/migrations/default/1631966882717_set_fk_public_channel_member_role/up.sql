alter table "public"."channel_member"
  add constraint "channel_member_role_fkey"
  foreign key ("role")
  references "public"."channel_role"
  ("name") on update restrict on delete restrict;
