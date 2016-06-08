/* eslint-env mocha*/

import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import expectJSX from 'expect-jsx';
import DateHelper from './../../components/helpers/DateHelper.js';

expect.extend(expectJSX);


describe('Date Helper', () => {

    describe('Convert', () => {

        beforeEach(() => {
        });
        it('should return "No registrada" on null input', () => {
            var actualDate = DateHelper(null);
            expect(actualDate).toEqual('No registrada');
        });
        it('should return "No registrada" on undefined input', () => {
            var actualDate = DateHelper(undefined);
            expect(actualDate).toEqual('No registrada');
        });
        it('should retain field values when formatting a datetime', () => {
            var actualDate = DateHelper('2016-05-26T14:01:22.590810Z');
            expect(actualDate).toEqual('05-26-2016');
        });
        it('should retain field values when formatting a date', () => {
            var actualDate = DateHelper('2010-05-23');
            expect(actualDate).toEqual('05-23-2010');
        });
        it('should retain field values when formatting Jan 1', () => {
            var actualDate = DateHelper('2010-01-01');
            expect(actualDate).toEqual('01-01-2010');
        });
        it('should retain field values when formatting Midnight Jan 1', () => {
            var actualDate = DateHelper('2016-01-01T00:00:00.000000Z');
            expect(actualDate).toEqual('01-01-2016');
        });
        it('should retain field values when formatting Dec 31', () => {
            var actualDate = DateHelper('2010-12-31');
            expect(actualDate).toEqual('12-31-2010');
        });
        it('should retain field values when formatting almost midnight, Dec 31', () => {
            var actualDate = DateHelper('2010-12-31T23:59:59.999999Z');
            expect(actualDate).toEqual('12-31-2010');
        });
        it('should retain field values when formatting Mar 1, leap year', () => {
            var actualDate = DateHelper('2016-03-01');
            expect(actualDate).toEqual('03-01-2016');
        });
        it('should retain field values when formatting Mar 1, non-leap year', () => {
            var actualDate = DateHelper('2017-03-01');
            expect(actualDate).toEqual('03-01-2017');
        });
        it('should retain field values when formatting Feb 28, non-leap year', () => {
            var actualDate = DateHelper('2017-02-28');
            expect(actualDate).toEqual('02-28-2017');
        });
        it('should retain field values when formatting Feb 29, leap year', () => {
            var actualDate = DateHelper('2016-02-29');
            expect(actualDate).toEqual('02-29-2016');
        });

    });


});
