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
    let props;

    beforeEach(function () {
        sandbox = Sinon.sandbox.create();
        props =  {location:{query:{message:'some message'}}};
        sandbox.stub($, 'ajax').returns({
            done: (callback) => {
                callback(assignment);
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

    describe('data', () => {

        it('should load assignment from backend', () => {
            assignment = {id: '1', devices:[]};
            component = mount(<AssignedDevice {...props} params={{id: 1}}/>);
            expect(component.state('assignment')).toEqual(assignment);
        });

    });

    describe('render', () => {

        var mountAssignedDeviceComponent = (expectedReturnData) => {
            assignment = {id: '1', devices:[]};
            $.extend(assignment, assignment, expectedReturnData);
            component = mount(<AssignedDevice {...props} params={{id: 1}}/>);
        }

        it('should show assignee and project names', () => {
            mountAssignedDeviceComponent({assignee_name:'some name', project_name:'some project'});
            let html = component.find('.form-card').node.innerHTML;
            expect(html).toContain('some name');
            expect(html).toContain('some project');
        });

        it('should show formatted assigned and return dates', () => {
            mountAssignedDeviceComponent({assignment_date:'2016-05-25T14:01:22.590810Z',
                expected_return_date:'2016-05-26T14:01:22.590810Z'});
            let html = component.find('.form-card').node.innerHTML;
            expect(html).toContain('05-25-2016');
            expect(html).toContain('05-26-2016');
        });

        it('should show No registrada if return_date is not present', () => {
            mountAssignedDeviceComponent({assignment_date:'2016-05-25T14:11:22.590810Z',
                return_date:''});
            let html = component.find('.form-card').node.innerHTML;
            expect(html).toContain('No registrada');
        });

        it('should show a table with the assign devices', () => {
            mountAssignedDeviceComponent({devices:[{id:1, full_code:'TW1'},{id:2, full_code:'TW2'}]});
            expect(component.find('table').length).toBe(1);
            expect(component.find('.data-row').length).toBe(2);
        });

        it('should show headers for all fields', () => {
            mountAssignedDeviceComponent({});
            var th = component.find('th');
            var headers = ['Código', 'Tipo', 'Marca','Fecha de Finalización'];
            expect(th.length).toBe(headers.length);
            th.nodes.map((elem) => {
                var elementText = elem.innerHTML;
                expect(headers.indexOf(elementText)).toNotBe(-1);
            });
        });

        it('should show the required fields', () => {
            mountAssignedDeviceComponent({devices:[{id:1, full_code:'TW1',
                device_type_name:'Laptop', device_brand_name:'apple',
                life_end_date:'10-10-2016'}]});
            var row = component.find('tr.data-row').nodes[0];
            expect(row.innerHTML).toContain(assignment.devices[0].full_code);
            expect(row.innerHTML).toContain(assignment.devices[0].device_type_name);
            expect(row.innerHTML).toContain(assignment.devices[0].device_brand_name);
            expect(row.innerHTML).toContain(assignment.devices[0].life_end_date);
        });

        it('should show a back to assigned devices button', () => {
            mountAssignedDeviceComponent({});
            let button = component.find('.btn');
            expect(button.length).toBe(1);
            expect(button.node.innerHTML).toContain('Volver a dispositivos asignados');
        });

        it('shows message from params', () => {
            mountAssignedDeviceComponent({});
            expect(component.find('.success-message').length).toEqual(1);
            expect(component.find('.success-message').node.innerHTML).toContain(props.location.query.message);
        });

    });

});
