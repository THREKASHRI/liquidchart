import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Segment, Grid} from 'semantic-ui-react';
import {DefaultPlayer as Video} from 'react-html5video';
import '../../../node_modules/react-html5video/dist/styles.css';

class VideoComponent extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <segment>
        <div className='checking'>
          <iframe width="400" id="videoSize" src={this.props.video} frameBorder="0" allowFullScreen></iframe>
        </div>
      </segment>
    );
  }
}

module.exports = VideoComponent;
