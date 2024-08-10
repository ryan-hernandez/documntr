import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

/**
 * Renders the main application component into the DOM.
 * 
 * This function mounts the React application to the root DOM element.
 * 
 * @returns {void}
 */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

/**
 * Enables Hot Module Replacement (HMR) for the module.
 * 
 * This function allows for live editing of the application 
 * without a full reload, improving the development experience.
 * 
 * @returns {void}
 */
if (module.hot) {
  module.hot.accept();
}