import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/colors.css';
import './css/main.css';
import './css/themes.css';
import './css/schedules.css';
import './css/banner.css';
import App from './App';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);