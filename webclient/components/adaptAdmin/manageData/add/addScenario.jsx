import React from 'react';
import {Form, Grid, Button, Icon, Divider, TextArea, Dropdown} from 'semantic-ui-react';
import Axios from 'axios';
import Snackbar from 'material-ui/Snackbar';
import LogicalComponent from './AddScenarioComponent/LogicalComponent';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
export default class AddScenario extends React.Component {
  constructor(props) {
    super();
    this.state = {
      scenario:[],
      correctSequence:[],
      selectedScenarios:[],
      selectedAccount: [],
      selectedGivenScenarios:[],
      selectedGivenAccount:[]
    };
    this.getAllScenarios = this.getAllScenarios.bind(this);
    this.getId = this.getId.bind(this);
    this.supportChange = this.supportChange.bind(this);
    this.validateData = this.validateData.bind(this);
    this.addNewScenario = this.addNewScenario.bind(this);
    this.updatesearchQueryScenario = this.updatesearchQueryScenario.bind(this);
    this.checkForEmptyAlert = this.checkForEmptyAlert.bind(this);
    this.checkForonlyAlphabetsForNameAlert = this.checkForonlyAlphabetsForNameAlert.bind(this);
    this.checkForaddedNewScenarioAlert = this.checkForaddedNewScenarioAlert.bind(this);
  };
  checkForEmptyAlert() {
    //console.log("inside check for Empty alert");
    let context = this;
    this.refs.asd.error(
      'Please fill all the fields',
      '', {
      timeOut: 3000,
      extendedTimeOut: 3000
    }
  );
  }
  checkForonlyAlphabetsForNameAlert() {
    //console.log("inside check for only alphabets for name alert");
    let context = this;
    this.refs.asd.error(
      'Only alphabets allowed in Employee name',
      '', {
      timeOut: 3000,
      extendedTimeOut: 3000
    }
  );
  }
  checkForaddedNewScenarioAlert() {
    //console.log("inside check for added new scenario alert");
    let context = this;
    this.refs.asd.success(
      'New user story added successfully',
      '', {
      timeOut: 3000,
      extendedTimeOut: 3000
    }
  );
  }
  getId(id) {
    //console.log("id in parent comp",id);
    let dataInState = this.state.correctSequence;
    let x = dataInState+id+'-';
    this.setState({correctSequence:x});
  }
  getAllScenarios() {
    let context = this;
    let scenarioArray = [];
    $.ajax({
      url: '/component/getAllScenarios',
      type: 'GET',
      success: function(data) {
        //console.log('in ajax of scenario ' + data);
        for (let i in data) {
          if (i !== null) {
            scenarioArray.push({key: data[i].scenarioName, value: data[i].scenarioName, text: data[i].scenarioName});
          }
        }
        context.setState({scenario: scenarioArray});
      },
      error: function(err) {
        //console.log('error is ',err);
      }
    });
  }

  componentDidMount(){
    this.getAllScenarios();
  }
  supportChange(e){
    this.setState({correctSequence:e.target.value});
  }

  validateData(e) {
    e.preventDefault();
    let scenarioName = this.refs.scenarioName.value;
    let probStmt =this.refs.probStmt.value;
    let crctSeq =this.state.correctSequence;
    let outputValue =this.refs.outputValue.value;
    let evalFunc =this.refs.evalFunc.value;
    let code = this.refs.code.value;
    let video = this.refs.video.value;
    let score = this.refs.score.value;
    let negScore = this.refs.negScore.value;
    let preconditions = this.state.selectedScenarios;
    let givenpreconditions = this.state.selectedGivenScenarios;
    var letters = /^[a-zA-Z]+$/;
    if(this.refs.negScore.value > 0){
      negScore = this.refs.negScore.value * (-1);
    }
    if(scenarioName === '' || probStmt ==='' || outputValue ==='' || evalFunc ==='' || code ==='' || video ==='' || score ==='' || negScore ===''){
      // alert('Empty fields');
      this.checkForEmptyAlert();
    }
      this.addNewScenario(scenarioName, probStmt, crctSeq, outputValue, evalFunc, code, video, score, negScore, preconditions, givenpreconditions);

  }

