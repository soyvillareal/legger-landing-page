import './styles/main.scss';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRoutes from './routes/BaseRoutes';
import Preloader from './components/Preloader/Preloader';

const App = () => {
  return (
    <React.Suspense fallback={<Preloader />}>
      <Router>
        <BaseRoutes />
      </Router>
    </React.Suspense>
  );
};

export default App;