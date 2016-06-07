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
    let ajaxCount;
    let projects;

    describe('render test', () => {

        beforeEach(function () {
            ajaxCount=0;
            projects = {results:[{id:'1', name:'some name'}]};
            sandbox = Sinon.sandbox.create();
            sandbox.stub($, 'ajax').returns({
                done: (callback) => {
                    if(ajaxCount==0) {
                        callback(devices);
                    } else {
                        callback(projects);
                    }
                    ajaxCount++;
                    return {fail: (callback) => {} }
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
                life_start_date_or_assignment_date: '01-01-2016',
                return_date: '02-01-2016',
                life_end_date: '03-01-2016',
                assignee_name: 'some_name',
                project: 'some_project'
            }];
            component = mount(<AssignedDeviceList/>);
            var row = component.find('tr.data-row').nodes[0];
            expect(row.innerHTML).toContain(devices[0].full_code);
            expect(row.innerHTML).toContain(devices[0].device_type_name);
            expect(row.innerHTML).toContain(devices[0].device_brand_name);
            expect(row.innerHTML).toContain(devices[0].life_start_date_or_assignment_date);
            expect(row.innerHTML).toContain(devices[0].return_date);
            expect(row.innerHTML).toContain(devices[0].life_end_date);
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
            var link = component.find('a #btn-save').nodes[0];
            expect(link.innerHTML).toContain('Asignar');
        });

        it('should render search button', () => {
            devices = [];
            component = mount(<AssignedDeviceList/>);
            var link = component.find('a #btn-search').nodes[0];
            expect(link.innerHTML).toContain('Buscar');
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

    describe('initialization test', () => {

        describe('projects', () => {

            describe('with valid data', () => {

                beforeEach(function () {
                    ajaxCount=0;
                    projects = {results:[{id:'1', name:'some name'}]};
                    sandbox = Sinon.sandbox.create();
                    sandbox.stub($, 'ajax').returns({
                        done: (callback) => {
                            if(ajaxCount==0) {
                                callback(devices);
                            } else {
                                callback(projects);
                            }
                            ajaxCount++;
                            return {fail: (callback) => {} }
                        }
                    });
                    component = mount(<AssignedDeviceList/>);
                });

                afterEach(function () {
                    sandbox.restore();
                });

                it('should load projects from backend', () => {
                    expect(component.state('projects')).toEqual(projects.results);
                });

                it('should render Ninguno on project list', () => {
                    expect(component.find('form select option').nodes[1].innerHTML).toContain("Ninguno");
                    expect(component.find('form select option').nodes[1].value).toBe("0");
                });

                it('should render the project list into a combo box', () => {
                    expect(component.find('form select option').nodes[2].innerHTML).toContain(projects.results[0].name);
                });

            });

            describe('with invalid data', () => {

                beforeEach(function () {
                    ajaxCount=0;
                    projects = {results:[{id:'1', name:'some name'}]};
                    sandbox = Sinon.sandbox.create();
                    sandbox.stub($, 'ajax').returns({
                        done: (callback) => {
                            if(ajaxCount==0) {
                                callback(devices);
                            }
                            ajaxCount++;
                            return {
                                fail: (callback) => {
                                    if(ajaxCount > 0) {
                                        callback(projects);
                                    }
                                }
                            }
                        }
                    });
                    component = mount(<AssignedDeviceList/>);
                });

                afterEach(function () {
                    sandbox.restore();
                });

                it('should render an error message', () => {
                    expect(component.find('.error-message').length).toNotBe(0);
                });

            });

        });

    });

    describe('events test',() => {

        let eventBlock;

        beforeEach(function () {
            ajaxCount=0;
            sandbox = Sinon.sandbox.create();
            sandbox.spy(AssignedDeviceList.prototype, "handleSearchClick");
            sandbox.spy(AssignedDeviceList.prototype, "updateFilterFromEvent");
            sandbox.spy(AssignedDeviceList.prototype, "handleChangeAssignee");
            component = mount(<AssignedDeviceList/>);
            sandbox.spy($, "ajax");
            eventBlock = {preventDefault: function () {}}
            sandbox.spy(eventBlock, 'preventDefault');
        });

        afterEach(function () {
            sandbox.restore();
        });

        it('should invoke updateFilterFromEvent when project input changes', () => {
            component.find("[name='project']").simulate('change');
            expect(AssignedDeviceList.prototype.updateFilterFromEvent.calledOnce).toEqual(true);
        });

        it('should invoke handleChangeAssignee when assignee name input changes', () => {
            component.find("[name='assignee']").simulate('change');
            expect(AssignedDeviceList.prototype.handleChangeAssignee.calledOnce).toEqual(true);
        });

        it('should invoke handleSearchClick when click in search', () => {
            component.find("#btn-search").simulate('click');
            expect(AssignedDeviceList.prototype.handleSearchClick.calledOnce).toEqual(true);
        });

        it('should send data to backed', () => {
            component.find("#btn-search").simulate('click');
            expect($.ajax.calledOnce).toEqual(true);
        });

        it('should block submit form', () => {
            component.find("form").simulate('submit', {
                preventDefault: eventBlock.preventDefault
            });
            expect(eventBlock.preventDefault.calledOnce).toEqual(true);
        });

        it('should send data to backend on "enter" keypress', () => {
            component.find("[name='assignee']").simulate('keyPress', {
                charCode: 13
            });
            expect($.ajax.calledOnce).toEqual(true);
        });

        it('should send data to backend on project change', () => {
            component.find("[name='project']").simulate('change');
            expect(AssignedDeviceList.prototype.updateFilterFromEvent.calledOnce).toEqual(true);
            expect($.ajax.calledOnce).toEqual(true);
        });

    });

    describe('render search', ()=>{

        beforeEach(function () {
            ajaxCount=0;
            projects = {results:[{id:'1', name:'some name'}]};
            sandbox = Sinon.sandbox.create();
            sandbox.stub($, 'ajax').returns({
                done: (callback) => {
                    if(ajaxCount==0) {
                        callback(devices);
                    } else {
                        callback(projects);
                    }
                    ajaxCount++;
                    return {fail: (callback) => {} }
                }
            });
        });

        afterEach(function () {
            sandbox.restore();
        });

        it('should render a row for every element on the list', () => {
            devices = [{id: '1'}, {id: '2'}, {id: '3'}];
            component.find("#btn-search").simulate('click');
            var rows = component.find('tr.data-row');
            expect(rows.length).toBe(devices.length);
        });
    });

});
