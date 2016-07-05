/* eslint-env mocha*/

import React from 'react';
import expect from 'expect';
import DeviceList from './../../components/DeviceList'
import TestUtils from 'react-addons-test-utils';
import stubRouterContext from './../stubRouterContext';
import Devices from './../../components/Devices';
import { mount } from 'enzyme';
import Sinon from 'sinon';
import $ from 'jquery';

describe('DeviceList Component', () => {
    let renderResult;
    let Subject;

    describe('render', () => {
        beforeEach(() => {
            Subject = stubRouterContext(DeviceList, {location:{query:{message:'some message'}}}, {
                createHref: (link) => {
                    return link;
                }
            });
            renderResult =  TestUtils.renderIntoDocument(<Subject/>);
        });

        it('should render a device list', () => {
            var deviceComponent = TestUtils.findRenderedComponentWithType(renderResult, Devices);
            expect(deviceComponent!=null).toBeTruthy()
        });

         it('should render a select list', () => {
            var deviceComponent = TestUtils.findRenderedDOMComponentWithTag(renderResult, 'select');

            expect(deviceComponent!=null).toBeTruthy()
        });

        it('should render header', () => {
            var heading = TestUtils.scryRenderedDOMComponentsWithClass(renderResult, 'main-header');
            expect(heading.length).toBe(1);
        });


        describe('with message parameter', () => {

            it('should show a message ', () => {
                var message = TestUtils.scryRenderedDOMComponentsWithClass(renderResult, 'success-message');
                expect(message.length).toBe(1);
                expect(message[0].innerHTML).toInclude('some message');
            });
        });

    });

    describe('without  message parameter', () => {
        beforeEach(() => {
            Subject = stubRouterContext(DeviceList, {location:{query:{}}}, {
                createHref: (link) => {
                    return link;
                }
            });
            renderResult =  TestUtils.renderIntoDocument(<Subject/>);
        });

        it('should not show a message ', () => {
            var message = TestUtils.scryRenderedDOMComponentsWithClass(renderResult, 'success-message');
            expect(message.length).toBe(0);
        });
    });

    describe ('events with device status filter', () => {
        let devices;
        let sandbox;
        let component;
        let props;

        beforeEach(() => {
            sandbox = Sinon.sandbox.create();
            props =  {location:{query:{}}};
         });

         afterEach(function (){
             sandbox.restore();
         });

        describe('device status filter changes', () => {
            let select_status_device;

            beforeEach(() => {
                sandbox.spy(DeviceList.prototype,"handleChangeStatus");
                sandbox.spy($, "ajax");
                component = mount(<DeviceList {...props}/>);
                select_status_device = component.find("[name='device_status']");
            });

            it('should call handleChangeStatus', () => {
                select_status_device.simulate('change');
                expect(DeviceList.prototype.handleChangeStatus.calledOnce).toEqual(true);
            });

            it('should update device_status', () => {
                select_status_device.simulate('change', {target : {name:'device_status', value: 'Asignado'}});
                expect(component.state()['filters']['device_status']).toEqual('Asignado');
            });

        });

        describe ('load data from backend', () => {
          let deviceStatus;

          beforeEach(() => {
           deviceStatus = {
            results: [{
              "id": 1,
              "name": "Disponible"
            },
            {
              "id": 2,
              "name": "Asignado"
            },
            {
              "id": 3,
              "name": "Mantenimiento"
            },
            {
              "id": 4,
              "name": "Dado de baja"
            }]};
            sandbox.stub($, 'ajax').returns({
              done: (callback) => {
                callback(deviceStatus);
                return {
                  fail: (callback) => {}
                }
              }
            });
            component = mount(<DeviceList {...props}/>);
          });


          it ('should update state', () => {
            expect(component.state('deviceStatus')).toEqual(deviceStatus.results);
          });
        });

        });
});
