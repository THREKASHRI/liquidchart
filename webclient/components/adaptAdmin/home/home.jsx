import React from 'react';
import {Image, Icon, Divider, Grid,Container} from 'semantic-ui-react';
import Menu from '../menu/menu';
import Axios from 'axios';
import './homestyle.css';
export default class AdminHome extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Grid celled='internally'>
        <Grid.Row>
          <Grid.Column width={16}>
            <h3>About Wipro Digital</h3>
            <p>Wipro Limited (Western India Palm Refined Oils Limited or more recently, Western India Products Limited) is an Indian Information Technology Services corporation headquartered in Bengaluru, India.
              In 2013, Wipro demerged its non-IT businesses into separate companies to bring in more focus on independent businesses.We are a mix of strategists, creative directors, designers, writers, media strategists, digital marketers, developers and relationship builders.
              We’re committed to creating vibrant and relevant brand experiences on every level. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>



    )

  }
}
module.exports = AdminHome;
