import React from 'react';
import { Router, Route, IndexRoute} from 'react-router';
import App from './../components/App';
import Devices from './../components/Devices';
import Home from './../components/Home';


export default (
    <Router>
        <Route path='/' component={App}>
            <IndexRoute component={Home}/>
            <Route path='devices' component={Devices}/>
        </Route>
    </Router>
)