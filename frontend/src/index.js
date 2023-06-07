import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import "alertifyjs/build/css/alertify.min.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./redux/store";
import 'react-confirm-alert/src/react-confirm-alert.css';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={configureStore}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
reportWebVitals();
