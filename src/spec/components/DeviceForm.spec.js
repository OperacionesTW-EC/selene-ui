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
							id: 'some_id',
							name: 'some_name'
						}]
					};

					component = mount( < DeviceForm/>);
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
							id: 'some_id',
							name: 'some_name'
						}]
					};
					component = mount( < DeviceForm/>);
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

			it('should render an error message', () => {
				component = mount( < DeviceForm/>);
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
			component = mount( < DeviceForm/>);
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

		it('should render the device description', () => {
			expect(component.find('[name="description"]').length).toBe(1);
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

		describe('inputs', () => {

			let response = {
				results: []
			};

			let sandboxAjax;

			beforeEach(() => {
				sandbox = Sinon.sandbox.create();
				sandbox.spy(DeviceForm.prototype, "handleFormChanges");
				component = mount( < DeviceForm/>);

				sandboxAjax = Sinon.sandbox.create();
				sandboxAjax.stub($, 'ajax').returns({
					done: (callback) => {
						callback(response);
						return {
							fail: (callback) => {}
						}
					}
				});
			});

			afterEach(function() {
				sandbox.restore();
				sandboxAjax.restore();
			});

			it('should call handleFormChanges when any of the input changes', () => {
				component.find("[name='device_type']").simulate('change');
				expect(DeviceForm.prototype.handleFormChanges.calledOnce).toEqual(true);
			});

			it('should update the component state ', () => {
				let expectValue = "123456";
				let inputComponent = component.find("[name='serial_number']");
				inputComponent.simulate('change', {
					target: {
						name: 'serial_number',
						value: expectValue
					}
				});

				expect(inputComponent.nodes[0].value).toEqual(expectValue)
				expect(component.state().device.serial_number).toEqual(expectValue)
			});

			it('should update state value of device type field', () => {
				response = {
					results: [{
						id: '1',
						name: 'some_name'
					}, {
						id: '2',
						name: 'some_name'
					}]
				};

				component = mount( < DeviceForm/>);
				let input = component.find('[name="device_type"]');
				input.simulate('change', {
					target: {
						name: 'device_type',
						value: 1
					}
				});

				expect(input.nodes[0].value).toEqual('1');
			});


			it('should update state value of device brand field', () => {
				response = {
					results: [{
						id: '1',
						name: 'some_name'
					}, {
						id: '2',
						name: 'some_name'
					}]
				};

				component = mount( < DeviceForm/>);
				let input = component.find('[name="device_brand"]');
				input.simulate('change', {
					target: {
						name: 'device_brand',
						value: 1
					}
				});

				expect(input.nodes[0].value).toEqual('1');
			});
		});

		describe('save button', () => {

			beforeEach(() => {
				sandbox = Sinon.sandbox.create();
				sandbox.spy(DeviceForm.prototype, "handleSaveClick");
				sandbox.spy(DeviceForm.prototype, "processForm");
				component = mount( < DeviceForm/>);
				sandbox.spy($, "ajax");
			});

			afterEach(function() {
				sandbox.restore();
			});

			it('should invoke handleSaveClick when clicked', () => {
				component.find("#save").simulate('click');
				expect(DeviceForm.prototype.handleSaveClick.calledOnce).toEqual(true);
			});

			it('should send data to backed', () => {
				component.find("#save").simulate('click');
				expect($.ajax.calledOnce).toEqual(true);
			});

			it('should invoke process form', () => {
				component.find("#save").simulate('click');
				expect(DeviceForm.prototype.processForm.calledOnce).toEqual(true);
			});


			describe('processForm', () => {
				it('should format purchase date', () => {
					component.find('form').simulate('change', {
						target: {
							name: 'purchase_date',
							value: '01-29-2016'
						}
					});
					var result = component.instance().processForm();
					expect(result.purchase_date).toEqual('2016-01-29');
				});
				
				it('should remove purchase date if empty', () => {
					component.find('form').simulate('change', {
						target: {
							name: 'purchase_date',
							value: ''
						}
					});
					var result = component.instance().processForm();
					expect(result.purchase_date).toBe(undefined);
				});
			});



		});

		describe('with successful ajax call', () => {

			let response = {
				results: [],
				full_code:'some code'
			};
			let isMounted;

			beforeEach(function() {
				isMounted = false;
				sandbox = Sinon.sandbox.create();
				sandbox.stub($, 'ajax').returns({
					done: (callback) => {
						callback(response);
						return {
							fail: (callback) => {}
						}
					}
				});
				component = mount( < DeviceForm/>);
			});

			afterEach(function() {
				sandbox.restore();
			});

			it('should show a success message with the device code', () => {
				component = mount( < DeviceForm/>);
				isMounted = true;
				component.find("#save").simulate('click');
				expect(component.find('.success-message').length).toBe(1);
				expect(component.find('.success-message').nodes[0].innerHTML).toContain(response.full_code);
			});

			it('should clean input device type field', () => {
				response = {
					results: [{
						id: '1',
						name: 'some_name'
					}, {
						id: '2',
						name: 'some_name'
					}]
				};
				component = mount( < DeviceForm/>);
				isMounted = true;
				let input = component.find('[name="device_type"]');
				input.simulate('change', {
					target: {
						name: 'device_type',
						value: 1
					}
				});
				component.find("#save").simulate('click');
				expect(input.nodes[0].value).toEqual('Seleccione...');
			});

			it('should clean input device brand field', () => {
				response = {
					results: [{
						id: '1',
						name: 'some_name'
					}, {
						id: '2',
						name: 'some_name'
					}]
				};
				component = mount( < DeviceForm/>);
				isMounted = true;
				let input = component.find('[name="device_brand"]');
				input.simulate('change', {
					target: {
						name: 'device_brand',
						value: 1
					}
				});
				component.find("#save").simulate('click');
				expect(input.nodes[0].value).toEqual('Seleccione...');
			});

		});

		describe('with error', () => {

			let response = {
				results: []
			};
			let isMounted;

			beforeEach(function() {
				isMounted = false;
				sandbox = Sinon.sandbox.create();
				sandbox.stub($, 'ajax').returns({
					done: (callback) => {
						if (!isMounted) callback(response);
						return {
							fail: (callback) => {
								if (isMounted) callback();
							}
						}
					}
				});
			});

			afterEach(function() {
				sandbox.restore();
			});

			it('should show an error message', () => {
				component = mount( < DeviceForm/>);
				isMounted = true;
				component.find("#save").simulate('click');
				expect(component.find('.error-message').length).toBe(1);
			});
		});

	});

});
