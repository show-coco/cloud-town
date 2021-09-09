import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: any;
  uuid: any;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: Maybe<Scalars["Boolean"]>;
  _gt?: Maybe<Scalars["Boolean"]>;
  _gte?: Maybe<Scalars["Boolean"]>;
  _in?: Maybe<Array<Scalars["Boolean"]>>;
  _is_null?: Maybe<Scalars["Boolean"]>;
  _lt?: Maybe<Scalars["Boolean"]>;
  _lte?: Maybe<Scalars["Boolean"]>;
  _neq?: Maybe<Scalars["Boolean"]>;
  _nin?: Maybe<Array<Scalars["Boolean"]>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: Maybe<Scalars["Int"]>;
  _gt?: Maybe<Scalars["Int"]>;
  _gte?: Maybe<Scalars["Int"]>;
  _in?: Maybe<Array<Scalars["Int"]>>;
  _is_null?: Maybe<Scalars["Boolean"]>;
  _lt?: Maybe<Scalars["Int"]>;
  _lte?: Maybe<Scalars["Int"]>;
  _neq?: Maybe<Scalars["Int"]>;
  _nin?: Maybe<Array<Scalars["Int"]>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars["String"]>;
  _gt?: Maybe<Scalars["String"]>;
  _gte?: Maybe<Scalars["String"]>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: Maybe<Scalars["String"]>;
  _in?: Maybe<Array<Scalars["String"]>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: Maybe<Scalars["String"]>;
  _is_null?: Maybe<Scalars["Boolean"]>;
  /** does the column match the given pattern */
  _like?: Maybe<Scalars["String"]>;
  _lt?: Maybe<Scalars["String"]>;
  _lte?: Maybe<Scalars["String"]>;
  _neq?: Maybe<Scalars["String"]>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: Maybe<Scalars["String"]>;
  _nin?: Maybe<Array<Scalars["String"]>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: Maybe<Scalars["String"]>;
  /** does the column NOT match the given pattern */
  _nlike?: Maybe<Scalars["String"]>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: Maybe<Scalars["String"]>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: Maybe<Scalars["String"]>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: Maybe<Scalars["String"]>;
  /** does the column match the given SQL regular expression */
  _similar?: Maybe<Scalars["String"]>;
};

/** columns and relationships of "channel" */
export type Channel = {
  __typename?: "channel";
  /** An object relationship */
  community: Community;
  community_id: Scalars["uuid"];
  created_at: Scalars["timestamptz"];
  id: Scalars["uuid"];
  is_private: Scalars["Boolean"];
  name: Scalars["String"];
  updated_at: Scalars["timestamptz"];
};

/** order by aggregate values of table "channel" */
export type Channel_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Channel_Max_Order_By>;
  min?: Maybe<Channel_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "channel". All fields are combined with a logical 'AND'. */
