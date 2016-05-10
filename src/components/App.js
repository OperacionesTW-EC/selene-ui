import React from 'react';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Home from './Home';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <section>
            {this.props.children || <Home/>}
        </section>
        <Footer />
      </div>
    )
  }
}

export default App;
