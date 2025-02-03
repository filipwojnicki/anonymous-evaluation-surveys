import { Link } from 'react-router-dom';
import { LogoutButton } from '../Logout';
import { useAuth } from '../../hooks';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  useAuth();
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto">
      <header className="flex justify-between items-center bg-white p-6 rounded-xl shadow-md mb-6">
        <Link to="/dashboard">
          <h1 className="text-2xl font-bold text-gray-800">
            {t('header.dashboard.title')}
          </h1>
        </Link>
        <LanguageSwitcher />
        <LogoutButton />
      </header>
    </div>
  );
};
