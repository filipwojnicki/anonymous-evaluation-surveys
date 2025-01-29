import { Header } from '../Header';

export const ViewAllSurveys = () => {
  // Mock data for surveys
  const surveys = [
    { id: 1, title: 'Customer Satisfaction Survey', date: '2025-01-15' },
    { id: 2, title: 'Product Feedback Survey', date: '2025-01-20' },
    { id: 3, title: 'Employee Engagement Survey', date: '2025-01-25' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header />
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">All Surveys</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Date Created</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {surveys.map((survey) => (
              <tr
                key={survey.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{survey.title}</td>
                <td className="py-3 px-6 text-left">{survey.date}</td>
                <td className="py-3 px-6 text-center">
                  <button className="text-blue-600 hover:underline">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
