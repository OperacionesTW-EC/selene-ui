/* eslint-env mocha*/

import React from 'react';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import TestUtils from 'react-addons-test-utils';
import stubRouterContext from './../stubRouterContext';

expect.extend(expectJSX);

describe('About Component', () => {


    describe('Render', () => {

        let component = require('./../../components/layout/Navbar').default;
        let expectedRoute, Subject, renderResult, links;

        beforeEach(() => {
            Subject = stubRouterContext(component, {}, {
                createHref: () => {
                    return expectedRoute;
                }
            });
        });

        it('should show a link to home', function () {
            expectedRoute = '#/home';
            renderResult = TestUtils.renderIntoDocument(<Subject/>);
            links = TestUtils.scryRenderedDOMComponentsWithTag(renderResult, 'a');
            expect(links[0].innerHTML).toInclude('Selene');
            expect(links[0].getAttribute('href')).toEqual(expectedRoute);
        });
        it('should show a link to devices', function () {
            expectedRoute = '#/devices';
            renderResult = TestUtils.renderIntoDocument(<Subject/>);
            links = TestUtils.scryRenderedDOMComponentsWithTag(renderResult, 'a');
            expect(links[1].innerHTML).toInclude('Dispositivos');
            expect(links[1].getAttribute('href')).toEqual(expectedRoute);
        });
    });


});