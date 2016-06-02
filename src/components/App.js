import React from 'react';
import SideNav from './layout/SideNav';
import Dashboard from './Dashboard';

class App extends React.Component {
  render() {
    return (
      <div className="wrapper">
          <SideNav />
          <section className="main-panel">
              {this.props.children || <Dashboard />}
          </section>
      </div>
    )
  }
}

export default App;
