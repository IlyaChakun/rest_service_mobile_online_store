import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './app/App';
import {BrowserRouter as Router} from 'react-router-dom';

ReactDOM.render(
    <Router>
        <App/>
    </Router>,
    document.getElementById('root')
);
