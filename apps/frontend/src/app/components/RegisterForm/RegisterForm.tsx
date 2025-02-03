import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { REGISTER } from '../../../api/gql/mutations/register';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { useTranslation } from 'react-i18next';

export const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation();
  const [registerMutation, { loading, error }] = useMutation(REGISTER);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await registerMutation({
        variables: {
          input: {
            email,
            password,
          },
        },
      });
      const token = response.data?.register.accessToken;
      if (token) {
        localStorage.setItem('authToken', token);
      }
      navigate('/');
    } catch (err) {
      console.error('Registration error:', err);
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
            {t('register.title')}
          </h1>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                {t('register.form.email')}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('register.form.emailPlaceholder')}
                required
                className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                {t('register.form.password')}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                placeholder={t('register.form.passwordPlaceholder')}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
              disabled={loading}
            >
              {loading
                ? t('register.form.submit.loading')
                : t('register.form.submit.default')}
            </button>
            {error && <p className="text-red-500 mt-2">{error.message}</p>}
          </form>
          <p className="mt-4 text-sm text-gray-600">
            {t('register.loginPrompt')}{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              {t('register.loginLink')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
