import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { GET_RANDOM_TOKEN } from '../../../api/gql/queries/getRandomToken';

export const RedirectWithToken = () => {
  const { surveyId } = useParams<{ surveyId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data, loading, error } = useQuery(GET_RANDOM_TOKEN, {
    variables: { surveyId: surveyId ?? '' },
    skip: !surveyId,
  });

  useEffect(() => {
    if (data?.getRandomUnusedToken?.token) {
      navigate(`/survey/${data.getRandomUnusedToken.token}`);
    }
  }, [data, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 mx-auto mb-4 border-4 border-blue-500 rounded-full border-t-transparent"></div>
          <p className="text-gray-600">{t('redirect.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-50 p-4 rounded-lg text-red-700 max-w-md text-center">
          {t('redirect.error')}
        </div>
      </div>
    );
  }

  return null;
};
