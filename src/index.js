import 'style/url!file!./../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss';
import 'style/url!file!./../node_modules/jquery/dist/jquery.min.js';

import React from 'react';
import {render} from 'react-dom';
import {Router, hashHistory} from 'react-router';
import routes from './config/routes';

render(<Router history={hashHistory} routes={routes}/>, document.getElementById('app'));
