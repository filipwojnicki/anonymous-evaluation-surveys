import { gql, TypedDocumentNode } from '@apollo/client';
import { Query, QueryGetTextAnswersArgs } from '../__generated__/graphql';

export const GET_TEXT_ANSWERS: TypedDocumentNode<
  Query,
  QueryGetTextAnswersArgs
> = gql`
  query GetTextAnswers($questionId: String!) {
    getTextAnswers(questionId: $questionId) {
      text
    }
  }
`;
