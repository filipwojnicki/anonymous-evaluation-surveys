import { PlusCircle, ClipboardList, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '../Header';

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header />
      <div className="max-w-6xl mx-auto">
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create Survey Card */}
          <Link to="/dashboard/create-survey">
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition">
              <PlusCircle className="w-12 h-12 text-blue-500 mb-4" />
              <h2 className="text-xl font-semibold text-gray-700">
                Create New Survey
              </h2>
              <p className="text-gray-500 text-center mt-2">
                Start a new survey for respondents.
              </p>
            </div>
          </Link>

          {/* View All Surveys */}
          <Link to="/dashboard/all-surveys">
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition">
              <ClipboardList className="w-12 h-12 text-green-500 mb-4" />
              <h2 className="text-xl font-semibold text-gray-700">
                All Surveys
              </h2>
              <p className="text-gray-500 text-center mt-2">
                Manage and edit your existing surveys.
              </p>
            </div>
          </Link>

          {/* Survey Analytics */}
          <Link to="/dashboard/analytics">
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition">
              <BarChart className="w-12 h-12 text-purple-500 mb-4" />
              <h2 className="text-xl font-semibold text-gray-700">
                Survey Analytics
              </h2>
              <p className="text-gray-500 text-center mt-2">
                View responses and survey statistics.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
