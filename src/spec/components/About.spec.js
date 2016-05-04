/* eslint-env mocha*/

import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import expectJSX from 'expect-jsx';
import About from './../../components/About';

expect.extend(expectJSX);


describe('About Component', () => {

    let  component;

    describe('Render', () => {

        beforeEach(() => {
            component =  shallow(<About />);
        });
        it('should include contact info', () => {
            expect(component.contains('fescobar@thoughtworks.com')).toBe(true);
        });
    });


});