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

export type CreateCommunityInput = {
  description: Scalars["String"];
  name: Scalars["String"];
  slug: Scalars["String"];
  thumbnailUrl: Scalars["String"];
  title: Scalars["String"];
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

/** columns and relationships of "category" */
export type Category = {
  __typename?: "category";
  /** An array relationship */
  communities: Array<Community>;
  id: Scalars["String"];
  name: Scalars["String"];
};

/** columns and relationships of "category" */
export type CategoryCommunitiesArgs = {
  distinct_on?: Maybe<Array<Community_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Community_Order_By>>;
  where?: Maybe<Community_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "category". All fields are combined with a logical 'AND'. */
export type Category_Bool_Exp = {
  _and?: Maybe<Array<Category_Bool_Exp>>;
  _not?: Maybe<Category_Bool_Exp>;
  _or?: Maybe<Array<Category_Bool_Exp>>;
  communities?: Maybe<Community_Bool_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
};

export enum Category_Enum {
  /** ビジネス */
  Business = "Business",
  /** チャレンジ */
  Challenge = "Challenge",
  /** 雑談 */
  Chat = "Chat",
  /** デザイン */
  Design = "Design",
  /** ゲーム */
  Game = "Game",
  /** 音楽 */
  Music = "Music",
  /** その他 */
  Others = "Others",
  /** 写真 */
  Picture = "Picture",
  /** プログラミング */
  Programming = "Programming",
}

/** Boolean expression to compare columns of type "category_enum". All fields are combined with logical 'AND'. */
export type Category_Enum_Comparison_Exp = {
  _eq?: Maybe<Category_Enum>;
  _in?: Maybe<Array<Category_Enum>>;
  _is_null?: Maybe<Scalars["Boolean"]>;
  _neq?: Maybe<Category_Enum>;
  _nin?: Maybe<Array<Category_Enum>>;
};

/** Ordering options when selecting data from "category". */
export type Category_Order_By = {
  communities_aggregate?: Maybe<Community_Aggregate_Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** select columns of table "category" */
export enum Category_Select_Column {
  /** column name */
  Id = "id",
  /** column name */
  Name = "name",
}

/** columns and relationships of "community" */
export type Community = {
  __typename?: "community";
  /** An object relationship */
  category: Category;
  category_id: Category_Enum;
  chat_url?: Maybe<Scalars["String"]>;
  /** An array relationship */
  community_members: Array<Community_Member>;
  created_at: Scalars["timestamptz"];
  description: Scalars["String"];
  icon_url?: Maybe<Scalars["String"]>;
  id: Scalars["uuid"];
  name: Scalars["String"];
  /** An array relationship */
  plans: Array<Plan>;
  slug: Scalars["String"];
  thumbnail_url: Scalars["String"];
  title: Scalars["String"];
  updated_at: Scalars["timestamptz"];
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
export type CommunityPlansArgs = {
  distinct_on?: Maybe<Array<Plan_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Plan_Order_By>>;
  where?: Maybe<Plan_Bool_Exp>;
};

/** order by aggregate values of table "community" */
export type Community_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Community_Max_Order_By>;
  min?: Maybe<Community_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "community". All fields are combined with a logical 'AND'. */
export type Community_Bool_Exp = {
  _and?: Maybe<Array<Community_Bool_Exp>>;
  _not?: Maybe<Community_Bool_Exp>;
  _or?: Maybe<Array<Community_Bool_Exp>>;
  category?: Maybe<Category_Bool_Exp>;
  category_id?: Maybe<Category_Enum_Comparison_Exp>;
  chat_url?: Maybe<String_Comparison_Exp>;
  community_members?: Maybe<Community_Member_Bool_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  icon_url?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  plans?: Maybe<Plan_Bool_Exp>;
  slug?: Maybe<String_Comparison_Exp>;
  thumbnail_url?: Maybe<String_Comparison_Exp>;
  title?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** order by max() on columns of table "community" */
export type Community_Max_Order_By = {
  chat_url?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  icon_url?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  slug?: Maybe<Order_By>;
  thumbnail_url?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** columns and relationships of "community_member" */
export type Community_Member = {
  __typename?: "community_member";
  /** An object relationship */
  community: Community;
  community_id: Scalars["uuid"];
  /** An object relationship */
  plan?: Maybe<Plan>;
  role: Community_Role_Enum;
  /** An object relationship */
  user: Users;
  user_id: Scalars["uuid"];
  /** An object relationship */
  user_role: Community_Role;
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
  role?: Maybe<Community_Role_Enum_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  user_id?: Maybe<Uuid_Comparison_Exp>;
  user_role?: Maybe<Community_Role_Bool_Exp>;
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
  user_role?: Maybe<Community_Role_Order_By>;
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

/** order by min() on columns of table "community" */
export type Community_Min_Order_By = {
  chat_url?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  icon_url?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  slug?: Maybe<Order_By>;
  thumbnail_url?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** Ordering options when selecting data from "community". */
export type Community_Order_By = {
  category?: Maybe<Category_Order_By>;
  category_id?: Maybe<Order_By>;
  chat_url?: Maybe<Order_By>;
  community_members_aggregate?: Maybe<Community_Member_Aggregate_Order_By>;
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  icon_url?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  plans_aggregate?: Maybe<Plan_Aggregate_Order_By>;
  slug?: Maybe<Order_By>;
  thumbnail_url?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** columns and relationships of "community_role" */
export type Community_Role = {
  __typename?: "community_role";
  /** An array relationship */
  community_members: Array<Community_Member>;
  name: Scalars["String"];
};

/** columns and relationships of "community_role" */
export type Community_RoleCommunity_MembersArgs = {
  distinct_on?: Maybe<Array<Community_Member_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Community_Member_Order_By>>;
  where?: Maybe<Community_Member_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "community_role". All fields are combined with a logical 'AND'. */
export type Community_Role_Bool_Exp = {
  _and?: Maybe<Array<Community_Role_Bool_Exp>>;
  _not?: Maybe<Community_Role_Bool_Exp>;
  _or?: Maybe<Array<Community_Role_Bool_Exp>>;
  community_members?: Maybe<Community_Member_Bool_Exp>;
  name?: Maybe<String_Comparison_Exp>;
};

export enum Community_Role_Enum {
  Admin = "Admin",
  Common = "Common",
  Owner = "Owner",
}

/** Boolean expression to compare columns of type "community_role_enum". All fields are combined with logical 'AND'. */
export type Community_Role_Enum_Comparison_Exp = {
  _eq?: Maybe<Community_Role_Enum>;
  _in?: Maybe<Array<Community_Role_Enum>>;
  _is_null?: Maybe<Scalars["Boolean"]>;
  _neq?: Maybe<Community_Role_Enum>;
  _nin?: Maybe<Array<Community_Role_Enum>>;
};

/** Ordering options when selecting data from "community_role". */
export type Community_Role_Order_By = {
  community_members_aggregate?: Maybe<Community_Member_Aggregate_Order_By>;
  name?: Maybe<Order_By>;
};

/** select columns of table "community_role" */
export enum Community_Role_Select_Column {
  /** column name */
  Name = "name",
}

/** select columns of table "community" */
export enum Community_Select_Column {
  /** column name */
  CategoryId = "category_id",
  /** column name */
  ChatUrl = "chat_url",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Description = "description",
  /** column name */
  IconUrl = "icon_url",
  /** column name */
  Id = "id",
  /** column name */
  Name = "name",
  /** column name */
  Slug = "slug",
  /** column name */
  ThumbnailUrl = "thumbnail_url",
  /** column name */
  Title = "title",
  /** column name */
  UpdatedAt = "updated_at",
}

/** mutation root */
export type Mutation_Root = {
  __typename?: "mutation_root";
  createCommunity: Scalars["String"];
};

/** mutation root */
export type Mutation_RootCreateCommunityArgs = {
  input: CreateCommunityInput;
};

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
  trial_period?: Maybe<Scalars["String"]>;
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
  /** fetch data from the table: "category" */
  category: Array<Category>;
  /** fetch data from the table: "category" using primary key columns */
  category_by_pk?: Maybe<Category>;
  /** fetch data from the table: "community" */
  community: Array<Community>;
  /** fetch data from the table: "community" using primary key columns */
  community_by_pk?: Maybe<Community>;
  /** fetch data from the table: "community_member" */
  community_member: Array<Community_Member>;
  /** fetch data from the table: "community_member" using primary key columns */
  community_member_by_pk?: Maybe<Community_Member>;
  /** fetch data from the table: "community_role" */
  community_role: Array<Community_Role>;
  /** fetch data from the table: "community_role" using primary key columns */
  community_role_by_pk?: Maybe<Community_Role>;
  healthCheck: Scalars["Boolean"];
  /** fetch data from the table: "plan" */
  plan: Array<Plan>;
  /** fetch data from the table: "plan" using primary key columns */
  plan_by_pk?: Maybe<Plan>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};

export type Query_RootCategoryArgs = {
  distinct_on?: Maybe<Array<Category_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Category_Order_By>>;
  where?: Maybe<Category_Bool_Exp>;
};

export type Query_RootCategory_By_PkArgs = {
  id: Scalars["String"];
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

export type Query_RootCommunity_RoleArgs = {
  distinct_on?: Maybe<Array<Community_Role_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Community_Role_Order_By>>;
  where?: Maybe<Community_Role_Bool_Exp>;
};

export type Query_RootCommunity_Role_By_PkArgs = {
  name: Scalars["String"];
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

export type Subscription_Root = {
  __typename?: "subscription_root";
  /** fetch data from the table: "category" */
  category: Array<Category>;
  /** fetch data from the table: "category" using primary key columns */
  category_by_pk?: Maybe<Category>;
  /** fetch data from the table: "community" */
  community: Array<Community>;
  /** fetch data from the table: "community" using primary key columns */
  community_by_pk?: Maybe<Community>;
  /** fetch data from the table: "community_member" */
  community_member: Array<Community_Member>;
  /** fetch data from the table: "community_member" using primary key columns */
  community_member_by_pk?: Maybe<Community_Member>;
  /** fetch data from the table: "community_role" */
  community_role: Array<Community_Role>;
  /** fetch data from the table: "community_role" using primary key columns */
  community_role_by_pk?: Maybe<Community_Role>;
  /** fetch data from the table: "plan" */
  plan: Array<Plan>;
  /** fetch data from the table: "plan" using primary key columns */
  plan_by_pk?: Maybe<Plan>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};

export type Subscription_RootCategoryArgs = {
  distinct_on?: Maybe<Array<Category_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Category_Order_By>>;
  where?: Maybe<Category_Bool_Exp>;
};

export type Subscription_RootCategory_By_PkArgs = {
  id: Scalars["String"];
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

export type Subscription_RootCommunity_RoleArgs = {
  distinct_on?: Maybe<Array<Community_Role_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Community_Role_Order_By>>;
  where?: Maybe<Community_Role_Bool_Exp>;
};

export type Subscription_RootCommunity_Role_By_PkArgs = {
  name: Scalars["String"];
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

export type CategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type CategoriesQuery = { __typename?: "query_root" } & {
  category: Array<{ __typename?: "category" } & Pick<Category, "id" | "name">>;
};

export type UserQueryVariables = Exact<{
  authId: Scalars["String"];
}>;

export type UserQuery = { __typename?: "query_root" } & {
  users: Array<
    { __typename?: "users" } & Pick<
      Users,
      "id" | "name" | "slug" | "email" | "auth_id"
    > & {
        community_members: Array<
          { __typename?: "community_member" } & {
            community: { __typename?: "community" } & Pick<
              Community,
              "id" | "name" | "slug" | "icon_url"
            >;
          }
        >;
      }
  >;
};

export const CategoriesDocument = gql`
  query Categories {
    category {
      id
      name
    }
  }
`;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CategoriesQuery,
    CategoriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(
    CategoriesDocument,
    options
  );
}
export function useCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CategoriesQuery,
    CategoriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(
    CategoriesDocument,
    options
  );
}
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<
  typeof useCategoriesLazyQuery
>;
export type CategoriesQueryResult = Apollo.QueryResult<
  CategoriesQuery,
  CategoriesQueryVariables
>;
export const UserDocument = gql`
  query User($authId: String!) {
    users(where: { auth_id: { _eq: $authId } }) {
      id
      name
      slug
      email
      auth_id
      community_members(where: { user: { auth_id: { _eq: $authId } } }) {
        community {
          id
          name
          slug
          icon_url
        }
      }
    }
  }
`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      authId: // value for 'authId'
 *   },
 * });
 */
export function useUserQuery(
  baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
}
export function useUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    options
  );
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
