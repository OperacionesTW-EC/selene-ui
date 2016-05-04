/* eslint-env mocha*/

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import expectJSX from 'expect-jsx';

expect.extend(expectJSX)

import App from './../../components/App';
import Navbar from './../../components/layout/Navbar';
import Footer from './../../components/layout/Footer';

describe('App Component', () => {
  it('should render the navbar', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<App/>);
    const output = renderer.getRenderOutput();
    const expected = (
      <div>
        <Navbar />
        <section className="container-fluid">
        </section>
        <Footer />
      </div>
    );
    expect(output).toEqualJSX(expected);
  });
});
