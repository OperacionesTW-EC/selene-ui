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

    let  component;
    let  devices;
    let sandbox;

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
    });


});