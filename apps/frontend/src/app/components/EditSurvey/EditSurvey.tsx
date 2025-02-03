import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../Header';
import { UPDATE_SURVEY } from '../../../api/gql/mutations';
import { GET_SURVEY, GET_SURVEYS_BY_USER } from '../../../api/gql/queries';
import { useTranslation } from 'react-i18next';

export const EditSurvey = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { loading: queryLoading, data } = useQuery(GET_SURVEY, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'cache-and-network',
  });

  const [updateSurvey, { loading: mutationLoading, error: mutationError }] =
    useMutation(UPDATE_SURVEY, {
      refetchQueries: [GET_SURVEYS_BY_USER],
    });

  useEffect(() => {
    if (data?.getSurvey) {
      setTitle(data.getSurvey.title);
      setDescription(data.getSurvey.description);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSurvey({
        variables: {
          id,
          data: {
            title,
            description,
          },
        },
      });
      navigate('/dashboard/survey/view-all');
    } catch (err) {
      console.error('Error updating survey:', err);
    }
  };

  if (queryLoading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <Header />
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <p>Loading survey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header />
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-3xl w-full">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">
            {t('editSurvey.title')}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600 font-medium">
                {t('editSurvey.form.surveyTitle')}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder={t('editSurvey.form.titlePlaceholder')}
                required
                minLength={3}
                maxLength={100}
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium">
                {t('editSurvey.form.description')}
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder={t('editSurvey.form.descriptionPlaceholder')}
                rows={4}
              />
            </div>
            <button
              type="submit"
              disabled={mutationLoading}
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400"
            >
              {mutationLoading
                ? t('editSurvey.form.submit.loading')
                : t('editSurvey.form.submit.default')}
            </button>
            {mutationError && (
              <p className="text-red-500 text-sm mt-2">
                {t('editSurvey.errors.generic')}
                {mutationError.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
