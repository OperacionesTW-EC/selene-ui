/* eslint-env mocha*/

import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import expectJSX from 'expect-jsx';
import Sinon from 'sinon'
import $ from 'jquery';
import AssignDevice from './../../components/AssignDevice';

expect.extend(expectJSX);


describe('Assign device Component', () => {

    let component;
    let devices;
    let sandbox;
    let ajaxCount;
    let projects;

    describe('Render', () => {
        beforeEach(function () {
            sandbox = Sinon.sandbox.create();
            devices = {results:[{
                device_type_name:'some_name',
                full_code:'some_code',
                purchase_date:'01/01/2016',
                ownership:'TW',
                device_state_name:'Disponible'
            }]};
            sandbox.stub($,'ajax').returns({done: (callback) => {callback(devices); return {fail: (callback) => {}}} });
        });

        afterEach(function () {
            sandbox.restore();
        });


        beforeEach(() => {
            component =  mount(<AssignDevice />);
        });
        it('should include a device list', () => {
            expect(component.find("table").length).toBe(1);
        });

        it('should render the recipient field', () => {
            expect(component.find('[name="assign_employee"]').length).toBe(1);
        });

        it('should render the recipient field', () => {
            expect(component.find('[name="assign_project"]').length).toBe(1);
        });

        it('should render save button', () => {
            expect(component.find('#save').length).toBe(1);
        });
    });

    describe('Initialization', () => {

        describe('with valid data', () => {

            describe('projects', () => {

                beforeEach(function () {
                    ajaxCount = 0;
                    projects = {results:[{id:'1', name:'some name'}]};
                    devices = {results:[]};
                    sandbox = Sinon.sandbox.create();
                    sandbox.stub($, 'ajax').returns({
                        done: (callback) => {
                            if(ajaxCount == 0) {
                                callback(devices);
                                ajaxCount++;
                            }
                            if(ajaxCount == 1)
                                callback(projects);
                            return {
                                fail: (callback) => {
                                }
                            }
                        }
                    });
                    component = mount(< AssignDevice/>);

                });

                afterEach(function () {
                    sandbox.restore();
                });

                it('should load projects from backend', () => {
                    expect(component.state('projects')).toEqual(projects.results);
                });

            });
        });
        describe('with invalid data', () => {
            beforeEach(function () {
                ajaxCount = 0;
                projects = {results:[{id:'1', name:'some name'}]};
                devices = {results:[]};
                sandbox = Sinon.sandbox.create();
                sandbox.stub($, 'ajax').returns({
                    done: (callback) => {
                        if(ajaxCount == 0) {
                            callback(devices);
                            ajaxCount++;
                        }

                        return {
                            fail: (callback) => {
                                if(ajaxCount == 1)
                                    callback(projects);
                            }
                        }
                    }
                });
                component = mount(< AssignDevice/>);

            });

            afterEach(function() {
                sandbox.restore();
            });

            it('should render an error message', () => {
                expect(component.find('.error-message').length).toBe(1);
            });

        });
    });

    describe('Form events', () => {

        describe('inputs', () => {


            beforeEach(() => {
                ajaxCount = 0;
                projects = {results:[{id:'1', name:'some name'}]};
                devices = {results:[{
                    device_type_name:'some_name',
                    full_code:'some_code',
                    purchase_date:'01/01/2016',
                    ownership:'TW',
                    device_state_name:'Disponible'
                }]};
                sandbox = Sinon.sandbox.create();
                sandbox.spy(AssignDevice.prototype, "handleFormChanges");
                sandbox.spy(AssignDevice.prototype, "handleCheckBoxChanges");
                sandbox.stub($, 'ajax').returns({
                    done: (callback) => {
                        callback(devices);
                        return {
                            fail: (callback) => {
                            }
                        }
                    }
                });
                component = mount(< AssignDevice/>);

            });

            afterEach(function () {
                sandbox.restore();
            });

            it('should call handleFormChanges when input changes', () => {
                component.find("[name='assign_employee']").simulate('change');
                expect(AssignDevice.prototype.handleFormChanges.calledOnce).toEqual(true);
            });

            it('should call handleCheckBoxChanges when checkbox changes', () => {
                component.find(".device-chk").simulate('change');
                expect(AssignDevice.prototype.handleCheckBoxChanges.calledOnce).toEqual(true);
            });
            it('should call update the state when checkbox changes', () => {
                component.find(".device-chk").simulate('change', {value:'1'});
                expect(component.state()['assignation']['selected_devices']).toEqual(['1']);
            });
        });
    });

});