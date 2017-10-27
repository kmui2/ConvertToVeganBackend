import React, { Component } from 'react';
import Nbr from './Nbr.js';
import Footer from './Footer.js';
import Container from './Container.js';
import Form from './Form.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Nbr />
      <Form />
      <Container />
      <Footer />
    </div>
    );
  }
}

export default App;
