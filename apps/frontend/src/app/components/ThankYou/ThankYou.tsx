import { CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const ThankYou = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-10 text-center">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          {t('thankYou.title')}
        </h2>
        <p className="mt-4 text-lg text-gray-600">{t('thankYou.message')}</p>
        <div className="mt-8 space-y-4">
          <div className="animate-pulse flex justify-center">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
              {t('thankYou.status')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
