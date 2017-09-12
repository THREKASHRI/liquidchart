import React from 'react'
const {hashHistory} = require('react-router');
import {Icon, Button, Segment, Grid, Label, Message, Card} from 'semantic-ui-react'
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import ModalComponent from './ModalComponent.jsx';
import {Scrollbars} from 'react-custom-scrollbars';
import _ from 'lodash'
class Component3 extends React.Component {
  constructor() {
    super();
    this.state = {
      scenarioName: '',
      scenarioDescription: ''
    }
  }

  render() {
    var context = this;//console.log('domainnameeeeee '+this.props.loginid," ",this.props.status);
    let cards = context.props.result.map((item,index)=>{
       //console.log(item.name+".................."+item.status);
      return (<ModalComponent scenarioName={item.scenarioName} scenarioId={item.scenarioId} scenarioDescription={item.scenarioDescription} video={item.video} name={item.name} status={item.status} domainName={context.props.domainName} loginid={item.loginid}/>

      );
    });
    return (
      <Scrollbars renderTrackHorizontal={props => <div {...props} className="track-horizontal" style={{
        display: 'none',
        position: 'right',
        backgroundColor: '#5a5151',
        paddingLeft:'20%'
      }}/>} autoHide autoHeight autoHeightMin={250}>
  <Card.Group itemsPerRow={3}>
      {cards}
    </Card.Group>
      </Scrollbars>

    )
  }
}



module.exports = Component3
