import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import Sinon from 'sinon'
import $ from 'jquery';
import Device from './../../components/Device';

describe('Device Component', () => {

    let device;
    let sandbox;
    let component;

    beforeEach(function () {
        sandbox = Sinon.sandbox.create();
        sandbox.stub($, 'ajax').returns({
            done: (callback) => {
                callback(device);
                return {
                    fail: (callback) => {
                    }
                }
            }
        });
        sandbox.spy(Device.prototype, "handleSaveClick");
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe('Load data', () => {

      it('should load data from backend', () => {
          device = {id:1, full_code: 'TWAL001'};
          component = mount(<Device params={{id: 1}}/>);
          expect(component.state('device')).toEqual(device)
      });

    })

    describe('Render', () => {

        it('should show device info', () => {
            device={"id":1,
              "device_type_name":"Adaptadores",
              "full_code":"TWEA0004",
              "device_brand_name":"Apple",
              "ownership":"TW",
              "serial_number":"",
              "model":"Adaptador VDI",
              "device_status_name": "Disponible"
            };

            component = mount(<Device params={{id: 1}}/>);
            let html = component.find('.form-card').node.innerHTML;
            expect(html).toContain(device.full_code);
            expect(html).toContain(device.device_brand_name);
            expect(html).toContain(device.device_type_name);
            expect(html).toContain(device.model);
            expect(html).toContain(device.serial_number);
            expect(html).toContain(device.device_status_name);
        });

        it('should show formatted purchase, first assignment and end dates', () => {
            device = {id: 1,
              "purchase_date":"2016-05-01T15:02:21.960017Z",
              "first_assignment_date":"2016-05-31T15:02:21.960017Z",
              "end_date":"2019-05-31T15:02:21.960017Z"
            };

            component = mount(<Device params={{id: 1}}/>);
            let html = component.find('.form-card').node.innerHTML;
            expect(html).toContain('05-01-2016');
            expect(html).toContain('05-31-2016');
            expect(html).toContain('05-31-2019');
        });

        it('should render the new device status field', () => {
            component = mount(<Device params={{id: 1}}/>);
    			  expect(component.find('[name="new_device_status"]').length).toBe(1);
    		});

        it('should render save button', () => {
    			expect(component.find('#save').length).toBe(1);
    		});

    });

    describe('Events', ()=>{

			it('should invoke handleSaveClick when clicked', () => {
        component = mount(<Device params={{id: 1}}/>);
				component.find("#save").simulate('click');
				expect(Device.prototype.handleSaveClick.calledOnce).toEqual(true);
			});

    });
    
});
