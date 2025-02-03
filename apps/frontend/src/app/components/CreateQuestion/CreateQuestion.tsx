import { useState } from 'react';
import { Header } from '../Header';
import { useMutation } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { CREATE_QUESTION } from '../../../api/gql/mutations';
import { GET_QUESTIONS } from '../../../api/gql/queries';
import {
  AnswerOptionInput,
  QuestionType,
} from '../../../api/gql/__generated__/graphql';
import { Plus, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const CreateQuestion = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [text, setText] = useState<string>('');
  const [type, setType] = useState<QuestionType>(QuestionType.Text);
  const [answerOptions, setAnswerOptions] = useState<AnswerOptionInput[]>([]);
  const [newOptionText, setNewOptionText] = useState('');

  const [createQuestion, { loading }] = useMutation(CREATE_QUESTION, {
    refetchQueries: [
      {
        query: GET_QUESTIONS,
        variables: { surveyId: id },
      },
    ],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createQuestion({
      variables: {
        data: {
          surveyId: id as string,
          text,
          type,
          answerOptions,
        },
      },
    });
    navigate(`/dashboard/survey/${id}/details`);
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

  const showAnswerOptions =
    type === QuestionType.SingleChoice || type === QuestionType.MultipleChoice;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header />
      <div className="flex flex-col items-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">
            {t('questions.create.title')}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('questions.create.questionText')}
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder={t('questions.create.questionText')}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('questions.create.questionType')}
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as QuestionType)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {Object.values(QuestionType).map((questionType) => (
                  <option key={`${id}-${questionType}`} value={questionType}>
                    {questionType.toLowerCase()}
                  </option>
                ))}
              </select>
            </div>

            {showAnswerOptions && (
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Answer Options
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newOptionText}
                    onChange={(e) => setNewOptionText(e.target.value)}
                    className="flex-1 p-2 border rounded-md"
                    placeholder="Enter answer option"
                  />
                  <button
                    type="button"
                    onClick={addAnswerOption}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading
                ? t('questions.create.submitting')
                : t('questions.create.submit')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
