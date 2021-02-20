import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AppWithRedux from "./features/AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store} >
            <AppWithRedux/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
