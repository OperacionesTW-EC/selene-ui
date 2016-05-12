/* eslint-env mocha*/

import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import FormRow from './../../components/helpers/FormRow';


describe('FormRow Component', () => {

    let  component;

    describe('Render', () => {


        it('should render the label if passed', () => {
            component =  mount(<FormRow label="some_label"/>);
            expect(component.find('label').length).toBe(1);
        });

        it('should not render the label', () => {
            component =  mount(<FormRow/>);
            expect(component.find('label').length).toBe(0);
        });

        it('should add margin class by default', () => {
            component =  mount(<FormRow/>);
            expect(component.find('.margin').length).toBe(1);
        });

        it('should render a row', () => {
            component =  mount(<FormRow/>);
            expect(component.find('.row').length).toBe(1);
        });
    });


});
