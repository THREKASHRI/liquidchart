import React from 'react';
import {
  Form,
  Grid,
  Button,
  Icon,
  Divider,
  TextArea,
  Dropdown
} from 'semantic-ui-react';
import Axios from 'axios';
import Snackbar from 'material-ui/Snackbar';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
export default class LinkScenario extends React.Component {
  constructor(props) {
    super();
    this.state = {
      domain: [],
      scenario: [],
      searchQueryDomain: '',
      searchQueryScenario: [],
      domainNameandDescription: [],
      selectedAccount: []
    }
    this.DeleteDomainScenarioLink = this.DeleteDomainScenarioLink.bind(this);
    this.checkForSuccessAlert = this.checkForSuccessAlert.bind(this);
  };
  componentWillMount() {
    this.getDomainAndScenario();
  }
  checkForSuccessAlert() {
    //console.log("inside check for Success alert");
    let context = this;
    this.refs.asd.success(
      'User story delinked successfully',
      '', {
      timeOut: 3000,
      extendedTimeOut: 3000
    }
  );
  }
    getDomainAndScenario(){
    let domainArray = [];
    let sucessFlag = 0;
    let domainNameandDescriptionArr = [];
    //console.log("domain ");
    $.ajax({
      url: "/users/findDomain",
      type: 'GET',
      success: function(data) {
        for (let i in data) {
          //console.log(data[i]);
          if (i !== null) {
            domainArray.push({key: data[i].name, value: data[i].name, text: data[i].name});
            domainNameandDescriptionArr.push({name: data[i].name, description: data[i].description});
          }
        }
        this.setState({domain: domainArray});
        this.setState({domainNameandDescription: domainNameandDescriptionArr});

      }.bind(this),
      error: function(err) {
        //console.log('error occurred on AJAX');
      }.bind(this)
    });
  }
  updatesearchQueryDomain(e, a) {
    //console.log("e value: ",e);
    let res = a.value;
    let scenarioArray = [];
    //console.log("value of domain",res);
    this.setState({searchQueryDomain: res});
    $.ajax({
      url: "/admin/findDelinkScenario",
      type: 'POST',
      data:{
        domain:res
      },
      success: function(data) {
        //console.log('in ajax of scenario ' + data);
        for (let i in data) {
          if (i !== null) {
            scenarioArray.push({key: data[i].scenarioId, value: data[i].scenarioId, text: data[i].scenarioName});
          }
        }
        this.setState({scenario: scenarioArray});
      }.bind(this),
      error: function(err) {
        //console.log('error occurred on AJAX');
      }.bind(this)
    });
  }
  updatesearchQueryScenario(e, a) {
    var res = a.value;
    var arr = Object.keys(res).map(function(key) {
      return res[key];
    });
    //console.log('typeof ' + typeof arr);
    this.setState({searchQueryScenarios: arr,selectedAccount: arr});
  }
  DeleteDomainScenarioLink() {
    let description = '';
    let context = this;
    let scenarios = this.state.searchQueryScenarios;
    for (let i in this.state.domainNameandDescription) {
      if (this.state.searchQueryDomain === this.state.domainNameandDescription[i].name) {
        description = this.state.domainNameandDescription[i].description;
        break;
      }
    }
    var a = scenarios.toStr;
    //console.log(typeof a);
    //console.log("scneario array ",scenarios);
    $.ajax({
      url: "/admin/delinkScenario",
      type: 'POST',
      traditional: true,
      data: {
        scenarioName: scenarios,
        domainName: this.state.searchQueryDomain,
        domainDescription: description
      },
      success: function(data) {
        // alert("sucess");
        context.checkForSuccessAlert();
        context.setState({domain:[]});
        context.setState({scenario:[]});
      context.getDomainAndScenario();
      }.bind(this),
      error: function(err) {
        this.setState({domainNameandDescription: []});
        this.setState({searchQueryDomain: ''});
        this.setState({searchQueryScenarios: [],selectedAccount:[]});
        //console.log('error occurred on AJAX');
      }.bind(this)
    });
  }
  render() {
    //console.log('EditDomain');
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}/>
            <Grid.Column width={14}>
              <p style={{fontSize:"16px",fontFamily:"arial"}}><b>Remove customer journey-user story Link</b></p>
              <Form>
                <Form.Field>
                  <label>
                    <p style={{fontSize:"14px",fontFamily:"arial"}}>Customer journey</p>
                  </label>
                  <Dropdown onChange={this.updatesearchQueryDomain.bind(this)} placeholder='Select the Customer journey to be modified' fluid search selection options={this.state.domain} />
                </Form.Field>
                <Form.Field>
                  <label>
                    <p style={{fontSize:"14px",fontFamily:"arial"}}>User story</p>
                  </label>
                  <Dropdown onChange={this.updatesearchQueryScenario.bind(this)} value={this.state.selectedAccount} placeholder='Select User story to be delinked to domain' fluid multiple search selection options={this.state.scenario}/>
                </Form.Field>
              </Form>

              <Grid.Column width={8}>
                <Button style={{marginTop:"10px"}} color='green' fluid onClick={this.DeleteDomainScenarioLink}>Remove</Button>
              </Grid.Column>
              <Divider/>
            </Grid.Column>
            <Grid.Column width={1}/>
          </Grid.Row>
        </Grid>
        <ToastContainer ref='asd'
          toastMessageFactory={ToastMessageFactory}
          className='toast-top-center' style={{marginTop:'8%'}}/>
      </div>
    );
  }
}
