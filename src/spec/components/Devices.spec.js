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
            sandbox.restore();
        });

        it('should load devices from backend', () => {
            devices = {results:[{device_type:{}, device_brand:{}}]};
            component = mount(<Devices/>);
            expect(component.state('devices')).toEqual(devices.results);
        });

        it('should render headers for all fields', () => {
            component = mount(<Devices/>);
            var th = component.find('th');
            var headers = ['Código', 'Tipo', 'Fecha de Compra', 'Propiedad'];
            th.nodes.map((elem) => {
                var elementText = elem.innerHTML;
                expect(headers.indexOf(elementText)).toNotBe(-1);
            });
        });

        it('should render a row for every element on the list', () => {
            devices = {results:[{device_type:{}, device_brand:{}, id:'1'}, {device_type:{}, device_brand:{}, id:'2'}]};
            component = mount(<Devices/>);
            var rows = component.find('tr.data-row');
            expect(rows.length).toBe(devices.results.length);
        });

        it('should code, type, purchase date and ownership', () => {
            devices = {results:[{device_type:{name:'some_name'},code:'some_code', purchase_date:'01/01/2016',ownership:'TW', device_brand:{}}]};
            component = mount(<Devices/>);
            var row = component.find('tr.data-row').nodes[0];
            expect(row.innerHTML).toContain('some_name');
            expect(row.innerHTML).toContain('some_code');
            expect(row.innerHTML).toContain('01/01/2016');
            expect(row.innerHTML).toContain('TW');
        });

        it('should render rows with four tds', () => {
            devices = {results:[{device_type:{name:'some_name'},code:'some_code', purchase_date:'01/01/2016',ownership:'TW', device_brand:{}}]};
            component = mount(<Devices/>);
            var tds = component.find('tr.data-row').find('td').nodes;
            expect(tds.length).toEqual(4);
        });

        it('should not render an error message ', () => {
            component = mount(<Devices/>);
            expect(component.find('.error-message').length).toBe(0);
        });

        it('should render an info message when no devices are returned', () => {
            devices = {results:[]};
            component = mount(<Devices/>);
            expect(component.find('.info-message').length).toBe(1);
        });
    });

    describe('with error in response', () => {
      
        beforeEach(function () {
            sandbox = Sinon.sandbox.create();
            sandbox.stub($,'ajax').returns({done: (_) => { return {fail: (callback) => {callback()}}} });
            component = mount(<Devices/>);
        });

        afterEach(function () {
            sandbox.restore();
        });

        it('should render an error message ', () => {
            expect(component.find('.error-message').length).toBe(1);
        });

        it('should not render the table', () => {
            expect(component.find('table').length).toBe(0);
        });
    })

});
