import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN } from '../../../api/gql/mutations';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { useTranslation } from 'react-i18next';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation();
  const [loginMutation, { loading, error }] = useMutation(LOGIN);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginMutation({
        variables: {
          input: {
            email,
            password,
          },
        },
      });
      const token = response.data?.login.accessToken;
      if (token) {
        localStorage.setItem('authToken', token);
        navigate('/');
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="p-4 flex justify-end">
        <LanguageSwitcher />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h1 className="text-xl font-semibold text-gray-800 mb-6">
            {t('login.title')}
          </h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                {t('login.form.email')}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('login.form.emailPlaceholder')}
                required
                className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                {t('login.form.password')}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('login.form.passwordPlaceholder')}
                required
                className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
              disabled={loading}
            >
              {loading
                ? t('login.form.submit.loading')
                : t('login.form.submit.default')}
            </button>
            {error && (
              <p className="mt-4 text-red-600 text-sm">{error.message}</p>
            )}
          </form>

          <p className="mt-4 text-sm text-gray-600">
            {t('login.form.registerPrompt')}{' '}
            <Link to="/register" className="text-blue-500 hover:underline">
              {t('login.form.registerLink')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
