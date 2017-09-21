import React from 'react';
import ReactDOM from 'react-dom';
import {Dropdown} from 'semantic-ui-react';
import {Button, Segment,Dimmer,Header,Icon} from 'semantic-ui-react';
const {hashHistory} = require('react-router');
import { DefaultPlayer as Video } from 'react-html5video';
import '../../../node_modules/react-html5video/dist/styles.css';
import VideoComponent from './videoComponent';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
var descriptionWidth={
  width:'80%'
}
class childComponent extends React.Component {
  constructor() {
    super();
    this.redirectToDnd = this.redirectToDnd.bind(this);
    this.watchscenarioVideo = this.watchscenarioVideo.bind(this);
  }
  state = {}
  handleOpen = () => this.setState({ active: true })
  handleClose = () => this.setState({ active: false })
  redirectToDnd() {//console.log('redirecting to dndddddddddd');
/*  let socket = io();
  socket.emit('userScenarioStatus', {
    scenarioName: this.props.scenarioName,
    userId:cookies.get('empId'),
    userName:cookies.get('username'),
    domainName:this.props.domainName,
    status:'inprogress',
    teamName:cookies.get('teamName'),
    score:this.state.score
  });*///console.log('emiting data',this.props.domainName);
  // let socket = io();
  // socket.emit('userScenarioStatus', {
  //   scenarioName: this.props.scenarioName,
  //   userId:cookies.get('empId'),
  //   domainName:this.props.domainName,
  //   status:'inprogress',
  //   teamName:cookies.get('teamName'),
  //   score:this.state.score
  // });//console.log('emiting data',this.props.domainName);
  console.log("in button component ",this.props.scenarioId);
  $.ajax({
    url:"/users/currentScenario",
    type:'PUT',
    data:{empId:cookies.get('empId'),
    scenarioId:this.props.scenarioId,
    scenarioName:this.props.scenarioName,
    domainName:this.props.domainName,
    loginId:cookies.get('loginId'),
    userName: cookies.get('username'),
    userType: cookies.get('userType')
  },
  success: function(data)
  {
    //console.log("success"+data);
  }.bind(this),
  error: function(err)
  {
    //console.log('error occurred on AJAX');
  }.bind(this)
});
hashHistory.push('/dnd');
// hashHistory.push('/Container?id=' + this.props.scenarioId);
}
watchscenarioVideo(){
  hashHistory.push('/watchscenarioVideo');
}

render() {

  const { active } = this.state
  var buttonclr = '';
  if(this.props.buttonStatus == 'Completed'){
    buttonclr = (<Button style={{marginTop:"-24%", marginRight:"5px",background:'linear-gradient(to bottom, #61acc9, #0a548d)'}} disabled floated='right' scenarioId = {this.props.scenarioId} scenarioName={this.props.scenarioName} scenarioDescription = {this.props.scenarioDescription} onClick={this.redirectToDnd} color='green'>Completed</Button>);
  } else if(this.props.buttonStatus == 'wip'){
    if(cookies.get('loginId') == this.props.loginid){

    buttonclr = (<Button style={{marginTop:"-24%", marginRight:"5px",background:'linear-gradient(to bottom, #61acc9, #0a548d)'}} floated='right' scenarioId = {this.props.scenarioId} scenarioName={this.props.scenarioName} scenarioDescription = {this.props.scenarioDescription} onClick={this.redirectToDnd} color='green'>Proceed<Icon name='right chevron'/></Button>);
  }else{

      buttonclr = (<Button style={{marginTop:"-24%", marginRight:"5px",background:'linear-gradient(to bottom, #61acc9, #0a548d)'}} disabled floated='right' scenarioId = {this.props.scenarioId} scenarioName={this.props.scenarioName} scenarioDescription = {this.props.scenarioDescription} onClick={this.redirectToDnd} color='green'>Work in progress</Button>);
  }
}else{

    buttonclr = (<Button style={{marginTop:"-24%", marginRight:"5px",background:'linear-gradient(to bottom, #61acc9, #0a548d)'}} floated='right' scenarioId = {this.props.scenarioId} scenarioName={this.props.scenarioName} scenarioDescription = {this.props.scenarioDescription} onClick={this.redirectToDnd} color='green'>Proceed<Icon name='right chevron'/></Button>);
}
  // <Button primary floated='right'>
  //     Proceed <Icon name='right chevron' />
  //   </Button>
  return (
    <div floated='right'>
      {buttonclr}
    </div>
  );
}
}

module.exports = childComponent;
