import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import './index.css';

async function main() {
  if (process.env.REACT_APP_ENVIRONMENT === 'local') {
    if (window.location.pathname === '/RecsEditorialConsole') {
      window.location.pathname = '/RecsEditorialConsole/';
      return;
    }
    const { worker } = require('./mocks/browser');
    await worker.start({
      serviceWorker: {
        url: '/RecsEditorialConsole/mockServiceWorker.js',
      },
    });
  }

  ReactDOM.render(<App />, document.getElementById('root'));
}
main();
