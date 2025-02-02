import { useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { GET_SURVEY } from '../../../api/gql/queries';
import { Header } from '../Header';
import { TokensList } from '../TokenList';
import { QuestionsList } from '../QuestionsList';

export const SurveyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data } = useQuery(GET_SURVEY, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'cache-and-network',
  });

  if (!id || id === 'undefined') {
    navigate('/dashboard/survey/view-all');
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header />
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          {data?.getSurvey.title}
        </h2>

        <div className="mb-10">
          <TokensList surveyId={id ?? ''} />
        </div>

        <QuestionsList surveyId={id ?? ''} />
      </div>
    </div>
  );
};
