import { Header } from '../Header';

export const CreateSurvey = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header />
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-3xl w-full">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">
            Create a New Survey
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-600 font-medium">
                Survey Title
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter survey title"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium">
                Description
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter survey description"
                rows={4}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            >
              Create Survey
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
