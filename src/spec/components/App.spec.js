/* eslint-env mocha*/

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import expectJSX from 'expect-jsx';

expect.extend(expectJSX);

import App from './../../components/App';
import SideNav from './../../components/layout/SideNav';
import Footer from './../../components/layout/Footer';
import Home from './../../components/Home';

describe('App Component', () => {
    it('should render the SideNav', () => {
        const renderer = TestUtils.createRenderer();
        renderer.render(<App/>);
        const output = renderer.getRenderOutput();
        const expected = (
                <SideNav />
        );
        expect(output).toIncludeJSX(expected);
    });
    it('should render login component by default', () => {
        const renderer = TestUtils.createRenderer();
        renderer.render(<App/>);
        const output = renderer.getRenderOutput();
        const expected = (
            <Home/>
        );
        expect(output).toIncludeJSX(expected);
    });

});
