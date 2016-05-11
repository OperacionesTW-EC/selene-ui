import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import DeviceForm from './../../components/DeviceForm';

describe('DeviceForm', () => {
    describe('Render', () => {

        let component;

        beforeEach(()=>{
          component = mount(<DeviceForm/>);
        });

        it('should render the device type field', () => {
          expect(component.find('[name="device_type"]').length).toBe(1);
        });

        it('should render the device brand', () => {
          expect(component.find('[name="device_brand"]').length).toBe(1);
        });

        it('should render the asset check buttons', () => {
          expect(component.find('.asset-chk').length).toBe(2);
        });

        it('should render the device serial number',()=>{
          expect(component.find('[name="serial_number"]').length).toBe(1);
        });

        it('should render the device model field',()=>{
          expect(component.find('[name="model"]').length).toBe(1);
        });

        it('should render the device purchase date',()=>{
          expect(component.find('[name="purchase_date"]').length).toBe(1);
        });

        it('should render ownership field',()=>{
          expect(component.find('[name="ownership"]').length).toBe(1);
        });

        it('should render save button',()=>{
          expect(component.find('#save').length).toBe(1);
        });

    });
});
