import { gql, TypedDocumentNode } from '@apollo/client';
import { Mutation, MutationDeleteQuestionArgs } from '../__generated__/graphql';

export const DELETE_QUESTION: TypedDocumentNode<
  Mutation,
  MutationDeleteQuestionArgs
> = gql`
  mutation DeleteQuestion($questionId: String!, $surveyId: String!) {
    deleteQuestion(questionId: $questionId, surveyId: $surveyId)
  }
`;
