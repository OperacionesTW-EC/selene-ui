
/* eslint-env mocha*/

import React from 'react';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import TestUtils from 'react-addons-test-utils';
import stubRouterContext from './../stubRouterContext';

expect.extend(expectJSX);

describe('Navbar Component', () => {


    describe('Render', () => {

        let component = require('./../../components/Dashboard').default;
        let expectedRoute, Subject, renderResult, links;

        beforeEach(() => {
            Subject = stubRouterContext(component, {}, {
                createHref: () => {
                    return expectedRoute;
                }
            });
        });

        it('should show a link to devices', function () {
            expectedRoute = '#/devices';
            renderResult = TestUtils.renderIntoDocument(<Subject/>);
            links = TestUtils.scryRenderedDOMComponentsWithTag(renderResult, 'a');
            expect(links[0].innerHTML).toInclude('Dispositivos');
            expect(links[0].getAttribute('href')).toEqual(expectedRoute);
        });

        it('should show a link to device form', function () {
            expectedRoute = '#/device_form';
            renderResult = TestUtils.renderIntoDocument(<Subject/>);
            links = TestUtils.scryRenderedDOMComponentsWithTag(renderResult, 'a');
            expect(links[1].innerHTML).toInclude('Registrar Dispositivo');
            expect(links[1].getAttribute('href')).toEqual(expectedRoute);
        });

        it('should show a link to assign device', function () {
            expectedRoute = '#/assign_device';
            renderResult = TestUtils.renderIntoDocument(<Subject/>);
            links = TestUtils.scryRenderedDOMComponentsWithTag(renderResult, 'a');
            expect(links[2].innerHTML).toInclude('Asignar');
            expect(links[2].getAttribute('href')).toEqual(expectedRoute);
        });

    });

});
