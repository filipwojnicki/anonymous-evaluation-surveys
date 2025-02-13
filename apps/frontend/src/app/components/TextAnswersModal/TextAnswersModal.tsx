import { useMemo, useState } from 'react';
import { Search, X, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { GET_TEXT_ANSWERS } from '../../../api/gql/queries';

interface TextAnswersModalProps {
  questionId: string;
  questionText: string;
}

export const TextAnswersModal = ({
  questionId,
  questionText,
}: TextAnswersModalProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { data, loading } = useQuery(GET_TEXT_ANSWERS, {
    variables: { questionId },
    skip: !isOpen,
  });

  const filteredAnswers = useMemo(() => {
    if (!data?.getTextAnswers) return [];
    return data.getTextAnswers.filter((answer) =>
      answer.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const highlightText = (text: string) => {
    if (!searchTerm) return text;
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={i} className="bg-yellow-200 px-0.5 rounded">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        <FileText className="w-4 h-4 mr-2" />
        {t('textAnswers.viewResponses')}
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Panel */}
            <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  {questionText}
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Search Input */}
              <div className="px-6 py-4 border-b">
                <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t('textAnswers.searchPlaceholder')}
                    className="w-full bg-transparent border-none focus:ring-0 text-gray-700 placeholder-gray-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Responses List */}
              <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
                <div className="space-y-4">
                  {filteredAnswers.length > 0 ? (
                    filteredAnswers.map((answer, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                      >
                        <p className="text-gray-700 whitespace-pre-wrap">
                          {highlightText(answer.text)}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      {searchTerm ? (
                        <p>{t('textAnswers.noMatches', { searchTerm })}</p>
                      ) : (
                        <p>{t('textAnswers.noAnswers')}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    {t('textAnswers.totalResponses', {
                      count: data ? data.getTextAnswers.length : 0,
                    })}
                  </p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    {t('textAnswers.close')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
