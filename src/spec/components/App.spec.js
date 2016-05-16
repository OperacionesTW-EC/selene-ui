/* eslint-env mocha*/

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import expectJSX from 'expect-jsx';

expect.extend(expectJSX);

import App from './../../components/App';
import Navbar from './../../components/layout/Navbar';
import Footer from './../../components/layout/Footer';
import Home from './../../components/Home';

describe('App Component', () => {
    it('should render the navbar', () => {
        const renderer = TestUtils.createRenderer();
        renderer.render(<App/>);
        const output = renderer.getRenderOutput();
        const expected = (
                <Navbar />
        );
        expect(output).toIncludeJSX(expected);
    });
    it('should render the footer', () => {
        const renderer = TestUtils.createRenderer();
        renderer.render(<App/>);
        const output = renderer.getRenderOutput();
        const expected = (
            <Footer />
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
