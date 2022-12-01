import React from 'react';
import ReactDOM from 'react-dom';

import { store } from 'config/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'sweetalert2/src/sweetalert2.scss';

import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
