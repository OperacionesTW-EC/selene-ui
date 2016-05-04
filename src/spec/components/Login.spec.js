/* eslint-env mocha*/

import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import expectJSX from 'expect-jsx';
import Login from './../../components/Login';
import { spy } from 'sinon'

expect.extend(expectJSX);


describe('App Component', () => {

    let  component;



    describe('Render', () => {

        beforeEach(() => {
            component =  mount(<Login />);
        });
        it('should render user name field', () => {
            expect(component.find("[name='login']").length == 1).toEqual(true);
        });
        it('should render password field', () => {
            expect(component.find("[name='password']").length == 1).toEqual(true);
        });
        it('should render submit button', () => {
            expect(component.find("[type='submit']").length == 1).toEqual(true);
        });
    });

    describe('validField', () => {

        it('shoud call validField when the input changes', () => {
            spy(Login.prototype, "validField");
            component =  mount(<Login />);
            component.find("[name='login']").simulate('change');
            expect(Login.prototype.validField.calledOnce).toEqual(true);
        });
        it('shoud add invalid class', () => {
            component =  mount(<Login />);
            component.setState({ login: 'short' });
            component.find("[name='login']").simulate('change');
            expect(component.find("[name='login']").get(0)._classList.toString()).toInclude('invalid');
        });
        it('shoud not have invalid class', () => {
            component =  mount(<Login />);
            component.setState({ login: 'validUserName' });
            component.find("[name='login']").simulate('change');
            expect(component.find("[name='login']").get(0)._classList.toString()).toNotInclude('invalid');
        });
    });

});