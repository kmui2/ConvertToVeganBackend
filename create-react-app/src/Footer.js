import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <div class="footer">This footer will always be positioned at the bottom of the page, but <strong>not fixed</strong>.</div>
      </div>
    )
  }
}

export default Footer;