  addNewScenario(scenarioName, probStmt, crctSeq, outputValue, evalFunc, code, video, score, negScore, preconditions, givenpreconditions){
    let context = this;
    //console.log('b4 ajax', preconditions);
    let aaa=JSON.stringify(this.state.selectedScenarios);
    let bbb=JSON.stringify(this.state.selectedGivenScenarios);
    $.ajax({
      url:"/component/addNewScenario",
      type: 'POST',
      data:{scenarioName: scenarioName, probStmt: probStmt, crctSeq: crctSeq, outputValue: outputValue, evalFunc: evalFunc, code: code, video:video, score:score, negScore:negScore, aaa:aaa, bbb:bbb},
      success: function(response)
      {
        // alert("added new scenario");
        context.checkForaddedNewScenarioAlert();
        //console.log('added successfully ',response);
        this.refs.scenarioName.value = '';
        this.refs.probStmt.value = '';
        context.setState({correctSequence: ''});
        context.setState({selectedAccount: []});
        context.setState({selectedGivenAccount: []});
        this.refs.outputValue.value = '';
        this.refs.evalFunc.value = '';
        this.refs.code.value = '';
        this.refs.video.value = '';
        this.refs.score.value = '';
        this.refs.negScore.value = '';
        this.state.selectedScenarios = [];
        context.getAllScenarios();
      }.bind(this),
      error: function(err)
      {
        //console.log('error occurred on AJAX');
      }.bind(this)
    });
  }
  updatesearchQueryScenario(e, a) {
    var res = a.value;
    //console.log("value is: ",a);
    //console.log(res);
      var arr = Object.keys(res).map(function(key) {
      return res[key];
    });
    //console.log('typeof ' + typeof arr);
    //console.log('The arr in precondition is: ',arr);
    this.setState({selectedScenarios: arr,selectedAccount:arr});
  }
  updatesearchQueryGivenScenario(e, a) {
    var res = a.value;
    //console.log("value is: ",a);
    //console.log(res);
      var arr = Object.keys(res).map(function(key) {
      return res[key];
    });
    //console.log('typeof ' + typeof arr);
    //console.log('The arr in precondition is: ',arr);
    this.setState({selectedGivenScenarios: arr,selectedGivenAccount:arr});
  }
  render() {
    //console.log('in add Scenario');
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={1}></Grid.Column>
          <Grid.Column width={14}>
            <p style={{fontSize:"16px",fontFamily:"arial"}}><b>Add new user story</b></p>
            <Form>
              <Form.Field>
                <label>
                  <p style={{fontSize:"14px",fontFamily:"arial"}}>Name</p>
                </label>
                <input autoComplete='off' type='text' ref='scenarioName' placeholder='Name' required/>
              </Form.Field>
              <Form.Field>
                <label>
                  <p style={{fontSize:"14px",fontFamily:"arial"}}>Problem statement</p>
                  <textarea ref='probStmt' placeholder='Problem Statement' required/>
                </label>
              </Form.Field>
              {/* <Form.Field>
                <label>
                <p style={{fontSize:"14px",fontFamily:"arial"}}>Correct Sequence</p>
              </label>
              <input autoComplete='off' type='text' ref='crctSeq' required placeholder='correct sequence' value={this.state.correctSequence} onChange={this.supportChange}/>
            </Form.Field> */}
            <Form.Field>
              <label>
                <p style={{fontSize:"14px",fontFamily:"arial"}}>Output</p>
              </label>
              <input autoComplete='off' type='text' ref='outputValue' required placeholder='output' required/>
            </Form.Field>
            <Form.Field>
              <label>
                <p style={{fontSize:"14px",fontFamily:"arial"}}>Eval function</p>
              </label>
              <input autoComplete='off' type='text' ref='evalFunc' required placeholder='eval func' required/>
            </Form.Field>
            <Form.Field>
              <label>
                <p style={{fontSize:"14px",fontFamily:"arial"}}>Actual Dependencies</p>
              </label>
              <Dropdown onChange={this.updatesearchQueryScenario.bind(this)} value={this.state.selectedAccount} placeholder='Select pre conditions' fluid multiple search selection options={this.state.scenario} required/>
            </Form.Field>
            <Form.Field>
              <label>
                <p style={{fontSize:"14px",fontFamily:"arial"}}>Given Dependencies</p>
              </label>
              <Dropdown onChange={this.updatesearchQueryGivenScenario.bind(this)} value={this.state.selectedGivenAccount} placeholder='Select pre conditions' fluid multiple search selection options={this.state.scenario} required/>
            </Form.Field>
            <Form.Field>
              <label>
                <p style={{fontSize:"14px",fontFamily:"arial"}}>Code path</p>
              </label>
              <input autoComplete='off' type='text' ref='code' required placeholder='code path' required/>
            </Form.Field>
            <Form.Field>
              <label>
                <p style={{fontSize:"14px",fontFamily:"arial"}}>Video path</p>
              </label>
              <input autoComplete='off' type='text' ref='video' required placeholder='video path' required/>
            </Form.Field>
            <Form.Field>
              <label>
                <p style={{fontSize:"14px",fontFamily:"arial"}}>Score</p>
              </label>
              <input autoComplete='off' type='number' ref='score' required placeholder='score' required/>
            </Form.Field>
            <Form.Field>
              <label>
                <p style={{fontSize:"14px",fontFamily:"arial"}}>Negative score</p>
              </label>
              <input autoComplete='off' type='number' ref='negScore' required placeholder='Negative score' required/>
            </Form.Field>
          </Form>

          <Grid.Column width={8}><Button style={{marginTop:"10px"}} fluid color='green'  onClick={this.validateData}>Add</Button></Grid.Column>
          <Divider/>
        </Grid.Column>

      </Grid.Row>
    </Grid>
    <ToastContainer ref='asd'
      toastMessageFactory={ToastMessageFactory}
      className='toast-top-center' style={{marginTop:'8%'}}/>
  </div>
);
}
}
