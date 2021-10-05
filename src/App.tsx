import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import DashboardPage from './pages/DashboardPage';
import './App.scss';
import { CoreNavItems } from './constants/routes';
import BookkeepingDashboardPage from './pages/BookkeepingDashboardPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path={`/${CoreNavItems.Login}`}>
          <LoginPage />
        </Route>
        <Route path={`/${CoreNavItems.Bookkeeping}`}>
          <BookkeepingDashboardPage />
        </Route>
        <Route>
          <DashboardPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
