import { gql, TypedDocumentNode } from '@apollo/client';
import { Query } from '../__generated__/graphql';

export const GET_SURVEYS_ANALYTICS: TypedDocumentNode<Query> = gql`
  query GetSurveysAnalytics {
    getSurveysAnalytics {
      id
      title
      responses
      completionRate
    }
  }
`;
