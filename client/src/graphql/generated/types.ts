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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type Author = {
  __typename?: 'Author';
  name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
};

export type Book = {
  __typename?: 'Book';
  title?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Query = {
  __typename?: 'Query';
  getAuthor?: Maybe<Author>;
  books?: Maybe<Array<Maybe<Book>>>;
};


export type QueryGetAuthorArgs = {
  id: Scalars['String'];
};


export type BooksQueryVariables = Exact<{ [key: string]: never; }>;


export type BooksQuery = (
  { __typename?: 'Query' }
  & { books?: Maybe<Array<Maybe<(
    { __typename?: 'Book' }
    & Pick<Book, 'title'>
  )>>> }
);


export const BooksDocument = gql`
    query Books {
  books {
    title
  }
}
    `;

/**
 * __useBooksQuery__
 *
 * To run a query within a React component, call `useBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBooksQuery({
 *   variables: {
 *   },
 * });
 */
export function useBooksQuery(baseOptions?: Apollo.QueryHookOptions<BooksQuery, BooksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BooksQuery, BooksQueryVariables>(BooksDocument, options);
      }
export function useBooksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BooksQuery, BooksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BooksQuery, BooksQueryVariables>(BooksDocument, options);
        }
export type BooksQueryHookResult = ReturnType<typeof useBooksQuery>;
export type BooksLazyQueryHookResult = ReturnType<typeof useBooksLazyQuery>;
export type BooksQueryResult = Apollo.QueryResult<BooksQuery, BooksQueryVariables>;