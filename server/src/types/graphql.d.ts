import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from './context';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type AddMemberToChannelInput = {
  id: Scalars['String'];
  memberIds: Array<Scalars['String']>;
};

export type ChangeChannelOwnerInput = {
  id: Scalars['String'];
  currentOwnerId: Scalars['String'];
  nextOwnerId: Scalars['String'];
};

export type Channel = {
  __typename?: 'Channel';
  id: Scalars['String'];
  slug: Scalars['String'];
  name: Scalars['String'];
  isPrivate: Scalars['Boolean'];
  members?: Maybe<Array<ChannelMember>>;
};

export type ChannelMember = {
  __typename?: 'ChannelMember';
  id: Scalars['String'];
  name: Scalars['String'];
  slug: Scalars['String'];
  email: Scalars['String'];
  role: ChannelRole;
};

export const enum ChannelRole {
  Owner = 'OWNER',
  Admin = 'ADMIN',
  Common = 'COMMON',
  Leaved = 'LEAVED'
};

export type Community = {
  __typename?: 'Community';
  id: Scalars['String'];
  name: Scalars['String'];
  slug: Scalars['String'];
  introduction: Scalars['String'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  channels?: Maybe<Array<Channel>>;
};

export type CreateChannelInput = {
  slug: Scalars['String'];
  name: Scalars['String'];
  isPrivate: Scalars['Boolean'];
  communityId: Scalars['String'];
};

export type CreateCommunityInput = {
  name: Scalars['String'];
  slug: Scalars['String'];
  introduction: Scalars['String'];
};


export type DeleteChannelInput = {
  id: Scalars['String'];
};

export type GetCommunityInput = {
  id: Scalars['String'];
};

export type JoinChannelInput = {
  id: Scalars['String'];
};

export type KickMemberFromChannelInput = {
  id: Scalars['String'];
  memberId: Scalars['String'];
};

export type LeaveChannelInput = {
  id: Scalars['String'];
  nextOwnerId?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCommunity: Community;
  createChannel: Channel;
  updateChannel: Channel;
  changeChannelOwner: Channel;
  deleteChannel: MutationResponse;
  leaveChannel: MutationResponse;
  joinChannel: Channel;
  kickMemberFromChannel: Channel;
  addMemberToChannel: Channel;
};


export type MutationCreateCommunityArgs = {
  input: CreateCommunityInput;
};


export type MutationCreateChannelArgs = {
  input: CreateChannelInput;
};


export type MutationUpdateChannelArgs = {
  input: UpdateChannelInput;
};


export type MutationChangeChannelOwnerArgs = {
  input: ChangeChannelOwnerInput;
};


export type MutationDeleteChannelArgs = {
  input: DeleteChannelInput;
};


export type MutationLeaveChannelArgs = {
  input: LeaveChannelInput;
};


export type MutationJoinChannelArgs = {
  input: JoinChannelInput;
};


export type MutationKickMemberFromChannelArgs = {
  input: KickMemberFromChannelInput;
};


export type MutationAddMemberToChannelArgs = {
  input: AddMemberToChannelInput;
};

export type MutationResponse = {
  __typename?: 'MutationResponse';
  ok: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  community?: Maybe<Community>;
};


export type QueryCommunityArgs = {
  input: GetCommunityInput;
};

export type UpdateChannelInput = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  isPrivate?: Maybe<Scalars['Boolean']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AddMemberToChannelInput: AddMemberToChannelInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  ChangeChannelOwnerInput: ChangeChannelOwnerInput;
  Channel: ResolverTypeWrapper<Channel>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ChannelMember: ResolverTypeWrapper<ChannelMember>;
  ChannelRole: ChannelRole;
  Community: ResolverTypeWrapper<Community>;
  CreateChannelInput: CreateChannelInput;
  CreateCommunityInput: CreateCommunityInput;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DeleteChannelInput: DeleteChannelInput;
  GetCommunityInput: GetCommunityInput;
  JoinChannelInput: JoinChannelInput;
  KickMemberFromChannelInput: KickMemberFromChannelInput;
  LeaveChannelInput: LeaveChannelInput;
  Mutation: ResolverTypeWrapper<{}>;
  MutationResponse: ResolverTypeWrapper<MutationResponse>;
  Query: ResolverTypeWrapper<{}>;
  UpdateChannelInput: UpdateChannelInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AddMemberToChannelInput: AddMemberToChannelInput;
  String: Scalars['String'];
  ChangeChannelOwnerInput: ChangeChannelOwnerInput;
  Channel: Channel;
  Boolean: Scalars['Boolean'];
  ChannelMember: ChannelMember;
  Community: Community;
  CreateChannelInput: CreateChannelInput;
  CreateCommunityInput: CreateCommunityInput;
  Date: Scalars['Date'];
  DeleteChannelInput: DeleteChannelInput;
  GetCommunityInput: GetCommunityInput;
  JoinChannelInput: JoinChannelInput;
  KickMemberFromChannelInput: KickMemberFromChannelInput;
  LeaveChannelInput: LeaveChannelInput;
  Mutation: {};
  MutationResponse: MutationResponse;
  Query: {};
  UpdateChannelInput: UpdateChannelInput;
}>;

export type ChannelResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Channel'] = ResolversParentTypes['Channel']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isPrivate?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  members?: Resolver<Maybe<Array<ResolversTypes['ChannelMember']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ChannelMemberResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ChannelMember'] = ResolversParentTypes['ChannelMember']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['ChannelRole'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommunityResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Community'] = ResolversParentTypes['Community']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  introduction?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  channels?: Resolver<Maybe<Array<ResolversTypes['Channel']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createCommunity?: Resolver<ResolversTypes['Community'], ParentType, ContextType, RequireFields<MutationCreateCommunityArgs, 'input'>>;
  createChannel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType, RequireFields<MutationCreateChannelArgs, 'input'>>;
  updateChannel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType, RequireFields<MutationUpdateChannelArgs, 'input'>>;
  changeChannelOwner?: Resolver<ResolversTypes['Channel'], ParentType, ContextType, RequireFields<MutationChangeChannelOwnerArgs, 'input'>>;
  deleteChannel?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationDeleteChannelArgs, 'input'>>;
  leaveChannel?: Resolver<ResolversTypes['MutationResponse'], ParentType, ContextType, RequireFields<MutationLeaveChannelArgs, 'input'>>;
  joinChannel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType, RequireFields<MutationJoinChannelArgs, 'input'>>;
  kickMemberFromChannel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType, RequireFields<MutationKickMemberFromChannelArgs, 'input'>>;
  addMemberToChannel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType, RequireFields<MutationAddMemberToChannelArgs, 'input'>>;
}>;

export type MutationResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = ResolversObject<{
  ok?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  community?: Resolver<Maybe<ResolversTypes['Community']>, ParentType, ContextType, RequireFields<QueryCommunityArgs, 'input'>>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  Channel?: ChannelResolvers<ContextType>;
  ChannelMember?: ChannelMemberResolvers<ContextType>;
  Community?: CommunityResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  MutationResponse?: MutationResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