export type Channel_Bool_Exp = {
  _and?: Maybe<Array<Channel_Bool_Exp>>;
  _not?: Maybe<Channel_Bool_Exp>;
  _or?: Maybe<Array<Channel_Bool_Exp>>;
  community?: Maybe<Community_Bool_Exp>;
  community_id?: Maybe<Uuid_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  is_private?: Maybe<Boolean_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** order by max() on columns of table "channel" */
export type Channel_Max_Order_By = {
  community_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** order by min() on columns of table "channel" */
export type Channel_Min_Order_By = {
  community_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** Ordering options when selecting data from "channel". */
export type Channel_Order_By = {
  community?: Maybe<Community_Order_By>;
  community_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  is_private?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** select columns of table "channel" */
export enum Channel_Select_Column {
  /** column name */
  CommunityId = "community_id",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Id = "id",
  /** column name */
  IsPrivate = "is_private",
  /** column name */
  Name = "name",
  /** column name */
  UpdatedAt = "updated_at",
}

/** columns and relationships of "community" */
export type Community = {
  __typename?: "community";
  /** An array relationship */
  channels: Array<Channel>;
  /** An array relationship */
  community_members: Array<Community_Member>;
  /** An array relationship */
  community_skills: Array<Community_Skill>;
  description: Scalars["String"];
  id: Scalars["uuid"];
  name: Scalars["String"];
  /** An array relationship */
  plans: Array<Plan>;
  slug: Scalars["String"];
};

/** columns and relationships of "community" */
export type CommunityChannelsArgs = {
  distinct_on?: Maybe<Array<Channel_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Channel_Order_By>>;
  where?: Maybe<Channel_Bool_Exp>;
};

/** columns and relationships of "community" */
export type CommunityCommunity_MembersArgs = {
  distinct_on?: Maybe<Array<Community_Member_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Community_Member_Order_By>>;
  where?: Maybe<Community_Member_Bool_Exp>;
};

/** columns and relationships of "community" */
export type CommunityCommunity_SkillsArgs = {
  distinct_on?: Maybe<Array<Community_Skill_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Community_Skill_Order_By>>;
  where?: Maybe<Community_Skill_Bool_Exp>;
};

/** columns and relationships of "community" */
export type CommunityPlansArgs = {
  distinct_on?: Maybe<Array<Plan_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Plan_Order_By>>;
  where?: Maybe<Plan_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "community". All fields are combined with a logical 'AND'. */
export type Community_Bool_Exp = {
  _and?: Maybe<Array<Community_Bool_Exp>>;
  _not?: Maybe<Community_Bool_Exp>;
  _or?: Maybe<Array<Community_Bool_Exp>>;
  channels?: Maybe<Channel_Bool_Exp>;
  community_members?: Maybe<Community_Member_Bool_Exp>;
  community_skills?: Maybe<Community_Skill_Bool_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  plans?: Maybe<Plan_Bool_Exp>;
  slug?: Maybe<String_Comparison_Exp>;
};

/** columns and relationships of "community_member" */
export type Community_Member = {
  __typename?: "community_member";
  /** An object relationship */
  community: Community;
  community_id: Scalars["uuid"];
  /** An object relationship */
  plan?: Maybe<Plan>;
  role: User_Role_Enum;
  /** An object relationship */
  user: Users;
  user_id: Scalars["uuid"];
  /** An object relationship */
  user_role: User_Role;
};

/** order by aggregate values of table "community_member" */
export type Community_Member_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Community_Member_Max_Order_By>;
  min?: Maybe<Community_Member_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "community_member". All fields are combined with a logical 'AND'. */
export type Community_Member_Bool_Exp = {
  _and?: Maybe<Array<Community_Member_Bool_Exp>>;
  _not?: Maybe<Community_Member_Bool_Exp>;
  _or?: Maybe<Array<Community_Member_Bool_Exp>>;
  community?: Maybe<Community_Bool_Exp>;
  community_id?: Maybe<Uuid_Comparison_Exp>;
  plan?: Maybe<Plan_Bool_Exp>;
  role?: Maybe<User_Role_Enum_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  user_id?: Maybe<Uuid_Comparison_Exp>;
  user_role?: Maybe<User_Role_Bool_Exp>;
};

/** order by max() on columns of table "community_member" */
export type Community_Member_Max_Order_By = {
  community_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** order by min() on columns of table "community_member" */
export type Community_Member_Min_Order_By = {
  community_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** Ordering options when selecting data from "community_member". */
export type Community_Member_Order_By = {
  community?: Maybe<Community_Order_By>;
  community_id?: Maybe<Order_By>;
  plan?: Maybe<Plan_Order_By>;
  role?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  user_id?: Maybe<Order_By>;
  user_role?: Maybe<User_Role_Order_By>;
};

/** select columns of table "community_member" */
export enum Community_Member_Select_Column {
  /** column name */
  CommunityId = "community_id",
  /** column name */
  Role = "role",
  /** column name */
  UserId = "user_id",
}

/** Ordering options when selecting data from "community". */
export type Community_Order_By = {
  channels_aggregate?: Maybe<Channel_Aggregate_Order_By>;
  community_members_aggregate?: Maybe<Community_Member_Aggregate_Order_By>;
  community_skills_aggregate?: Maybe<Community_Skill_Aggregate_Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  plans_aggregate?: Maybe<Plan_Aggregate_Order_By>;
  slug?: Maybe<Order_By>;
};

/** select columns of table "community" */
export enum Community_Select_Column {
  /** column name */
  Description = "description",
  /** column name */
  Id = "id",
  /** column name */
  Name = "name",
  /** column name */
  Slug = "slug",
}

/** columns and relationships of "community_skill" */
export type Community_Skill = {
  __typename?: "community_skill";
  /** An object relationship */
  community: Community;
  community_id: Scalars["uuid"];
  /** An object relationship */
  skill: Skill;
  skill_name: Skill_Enum;
};

/** order by aggregate values of table "community_skill" */
export type Community_Skill_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Community_Skill_Max_Order_By>;
  min?: Maybe<Community_Skill_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "community_skill". All fields are combined with a logical 'AND'. */
export type Community_Skill_Bool_Exp = {
  _and?: Maybe<Array<Community_Skill_Bool_Exp>>;
  _not?: Maybe<Community_Skill_Bool_Exp>;
  _or?: Maybe<Array<Community_Skill_Bool_Exp>>;
  community?: Maybe<Community_Bool_Exp>;
  community_id?: Maybe<Uuid_Comparison_Exp>;
  skill?: Maybe<Skill_Bool_Exp>;
  skill_name?: Maybe<Skill_Enum_Comparison_Exp>;
};

/** order by max() on columns of table "community_skill" */
export type Community_Skill_Max_Order_By = {
  community_id?: Maybe<Order_By>;
};

/** order by min() on columns of table "community_skill" */
export type Community_Skill_Min_Order_By = {
  community_id?: Maybe<Order_By>;
};

/** Ordering options when selecting data from "community_skill". */
export type Community_Skill_Order_By = {
  community?: Maybe<Community_Order_By>;
  community_id?: Maybe<Order_By>;
  skill?: Maybe<Skill_Order_By>;
  skill_name?: Maybe<Order_By>;
};

/** select columns of table "community_skill" */
export enum Community_Skill_Select_Column {
  /** column name */
  CommunityId = "community_id",
  /** column name */
  SkillName = "skill_name",
}

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = "asc",
  /** in ascending order, nulls first */
  AscNullsFirst = "asc_nulls_first",
  /** in ascending order, nulls last */
  AscNullsLast = "asc_nulls_last",
  /** in descending order, nulls first */
  Desc = "desc",
  /** in descending order, nulls first */
  DescNullsFirst = "desc_nulls_first",
  /** in descending order, nulls last */
  DescNullsLast = "desc_nulls_last",
}

/** columns and relationships of "plan" */
export type Plan = {
  __typename?: "plan";
  /** An object relationship */
  community: Community;
  community_id: Scalars["uuid"];
  /** An array relationship */
  community_members: Array<Community_Member>;
  created_at: Scalars["timestamptz"];
  description: Scalars["String"];
  id: Scalars["uuid"];
  name: Scalars["String"];
  price_per_month: Scalars["Int"];
  trial_period: Scalars["String"];
  updated_at: Scalars["timestamptz"];
};

/** columns and relationships of "plan" */
export type PlanCommunity_MembersArgs = {
  distinct_on?: Maybe<Array<Community_Member_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Community_Member_Order_By>>;
  where?: Maybe<Community_Member_Bool_Exp>;
};

/** order by aggregate values of table "plan" */
export type Plan_Aggregate_Order_By = {
  avg?: Maybe<Plan_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Plan_Max_Order_By>;
  min?: Maybe<Plan_Min_Order_By>;
  stddev?: Maybe<Plan_Stddev_Order_By>;
  stddev_pop?: Maybe<Plan_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Plan_Stddev_Samp_Order_By>;
  sum?: Maybe<Plan_Sum_Order_By>;
  var_pop?: Maybe<Plan_Var_Pop_Order_By>;
  var_samp?: Maybe<Plan_Var_Samp_Order_By>;
  variance?: Maybe<Plan_Variance_Order_By>;
};

/** order by avg() on columns of table "plan" */
export type Plan_Avg_Order_By = {
  price_per_month?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "plan". All fields are combined with a logical 'AND'. */
export type Plan_Bool_Exp = {
  _and?: Maybe<Array<Plan_Bool_Exp>>;
  _not?: Maybe<Plan_Bool_Exp>;
  _or?: Maybe<Array<Plan_Bool_Exp>>;
  community?: Maybe<Community_Bool_Exp>;
  community_id?: Maybe<Uuid_Comparison_Exp>;
  community_members?: Maybe<Community_Member_Bool_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  price_per_month?: Maybe<Int_Comparison_Exp>;
  trial_period?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** order by max() on columns of table "plan" */
export type Plan_Max_Order_By = {
  community_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  price_per_month?: Maybe<Order_By>;
  trial_period?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** order by min() on columns of table "plan" */
export type Plan_Min_Order_By = {
  community_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  price_per_month?: Maybe<Order_By>;
  trial_period?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** Ordering options when selecting data from "plan". */
export type Plan_Order_By = {
  community?: Maybe<Community_Order_By>;
  community_id?: Maybe<Order_By>;
  community_members_aggregate?: Maybe<Community_Member_Aggregate_Order_By>;
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  price_per_month?: Maybe<Order_By>;
  trial_period?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** select columns of table "plan" */
export enum Plan_Select_Column {
  /** column name */
  CommunityId = "community_id",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Description = "description",
  /** column name */
  Id = "id",
  /** column name */
  Name = "name",
  /** column name */
  PricePerMonth = "price_per_month",
  /** column name */
  TrialPeriod = "trial_period",
  /** column name */
  UpdatedAt = "updated_at",
}

/** order by stddev() on columns of table "plan" */
export type Plan_Stddev_Order_By = {
  price_per_month?: Maybe<Order_By>;
};

/** order by stddev_pop() on columns of table "plan" */
export type Plan_Stddev_Pop_Order_By = {
  price_per_month?: Maybe<Order_By>;
};

/** order by stddev_samp() on columns of table "plan" */
export type Plan_Stddev_Samp_Order_By = {
  price_per_month?: Maybe<Order_By>;
};

/** order by sum() on columns of table "plan" */
export type Plan_Sum_Order_By = {
  price_per_month?: Maybe<Order_By>;
};

/** order by var_pop() on columns of table "plan" */
export type Plan_Var_Pop_Order_By = {
  price_per_month?: Maybe<Order_By>;
};

/** order by var_samp() on columns of table "plan" */
export type Plan_Var_Samp_Order_By = {
  price_per_month?: Maybe<Order_By>;
};

/** order by variance() on columns of table "plan" */
export type Plan_Variance_Order_By = {
  price_per_month?: Maybe<Order_By>;
};

export type Query_Root = {
  __typename?: "query_root";
  /** fetch data from the table: "channel" */
  channel: Array<Channel>;
  /** fetch data from the table: "channel" using primary key columns */
  channel_by_pk?: Maybe<Channel>;
  /** fetch data from the table: "community" */
  community: Array<Community>;
  /** fetch data from the table: "community" using primary key columns */
  community_by_pk?: Maybe<Community>;
  /** fetch data from the table: "community_member" */
  community_member: Array<Community_Member>;
  /** fetch data from the table: "community_member" using primary key columns */
  community_member_by_pk?: Maybe<Community_Member>;
  /** fetch data from the table: "community_skill" */
  community_skill: Array<Community_Skill>;
  /** fetch data from the table: "community_skill" using primary key columns */
  community_skill_by_pk?: Maybe<Community_Skill>;
  /** fetch data from the table: "plan" */
  plan: Array<Plan>;
  /** fetch data from the table: "plan" using primary key columns */
  plan_by_pk?: Maybe<Plan>;
  /** fetch data from the table: "skill" */
  skill: Array<Skill>;
  /** fetch data from the table: "skill" using primary key columns */
  skill_by_pk?: Maybe<Skill>;
  /** fetch data from the table: "user_role" */
  user_role: Array<User_Role>;
  /** fetch data from the table: "user_role" using primary key columns */
  user_role_by_pk?: Maybe<User_Role>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};

export type Query_RootChannelArgs = {
  distinct_on?: Maybe<Array<Channel_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Channel_Order_By>>;
  where?: Maybe<Channel_Bool_Exp>;
};

export type Query_RootChannel_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Query_RootCommunityArgs = {
  distinct_on?: Maybe<Array<Community_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Community_Order_By>>;
  where?: Maybe<Community_Bool_Exp>;
};

export type Query_RootCommunity_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Query_RootCommunity_MemberArgs = {
  distinct_on?: Maybe<Array<Community_Member_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Community_Member_Order_By>>;
  where?: Maybe<Community_Member_Bool_Exp>;
};

export type Query_RootCommunity_Member_By_PkArgs = {
  community_id: Scalars["uuid"];
  user_id: Scalars["uuid"];
};

export type Query_RootCommunity_SkillArgs = {
  distinct_on?: Maybe<Array<Community_Skill_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Community_Skill_Order_By>>;
  where?: Maybe<Community_Skill_Bool_Exp>;
};

export type Query_RootCommunity_Skill_By_PkArgs = {
  community_id: Scalars["uuid"];
  skill_name: Skill_Enum;
};

export type Query_RootPlanArgs = {
  distinct_on?: Maybe<Array<Plan_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Plan_Order_By>>;
  where?: Maybe<Plan_Bool_Exp>;
};

export type Query_RootPlan_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Query_RootSkillArgs = {
  distinct_on?: Maybe<Array<Skill_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Skill_Order_By>>;
  where?: Maybe<Skill_Bool_Exp>;
};

export type Query_RootSkill_By_PkArgs = {
  name: Scalars["String"];
};

export type Query_RootUser_RoleArgs = {
  distinct_on?: Maybe<Array<User_Role_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<User_Role_Order_By>>;
  where?: Maybe<User_Role_Bool_Exp>;
};

export type Query_RootUser_Role_By_PkArgs = {
  name: Scalars["String"];
};

export type Query_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};

export type Query_RootUsers_By_PkArgs = {
  id: Scalars["uuid"];
};

/** columns and relationships of "skill" */
export type Skill = {
  __typename?: "skill";
  /** An array relationship */
  community_skills: Array<Community_Skill>;
  icon: Scalars["String"];
  name: Scalars["String"];
};

/** columns and relationships of "skill" */
export type SkillCommunity_SkillsArgs = {
  distinct_on?: Maybe<Array<Community_Skill_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Community_Skill_Order_By>>;
  where?: Maybe<Community_Skill_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "skill". All fields are combined with a logical 'AND'. */
export type Skill_Bool_Exp = {
  _and?: Maybe<Array<Skill_Bool_Exp>>;
  _not?: Maybe<Skill_Bool_Exp>;
  _or?: Maybe<Array<Skill_Bool_Exp>>;
  community_skills?: Maybe<Community_Skill_Bool_Exp>;
  icon?: Maybe<String_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
};

export enum Skill_Enum {
  /** data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEUxeMb///8rdcUlc8STstxfktAUbcLk7PZjlNEYb8MgccTT3/CvxeVJhcsPbMKpweM/gMnx9fvF1eyApthyndSMrtubuN/M2+7e5/RUi827zumCp9jB0+t4odb3+v03fMjh6vWD4TdVAAAGf0lEQVR4nO2da5eqIBRAEZIEE7M0s5s5//9XXplqpprwEQjoOvvz5GIPIJ7DCwUvxOk+3KJ5sg33afwqhJ71ak4Jwa5L+jGYEMrrWGlYJpS4LqMBCE3Kt4ZZJOZbec9gEWV/DXdsCfV3h9Ddq+FBuC6UYcTh2bCgrktkHFo8Gh6WJ9gqHn4Nd0trolfE7m6YMddlmQiW3QyjJb1FHyHR1bBcZhuViPLbMFnKQP8XnEjDeInv0Ts0bg3rpfZCCalbQ+66FJPCA7ToRiqbKUqX3EjbZpqi/cIN9yhc7lghwSGaa05mKEv3Q6hxXQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALrBhBDOOWOMfzPnM6tfwYQzgcJ6lW7OO8n5dEoPRV4hQRmZ5KwybJQeO0bC1fnr9RzyG+syrRvKTVs2UWiSRK3HRZUeFXK/ZOeitTQoKI/MNMlGUThMt5us/+dXjgdkrlvaMcQi+nNEfjfmmqoVQ1aN9AuCWdUh4afxz5mTIY0uHzxnRoYi/eg58zEUZf9vZm1I+wfA98zF8NManI0h3Xz8nHkYkvzz58zDEH8yTNyYhSH7YKD/YQ6GuNJ5zhwM6ZBv0ctF0ZJnYNj34PKQJ5gz2ka8TbhPy5fQagaGnZ/bp0gw/psQwG3wL3B9erA0mLZJsrUSRboh+1L/5HAP7Kj6RXpC7J0AkUmAu6TJxBRVI96XsBDqn9wFcaQUzNXXG2AuotK4YQf4fRFXAwJwogwpku5fY9acZ2HIVG/S/jtGMEuOMzCkirRTPOSmHywOls6X12mlH1fh9eeaJR+KhuFWYejZBRyfG+JQYejZdVQahqrBYjmGqtDQszs4JjAs/OqIE7TSzK9mqmGo/KD36/5JjdFC8dOW3Kd7xXS+adShRe3RHZQ6hh0RvkdX3WoY8q5UaYx9eaPq9MPuXGkh/HDUMES80zBY51446hiyc7di8FV74KhjqPz2/iVbcdcjh44hEqplM49smrdJKWtoGXbkoh4pI5eNVctw8OTh+p/RFUKj0DNEzTDDILismKN61DQcMX94WVEnjpqG9yvfhzk6+QjQNbxd+T6QLBfW36vahiOXKsRb268cfcNxtWg/7DBgOHZN1NFaMvgbE4aI1aMUL5XNlmrEEJFm3MIomzkAM4YIi2KU4j97ioYM5URLXyzlSNGY4dhlwrWtvmjQUC71HtEdK/9nSN89bYRjZqkSzRpKx3DoB8DGTlc0bSi3XTTpsPV8iZV2at6whbNiPcBwZ2V+YxLDduwQ+YAXq5W1ChMZyg5Z9QYdqY0P1MkMZYfsGyDXNsKMCQ1lPebdW722Ft41kxrKVWydq4htTIhPbNgGj12R1cnCqD+5ISIdy1uPFgb96Q27VvBeLIyIFgwRVydVl9APJUIZOloY860YYtUiPxvDhRVDJFQxlYWPbzuGykUNfhs2wzsRV81u+N0Pq+FLn/hKYej3VxuLi6FfzqpWevF7xGdxUOJh1aia8F/7PeJ/70b4N2S6TLnHbed9HbYcK9rrqBwsDn5/ed93lJRVz9Suem4q8v1Nc//rYy24sqxEqENEG6koQ7uCLpvqvSTvCvNLGxlTc/uesk1OBOc/p0FhTLhoDl1pxb3nmag3O7vW50MdNly04CRanXqypr7nS5V714ZiI4fh1tD7rL6uYWxn04JDQztV6NAwtTTP7czQSkZf4srwMr3aDUeGFxszFlfcGGaNvSWKTgxjmwd9ujBcWV2daN/Q9gpTrV1Bq8FHXf5wDG2vEtbKCBORjzvLbGfdTzvnjRn5txt4GtZx9f5Il2caZHgvuH5WXx48u9r1tNf1aY+HbUbYotBwNUdvUZ+k+w55fhCKik359ac6L1/lpqjI4KODcYhMR/4fnIaseBDhjLX1lFRRXu/3dZ1HSUMoZXzM6Ef2yMoqGx3a/w/55qN/FEmRpbjRFTRGgesdi9PCAzT0gJt5QurWcNHNlMatoa38hgvk0pvWsPTnvALTyF1irWEQLbUnErmvWBpmHp2rYRSW3QyD3TLb6XWb37ehZ2fcGOK24fZqGBTLU6S3vWE3Q58OgDGDuC8quhsGO1f72yeBsJ+dNj+GQRbZzwhMBBbRbwT9a9gO/YmbPfyGITR5zPY8GgZBXHM653uU2kiS8vo5K/lsKCXTfejZOX6D2Yb79E/S9T8sK1Xx6C4+/gAAAABJRU5ErkJggg== */
  TypeScript = "TypeScript",
}

/** Boolean expression to compare columns of type "skill_enum". All fields are combined with logical 'AND'. */
export type Skill_Enum_Comparison_Exp = {
  _eq?: Maybe<Skill_Enum>;
  _in?: Maybe<Array<Skill_Enum>>;
  _is_null?: Maybe<Scalars["Boolean"]>;
  _neq?: Maybe<Skill_Enum>;
  _nin?: Maybe<Array<Skill_Enum>>;
};

/** Ordering options when selecting data from "skill". */
export type Skill_Order_By = {
  community_skills_aggregate?: Maybe<Community_Skill_Aggregate_Order_By>;
  icon?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** select columns of table "skill" */
export enum Skill_Select_Column {
  /** column name */
  Icon = "icon",
  /** column name */
  Name = "name",
}

export type Subscription_Root = {
  __typename?: "subscription_root";
  /** fetch data from the table: "channel" */
  channel: Array<Channel>;
  /** fetch data from the table: "channel" using primary key columns */
  channel_by_pk?: Maybe<Channel>;
  /** fetch data from the table: "community" */
  community: Array<Community>;
  /** fetch data from the table: "community" using primary key columns */
  community_by_pk?: Maybe<Community>;
  /** fetch data from the table: "community_member" */
  community_member: Array<Community_Member>;
  /** fetch data from the table: "community_member" using primary key columns */
  community_member_by_pk?: Maybe<Community_Member>;
  /** fetch data from the table: "community_skill" */
  community_skill: Array<Community_Skill>;
  /** fetch data from the table: "community_skill" using primary key columns */
  community_skill_by_pk?: Maybe<Community_Skill>;
  /** fetch data from the table: "plan" */
  plan: Array<Plan>;
  /** fetch data from the table: "plan" using primary key columns */
  plan_by_pk?: Maybe<Plan>;
  /** fetch data from the table: "skill" */
  skill: Array<Skill>;
  /** fetch data from the table: "skill" using primary key columns */
  skill_by_pk?: Maybe<Skill>;
  /** fetch data from the table: "user_role" */
  user_role: Array<User_Role>;
  /** fetch data from the table: "user_role" using primary key columns */
  user_role_by_pk?: Maybe<User_Role>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};

export type Subscription_RootChannelArgs = {
  distinct_on?: Maybe<Array<Channel_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Channel_Order_By>>;
  where?: Maybe<Channel_Bool_Exp>;
};

export type Subscription_RootChannel_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootCommunityArgs = {
  distinct_on?: Maybe<Array<Community_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Community_Order_By>>;
  where?: Maybe<Community_Bool_Exp>;
};

export type Subscription_RootCommunity_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootCommunity_MemberArgs = {
  distinct_on?: Maybe<Array<Community_Member_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Community_Member_Order_By>>;
  where?: Maybe<Community_Member_Bool_Exp>;
};

export type Subscription_RootCommunity_Member_By_PkArgs = {
  community_id: Scalars["uuid"];
  user_id: Scalars["uuid"];
};

export type Subscription_RootCommunity_SkillArgs = {
  distinct_on?: Maybe<Array<Community_Skill_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Community_Skill_Order_By>>;
  where?: Maybe<Community_Skill_Bool_Exp>;
};

export type Subscription_RootCommunity_Skill_By_PkArgs = {
  community_id: Scalars["uuid"];
  skill_name: Skill_Enum;
};

export type Subscription_RootPlanArgs = {
  distinct_on?: Maybe<Array<Plan_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Plan_Order_By>>;
  where?: Maybe<Plan_Bool_Exp>;
};

export type Subscription_RootPlan_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootSkillArgs = {
  distinct_on?: Maybe<Array<Skill_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Skill_Order_By>>;
  where?: Maybe<Skill_Bool_Exp>;
};

export type Subscription_RootSkill_By_PkArgs = {
  name: Scalars["String"];
};

export type Subscription_RootUser_RoleArgs = {
  distinct_on?: Maybe<Array<User_Role_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<User_Role_Order_By>>;
  where?: Maybe<User_Role_Bool_Exp>;
};

export type Subscription_RootUser_Role_By_PkArgs = {
  name: Scalars["String"];
};

export type Subscription_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};

export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars["uuid"];
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars["timestamptz"]>;
  _gt?: Maybe<Scalars["timestamptz"]>;
  _gte?: Maybe<Scalars["timestamptz"]>;
  _in?: Maybe<Array<Scalars["timestamptz"]>>;
  _is_null?: Maybe<Scalars["Boolean"]>;
  _lt?: Maybe<Scalars["timestamptz"]>;
  _lte?: Maybe<Scalars["timestamptz"]>;
  _neq?: Maybe<Scalars["timestamptz"]>;
  _nin?: Maybe<Array<Scalars["timestamptz"]>>;
};

/** columns and relationships of "user_role" */
export type User_Role = {
  __typename?: "user_role";
  /** An array relationship */
  community_members: Array<Community_Member>;
  name: Scalars["String"];
};

/** columns and relationships of "user_role" */
export type User_RoleCommunity_MembersArgs = {
  distinct_on?: Maybe<Array<Community_Member_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Community_Member_Order_By>>;
  where?: Maybe<Community_Member_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "user_role". All fields are combined with a logical 'AND'. */
export type User_Role_Bool_Exp = {
  _and?: Maybe<Array<User_Role_Bool_Exp>>;
  _not?: Maybe<User_Role_Bool_Exp>;
  _or?: Maybe<Array<User_Role_Bool_Exp>>;
  community_members?: Maybe<Community_Member_Bool_Exp>;
  name?: Maybe<String_Comparison_Exp>;
};

export enum User_Role_Enum {
  Admin = "admin",
}

/** Boolean expression to compare columns of type "user_role_enum". All fields are combined with logical 'AND'. */
export type User_Role_Enum_Comparison_Exp = {
  _eq?: Maybe<User_Role_Enum>;
  _in?: Maybe<Array<User_Role_Enum>>;
  _is_null?: Maybe<Scalars["Boolean"]>;
  _neq?: Maybe<User_Role_Enum>;
  _nin?: Maybe<Array<User_Role_Enum>>;
};

/** Ordering options when selecting data from "user_role". */
export type User_Role_Order_By = {
  community_members_aggregate?: Maybe<Community_Member_Aggregate_Order_By>;
  name?: Maybe<Order_By>;
};

/** select columns of table "user_role" */
export enum User_Role_Select_Column {
  /** column name */
  Name = "name",
}

/** columns and relationships of "users" */
export type Users = {
  __typename?: "users";
  auth_id: Scalars["String"];
  /** An array relationship */
  community_members: Array<Community_Member>;
  email: Scalars["String"];
  id: Scalars["uuid"];
  name: Scalars["String"];
  slug: Scalars["String"];
};

/** columns and relationships of "users" */
export type UsersCommunity_MembersArgs = {
  distinct_on?: Maybe<Array<Community_Member_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Community_Member_Order_By>>;
  where?: Maybe<Community_Member_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: Maybe<Array<Users_Bool_Exp>>;
  _not?: Maybe<Users_Bool_Exp>;
  _or?: Maybe<Array<Users_Bool_Exp>>;
  auth_id?: Maybe<String_Comparison_Exp>;
  community_members?: Maybe<Community_Member_Bool_Exp>;
  email?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  slug?: Maybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  auth_id?: Maybe<Order_By>;
  community_members_aggregate?: Maybe<Community_Member_Aggregate_Order_By>;
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  slug?: Maybe<Order_By>;
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  AuthId = "auth_id",
  /** column name */
  Email = "email",
  /** column name */
  Id = "id",
  /** column name */
  Name = "name",
  /** column name */
  Slug = "slug",
}

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars["uuid"]>;
  _gt?: Maybe<Scalars["uuid"]>;
  _gte?: Maybe<Scalars["uuid"]>;
  _in?: Maybe<Array<Scalars["uuid"]>>;
  _is_null?: Maybe<Scalars["Boolean"]>;
  _lt?: Maybe<Scalars["uuid"]>;
  _lte?: Maybe<Scalars["uuid"]>;
  _neq?: Maybe<Scalars["uuid"]>;
  _nin?: Maybe<Array<Scalars["uuid"]>>;
};

export type UsersQueryVariables = Exact<{
  authId: Scalars["String"];
}>;

export type UsersQuery = { __typename?: "query_root" } & {
  users: Array<
    { __typename?: "users" } & Pick<
      Users,
      "id" | "name" | "slug" | "email" | "auth_id"
    >
  >;
};

export const UsersDocument = gql`
  query Users($authId: String!) {
    users(where: { auth_id: { _eq: $authId } }) {
      id
      name
      slug
      email
      auth_id
    }
  }
`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      authId: // value for 'authId'
 *   },
 * });
 */
export function useUsersQuery(
  baseOptions: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    options
  );
}
export function useUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    options
  );
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<
  UsersQuery,
  UsersQueryVariables
>;
