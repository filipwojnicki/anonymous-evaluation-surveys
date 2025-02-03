import { useQuery } from '@apollo/client';
import { Header } from '../Header';
import { GET_SURVEYS_ANALYTICS } from '../../../api/gql/queries';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const SurveyAnalytics = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useQuery(GET_SURVEYS_ANALYTICS, {
    pollInterval: 30000,
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <Header />
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-lg">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <Header />
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="text-red-500">
            {t('surveyAnalytics.errors.loading', { message: error.message })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header />
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">
          {t('surveyAnalytics.title')}
        </h2>
        <div className="space-y-4">
          {data?.getSurveysAnalytics.map((survey) => (
            <Link
              key={`survey-analitycs-${survey.id}`}
              to={`/dashboard/analytics/${survey.id}`}
              className="block transition-transform hover:scale-[1.01]"
            >
              <div className="p-6 bg-gray-50 rounded-lg shadow-sm border border-transparent hover:bg-white hover:shadow-md hover:border-blue-100 transition-all duration-200 ease-in-out">
                <h3 className="text-xl font-semibold text-gray-800">
                  {survey.title}
                </h3>
                <p className="text-gray-600">
                  {' '}
                  {t('surveyAnalytics.survey.responses', {
                    count: survey.responses,
                  })}
                </p>
                <p className="text-gray-600">
                  {t('surveyAnalytics.survey.completionRate', {
                    rate: survey.completionRate.toFixed(2),
                  })}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${survey.completionRate}%` }}
                  ></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
