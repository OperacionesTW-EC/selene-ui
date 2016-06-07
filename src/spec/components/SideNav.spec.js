
/* eslint-env mocha*/

import React from 'react';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import TestUtils from 'react-addons-test-utils';
import stubRouterContext from './../stubRouterContext';

expect.extend(expectJSX);

describe('SideNav Component', () => {


    describe('Render', () => {

        let component = require('./../../components/layout/SideNav').default;
        let expectedRoute, Subject, renderResult, links;

        beforeEach(() => {
            Subject = stubRouterContext(component, {}, {
                createHref: (link) => {
                    return link;
                }
            });
        });

        it('should show a link to the dashboard', function () {
            expectedRoute = '/dashboard';
            renderResult = TestUtils.renderIntoDocument(<Subject/>);
            links = TestUtils.scryRenderedDOMComponentsWithTag(renderResult, 'a');
            expect(links[2].innerHTML).toInclude('Dashboard');
            expect(links[2].getAttribute('href')).toEqual(expectedRoute);
        });

        it('should show a link to assign device', function () {
            expectedRoute = '/assign_device';
            renderResult = TestUtils.renderIntoDocument(<Subject/>);
            links = TestUtils.scryRenderedDOMComponentsWithTag(renderResult, 'a');
            expect(links[3].innerHTML).toInclude('Asignar');
            expect(links[3].getAttribute('href')).toEqual(expectedRoute);
        });

        it('should show a link to device form', function () {
            expectedRoute = '/device_form';
            renderResult = TestUtils.renderIntoDocument(<Subject/>);
            links = TestUtils.scryRenderedDOMComponentsWithTag(renderResult, 'a');
            expect(links[4].innerHTML).toInclude('Registrar');
            expect(links[4].getAttribute('href')).toEqual(expectedRoute);
        });

        it('should show a link to devices', function () {
            expectedRoute = '/device_list';
            renderResult = TestUtils.renderIntoDocument(<Subject/>);
            links = TestUtils.scryRenderedDOMComponentsWithTag(renderResult, 'a');
            expect(links[5].innerHTML).toInclude('Dispositivos');
            expect(links[5].getAttribute('href')).toEqual(expectedRoute);
        });

        it('should show a link to assigned devices', function () {
            expectedRoute = '/assigned_device_list';
            renderResult = TestUtils.renderIntoDocument(<Subject/>);
            links = TestUtils.scryRenderedDOMComponentsWithTag(renderResult, 'a');
            expect(links[6].innerHTML).toInclude('Asignados');
            expect(links[6].getAttribute('href')).toEqual(expectedRoute);
        });

    });

});
