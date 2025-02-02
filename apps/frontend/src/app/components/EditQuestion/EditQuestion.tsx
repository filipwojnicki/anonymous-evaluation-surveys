import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { Plus, X } from 'lucide-react';
import { Header } from '../Header';
import {
  QuestionType,
  AnswerOptionInput,
} from '../../../api/gql/__generated__/graphql';
import { GET_QUESTION } from '../../../api/gql/queries';
import { UPDATE_QUESTION } from '../../../api/gql/mutations';

export const EditQuestion = () => {
  const navigate = useNavigate();
  const { surveyId, questionId } = useParams<{
    surveyId: string;
    questionId: string;
  }>();
  const [text, setText] = useState('');
  const [type, setType] = useState<QuestionType>(QuestionType.Text);
  const [answerOptions, setAnswerOptions] = useState<AnswerOptionInput[]>([]);
  const [newOptionText, setNewOptionText] = useState('');

  const { loading: queryLoading, data } = useQuery(GET_QUESTION, {
    variables: {
      questionId: questionId as string,
      surveyId: surveyId as string,
    },
    skip: !questionId || !surveyId,
    fetchPolicy: 'cache-and-network',
  });

  const [updateQuestion, { loading: mutationLoading }] = useMutation(
    UPDATE_QUESTION,
    {
      refetchQueries: [
        {
          query: GET_QUESTION,
          variables: {
            questionId: questionId as string,
            surveyId: surveyId as string,
          },
        },
      ],
      awaitRefetchQueries: true,
    }
  );

  useEffect(() => {
    if (data?.getQuestion) {
      setText(data.getQuestion.text);
      setType(data.getQuestion.type.toUpperCase() as QuestionType);
      setAnswerOptions(data.getQuestion.answerOptions || []);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateQuestion({
        variables: {
          questionId,
          surveyId,
          data: {
            text,
            type,
            answerOptions: answerOptions.map((option) => ({
              text: option.text,
            })),
          },
        },
      });
      navigate(`/dashboard/survey/${surveyId}/details`);
    } catch (err) {
      console.error('Error updating question:', err);
    }
  };

  const addAnswerOption = () => {
    if (newOptionText.trim()) {
      setAnswerOptions([...answerOptions, { text: newOptionText.trim() }]);
      setNewOptionText('');
    }
  };

  const removeAnswerOption = (index: number) => {
    setAnswerOptions(answerOptions.filter((_, i) => i !== index));
  };

  if (queryLoading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <Header />
        <div className="flex flex-col items-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded-md w-3/4"></div>

              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-10 bg-gray-200 rounded-md"></div>
              </div>

              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-10 bg-gray-200 rounded-md"></div>
              </div>

              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="space-y-2">
                  <div className="h-10 bg-gray-200 rounded-md"></div>
                  <div className="h-10 bg-gray-200 rounded-md"></div>
                  <div className="h-10 bg-gray-200 rounded-md"></div>
                </div>
              </div>

              <div className="h-10 bg-gray-200 rounded-md w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const showAnswerOptions =
    type === QuestionType.SingleChoice || type === QuestionType.MultipleChoice;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header />
      <div className="flex flex-col items-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Edit Question</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Question Text
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Question Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as QuestionType)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {Object.values(QuestionType).map((questionType) => (
                  <option
                    key={`${questionId}-${surveyId}-${questionType}`}
                    value={questionType}
                  >
                    {questionType.toLowerCase()}
                  </option>
                ))}
              </select>
            </div>

            {showAnswerOptions && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newOptionText}
                    onChange={(e) => setNewOptionText(e.target.value)}
                    placeholder="Enter answer option"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={addAnswerOption}
                    className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>

                <ul className="space-y-2">
                  {answerOptions.map((option, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center p-2 bg-gray-50 rounded-md"
                    >
                      <span>{option.text}</span>
                      <button
                        type="button"
                        onClick={() => removeAnswerOption(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              type="submit"
              disabled={mutationLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {mutationLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
