import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Router, Route, Switch} from 'react-router';
import Container from './Container.js';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
