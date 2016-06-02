import React from 'react';
import SideNav from './layout/SideNav';
import Home from './Home';

class App extends React.Component {
  render() {
    return (
      <div className="wrapper">
          <SideNav />
          <section className="main-panel">
              {this.props.children || <Home />}
          </section>
      </div>
    )
  }
}

export default App;
