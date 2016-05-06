/* eslint-env mocha*/

import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import Sinon from 'sinon'
import $ from 'jquery';
import Devices from './../../components/Devices';

describe('Devices Component', () => {
    let sandbox;
    let devices, component;



    describe('with valid data', () => {

        beforeEach(function () {
            sandbox = Sinon.sandbox.create();
            sandbox.stub($,'ajax').returns({done: (callback) => {callback(devices); return {fail: (callback) => {}}} });
        });
        afterEach(function () {
            sandbox.restore()
        });

        it('should load devices from backend', () => {
            devices = {results:[{device_type:{}, device_brand:{}}]};
            component = mount(<Devices/>);
            expect(component.state('devices')).toEqual(devices.results)
        });

        it('should render headers for all fields', () => {
            component = mount(<Devices/>);
            var th = component.find('th');
            var headers = ['Código', 'No. Serie', 'Tipo', 'Marca', '¿Es Activo?', 'Fecha de Compra']
            th.nodes.map((elem) => {
                var elementText = elem.innerHTML;
                expect(headers.indexOf(elementText)).toNotBe(-1)
            });
        });

        it('should render a row for every element on the list', () => {
            let devices = {results:[{device_type:{}, device_brand:{}}, {device_type:{}, device_brand:{}}]};
            component = mount(<Devices/>);
            var rows = component.find('tr');
            expect(rows.length).toBe(devices.results.length);
        });
        it('should not render an error message ', () => {
            expect(component.find('.error_message').length).toBe(0);
        });
    });

    describe('with error in response', () => {
        beforeEach(function () {
            sandbox = Sinon.sandbox.create();
            sandbox.stub($,'ajax').returns({done: (_) => { return {fail: (callback) => {callback()}}} });
            component = mount(<Devices/>);
        });
        afterEach(function () {
            sandbox.restore()
        });


        it('should render an error message ', () => {
            expect(component.find('.error_message').length).toBe(1);
        });

        it('should not render the table', () => {
            expect(component.find('table').length).toBe(0);
        });
    })

});