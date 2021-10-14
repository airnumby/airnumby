import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import DashboardPage from './pages/DashboardPage';
import { CoreNavItems } from './constants/routes';
import BookkeepingDashboardPage from './pages/BookkeepingDashboardPage';
import LoginPage from './pages/LoginPage';
import { ToastContainer } from 'react-toastify';


import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import OrganizationProvider from './contexts/OrganizationContext';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <AuthProvider>
      <OrganizationProvider>
        <Router>
          <Switch>
            <Route path={`/${CoreNavItems.Login}`}>
              <LoginPage />
            </Route>

            <PrivateRoute orgNotNeeded={true} path={`/${CoreNavItems.Signup}`}>
              <SignupPage />
            </PrivateRoute>

            <PrivateRoute path={`/${CoreNavItems.Bookkeeping}`}>
              <BookkeepingDashboardPage />
            </PrivateRoute>
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          </Switch>

          <ToastContainer />
        </Router>
      </OrganizationProvider>
    </AuthProvider>
  );
}

export default App;
