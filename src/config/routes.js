import React from 'react';
import { Router, Route, IndexRoute} from 'react-router';
import App from './../components/App';
import Devices from './../components/Devices';
import DeviceForm from './../components/DeviceForm';
import Home from './../components/Home';
import Dashboard from './../components/Dashboard';


export default (
    <Router>
        <Route path='/' component={App}>
            <IndexRoute component={Home}/>
            <Route path='dashboard' component={Dashboard}/>
            <Route path='devices' component={Devices}/>
            <Route path='device_form' component={DeviceForm}/>
        </Route>
    </Router>
)
