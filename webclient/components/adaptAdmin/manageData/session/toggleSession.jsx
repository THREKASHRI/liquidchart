import React from 'react';
import {Form, Grid, Button, Divider, Dropdown} from 'semantic-ui-react';
export default class HideDomain extends React.Component {
  constructor() {
    super();
    this.state = {
      domainArray: [],
      domainSelected: '',
      flagStatus: [],
      currentFlag: '',
      displayDomain: '',
      selectedAccount: []
    };
    this.toggleDomain = this.toggleDomain.bind(this);
  }
  //   Loading all the Customer journeys from database
  componentWillMount() {
    this.getAllSession();
  }
  getAllSession(){
    let context = this;
    let arr = [];
    let domains = [];
    let status = [];
    $.ajax({
      url: '/admin/sessionDetails',
      type: 'GET',
      success: function(data) {
          // console.log("session ",data);
          for (let i in data) {
            if (i !== null) {
              let ss= data.records;
              // console.log("gvc ",ss[0]._fields[0].properties.flag.low);
              for (var i = 0; i < ss.length; i++) {
                domains.push({key: ss[i]._fields[0].properties.name, value: ss[i]._fields[0].properties.name, text: ss[i]._fields[0].properties.name});
              }
              for (let j = 0; j < ss.length; j = j + 1) {
                // console.log("dsvs",ss[j]._fields[0]);
                    status.push({name: ss[j]._fields[0].properties.name, flag: ss[j]._fields[0].properties.flag.low});
                  }
            }
          }
        this.setState({domainArray: domains,flagStatus: status});
      }.bind(this),
      error: function(err) {
      }.bind(this)
    });
  }
  //   Archiving user selected customer journey
  updatesearchQueryDomain(e, a) {
    let res = a.value;
    this.setState({displayDomain: res});
    this.setState({domainSelected: res,selectedAccount:res}, function() {
      for(let i in this.state.flagStatus) {
        if(this.state.domainSelected == this.state.flagStatus[i].name) {
          let selectedDomainFlag = this.state.flagStatus[i].flag;
          if(selectedDomainFlag == 1) {
            this.setState({currentFlag: 'Enabled'});
            break;
          }
          else if(selectedDomainFlag == 0) {
            this.setState({currentFlag: 'Disabled'});
            break;
          }
        }
      }
    });
  }
  //   Identifying the customer journey that the user has selected
  toggleDomain() {
    let context = this;
    let name = this.state.domainSelected;
    let flag = 0;
    if(this.state.currentFlag == 'Enabled') {
      flag = 0;
      context.setState({currentFlag: 'Disabled'});
    }
    else if(this.state.currentFlag == 'Disabled') {
      flag = 1;
      context.setState({currentFlag: 'Enabled'});
    }
    $.ajax({
      url: '/admin/toggleSession',
      type: 'POST',
      data: {name: name, flag: flag},
      success: function(res) {
        context.setState({flagStatus: []});
        context.setState({domainSelected: ''});
        context.setState({selectedAccount: []});
        context.setState({currentFlag: ''});
        context.getAllSession();
      },
      error: function(err) {
      }
    });
  }
  render() {
    let FlagStatus = '';
    let statusFlag = '';
    if(this.state.currentFlag != '' && this.state.displayDomain != '') {
      FlagStatus = (<div><p style={{fontSize: '12px', fontFamily: 'arial'}}><strong>{this.state.displayDomain} : {this.state.currentFlag}</strong></p></div>);
      if(this.state.currentFlag == 'Enabled') {
        statusFlag = 'Disable';
      } else if(this.state.currentFlag == 'Disabled') {
        statusFlag = 'Enable';
      }
    }
    else{
      FlagStatus = '';
    }

    console.log("dddc",statusFlag, "edw",this.state.currentFlag);
    //   UI of Archieve customer journey
    return(
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}/>
            <Grid.Column width={14}>
              <p style={{fontSize: '16px', fontFamily: 'arial'}}><b>Enable or Disable Session</b></p>
              <Form>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Select Session</p>
                  </label>
                  <Dropdown fluid onChange={this.updatesearchQueryDomain.bind(this)} value={this.state.selectedAccount} placeholder='Select the Domain to be changed' fluid search selection options={this.state.domainArray} required/>
                </Form.Field>
                {FlagStatus}
                <p style={{fontSize: '12px', fontFamily: 'arial'}}>Press Toggle to enable/disable a Session</p>
              </Form>
              {(this.state.currentFlag == '' ) ? <Grid.Column width={1}><Button style={{marginTop: '10px'}} fluid color='green'  onClick={this.toggleDomain}>Toggle</Button></Grid.Column>:
              <Grid.Column width={1}><Button style={{marginTop:'10px'}} fluid color='green'  onClick={this.toggleDomain}>{statusFlag}</Button></Grid.Column>}
              <Divider/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
