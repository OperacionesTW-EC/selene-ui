import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import Sinon from 'sinon'
import $ from 'jquery';
import AssignedDevice from './../../components/AssignedDevice';

describe('AssignedDevice Component', () => {

  let assignment;
  let sandbox;
  let component;

  beforeEach(function () {
      sandbox = Sinon.sandbox.create();
      sandbox.stub($, 'ajax').returns({
          done: (callback) => {
              callback(assignment);
              return {
                  fail: (callback) => {
                  }
              }
          }
      });
      sandbox.stub(AssignedDevice.prototype, 'getAssignmentId').returns(1);
  });

  afterEach(function () {
      sandbox.restore();
  });

  describe('render tests', () => {

      it('should load assignment from backend', () => {
          assignment = {id: '1'};
          component = mount(<AssignedDevice/>);
          expect(component.state('assignment')).toEqual(assignment);
      });

  });

});
