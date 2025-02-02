import { gql, TypedDocumentNode } from '@apollo/client';
import { Query, QueryGetQuestionArgs } from '../__generated__/graphql';

export const GET_QUESTION: TypedDocumentNode<Query, QueryGetQuestionArgs> = gql`
  query GetQuestion($questionId: String!, $surveyId: String!) {
    getQuestion(questionId: $questionId, surveyId: $surveyId) {
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
