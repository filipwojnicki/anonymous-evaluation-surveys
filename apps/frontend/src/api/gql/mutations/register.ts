import { TypedDocumentNode, gql } from '@apollo/client';
import { Mutation, MutationRegisterArgs } from '../__generated__/graphql';

export const REGISTER: TypedDocumentNode<Mutation, MutationRegisterArgs> = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      accessToken
    }
  }
`;
