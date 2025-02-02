import { Route, Routes } from 'react-router-dom';
import { LoginForm, ProtectedRoute } from './components';
import { Home } from './components/Home';
import { Dashboard } from './components/Dashboard';
import { CreateSurvey } from './components/CreateSurvey';
import { ViewAllSurveys } from './components/ViewAllSurveys';
import { SurveyAnalytics } from './components/SurveyAnalytics';
import { RegisterForm } from './components/RegisterForm';
import { CreateQuestion } from './components/CreateQuestion/CreateQuestion';
import { SurveyDetails } from './components/SurveyDetails/SurveyDetails';
import { EditSurvey } from './components/EditSurvey';
import { EditQuestion } from './components/EditQuestion';
import { Survey } from './components/Survey';
import { ThankYou } from './components/ThankYou';
import { SurveyAnalyticsDetails } from './components/SurveyAnalyticsDetails';

export function App() {
  return (
    <div>
      <Routes>
        {/* AUTH */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={<Home />} />

        {/* SURVEY FOR RESPONDENT */}
        <Route path="/survey/thank-you" element={<ThankYou />} />
        <Route path="/survey/:token" element={<Survey />} />

        {/* SURVEY MANAGMENT */}
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route path="" element={<Dashboard />} />
          {/* SURVEY */}
          <Route path="survey/create" element={<CreateSurvey />} />
          <Route path="survey/view-all" element={<ViewAllSurveys />} />
          <Route path="survey/:id/edit" element={<EditSurvey />} />
          <Route path="survey/:id/details" element={<SurveyDetails />} />

          {/* QUESTION */}
          <Route
            path="survey/:id/question/create"
            element={<CreateQuestion />}
          />
          <Route
            path="survey/:surveyId/question/:questionId/edit"
            element={<EditQuestion />}
          />

          <Route path="analytics" element={<SurveyAnalytics />} />
          <Route path="analytics/:id" element={<SurveyAnalyticsDetails />} />

          <Route path="*" element={<ProtectedRoute />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
