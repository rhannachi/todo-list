import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from "react-redux";
import './index.css'
import {HomeContainer} from './containers'
import {store} from "./store";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <HomeContainer />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
)