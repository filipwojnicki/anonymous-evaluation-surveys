import { gql, TypedDocumentNode } from '@apollo/client';
import { Mutation, MutationCreateQuestionArgs } from '../__generated__/graphql';

export const CREATE_QUESTION: TypedDocumentNode<
  Mutation,
  MutationCreateQuestionArgs
> = gql`
  mutation CreateQuestion($data: CreateQuestionInput!) {
    createQuestion(data: $data)
  }
`;
