import 'style/url!file!./../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss';
import 'style/url!file!./../node_modules/jquery/dist/jquery.min.js';
import 'style/url!file!./../node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js';
import 'style/url!file!./../node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css';

import React from 'react';
import {render} from 'react-dom';
import {Router, hashHistory} from 'react-router';
import routes from './config/routes';

render(<Router history={hashHistory} routes={routes}/>, document.getElementById('app'));
