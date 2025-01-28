import { TypedDocumentNode, gql } from '@apollo/client';
import { Mutation, MutationLoginArgs } from '../__generated__/graphql';

export const LOGIN: TypedDocumentNode<Mutation, MutationLoginArgs> = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
    }
  }
`;
