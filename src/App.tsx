import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import DashboardPage from './pages/DashboardPage';
import './App.scss';

function App() {
  return (
    <Router>
      <Switch>
        <Route>
          <DashboardPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
