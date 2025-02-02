import { gql, TypedDocumentNode } from '@apollo/client';
import { Query, QueryGetSurveyByTokenArgs } from '../__generated__/graphql';

export const GET_SURVEY_BY_TOKEN: TypedDocumentNode<
  Query,
  QueryGetSurveyByTokenArgs
> = gql`
  query GetSurveyByToken($token: String!) {
    getSurveyByToken(token: $token) {
      id
      title
      questions {
        id
        text
        type
        answerOptions {
          id
          text
        }
      }
    }
  }
`;
