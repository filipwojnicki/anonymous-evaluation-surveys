import { Route, Routes } from 'react-router-dom';
import { LoginForm, ProtectedRoute } from './components';
import { Home } from './components/Home';
import { Dashboard } from './components/Dashboard';
import { CreateSurvey } from './components/CreateSurvey';
import { ViewAllSurveys } from './components/ViewAllSurveys';
import { SurveyAnalytics } from './components/SurveyAnalytics';
import { RegisterForm } from './components/RegisterForm';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route path="" element={<Dashboard />} />
          <Route path="create-survey" element={<CreateSurvey />} />
          <Route path="edit-survey/:id" element={<CreateSurvey />} />
          <Route path="all-surveys" element={<ViewAllSurveys />} />
          <Route path="analytics" element={<SurveyAnalytics />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
