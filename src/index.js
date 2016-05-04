import 'style/url!file!./../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss';

import React from 'react';
import {render} from 'react-dom';
import App from './components/App';

render(<App />, document.getElementById('app'));
