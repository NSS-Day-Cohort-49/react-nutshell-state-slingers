import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from "react-router-dom";
import { Nutshell } from './components/Nutshell';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Nutshell />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

