import { Link } from 'react-router-dom';
import { LogoutButton } from '../Logout';

export const Header = () => (
  <div className="max-w-6xl mx-auto">
    <header className="flex justify-between items-center bg-white p-6 rounded-xl shadow-md mb-6">
      <Link to="/dashboard">
        <h1 className="text-2xl font-bold text-gray-800">
          Survey Creator Dashboard
        </h1>
      </Link>
      <LogoutButton />
    </header>
  </div>
);
