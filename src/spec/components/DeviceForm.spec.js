import React from 'react';
import $ from 'jquery';
import expect from 'expect';
import {
	mount
} from 'enzyme';
import Sinon from 'sinon'
import DeviceForm from './../../components/DeviceForm';

describe('DeviceForm', () => {
	let component;
	let sandbox;
	let deviceTypes, deviceBrands;

	describe('Initialization', () => {
		describe('with valid data', () => {

			describe('deviceTypes', () => {

				beforeEach(function() {
					sandbox = Sinon.sandbox.create();
					sandbox.stub($, 'ajax').returns({
						done: (callback) => {
							callback(deviceTypes);
							return {
								fail: (callback) => {}
							}
						}
					});
				});

				afterEach(function() {
					sandbox.restore();
				});

				it('should load device types from backend', () => {
					deviceTypes = {
						results: [{
							name: 'some_name',
							code: 'some_code'
						}]
					};

					component = mount( < DeviceForm / > );
					expect(component.state('deviceTypes')).toEqual(deviceTypes.results);
				});

			});

			describe('deviceBrands', () => {

				beforeEach(function() {
					sandbox = Sinon.sandbox.create();
					sandbox.stub($, 'ajax').returns({
						done: (callback) => {
							callback(deviceBrands);
							return {
								fail: (callback) => {}
							}
						}
					});
				});

				afterEach(function() {
					sandbox.restore();
				});

				it('should load device brands from backend', () => {
					deviceBrands = {
						results: [{
							name: 'some_name'
						}]
					};
					component = mount( < DeviceForm / > );
					expect(component.state('deviceBrands')).toEqual(deviceBrands.results);
				});

			});

		});
		describe('with invalid data', () => {
			beforeEach(function() {
				sandbox = Sinon.sandbox.create();
				sandbox.stub($, 'ajax').returns({
					done: () => {
						return {
							fail: (callback) => {
								callback();
							}
						}
					}
				});
			});

			afterEach(function() {
				sandbox.restore();
			});

			it('should render an error message ', () => {
				component = mount( < DeviceForm / > );
				expect(component.find('.error-message').length).toBe(1);
			});

		});
	});

	describe('Render', () => {
		beforeEach(function() {
			sandbox = Sinon.sandbox.create();
			sandbox.stub($, 'ajax').returns({
				done: (callback) => {
					callback({
						results: []
					});
					return {
						fail: (callback) => {}
					}
				}
			});
			component = mount( < DeviceForm / > );
		});

		afterEach(function() {
			sandbox.restore();
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

		it('should render the device serial number', () => {
			expect(component.find('[name="serial_number"]').length).toBe(1);
		});

		it('should render the device model field', () => {
			expect(component.find('[name="model"]').length).toBe(1);
		});

		it('should render the device purchase date', () => {
			expect(component.find('[name="purchase_date"]').length).toBe(1);
		});

		it('should render ownership field', () => {
			expect(component.find('[name="ownership"]').length).toBe(1);
		});

		it('should render save button', () => {
			expect(component.find('#save').length).toBe(1);
		});

		it('should render TW option in ownership field', () => {
			let element = component.find('[name="ownership"]').find('[value="TW"]');
			expect(element.length).toBe(1);
			expect(element.nodes[0].innerHTML).toEqual('TW');
		});

		it('should render TW option in ownership field', () => {
			let element = component.find('[name="ownership"]').find('[value="CL"]');
			expect(element.length).toBe(1);
			expect(element.nodes[0].innerHTML).toEqual('CL');
		});

	});

	describe('Form events', () => {

		it('shoud call handleFormChanges when any of the input changes', () => {
			Sinon.spy(DeviceForm.prototype, "handleFormChanges");
			component = mount( < DeviceForm / > );
			component.find("[name='device_type']").simulate('change');
			expect(DeviceForm.prototype.handleFormChanges.calledOnce).toEqual(true);
		});

		it('should update the componente state', () => {
			let expectValue = "123456";
			component = mount( < DeviceForm / > );
			let inputComponent = component.find("[name='serial_number']");

			inputComponent.simulate('change', {
				target: {
					name: 'serial_number',
					value: expectValue
				}
			});

			expect(component.find("[name='serial_number']").nodes[0].value).toEqual(expectValue)
		});

		it('should call handleSaveClick when click button save', () => {
      Sinon.spy(DeviceForm.prototype, "handleSaveClick");
      component = mount( < DeviceForm / > );
      component.find("#save").simulate('click');
      expect(DeviceForm.prototype.handleSaveClick.calledOnce).toEqual(true);
		})

	});

});
