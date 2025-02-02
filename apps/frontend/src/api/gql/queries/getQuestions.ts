import { gql, TypedDocumentNode } from '@apollo/client';
import { Query, QueryGetQuestionsArgs } from '../__generated__/graphql';

export const GET_QUESTIONS: TypedDocumentNode<
  Query,
  QueryGetQuestionsArgs
> = gql`
  query GetQuestions($surveyId: String!) {
    getQuestions(surveyId: $surveyId) {
      id
      text
      type
      answerOptions {
        id
        text
      }
    }
  }
`;
