import React from 'react';
import './App.css';
import AuthComponent from './presentation/view/auth/AuthComponent';

import { authViewModel } from './presentation/view-model/viewModels';

function App(): JSX.Element {
  return (
    <div className="app-container d-flex container-fluid">
      <AuthComponent authViewModel={authViewModel} />
    </div>
  );
}

export default App;
