import { useQuery } from '@apollo/client';
import { Copy, Check, Shuffle } from 'lucide-react';
import { useState } from 'react';
import { GET_SURVEY_TOKENS } from '../../../api/gql/queries';
import { TokenDto } from '../../../api/gql/__generated__/graphql';

type TokensListProps = {
  surveyId: string;
};

export const TokensList = ({ surveyId }: TokensListProps) => {
  const [copied, setCopied] = useState(false);
  const [shuffledTokens, setShuffledTokens] = useState<TokenDto[]>([]);
  const { data, loading } = useQuery(GET_SURVEY_TOKENS, {
    variables: { surveyId },
    skip: !surveyId,
    fetchPolicy: 'cache-and-network',
  });

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

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700">
          Available Tokens (Unused)
        </label>
        <div className="flex items-center gap-2">
          <button
            onClick={handleShuffle}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Shuffle className="h-4 w-4" />
            Shuffle
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
            {copied ? 'Copied!' : 'Copy All'}
          </button>
        </div>
      </div>
      <div className="relative">
        <textarea
          className="w-full h-32 p-2 text-sm bg-gray-50 border rounded-md font-mono"
          value={tokens.map((t) => t.token).join('\n')}
          readOnly
        />
        <div className="absolute bottom-2 right-2 text-xs text-gray-500">
          {tokens.length} tokens available
        </div>
      </div>
      <p className="text-xs text-gray-500">
        These tokens can be used to submit survey responses anonymously. Each
        token can be used only once.
      </p>
    </div>
  );
};
