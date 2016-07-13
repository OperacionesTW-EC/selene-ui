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

    describe('device data', () => {
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
        });

        afterEach(function () {
            sandbox.restore();
        });

        it('should load from backend', () => {
            device = {id:1, full_code: 'TWAL001', results:[]};
            component = mount(<Device params={{id: 1}}/>);
            expect(component.state('device')).toEqual(device)
        });


    });


    describe('device status data', () => {

        let deviceStatus;

        beforeEach(function () {
            sandbox = Sinon.sandbox.create();
            sandbox.stub($, 'ajax').returns({
                done: (callback) => {
                    callback(deviceStatus);
                    return {
                        fail: (callback) => {
                        }
                    }
                }
            });
        });

        afterEach(function () {
            sandbox.restore();
        });

        it('should load from backend', () => {
            deviceStatus = {results:[{id:1, name: 'Disponible'}]};
            component = mount(<Device params={{id: 1}}/>);
            expect(component.state('deviceStatus')).toEqual(deviceStatus.results)
        });


    });

    describe('Render', () => {

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
            sandbox.spy(Device.prototype, "handleSaveClick");
        });

        afterEach(function () {
            sandbox.restore();
        });

        it('should show device info', () => {
            device = {"id":1,
                "device_type_name":"Adaptadores",
                "full_code":"TWEA0004",
                "device_brand_name":"Apple",
                "ownership":"TW",
                "serial_number":"",
                "model":"Adaptador VDI",
                "device_status_name": "Disponible",
                "description": "Nuevo Modelo",
                results:[]
            };

            component = mount(<Device params={{id: 1}}/>);
            let html = component.find('.form-card').node.innerHTML;
            expect(html).toContain(device.full_code);
            expect(html).toContain(device.device_brand_name);
            expect(html).toContain(device.device_type_name);
            expect(html).toContain(device.model);
            expect(html).toContain(device.serial_number);
            expect(html).toContain(device.device_status_name);
            expect(html).toContain(device.description);
        });

        it('should show formatted purchase, first assignment and end dates', () => {
            device = {id: 1,
                "purchase_date":"2016-05-01T15:02:21.960017Z",
                "life_start_date_or_assignment_date":"2016-05-31T15:02:21.960017Z",
                "life_end_date":"2019-05-31T15:02:21.960017Z",
                results:[]
            };

            component = mount(<Device params={{id: 1}}/>);
            let html = component.find('.form-card').node.innerHTML;
            expect(html).toContain('05-01-2016');
            expect(html).toContain('05-31-2016');
            expect(html).toContain('05-31-2019');
        });

        it('should render save button', () => {
            device = {results:[]};
            component = mount(<Device params={{id: 1}}/>);
            expect(component.find('#save').length).toBe(1);
        });

        it('should not render device status list if current state is Dado de baja', () => {
            device = {device_status_name:'Dado de baja',results:[]};
            component = mount(<Device params={{id: 1}}/>);
            expect(component.find('[name="new_device_status"]').length).toBe(0);
            expect(component.find('[name="new_device_end_status_type"]').length).toBe(0);
            expect(component.find('[name="new_device_end_status_description"]').length).toBe(0);
        });

        it('should render end device status options if current state is not Dado de baja', () => {
            device = {device_status_name:'Disponible',results:[]};
            component = mount(<Device params={{id: 1}}/>);
            expect(component.find('[name="new_device_status"]').length).toBe(1);
            expect(component.find('[name="new_device_end_status_type"]').length).toBe(0);
            expect(component.find('[name="new_device_end_status_comment"]').length).toBe(0);
        });


        it('should render end device status descriptios if new state is Dado de baja', () => {
            device = {device_status_name:'Disponible',results:[]};
            component = mount(<Device params={{id: 1}}/>);
            let select_status_device = component.find("[name='new_device_status']");
            select_status_device.simulate('change', {target : {name:'new_device_status', value: '4'}});

            expect(component.find('[name="new_device_status"]').length).toBe(1);
            expect(component.find('[name="new_device_end_status_type"]').length).toBe(1);
            expect(component.find('[name="new_device_end_status_comment"]').length).toBe(1);
        });



    });

    describe('Events', () => {

        beforeEach(() => {
            sandbox = Sinon.sandbox.create();
            sandbox.spy(Device.prototype, "handleSaveClick");
            sandbox.stub(Device.prototype, "redirectToDeviceList");
            component = mount(<Device params={{id: 1}}/>);
            sandbox.stub($, "ajax").returns({
                done: (callback) => {
                    callback({});
                }
            });
        });

        afterEach(function() {
            sandbox.restore();
        });

        it('should handle device status changes', () => {
            let input = component.find('[name="new_device_status"]');
            input.simulate('change', {
                target: {
                    name: 'new_device_status',
                    value: 1
                }
            });
            expect(component.state('new_device_status')).toEqual(1)
        });
        describe('with selected status', () => {

            beforeEach(() => {
                component.setState({new_device_status:'2'})
            });

            it('should invoke handleSaveClick when clicked', () => {
                component.find("#save").simulate('click');
                expect(Device.prototype.handleSaveClick.calledOnce).toEqual(true);
            });

            it('should send data to backed', () => {
                component.find("#save").simulate('click');
                expect($.ajax.calledOnce).toEqual(true);
            });

            it('should redirect upon success', () => {
                component.find("#save").simulate('click');
                expect(Device.prototype.redirectToDeviceList.calledOnce).toEqual(true);
            });

        });

        describe('without selected status', () => {

            it('should not send data to backed', () => {
                component.find("#save").simulate('click');
                expect($.ajax.calledOnce).toEqual(false);
            });

        });


    });



});
