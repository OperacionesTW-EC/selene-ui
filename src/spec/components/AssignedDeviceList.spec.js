import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import Sinon from 'sinon'
import $ from 'jquery';
import AssignedDeviceList from './../../components/AssignedDeviceList';

describe('AssignedDeviceList Component', () => {

    let devices;
    let sandbox;
    let component;

    describe('render test', () => {

        beforeEach(function () {
            sandbox = Sinon.sandbox.create();
            sandbox.stub($, 'ajax').returns({
                done: (callback) => {
                    callback(devices);
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

        it('should load devices from backend', () => {
            devices = [{id: '1'}, {id: '2'}];
            component = mount(<AssignedDeviceList/>);
            expect(component.state('devices')).toEqual(devices);
        });

        it('should render headers for all fields', () => {
            component = mount(<AssignedDeviceList/>);
            var th = component.find('th');
            var headers = ['Código', 'Tipo', 'Marca', 'Fecha de Asignación', 'Fecha de Entrega', 'Fecha de Finalización', 'Responsable', 'Proyecto'];
            expect(th.length).toBe(headers.length);
            th.nodes.map((elem) => {
                var elementText = elem.innerHTML;
                expect(headers.indexOf(elementText)).toNotBe(-1);
            });
        });

        it('should render a row for every element on the list', () => {
            devices = [{id: '1'}, {id: '2'}];
            component = mount(<AssignedDeviceList/>);
            var rows = component.find('tr.data-row');
            expect(rows.length).toBe(devices.length);
        });


        it('should render rows with 8 tds', () => {
            devices = [{id: '1', full_code: 'some_code'}];
            component = mount(<AssignedDeviceList/>);
            var tds = component.find('tr.data-row').find('td').nodes;
            expect(tds.length).toEqual(8);
        });

        it('should show code, type, brand, assign date, return date, end date, assignee name, project', () => {
            devices = [{
                id: 'id',
                full_code: 'some_code',
                device_type_name: 'Laptop',
                device_brand_name: 'HP',
                laptop_begin_life: '01-01-2016',
                return_date: '02-01-2016',
                laptop_end_life: '03-01-2016',
                assignee_name: 'some_name',
                project: 'some_project'
            }];
            component = mount(<AssignedDeviceList/>);
            var row = component.find('tr.data-row').nodes[0];
            expect(row.innerHTML).toContain(devices[0].full_code);
            expect(row.innerHTML).toContain(devices[0].device_type_name);
            expect(row.innerHTML).toContain(devices[0].device_brand_name);
            expect(row.innerHTML).toContain(devices[0].laptop_begin_life);
            expect(row.innerHTML).toContain(devices[0].return_date);
            expect(row.innerHTML).toContain(devices[0].laptop_end_life);
            expect(row.innerHTML).toContain(devices[0].assignee_name);
            expect(row.innerHTML).toContain(devices[0].project);
        });

        it('should not render an error message ', () => {
            devices = [{id: '1', full_code: 'some_code'}];
            component = mount(<AssignedDeviceList/>);
            expect(component.find('.error-message').length).toBe(0);
        });

        it('should render an info message when no devices are returned', () => {
            devices = [];
            component = mount(<AssignedDeviceList/>);
            expect(component.find('.info-message').length).toBe(1);
        });

        it('should render assign button', () => {
            devices = [];
            component = mount(<AssignedDeviceList/>);
            var link = component.find('a').nodes[0];
            expect(link.innerHTML).toContain('Asignar Dispositivo');
        });
    });

    describe('with error in response', () => {

        beforeEach(function () {
            sandbox = Sinon.sandbox.create();
            sandbox.stub($,'ajax').returns({done: (_) => { return {fail: (callback) => {callback()}}} });
            component = mount(<AssignedDeviceList/>);
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
    });


});
