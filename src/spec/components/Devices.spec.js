/* eslint-env mocha*/

import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import Sinon from 'sinon'
import $ from 'jquery';
import Devices from './../../components/Devices';
import stubRouterContext from './../stubRouterContext';
import TestUtils from 'react-addons-test-utils';

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
                var headers = ['Código', 'Tipo', 'Marca', 'Fecha de Compra','Fecha de Asignación','Fecha de Finalización', ''];
                expect(th.length).toBe(headers.length);
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

            it('should show required field with formatted dates', () => {
                devices = {results:[{
                  device_type_name:'some_name',
                  full_code:'some_code',
                   purchase_date:'2016-02-28T14:11:22.590810Z',
                   device_brand_name:'TW',
                   laptop_begin_life:'2016-05-26T14:11:22.590810Z',
                   laptop_end_life:'2019-05-21T14:11:22.590810Z'
                 }]};
                component = mount(<Devices/>);
                var row = component.find('tr.data-row').nodes[0];
                expect(row.innerHTML).toContain(devices.results[0].full_code);
                expect(row.innerHTML).toContain(devices.results[0].device_brand_name);
                expect(row.innerHTML).toContain('02-28-2016');
                expect(row.innerHTML).toContain('05-26-2016');
                expect(row.innerHTML).toContain('05-21-2019');
            });

            it('should render rows with 7 tds', () => {
                devices = {results:[{device_type_name:'some_name',full_code:'some_code', purchase_date:'01/01/2016',device_brand_name:'TW'}]};
                component = mount(<Devices/>);
                var tds = component.find('tr.data-row').find('td').nodes;
                expect(tds.length).toEqual(7);
            });

            it('should render a link to device info', () => {
                devices = {results:[{device_type_name:'some_name',full_code:'some_code', purchase_date:'01/01/2016',device_brand_name:'TW', id:1}]};
                let expectedRoute = '/device/1';
                let Subject = stubRouterContext(Devices, {}, {
                    createHref: (link) => {
                        return link;
                    }
                });
                let renderResult = TestUtils.renderIntoDocument(<Subject/>);
                let links = TestUtils.scryRenderedDOMComponentsWithTag(renderResult, 'a');
                expect(links[0].innerHTML).toContain('fa-search');
                expect(links[0].getAttribute('href')).toEqual(expectedRoute);
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
                device_status_name:'Disponible'
            }]};
            sandbox = Sinon.sandbox.create();
            sandbox.stub($,'ajax').returns({done: (callback) => {callback(devices); return {fail: (callback) => {}}} });

        });

        afterEach(function () {
            sandbox.restore();
        });

        it('should not show the page title', () => {
            component = mount(<Devices type="device_assignment_table" callback={checkboxCallback} filterBy="Disponible"/>);
            expect(component.find('.page-header').length).toBe(0);
        });

        it('should not show the panel heading', () => {
            component = mount(<Devices type="device_assignment_table" callback={checkboxCallback} filterBy="Disponible"/>);
            expect(component.find('.panel-heading').length).toBe(0);
        });

        it('should show checkboxes on every row', () => {
            component = mount(<Devices type="device_assignment_table" />);
            expect(component.find('.device-chk').length).toBe(1)
        });

        it('should invoke callback function', () => {
            component = mount(<Devices type="device_assignment_table" callback={checkboxCallback} filterBy="Disponible"/>);
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
                device_status_name:'Disponible'
            }, {
                device_type_name:'some_name',
                full_code:'some_code',
                purchase_date:'01/01/2016',
                ownership:'TW',
                device_status_name:'No Disponible'
            }
            ]};
            component = mount(<Devices type="device_assignment_table" filterBy="Disponible"/>);
            expect(component.find('.device-chk').length).toBe(1)
        });
        it('should show a message if no devices are shown', () => {
            devices = {results:[{
                device_type_name:'some_name',
                full_code:'some_code',
                purchase_date:'01/01/2016',
                ownership:'TW',
                device_status_name:'No Disponible'
            }, {
                device_type_name:'some_name',
                full_code:'some_code',
                purchase_date:'01/01/2016',
                ownership:'TW',
                device_status_name:'No Disponible'
            }
            ]};
            component = mount(<Devices type="device_assignment_table" filterBy="Disponible"/>);
            expect(component.find('.device-chk').length).toBe(0)
            expect(component.find('tr.data-row').nodes[0].innerHTML).toContain('No hay dispositivos')
        });
    });



});
