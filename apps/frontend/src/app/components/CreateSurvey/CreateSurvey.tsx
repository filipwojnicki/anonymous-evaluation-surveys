import { useState } from 'react';
import { Header } from '../Header';
import { useMutation } from '@apollo/client';
import { CREATE_SURVEY } from '../../../api/gql/mutations/createSurvey';
import { useNavigate } from 'react-router-dom';
import { Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const CreateSurvey = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tokenCount, setTokenCount] = useState(1);
  const [createSurvey, { loading, error }] = useMutation(CREATE_SURVEY);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await createSurvey({
        variables: {
          data: {
            title,
            description,
            tokenCount,
          },
        },
      });

      if (data?.createSurvey?.id) {
        navigate(`/dashboard/survey/${data.createSurvey.id}/details`);
      }
    } catch (err) {
      console.error('Error creating survey:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header />
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-3xl w-full">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">
            {t('createSurvey.title')}
          </h2>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 max-w-3xl mx-auto">
            <div className="flex">
              <div className="flex-shrink-0">
                <Info className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  {t('createSurvey.form.tokenInfo')}
                </p>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600 font-medium">
                {t('createSurvey.form.surveyTitle')}
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder={t('createSurvey.form.titlePlaceholder')}
                onChange={(e) => setTitle(e.target.value)}
                required
                minLength={3}
                maxLength={100}
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium">
                {t('createSurvey.form.description')}
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder={t('createSurvey.form.descriptionPlaceholder')}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-600 font-medium">
                {t('createSurvey.form.tokenCount')}
              </label>
              <input
                type="number"
                value={tokenCount}
                onChange={(e) => setTokenCount(parseInt(e.target.value))}
                placeholder={t('createSurvey.form.tokenPlaceholder')}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                min={1}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            >
              {loading
                ? t('createSurvey.form.submit.loading')
                : t('createSurvey.form.submit.default')}
            </button>
            {error && (
              <p className="mt-4 text-red-600 text-sm">
                {t('createSurvey.errorMessages.generic')} {error.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
