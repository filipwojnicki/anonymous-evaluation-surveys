import { Header } from '../Header';

export const SurveyAnalytics = () => {
  // Mock data for analytics
  const analytics = [
    {
      id: 1,
      title: 'Customer Satisfaction Survey',
      responses: 120,
      completionRate: 85,
    },
    {
      id: 2,
      title: 'Product Feedback Survey',
      responses: 95,
      completionRate: 78,
    },
    {
      id: 3,
      title: 'Employee Engagement Survey',
      responses: 150,
      completionRate: 92,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header />
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">
          Survey Analytics
        </h2>
        <div className="space-y-4">
          {analytics.map((survey) => (
            <div
              key={survey.id}
              className="p-6 bg-gray-50 rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {survey.title}
              </h3>
              <p className="text-gray-600">Responses: {survey.responses}</p>
              <p className="text-gray-600">
                Completion Rate: {survey.completionRate}%
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${survey.completionRate}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
