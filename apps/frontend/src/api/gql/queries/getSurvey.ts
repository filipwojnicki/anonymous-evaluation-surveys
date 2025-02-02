import { gql } from '@apollo/client';

export const GET_SURVEY = gql`
  query GetSurvey($id: String!) {
    getSurvey(id: $id) {
      id
      title
      description
    }
  }
`;
