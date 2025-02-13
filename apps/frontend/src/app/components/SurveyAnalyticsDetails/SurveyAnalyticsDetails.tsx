import { Header } from '../Header';
import { useParams, Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ArrowLeft } from 'lucide-react';
import { useQuery } from '@apollo/client';
import { GET_SURVEY_ANALYTICS_DETAILS } from '../../../api/gql/queries';
import { QuestionType } from '../../../api/gql/__generated__/graphql';
import { useTranslation } from 'react-i18next';
import { TextAnswersModal } from '../TextAnswersModal';

export const SurveyAnalyticsDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery(GET_SURVEY_ANALYTICS_DETAILS, {
    variables: { surveyId: id ?? '' },
    skip: !id,
    pollInterval: 30000,
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <Header />
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-24 bg-gray-200 rounded"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 rounded-xl p-6 h-96"></div>
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
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 p-4 rounded-lg text-red-700">
            {t('surveyAnalyticsDetails.errors.loading', {
              message: error.message,
            })}
          </div>
        </div>
      </div>
    );
  }

  const survey = data?.getSurveyAnalyticsDetails;

  if (!survey) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <Header />
        <div className="max-w-7xl mx-auto">
          <div className="bg-yellow-50 p-4 rounded-lg text-yellow-700">
            {t('surveyAnalyticsDetails.errors.notFound')}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header />
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link
            to="/dashboard/analytics"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('surveyAnalyticsDetails.navigation.backToSurveys')}
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="border-b pb-6 mb-6">
            <h2 className="text-3xl font-bold text-gray-900">{survey.title}</h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600 font-medium">
                  {t('surveyAnalyticsDetails.metrics.totalResponses.title')}
                </p>
                <p className="text-2xl font-bold text-blue-900">
                  {t('surveyAnalyticsDetails.metrics.totalResponses.value', {
                    count: survey.responses,
                  })}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-600 font-medium">
                  {t('surveyAnalyticsDetails.metrics.completionRate.title')}
                </p>
                <p className="text-2xl font-bold text-green-900">
                  {t('surveyAnalyticsDetails.metrics.completionRate.value', {
                    rate: survey.completionRate.toFixed(2),
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {survey.questions.map((question, index) => (
              <div key={question.id} className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  {t('surveyAnalyticsDetails.questions.title', {
                    number: index + 1,
                    text: question.text,
                  })}
                </h3>

                {question.type === QuestionType.SingleChoice.toLowerCase() && (
                  <div className="space-y-6">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={question.answerFrequency}>
                          <XAxis dataKey="text" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="count" fill="#3B82F6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid gap-2">
                      {question.answerFrequency.map((answer) => (
                        <div
                          key={answer.text}
                          className="flex items-center justify-between p-3 bg-white rounded-lg shadow-md"
                        >
                          <span className="font-medium text-gray-700">
                            {answer.text}
                          </span>
                          <div className="flex items-center space-x-4">
                            <span className="text-gray-500">
                              {t(
                                'surveyAnalyticsDetails.questions.types.singleChoice.responses',
                                { count: answer.count }
                              )}
                            </span>
                            <span className="text-blue-600 font-medium">
                              {t(
                                'surveyAnalyticsDetails.questions.types.singleChoice.percentage',
                                { value: answer.percentage.toFixed(1) }
                              )}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {question.type ===
                  QuestionType.MultipleChoice.toLowerCase() && (
                  <div className="space-y-6">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={question.answerFrequency}>
                          <XAxis dataKey="text" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="count" fill="#8B5CF6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid gap-2">
                      {question.answerFrequency.map((answer) => (
                        <div
                          key={answer.text}
                          className="flex items-center justify-between p-3 bg-white rounded-lg shadow-md"
                        >
                          <span className="font-medium text-gray-700">
                            {answer.text}
                          </span>
                          <div className="flex items-center space-x-4">
                            <span className="text-gray-500">
                              {t(
                                'surveyAnalyticsDetails.questions.types.multipleChoice.selections',
                                { count: answer.count }
                              )}
                            </span>
                            <span className="text-purple-600 font-medium">
                              {t(
                                'surveyAnalyticsDetails.questions.types.multipleChoice.percentage',
                                { value: answer.percentage.toFixed(1) }
                              )}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {question.type === QuestionType.Text.toLowerCase() && (
                  <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                      <p className="text-gray-600 mb-2">
                        {t(
                          'surveyAnalyticsDetails.questions.types.text.totalResponses',
                          { count: question.answerFrequency.length }
                        )}
                      </p>

                      <div className="mt-6">
                        <h4 className="text-lg font-medium text-gray-700 mb-4">
                          {t(
                            'surveyAnalyticsDetails.questions.types.text.mostCommonWords'
                          )}
                        </h4>
                        <div className="space-y-3">
                          {question.answerFrequency.map((word) => (
                            <div
                              key={word.text}
                              className="bg-gray-50 rounded-lg p-4 shadow-sm"
                            >
                              <div className="flex justify-between mb-2">
                                <span className="font-medium text-gray-700">
                                  {word.text}
                                </span>
                                <span className="text-gray-500">
                                  {t(
                                    'surveyAnalyticsDetails.questions.types.text.occurrences',
                                    {
                                      count: word.count,
                                      percentage: word.percentage.toFixed(1),
                                    }
                                  )}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${word.percentage}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4">
                        <TextAnswersModal
                          questionId={question.id}
                          questionText={question.text}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
