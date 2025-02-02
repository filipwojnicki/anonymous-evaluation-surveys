import { gql, TypedDocumentNode } from '@apollo/client';
import { Query, QueryGetSurveyTokensArgs } from '../__generated__/graphql';

export const GET_SURVEY_TOKENS: TypedDocumentNode<
  Query,
  QueryGetSurveyTokensArgs
> = gql`
  query GetSurveyTokens($surveyId: String!) {
    getSurveyTokens(surveyId: $surveyId) {
      id
      token
    }
  }
`;
