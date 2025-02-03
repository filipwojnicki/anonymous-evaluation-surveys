import { gql, TypedDocumentNode } from '@apollo/client';
import { Query, QueryGetRandomUnusedTokenArgs } from '../__generated__/graphql';

export const GET_RANDOM_TOKEN: TypedDocumentNode<
  Query,
  QueryGetRandomUnusedTokenArgs
> = gql`
  query GetRandomUnusedToken($surveyId: String!) {
    getRandomUnusedToken(surveyId: $surveyId) {
      token
    }
  }
`;
