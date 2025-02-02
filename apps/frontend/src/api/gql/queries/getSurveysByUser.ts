import { TypedDocumentNode, gql } from '@apollo/client';
import { Query, SurveyDto } from '../__generated__/graphql';

export const GET_SURVEYS_BY_USER: TypedDocumentNode<Query, SurveyDto> = gql`
  query GetSurveysByUser {
    getSurveysByUser {
      title
      id
      createdAt
    }
  }
`;
