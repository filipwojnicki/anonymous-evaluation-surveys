import { gql, TypedDocumentNode } from '@apollo/client';
import { Mutation } from '../__generated__/graphql';

export const UPDATE_QUESTION: TypedDocumentNode<Mutation> = gql`
  mutation UpdateQuestion(
    $questionId: String!
    $surveyId: String!
    $data: UpdateQuestionInput!
  ) {
    updateQuestion(questionId: $questionId, surveyId: $surveyId, data: $data)
  }
`;
