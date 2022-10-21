import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App.jsx'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


// Default react index.js file
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);


serviceWorkerRegistration.register();
