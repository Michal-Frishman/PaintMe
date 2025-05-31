import React from 'react';
import ReactDOM from 'react-dom'; // ודא שאתה מייבא מ-react-dom
import App from './App';

// Render the App component
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // ודא שיש אלמנט עם ID 'root' ב-HTML
);