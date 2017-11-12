import React, { Component } from 'react';
import Nav from './Nav/Nav.js';
import Footer from './Footer/Footer.js';
import Container from './Container/Container.js';
// import Form from './Form/Form.js';
import './App.css';
import './css/materialize.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
      <Nav />
      {/* <Form /> */}
      <Container />
      <Footer />
    </div>
    );
  }
}

export default App;
