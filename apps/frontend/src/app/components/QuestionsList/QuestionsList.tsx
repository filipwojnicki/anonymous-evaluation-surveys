import { useMutation, useQuery } from '@apollo/client';
import { GET_QUESTIONS } from '../../../api/gql/queries';
import { Link } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import { useConfirmation } from '../ConfirmationDialog';
import { DELETE_QUESTION } from '../../../api/gql/mutations';
import { useTranslation } from 'react-i18next';

type QuestionsListProps = {
  surveyId: string;
};

export const QuestionsList = ({ surveyId }: QuestionsListProps) => {
  const { t } = useTranslation();
  const { confirm } = useConfirmation();
  const { data, loading } = useQuery(GET_QUESTIONS, {
    variables: { surveyId },
    skip: !surveyId,
    fetchPolicy: 'cache-and-network',
  });
  const [deleteQuestion] = useMutation(DELETE_QUESTION, {
    refetchQueries: [
      {
        query: GET_QUESTIONS,
        variables: { surveyId },
      },
    ],
  });

  if (loading) {
    return <p className="text-gray-500"> Loading questions...</p>;
  }

  const handleDelete = async (questionId: string) => {
    const question = data?.getQuestions.find((q) => q.id === questionId);

    const confirmed = await confirm(
      `${t('questionsList.delete.title')} - ${question?.text}`,
      t('questionsList.delete.message')
    );

    if (confirmed) {
      try {
        await deleteQuestion({
          variables: { questionId, surveyId },
        });
      } catch (err) {
        console.error('Error deleting question:', err);
      }
    }
  };

  return (
    <div className="border-t pt-8">
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600 font-medium">{t('questionsList.title')}</p>
        <Link
          to={`/dashboard/survey/${surveyId}/question/create`}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          {t('questionsList.addQuestion')}
        </Link>
      </div>

      <ul className="space-y-4">
        {data?.getQuestions.map((question) => (
          <li
            key={`survey-question-${question.id}`}
            className="border p-4 rounded-lg"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{question.text}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {t('questionsList.questionType')}: {question.type}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to={`/dashboard/survey/${surveyId}/question/${question.id}/edit`}
                  className="p-1.5 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => handleDelete(question.id)}
                  className="p-1.5 text-red-600 hover:text-red-800 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
