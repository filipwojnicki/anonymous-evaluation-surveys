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

export const SurveyAnalyticsDetails = () => {
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
            Error loading survey analytics: {error.message}
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
            Survey not found
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
            Back to Surveys
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="border-b pb-6 mb-6">
            <h2 className="text-3xl font-bold text-gray-900">{survey.title}</h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600 font-medium">
                  Total Responses
                </p>
                <p className="text-2xl font-bold text-blue-900">
                  {survey.responses}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-600 font-medium">
                  Completion Rate
                </p>
                <p className="text-2xl font-bold text-green-900">
                  {survey.completionRate.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {survey.questions.map((question, index) => (
              <div key={question.id} className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  Question {index + 1}: {question.text}
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
                          className="flex items-center justify-between p-3 bg-white rounded-lg"
                        >
                          <span className="font-medium text-gray-700">
                            {answer.text}
                          </span>
                          <div className="flex items-center space-x-4">
                            <span className="text-gray-500">
                              {answer.count} responses
                            </span>
                            <span className="text-blue-600 font-medium">
                              {answer.percentage.toFixed(1)}%
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
                          className="flex items-center justify-between p-3 bg-white rounded-lg"
                        >
                          <span className="font-medium text-gray-700">
                            {answer.text}
                          </span>
                          <div className="flex items-center space-x-4">
                            <span className="text-gray-500">
                              {answer.count} selections
                            </span>
                            <span className="text-purple-600 font-medium">
                              {answer.percentage.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {question.type === QuestionType.Text.toLowerCase() && (
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-gray-600">
                      Total text responses: {question.answerFrequency.length}
                    </p>
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
