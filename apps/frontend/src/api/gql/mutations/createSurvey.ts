import { TypedDocumentNode, gql } from '@apollo/client';
import { Mutation, MutationCreateSurveyArgs } from '../__generated__/graphql';

export const CREATE_SURVEY: TypedDocumentNode<
  Mutation,
  MutationCreateSurveyArgs
> = gql`
  mutation createSurvey($data: CreateSurveyDto!) {
    createSurvey(data: $data) {
      title
      creatorId
      description
      id
    }
  }
`;
