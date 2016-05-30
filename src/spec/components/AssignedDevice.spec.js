import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import Sinon from 'sinon'
import $ from 'jquery';
import AssignedDevice from './../../components/AssignedDevice';

describe('AssignedDevice Component', () => {

    let assignment;
    let sandbox;
    let component;

    beforeEach(function () {
        sandbox = Sinon.sandbox.create();
        sandbox.stub($, 'ajax').returns({
            done: (callback) => {
                callback(assignment);
                return {
                    fail: (callback) => {
                    }
                }
            }
        });
        sandbox.stub(AssignedDevice.prototype, 'getAssignmentId').returns(1);
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe('data', () => {

        it('should load assignment from backend', () => {
            assignment = {id: '1', devices:[]};
            component = mount(<AssignedDevice/>);
            expect(component.state('assignment')).toEqual(assignment);
        });

    });

    describe('render', () => {

        it('should show assignee and project names', () => {
            assignment = {id: '1', assignee_name:'some name', project_name:'some project', devices:[]};
            component = mount(<AssignedDevice/>);
            let html = component.find('.form-card').node.innerHTML;
            expect(html).toContain('some name');
            expect(html).toContain('some project');
        });

        it('should show formatted assigned and return dates', () => {
            assignment = {id: '1', assignment_datetime:'2016-05-25T14:01:22.590810Z',
                expected_return_date:'2016-05-26T14:01:22.590810Z', devices:[]};
            component = mount(<AssignedDevice/>);
            let html = component.find('.form-card').node.innerHTML;
            expect(html).toContain('05-25-2016');
            expect(html).toContain('05-26-2016');
        });

        it('should show No registrada if return_date is not present', () => {
            assignment = {id: '1', assignment_datetime:'2016-05-25T14:11:22.590810Z',
                return_date:'', devices:[]};
            component = mount(<AssignedDevice/>);
            let html = component.find('.form-card').node.innerHTML;
            expect(html).toContain('No registrada');
        });

        it('should show a table with the assign devices', () => {
            assignment = {id: '1', devices:[{id:1, full_code:'TW1'},{id:2, full_code:'TW2'}]};
            component = mount(<AssignedDevice/>);
            expect(component.find('table').length).toBe(1);
            expect(component.find('.data-row').length).toBe(2);
        });

        it('should show headers for all fields', () => {
            component = mount(<AssignedDevice/>);
            var th = component.find('th');
            var headers = ['Código', 'Tipo', 'Marca','Fecha de Finalización'];
            expect(th.length).toBe(headers.length);
            th.nodes.map((elem) => {
                var elementText = elem.innerHTML;
                expect(headers.indexOf(elementText)).toNotBe(-1);
            });
        });

        it('should show the required fields', () => {
            assignment = {id: '1', devices:[{id:1, full_code:'TW1',
                device_type_name:'Laptop', device_brand_name:'apple',
                end_date:'10-10-2016'}]};
            component = mount(<AssignedDevice/>);
            var row = component.find('tr.data-row').nodes[0];
            expect(row.innerHTML).toContain(assignment.devices[0].full_code);
            expect(row.innerHTML).toContain(assignment.devices[0].device_type_name);
            expect(row.innerHTML).toContain(assignment.devices[0].device_brand_name);
            expect(row.innerHTML).toContain(assignment.devices[0].end_date);
        });

        it('should show ok button', () => {
            assignment = {id: '1', devices:[]};
            component = mount(<AssignedDevice/>);
            let button = component.find('.btn')
            expect(button.length).toBe(1);
            expect(button.node.innerHTML).toContain('Aceptar');
        });

    });

});
