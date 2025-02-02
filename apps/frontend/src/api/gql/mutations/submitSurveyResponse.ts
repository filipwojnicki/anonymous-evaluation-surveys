import { gql, TypedDocumentNode } from '@apollo/client';
import { Mutation, MutationSubmitResponseArgs } from '../__generated__/graphql';

export const SUBMIT_SURVEY_RESPONSE: TypedDocumentNode<
  Mutation,
  MutationSubmitResponseArgs
> = gql`
  mutation SubmitSurveyResponse($data: SubmitSurveyResponseInput!) {
    submitResponse(data: $data)
  }
`;
