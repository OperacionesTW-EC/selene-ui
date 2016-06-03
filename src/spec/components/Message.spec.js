/* eslint-env mocha*/

import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Message from './../../components/helpers/Message';


describe('Message Component', () => {

    let  component;

    describe('Render', () => {
        let type = 'error';

        beforeEach(() => {
            component =  shallow(<Message content='some message' type={type}/>);
        });

        it('should render the message div', () => {
            expect(component.find('.message').length).toBe(1);
        });

        it('should render a div the message type class', () => {
            expect(component.find('.'+type+'-message').length).toBe(1);
        });
    });


});
