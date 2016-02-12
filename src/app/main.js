import React from 'react';
import {render} from 'react-dom';
import App from './App.jsx';
import Routes from './config/Routes.jsx';
import stores  from './stores';

render(Routes, document.getElementById('app'));