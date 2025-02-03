import { useQuery } from '@apollo/client';
import { Copy, Check, Shuffle } from 'lucide-react';
import { useState } from 'react';
import { GET_SURVEY_TOKENS } from '../../../api/gql/queries';
import { TokenDto } from '../../../api/gql/__generated__/graphql';
import { useTranslation } from 'react-i18next';

type TokensListProps = {
  surveyId: string;
};

export const TokensList = ({ surveyId }: TokensListProps) => {
  const [copied, setCopied] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);
  const { t } = useTranslation();
  const [shuffledTokens, setShuffledTokens] = useState<TokenDto[]>([]);
  const { data, loading } = useQuery(GET_SURVEY_TOKENS, {
    variables: { surveyId },
    skip: !surveyId,
    fetchPolicy: 'cache-and-network',
  });

  const surveyUrl = `${window.location.origin}/survey/assign-token/${surveyId}`;

  const handleShuffle = () => {
    const shuffled = [...(data?.getSurveyTokens || [])].sort(
      () => Math.random() - 0.5
    );
    setShuffledTokens(shuffled);
  };

  if (loading) {
    return <div className="text-gray-500">Loading tokens...</div>;
  }

  const tokens =
    shuffledTokens.length > 0 ? shuffledTokens : data?.getSurveyTokens || [];

  const handleCopyAll = async () => {
    const tokenStrings = tokens.map((t) => t.token).join('\n');
    await navigator.clipboard.writeText(tokenStrings || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(surveyUrl);
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), 2000);
  };

  return (
    <div className="space-y-2">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          {t('tokenList.surveyUrl')}
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={surveyUrl}
            readOnly
            className="flex-1 p-2 text-sm bg-gray-50 border rounded-md font-mono"
          />
          <button
            onClick={handleCopyUrl}
            className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors border rounded-md"
          >
            {urlCopied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {urlCopied
              ? t('tokenList.actions.urlCopied')
              : t('tokenList.actions.copyUrl')}
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700">
          {t('tokenList.title')}
        </label>
        <div className="flex items-center gap-2">
          <button
            onClick={handleShuffle}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Shuffle className="h-4 w-4" />
            {t('tokenList.actions.shuffle')}
          </button>
          <button
            onClick={handleCopyAll}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copied
              ? t('tokenList.actions.copied')
              : t('tokenList.actions.copy')}
          </button>
        </div>
      </div>
      <div className="relative">
        <textarea
          className="w-full h-32 p-2 text-sm bg-gray-50 border rounded-md font-mono"
          value={tokens
            .map((t) => `${window.location.origin}/survey/${t.token}`)
            .join('\n')}
          readOnly
        />
        <div className="absolute bottom-2 right-2 text-xs text-gray-500">
          {t('tokenList.tokensAvailable', { count: tokens.length })}
        </div>
      </div>
      <p className="text-xs text-gray-500">{t('tokenList.info')}</p>
    </div>
  );
};
