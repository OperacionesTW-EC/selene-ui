/* eslint-env mocha*/

import React from 'react';
import expect from 'expect';
import DeviceList from './../../components/DeviceList'
import TestUtils from 'react-addons-test-utils';
import stubRouterContext from './../stubRouterContext';
import Devices from './../../components/Devices'

describe('DeviceList Component', () => {
    let renderResult;
    let Subject;

    describe('render', () => {
        beforeEach(() => {
            Subject = stubRouterContext(DeviceList, {location:{query:{message:'some message'}}}, {
                createHref: (link) => {
                    return link;
                }
            });
            renderResult =  TestUtils.renderIntoDocument(<Subject/>);
        });

        it('should render a device list', () => {
            var deviceComponent = TestUtils.findRenderedComponentWithType(renderResult, Devices);
            expect(deviceComponent!=null).toBeTruthy()
        });

        it('should render header', () => {
            var heading = TestUtils.scryRenderedDOMComponentsWithClass(renderResult, 'main-header');
            expect(heading.length).toBe(1);
        });

        describe('with message parameter', () => {

            it('should show a message ', () => {
                var message = TestUtils.scryRenderedDOMComponentsWithClass(renderResult, 'success-message');
                expect(message.length).toBe(1);
                expect(message[0].innerHTML).toInclude('some message');
            });
        });

    });

    describe('without  message parameter', () => {
        beforeEach(() => {
            Subject = stubRouterContext(DeviceList, {location:{query:{}}}, {
                createHref: (link) => {
                    return link;
                }
            });
            renderResult =  TestUtils.renderIntoDocument(<Subject/>);
        });

        it('should not show a message ', () => {
            var message = TestUtils.scryRenderedDOMComponentsWithClass(renderResult, 'success-message');
            expect(message.length).toBe(0);
        });
    });

});
