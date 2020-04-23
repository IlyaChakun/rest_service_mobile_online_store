import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './app/App';
import {BrowserRouter as Router} from 'react-router-dom';
import 'antd/dist/antd.less'


ReactDOM.render(
    <Router>
        <App/>
    </Router>,
    document.getElementById('root')
);


