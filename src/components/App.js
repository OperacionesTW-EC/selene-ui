import React from 'react';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <section className="container-fluid">
        </section>
        <Footer />
      </div>
    )
  }
};

export default App;
