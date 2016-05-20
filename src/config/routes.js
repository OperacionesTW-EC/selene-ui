import React from 'react';
import { Router, Route, IndexRoute} from 'react-router';
import App from './../components/App';
import DeviceList from './../components/DeviceList';
import DeviceForm from './../components/DeviceForm';
import Home from './../components/Home';
import Dashboard from './../components/Dashboard';
import AssignDevice from './../components/AssignDevice';



export default (
    <Router>
        <Route path='/' component={App}>
            <IndexRoute component={Home}/>
            <Route path='dashboard' component={Dashboard}/>
            <Route path='device_list' component={DeviceList}/>
            <Route path='device_form' component={DeviceForm}/>
            <Route path='assign_device' component={AssignDevice}/>
        </Route>
    </Router>
)
