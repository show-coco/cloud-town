import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Channel = {
  __typename?: 'Channel';
  id: Scalars['String'];
  slug: Scalars['String'];
  name: Scalars['String'];
  isPrivate: Scalars['Boolean'];
};

export type Community = {
  __typename?: 'Community';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  introduction?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
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


export type Mutation = {
  __typename?: 'Mutation';
  createCommunity?: Maybe<Community>;
  createChannel?: Maybe<Channel>;
};


export type MutationCreateCommunityArgs = {
  input: CreateCommunityInput;
};


export type MutationCreateChannelArgs = {
  input: CreateChannelInput;
};

export type Query = {
  __typename?: 'Query';
  community?: Maybe<Community>;
};


export type CommunityQueryVariables = Exact<{ [key: string]: never; }>;


export type CommunityQuery = (
  { __typename?: 'Query' }
  & { community?: Maybe<(
    { __typename?: 'Community' }
    & Pick<Community, 'id' | 'name'>
  )> }
);


export const CommunityDocument = gql`
    query Community {
  community {
    id
    name
  }
}
    `;

/**
 * __useCommunityQuery__
 *
 * To run a query within a React component, call `useCommunityQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommunityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommunityQuery({
 *   variables: {
 *   },
 * });
 */
export function useCommunityQuery(baseOptions?: Apollo.QueryHookOptions<CommunityQuery, CommunityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommunityQuery, CommunityQueryVariables>(CommunityDocument, options);
      }
export function useCommunityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommunityQuery, CommunityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommunityQuery, CommunityQueryVariables>(CommunityDocument, options);
        }
export type CommunityQueryHookResult = ReturnType<typeof useCommunityQuery>;
export type CommunityLazyQueryHookResult = ReturnType<typeof useCommunityLazyQuery>;
export type CommunityQueryResult = Apollo.QueryResult<CommunityQuery, CommunityQueryVariables>;