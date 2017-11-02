import React, { Component } from 'react';
import './Nav.css';

class Nav extends Component {
      render() {
        return (
          <div className="Nav">
            <ul class="topnav">
              <li><a class="active" href="#home">Home</a></li>
              <li><a href="#news">News</a></li>
              <li><a href="#contact">Contact</a></li>
              <li class="right"><a href="#about">About</a></li>
            </ul>
          </div>
        );
      }
}

export default Nav;