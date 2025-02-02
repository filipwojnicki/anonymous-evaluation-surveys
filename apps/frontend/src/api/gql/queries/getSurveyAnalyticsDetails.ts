import { gql, TypedDocumentNode } from '@apollo/client';
import {
  Query,
  QueryGetSurveyAnalyticsDetailsArgs,
} from '../__generated__/graphql';

export const GET_SURVEY_ANALYTICS_DETAILS: TypedDocumentNode<
  Query,
  QueryGetSurveyAnalyticsDetailsArgs
> = gql`
  query GetSurveyAnalyticsDetails($surveyId: String!) {
    getSurveyAnalyticsDetails(surveyId: $surveyId) {
      id
      title
      responses
      completionRate
      questions {
        id
        text
        type
        answerFrequency {
          text
          count
          percentage
        }
      }
    }
  }
`;
