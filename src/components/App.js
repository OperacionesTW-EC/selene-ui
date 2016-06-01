import React from 'react';
import SideNav from './layout/SideNav';
// import Navbar from './layout/Navbar';
import Home from './Home';

class App extends React.Component {
  render() {
    return (
      <div className="wrapper">
          <SideNav />
          <section className="main-panel">
              {/*<Navbar />*/}
              {this.props.children || <Home/>}
          </section>
      </div>
    )
  }
}

export default App;
