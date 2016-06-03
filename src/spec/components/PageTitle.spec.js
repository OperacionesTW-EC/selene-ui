/* eslint-env mocha*/

import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import PageTitle from './../../components/layout/PageTitle';


describe('Page title Component', () => {

    let  component;

    describe('Render', () => {

        beforeEach(() => {
            component =  mount(<PageTitle content='Some title' />);
        });

        it('should render the title div', (done) => {
            expect(component.find('.page-header').length).toBe(1);
            done();
        });

        it('should render the page title', (done) => {
            expect(component.find('h1').nodes[0].innerHTML).toBe('Some title');
            done();
        });
    });


});
