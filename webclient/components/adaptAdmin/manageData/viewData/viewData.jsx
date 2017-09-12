import React from 'react';
import {Form, Grid, Button, Icon, Divider, TextArea, Dropdown, Card} from 'semantic-ui-react';
import Axios from 'axios';
import Snackbar from 'material-ui/Snackbar';
import Sequence from './SequenceAccordion';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export default class ViewData extends React.Component {
  constructor(props) {
    super();
    this.state = {
      domain: [],
      scenarioDropdown: [],
      searchQueryDomain:'',
      searchQueryScenario:'',
      domainNameandDescription:[],
      displayScenario:[],
      compArray:[],
      correctSequence:[[]],
      precondition:[]
    }
    this.findScenarios = this.findScenarios.bind(this);
    this.getCorrectSequence = this.getCorrectSequence.bind(this);
    this.getPreConditions = this.getPreConditions.bind(this);
  };
  componentWillMount(){
    //console.log('1.compnent did mount');
    let domainArray = [];
    let sucessFlag = 0;
    let domainNameandDescriptionArr = [];

    $.ajax({
      url:"/users/findDomain",
      type:'GET',
      success: function(data)
      {
        for(let i in data) {
          if(i !== null) {
            domainArray.push({key: data[i].name, value: data[i].name, text: data[i].name});
            domainNameandDescriptionArr.push({name:data[i].name,description:data[i].description});
          }
        }
      }.bind(this),
      error: function(err)
      {
      }.bind(this)
    });
    this.setState({
      domain: domainArray
    });
  }
  findScenarios(e,a){
    this.setState({scenario: []});
    var empId = cookies.get('empId');
    let scenarioArray = [];
    let displayScenario = [];
    //console.log('3.ajax call sending'+this.state.searchQueryDomain +'and dropdownvalue'+a.value);
    $.ajax({
      url:"/users/findScenarios",
      type:'POST',
      data:{domain:a.value,empId:empId},
      success: function(data)
      {
        for(let i in data) {
          if(i !== null) {
            scenarioArray.push({key: data[i].scenarioName, value: data[i].scenarioName, text: data[i].scenarioName});
            displayScenario.push({name:data[i].scenarioName,sequence:data[i].sequence,description:data[i].scenarioDescription});
          }
        }
        this.setState({scenarioDropdown: scenarioArray});
        this.setState({displayScenario: displayScenario});
      }.bind(this),
      error: function(err)
      {
      }.bind(this)
    });
  }
  updatesearchQueryDomain(e,a) {

    let res = a.value;
    //console.log('2.domain selected and state is '+this.state.searchQueryDomain);
    this.findScenarios(e,a);
  }

  updatesearchQueryScenario(e,a) {
    var res  = a.value;
    this.setState({
      searchQueryScenario: res
    },function(){
      this.getCorrectSequence();
    });

  }
  getCorrectSequence(){
    this.setState({
      compArray: []
    });
    let sequence = [];
    let a = [];
    let arr1 = [[]];
    if (this.state.displayScenario != undefined) {
      for(let i in this.state.displayScenario){
        if(this.state.searchQueryScenario === this.state.displayScenario[i].name){
          sequence = this.state.displayScenario[i].sequence;
          break;
        }
      }
    }
    for(let i in sequence){
      if(a != undefined){//console.log(sequence);
        a = sequence[i].split('-');
        arr1.push(a);
      }
    }
    arr1.shift();
    let components = arr1;
    let responseData = [];
    let oneArr = [];
    let corrSeq = [];
    let twoD = [[]];
    //console.log('fetching correct sequence...using data'+components.length);
    if(components.length == 1){
      oneArr.push(components[0]);
      $.ajax({
        url:"/admin/getCorrectSequence",
        type:'POST',
        data:{components:oneArr,length:1},
        traditional: true,
        success: function(data)
        {
          for(let i in data){
            corrSeq.push(data[i]);
          }
          //console.log('now ond array'+corrSeq);
          twoD.push(corrSeq);
          //console.log('2d  array'+twoD);
          this.setState({
            correctSequence: twoD
          });
        }.bind(this),
        error: function(err)
        {
        }.bind(this)
      });
    }
    else{
      $.ajax({
        url:"/admin/getCorrectSequence",
        type:'POST',
        data:{components:components,length:components.length},
        traditional: true,
        success: function(data)
        {
          for(let i in data){
            //console.log('succcessssssssss'+JSON.stringify(data[i]));
            this.setState({
              compArray: data[i]
            });
          }
          let dataArray = [];
          dataArray = this.state.compArray;
          //console.log('the dataArray'+dataArray);
          let tempArray = [];
          let finalArray = [[]];
          let m = 0;
          for(let i = 0; i < components.length && components != undefined ; i++){
            tempArray = [];
            for(let j = 0; j < components[i].length && components[i] != undefined  ; j++){
              tempArray[j] = dataArray[m];
              m++;
              //console.log('2.item Array length  '+tempArray.length+'m value'+m);
            }
            if(tempArray != undefined && tempArray != ''){
              finalArray.push(tempArray);
            }
            //console.log('3.the final array'+JSON.stringify(finalArray));
          }
          this.setState({
            correctSequence: finalArray
          });
        }.bind(this),
        error: function(err)
        {
        }.bind(this)
      });
    }
    this.getPreConditions();
  }
  getPreConditions(){
    let context = this;
    $.ajax({
      url:"/users/findScenarioData",
      type:'POST',
      data:{scenario : this.state.searchQueryScenario},
      success: function(dataDB)
      {
        var data = dataDB.records[0]._fields[0].properties;
        context.setState({precondition:data.precondition});
      }.bind(this),
      error: function(err)
      {
        //console.log('error occurred on AJAX');
      }.bind(this)
    });
  }
  render() {
    let Name = '';
    if(this.state.searchQueryScenario != '') {
      Name = (<div>{this.state.searchQueryScenario}</div>);
    }
    let dependencies = '';
    if(this.state.precondition != '') {
      dependencies = (<div>Dependency</div>);
    }
    let dependenciesvalues = '';
    let bb = <p style={{textAlign:"center",fontWeight:'bold'}}>No dependencies</p>;
    bb = this.state.precondition.map((item)=>{
      return <b><li style={{marginLeft:'7%'}}>{item}</li></b>
    });
    let description = '';
    let displayScenario = '';
    if (this.state.searchQueryScenario != undefined) {
      for(let i in this.state.displayScenario){
        if(this.state.searchQueryScenario === this.state.displayScenario[i].name){
          description = this.state.displayScenario[i].description;
          displayScenario = (<div><p><strong>Description</strong></p>{description}</div>);
          break;
        }
      }
    }
    let j = 0;
    let sequence = '';
    let displaySequence = '';
    let a = [];
    let arr = [[]];
    if (this.state.displayScenario != undefined) {
      for(let i in this.state.displayScenario){
        if(this.state.searchQueryScenario === this.state.displayScenario[i].name){
          sequence = this.state.displayScenario[i].sequence;
          displaySequence = (<div>{sequence}</div>);
          break;
        }
      }
    }
    let cardItems = '';
    for(let i in this.state.correctSequence){
      if(this.state.correctSequence[i] != '') {
        cardItems = (<Card.Group items={this.state.correctSequence[i]}/>);
      }
    }
    return (
      <div>
        <Grid style={{marginLeft:'5%'}}>
          <Grid.Row>
            <Grid.Column width={6}>
              <div style={{fontSize:"16px",fontFamily:"arial",marginBottom:"10px"}}><b>View Data</b></div>
              <Form>
                <Form.Field>
                  <label>
                    <p style={{fontSize:"14px",fontFamily:"arial"}}>Select customer journey</p>
                  </label>
                  <Dropdown onChange={this.updatesearchQueryDomain.bind(this)} placeholder='Select the Customer journey to be modified'  fluid search selection options={this.state.domain}/>
                </Form.Field>
                <Form.Field>
                  <label>
                    <p style={{fontSize:"14px",fontFamily:"arial"}}>Select user story</p>
                  </label>
                  <Dropdown onChange={this.updatesearchQueryScenario.bind(this)} placeholder='Select User story to view data'  fluid search selection options={this.state.scenarioDropdown}/>
                </Form.Field>
              </Form>
              <Grid.Column width={2}>
              </Grid.Column>

            </Grid.Column>
            <Grid.Column width={1}/>
            <Grid.Column width={6}>
              <h3 style={{marginLeft:'20%'}}  style={{fontSize:"16px",fontFamily:"arial"}}><b>{Name}</b></h3>
              <Sequence correctSequence = {this.state.correctSequence}/>
              <h3 style={{marginLeft:'20%'}}  style={{fontSize:"16px",fontFamily:"arial",marginBottom:'2%'}}><b>{dependencies}</b></h3>
              {bb}
            </Grid.Column>
            <Grid.Column width={1}/>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
module.exports = ViewData;
