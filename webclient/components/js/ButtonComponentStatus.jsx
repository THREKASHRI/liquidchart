import React from 'react';
import ReactDOM from 'react-dom';
import {Dropdown} from 'semantic-ui-react';
import {Button, Segment,Dimmer,Header,Icon} from 'semantic-ui-react';
const {hashHistory} = require('react-router');
import ButtonComponent from './ButtonComponent.jsx';
import { DefaultPlayer as Video } from 'react-html5video';
import '../../../node_modules/react-html5video/dist/styles.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
var descriptionWidth={
  width:'80%'
}
class childComponent extends React.Component {
  constructor() {
    super();
  }

  render() {//console.log('the domainnamedeee'+this.props.loginid);
  let scenarioId = this.props.scenarioId;
  let buttonValues = "";
  let context = this;
  let scenarioArray = this.props.buttonStatus;
  let idvalue = ""+scenarioId;
  let domainName = this.props.domainName;
  if(this.props.status == 'Completed'){
    buttonValues = <ButtonComponent scenarioId = {context.props.scenarioId} scenarioName={context.props.scenarioName} scenarioDescription = {context.props.scenarioDescription} video = {context.props.video} buttonStatus = 'Completed' domainName={this.props.domainName} loginid={this.props.loginid} />
  }else if(this.props.status == 'wip'){
    buttonValues = <ButtonComponent scenarioId = {this.props.scenarioId} scenarioName={context.props.scenarioName} scenarioDescription = {this.props.scenarioDescription} video = {this.props.video} buttonStatus ='wip' domainName={this.props.domainName} loginid={this.props.loginid}/>
  }else{
      buttonValues = <ButtonComponent scenarioId = {this.props.scenarioId} scenarioName={context.props.scenarioName} scenarioDescription = {this.props.scenarioDescription} video = {this.props.video} buttonStatus ='notstarted' domainName={this.props.domainName} loginid={this.props.loginid}/>
  }
  return (
    <div>
      {buttonValues}
    </div>
  );
}
}

module.exports = childComponent;
