import { gql } from '@apollo/client';

export const UPDATE_SURVEY = gql`
  mutation UpdateSurvey($id: String!, $data: UpdateSurveyDto!) {
    updateSurvey(id: $id, data: $data) {
      id
      title
      description
    }
  }
`;
