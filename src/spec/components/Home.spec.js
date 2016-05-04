/* eslint-env mocha*/

import React from 'react';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import { mount } from 'enzyme';
import Home from './../../components/Home';
import Login from './../../components/Login';
import About from './../../components/About';

expect.extend(expectJSX);



describe('App Component', () => {
    let component = mount(<Home/>)
    it('should render the login component', () => {
        expect(component.contains(<Login/>)).toBe(true);
    });
    it('should render the about component', () => {
        expect(component.contains(<About/>)).toBe(true);
    });
});