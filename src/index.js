import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from "react-toastify";

import { store } from './_redux/_helpers';
import App from './App';

render(
    <Provider store={store}>
        <ToastContainer />
        <App />
    </Provider>,
    document.querySelector('#root')
);