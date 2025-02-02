import { useMutation, useQuery } from '@apollo/client';
import moment from 'moment';
import { Eye, Pencil, Plus, RefreshCw, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GET_SURVEYS_BY_USER } from '../../../api/gql/queries';
import { Header } from '../Header';
import { DELETE_SURVEY } from '../../../api/gql/mutations';
import { useConfirmation } from '../ConfirmationDialog';

export const ViewAllSurveys = () => {
  const { loading, error, data, refetch } = useQuery(GET_SURVEYS_BY_USER);
  const [deleteSurvey] = useMutation(DELETE_SURVEY, {
    refetchQueries: [{ query: GET_SURVEYS_BY_USER }],
  });
  const { confirm } = useConfirmation();

  const handleDelete = async (id: string) => {
    const survey = data?.getSurveysByUser.find((survey) => survey.id === id);

    const confirmed = await confirm(
      `Delete Survey - ${survey?.title}`,
      'Are you sure you want to delete this survey? This action cannot be undone.'
    );

    if (confirmed) {
      try {
        await deleteSurvey({
          variables: { id },
        });
      } catch (err) {
        console.error('Error deleting survey:', err);
      }
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <Header />
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <p>Loading surveys...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <Header />
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <p className="text-red-500">Error loading surveys: {error.message}</p>
        </div>
      </div>
    );

  const generateSurveys = data?.getSurveysByUser.map((survey) => (
    <tr key={survey.id} className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-6 text-left">{survey.title}</td>
      <td className="py-3 px-6 text-left">
        {moment(survey.createdAt).format('yyyy-MM-DD HH:MM')}
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex justify-center items-center space-x-4">
          <Link
            to={`/dashboard/survey/${survey.id}/details`}
            className="cursor-pointer text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Eye className="h-5 w-5" />
          </Link>
          <Link
            to={`/dashboard/survey/${survey.id}/edit`}
            className="cursor-pointer text-green-600 hover:text-green-800 transition-colors"
          >
            <Pencil className="h-5 w-5" />
          </Link>
          <div
            onClick={() => handleDelete(survey.id)}
            className="cursor-pointer text-red-600 hover:text-red-800 transition-colors"
          >
            <Trash2 className="h-5 w-5" />
          </div>
        </div>
      </td>
    </tr>
  ));

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header />
      <div className="max-w-5xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-lg mb-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-700">Your Surveys</h2>
            <div className="flex items-center gap-4">
              <Link
                to="/dashboard/survey/create"
                className="p-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 flex items-center gap-2"
              >
                <Plus className="h-5 w-5" />
                <span className="text-sm font-medium">Create Survey</span>
              </Link>
              <button
                onClick={() => refetch()}
                className="p-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-all duration-200 flex items-center gap-2"
                disabled={loading}
              >
                <RefreshCw
                  className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`}
                />
                <span className="text-sm font-medium">Refresh</span>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm font-medium">
                  <th className="py-4 px-6 text-left rounded-tl-lg">Title</th>
                  <th className="py-4 px-6 text-left">Date Created</th>
                  <th className="py-4 px-6 text-center rounded-tr-lg">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm divide-y divide-gray-100">
                {generateSurveys}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
