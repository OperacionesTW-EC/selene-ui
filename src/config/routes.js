import React from 'react';
import { Router, Route, IndexRoute} from 'react-router';
import App from './../components/App';
import DeviceList from './../components/DeviceList';
import DeviceForm from './../components/DeviceForm';
import Home from './../components/Home';
import Dashboard from './../components/Dashboard';
import AssignDevice from './../components/AssignDevice';
import AssignedDeviceList from './../components/AssignedDeviceList';
import AssignedDevice from './../components/AssignedDevice';
import Device from './../components/Device';

export default (
    <Router>
        <Route path='/' component={App}>
            <IndexRoute component={Home}/>
            <Route path='dashboard' component={Dashboard}/>
            <Route path='device_list' component={DeviceList}/>
            <Route path='device_form' component={DeviceForm}/>
            <Route path='assign_device' component={AssignDevice}/>
            <Route path='assign_device/:id' component={AssignedDevice}/>
            <Route path='assigned_device_list' component={AssignedDeviceList}/>
            <Route path='device/:id' component={Device}/>
        </Route>
    </Router>
)
