import { gql, TypedDocumentNode } from '@apollo/client';
import { Mutation, MutationDeleteSurveyArgs } from '../__generated__/graphql';

export const DELETE_SURVEY: TypedDocumentNode<
  Mutation,
  MutationDeleteSurveyArgs
> = gql`
  mutation DeleteSurvey($id: String!) {
    deleteSurvey(id: $id)
  }
`;
