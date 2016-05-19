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

    describe('without any props', () => {
        describe('with valid data', () => {

            beforeEach(function () {
                sandbox = Sinon.sandbox.create();
                sandbox.stub($,'ajax').returns({done: (callback) => {callback(devices); return {fail: (callback) => {}}} });
            });

            afterEach(function () {
                sandbox.restore();
            });

            it('should load devices from backend', () => {
                devices = {results:[{id:'1'},{id:'2'}]};
                component = mount(<Devices/>);
                expect(component.state('devices')).toEqual(devices.results);
            });

            it('should render headers for all fields', () => {
                component = mount(<Devices/>);
                var th = component.find('th');
                var headers = ['Código', 'Tipo', 'Marca', 'Fecha de Compra','Fecha de Asignación','Fecha de Finalización','Fecha de Entrega'];
                th.nodes.map((elem) => {
                    var elementText = elem.innerHTML;
                    expect(headers.indexOf(elementText)).toNotBe(-1);
                });
            });

            it('should render a row for every element on the list', () => {
                devices = {results:[{id:'1'}, {id:'2'}]};
                component = mount(<Devices/>);
                var rows = component.find('tr.data-row');
                expect(rows.length).toBe(devices.results.length);
            });

            it('should show code, type, purchase date and ownership', () => {
                devices = {results:[{device_type_name:'some_name',full_code:'some_code', purchase_date:'01/01/2016',device_brand_name:'TW'}]};
                component = mount(<Devices/>);
                var row = component.find('tr.data-row').nodes[0];
                expect(row.innerHTML).toContain('some_name');
                expect(row.innerHTML).toContain('some_code');
                expect(row.innerHTML).toContain('TW');
                expect(row.innerHTML).toContain('01/01/2016');
            });

            it('should render rows with four tds', () => {
                devices = {results:[{device_type_name:'some_name',full_code:'some_code', purchase_date:'01/01/2016',device_brand_name:'TW'}]};
                component = mount(<Devices/>);
                var tds = component.find('tr.data-row').find('td').nodes;
                expect(tds.length).toEqual(7);
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

    describe('with props', () => {
        let checkboxCallback;
        beforeEach(function () {
            checkboxCallback = Sinon.spy();
            devices = {results:[{
                device_type_name:'some_name',
                full_code:'some_code',
                purchase_date:'01/01/2016',
                ownership:'TW',
                device_state_name:'Disponible'
            }]};
            sandbox = Sinon.sandbox.create();
            sandbox.stub($,'ajax').returns({done: (callback) => {callback(devices); return {fail: (callback) => {}}} });

        });

        afterEach(function () {
            sandbox.restore();
        });

        it('should not show the page title', () => {
            component = mount(<Devices type="embedded" callback={checkboxCallback} filterBy="Disponible"/>);
            expect(component.find('.page-header').length).toBe(0);
        });

        it('should not show the panel heading', () => {
            component = mount(<Devices type="embedded" callback={checkboxCallback} filterBy="Disponible"/>);
            expect(component.find('.panel-heading').length).toBe(0);
        });

        it('should show checkboxes on every row', () => {
            component = mount(<Devices type="embedded" />);
            expect(component.find('.device-chk').length).toBe(1)
        });

        it('should invoke callback function', () => {
            component = mount(<Devices type="embedded" callback={checkboxCallback} filterBy="Disponible"/>);
            let checkbox = component.find('.device-chk');
            checkbox.simulate('change', {
                target: {
                    name: 'device-chk',
                    value: 1
                }
            });
            expect(checkboxCallback.called).toEqual(true);
        });

        it('should show only available devices', () => {
            devices = {results:[{
                device_type_name:'some_name',
                full_code:'some_code',
                purchase_date:'01/01/2016',
                ownership:'TW',
                device_state_name:'Disponible'
            }, {
                device_type_name:'some_name',
                full_code:'some_code',
                purchase_date:'01/01/2016',
                ownership:'TW',
                device_state_name:'No Disponible'
            }
            ]};
            component = mount(<Devices type="embedded" filterBy="Disponible"/>);
            expect(component.find('.device-chk').length).toBe(1)
        });
        it('should show a message if no devices are shown', () => {
            devices = {results:[{
                device_type_name:'some_name',
                full_code:'some_code',
                purchase_date:'01/01/2016',
                ownership:'TW',
                device_state_name:'No Disponible'
            }, {
                device_type_name:'some_name',
                full_code:'some_code',
                purchase_date:'01/01/2016',
                ownership:'TW',
                device_state_name:'No Disponible'
            }
            ]};
            component = mount(<Devices type="embedded" filterBy="Disponible"/>);
            expect(component.find('.device-chk').length).toBe(0)
            expect(component.find('tr.data-row').nodes[0].innerHTML).toContain('No hay dispositivos')
        });
    });



});
