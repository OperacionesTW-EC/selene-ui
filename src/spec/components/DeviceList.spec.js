/* eslint-env mocha*/

import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import DeviceList from './../../components/DeviceList'
import Devices from './../../components/Devices'

describe('DeviceList Component', () => {
    let component = mount(<DeviceList/>)
    it('should render a device list', () => {
        expect(component.contains(<Devices/>)).toBe(true);
    });

    it('should render header', () => {
        expect(component.find('.panel-heading').length).toBe(1);
    });
});
