import React from 'react';
import ReactDOM from 'react-dom';
import './style/main.scss';
import Main from './main';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<Main />, document.getElementById('app-root'));
registerServiceWorker();
