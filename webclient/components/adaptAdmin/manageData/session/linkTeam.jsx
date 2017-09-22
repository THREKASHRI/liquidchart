import React from 'react';
import {Form, Grid, Button, Divider, Dropdown} from 'semantic-ui-react';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
export default class LinkScenario extends React.Component {
  constructor() {
    super();
    this.state = {
      domain: [],
      scenario: [],
      searchQueryDomain: '',
      searchQueryScenario: [],
      domainNameandDescription: [],
      selectedAccount: []
    };
    this.AddDomainScenarioLink = this.AddDomainScenarioLink.bind(this);
    this.checkForSuccessAlert = this.checkForSuccessAlert.bind(this);
  }
  componentWillMount() {
    this.getDomainAndScenario();
  }
  getDomainAndScenario() {
    let domainArray = [];
    let domainNameandDescriptionArr = [];
    $.ajax({
      url: '/admin/sessionNameswithFlag',
      type: 'GET',
      success: function(data) {
          // console.log("session ",data);
        for (let i in data) {
          domainArray.push({key: data[i], value: data[i], text: data[i]});
        }
        this.setState({domain: domainArray});
      }.bind(this),
      error: function(err) {
      }.bind(this)
    });
    let scenarioArray = [];
    $.ajax({
      url: '/admin/getAllTeamstoLink',
      type: 'GET',
      success: function(data) {
        // console.log("dkjhcedw ",data);
        for (let i in data) {
          if (i !== null) {
            for(let i in data){
              // console.log("data ",);
              scenarioArray.push({key: data[i]._fields[0].properties.name, value: data[i]._fields[0].properties.name, text: data[i]._fields[0].properties.name});
            }
            // console.log("in if ",data._filelds);
            // scenarioArray.push({key: key.properties.name, value: key.properties.name, text: key.properties.name});
          }
        }
        this.setState({scenario: scenarioArray}, function() {
        });
      }.bind(this),
      error: function(err) {
      }.bind(this)
    });
  }
  updatesearchQueryDomain(e, a) {
    let res = a.value;
    let context = this;
    console.log("c ",res,'d ',a.value);
    // let arr = Object.keys(res).map(function(key) {
    //   return res[key];
    // });
    context.setState({searchQueryDomain: res});
    // console.log("in sesson ",this.state.searchQueryDomain);
  }
  updatesearchQueryScenario(e, a) {
    let res = a.value;
    let context = this;
    context.setState({searchQueryScenarios: res, selectedAccount: res}, function() {
    });
  }
  checkForSuccessAlert() {
    this.refs.asd.success(
      'User story linked successfully',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }
  AddDomainScenarioLink(){
    let context = this;
    let scenarios = this.state.searchQueryScenarios;
    let data = {
      TeamName: scenarios,
      sessionName: this.state.searchQueryDomain
    };
    // console.log("dc ",data);
    $.ajax({
      url: '/admin/linkTeam',
      type: 'POST',
      traditional: true,
      data: data,
      success: function(data) {
        // alert('sucess');
        context.checkForSuccessAlert();
        context.setState({domain: [], searchQueryDomain: '', searchQueryScenarios: []}, function() {
        });
        context.setState({scenario: [], selectedAccount: []});
        context.getDomainAndScenario();
      }.bind(this),
      error: function(err) {
        this.setState({searchQueryDomain: ''});
        this.setState({searchQueryScenarios: []});
      }.bind(this)
    });
  }
  render() {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}/>
            <Grid.Column width={14}>
              <p style={{fontSize: '14px', fontFamily: 'arial'}}><b>Add session-team Link</b></p>
              <Form>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Session</p>
                  </label>
                  <Dropdown onChange={this.updatesearchQueryDomain.bind(this)} placeholder='Select the Session to be modified' fluid search selection options={this.state.domain} required/>
                </Form.Field>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Team</p>
                  </label>
                  <Dropdown onChange={this.updatesearchQueryScenario.bind(this)} value={this.state.selectedAccount} placeholder='Select Team to be linked to Session' fluid multiple search selection options={this.state.scenario} required/>
                </Form.Field>
              </Form>
              <Grid.Column width={8}>
                <Button style={{marginTop: '10px'}} color='green' fluid onClick={this.AddDomainScenarioLink}>Add</Button>
              </Grid.Column>
              <Divider/>
            </Grid.Column>
            <Grid.Column width={1}/>
          </Grid.Row>
        </Grid>
        <ToastContainer ref='asd'
          toastMessageFactory={ToastMessageFactory}
          className='toast-top-center' style={{marginTop: '8%'}}/>
        </div>
      );
    }
  }
