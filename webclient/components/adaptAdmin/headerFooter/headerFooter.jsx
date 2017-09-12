import React, {Component} from 'react';
const {Link} = require('react-router');
import { Dropdown, Button, Image, Header } from 'semantic-ui-react';
import AdminHome from '../menu/menu';
import './css/headerFooter.css';

class HeaderFooter extends Component {
  constructor () {
    super();
  }
  render() {
    return (
      <div id="headerfixed">
        {/* <Header as='h3' id='adminHeader'  block></Header> */}
        <AdminHome/>
      </div>

    )
  }
}
module.exports = HeaderFooter;
