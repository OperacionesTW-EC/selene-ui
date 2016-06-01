import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import Sinon from 'sinon'
import $ from 'jquery';
import Device from './../../components/Device';

describe('Device Component', () => {

    let device;
    let sandbox;
    let component;

    beforeEach(function () {
        sandbox = Sinon.sandbox.create();
        sandbox.stub($, 'ajax').returns({
            done: (callback) => {
                callback(device);
                return {
                    fail: (callback) => {
                    }
                }
            }
        });
        device = {id:1, full_code: 'TWAL001'};
        component = mount(<Device params={{id: 1}}/>);
    });

    afterEach(function () {
        sandbox.restore();
    });


    it('should load data from backend', () => {
        expect(component.state('device')).toEqual(device)
    });

    describe('Render', () => {

        xit('should show device info', () => {
            let html = component.find('.form-card').node.innerHTML;
            expect(html).toContain(device.full_code);
            expect(html).toContain(device.device_brand_name);
            expect(html).toContain(device.device_type_name);
            expect(html).toContain(device.model);
            expect(html).toContain(device.serial_number);
            expect(html).toContain(device.purchase_date);
            expect(html).toContain(device.first_assignment_date);
            expect(html).toContain(device.end_date);
        });

    });
});