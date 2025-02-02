import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SUBMIT_SURVEY_RESPONSE } from '../../../api/gql/mutations';
import { GET_SURVEY_BY_TOKEN } from '../../../api/gql/queries';
import { QuestionType } from '../../../api/gql/__generated__/graphql';

export const Survey = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const { data, loading, error } = useQuery(GET_SURVEY_BY_TOKEN, {
    variables: { token: token || '' },
    skip: !token,
  });

  const [submitResponse, { loading: submitting }] = useMutation(
    SUBMIT_SURVEY_RESPONSE,
    {
      onCompleted: () => {
        navigate('/survey/thank-you');
      },
    }
  );

  const handleTextAnswer = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSingleChoice = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleMultipleChoice = (questionId: string, value: string) => {
    const currentAnswers = answers[questionId] || [];
    const updatedAnswers = currentAnswers.includes(value)
      ? currentAnswers.filter((v: string) => v !== value)
      : [...currentAnswers, value];
    setAnswers({ ...answers, [questionId]: updatedAnswers });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedAnswers = Object.entries(answers).map(
      ([questionId, answer]) => ({
        questionId,
        answer: Array.isArray(answer) ? answer.join(',') : answer,
      })
    );

    await submitResponse({
      variables: {
        data: {
          token: token || '',
          answers: formattedAnswers,
        },
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="animate-pulse text-lg text-gray-600">
          Loading survey...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-red-600">Error: {error.message}</div>
      </div>
    );
  }

  const survey = data?.getSurveyByToken;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-6 py-8 border-b border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900">
              {survey?.title}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-8">
            {survey?.questions &&
              survey.questions.map((question) => (
                <div key={question.id} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {question.text}
                  </h3>

                  {question.type.toUpperCase() === QuestionType.Text && (
                    <textarea
                      value={answers[question.id] || ''}
                      onChange={(e) =>
                        handleTextAnswer(question.id, e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      rows={4}
                    />
                  )}

                  {question.type.toUpperCase() ===
                    QuestionType.SingleChoice && (
                    <div className="space-y-4">
                      {question.answerOptions &&
                        question.answerOptions?.map((option) => (
                          <label
                            key={option.id}
                            className="flex items-center space-x-3 p-3 bg-white rounded-md border border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors"
                          >
                            <input
                              type="radio"
                              name={`question-${question.id}`}
                              value={option.id}
                              checked={answers[question.id] === option.id}
                              onChange={() =>
                                handleSingleChoice(question.id, option.id)
                              }
                              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <span className="text-gray-900">{option.text}</span>
                          </label>
                        ))}
                    </div>
                  )}

                  {question.type.toUpperCase() ===
                    QuestionType.MultipleChoice && (
                    <div className="space-y-4">
                      {question.answerOptions &&
                        question.answerOptions?.map((option) => (
                          <label
                            key={option.id}
                            className="flex items-center space-x-3 p-3 bg-white rounded-md border border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors"
                          >
                            <input
                              type="checkbox"
                              value={option.id}
                              checked={(answers[question.id] || []).includes(
                                option.id
                              )}
                              onChange={() =>
                                handleMultipleChoice(question.id, option.id)
                              }
                              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-gray-900">{option.text}</span>
                          </label>
                        ))}
                    </div>
                  )}
                </div>
              ))}

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Submit Survey'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
