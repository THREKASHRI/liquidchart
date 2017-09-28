import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactCardFlip from 'react-card-flip';
import FlipCard from 'react-flipcard';
import {
  Card,
  Icon,
  Image,
  Button,
  Popup,
  Label,
  Header,
  Dropdown
} from 'semantic-ui-react';
import Cookies from 'universal-cookie';
import Cookie from 'react-cookie';
const cookies = new Cookies();
import ComponentModal from './componentModal'
class flipCardStructure extends React.Component {
  constructor() {
    super();
    this.state = {
      domainArray: [],
      isFlipped: false,
      searchQueryScenario: '',
      searchcategory: '',
      componentModal: false,
      active1:false
    };
    this.getCorrectSequence = this.getCorrectSequence.bind(this);
this.penalty = this.penalty.bind(this);
  }
  componentWillMount() {
    this.getAllDomain();
this.scoreCheck();
  }
  handleOnFlip(flipped) {
    if (flipped) {
      this.refs.backButton.focus();
    }
  }

  handleKeyDown(e) {
    if (this.state.isFlipped && e.keyCode === 27) {
      this.showFront();
    }
  }
  showBack() {
    this.setState({isFlipped: true});
  }
    scoreCheck(){
      console.log('showback',this.props.totalteamscore);
      let seqcost = parseInt(this.props.cost);
      console.log('showback sequence',seqcost);
      if(this.props.totalteamscore < seqcost)
      {
      console.log('setstate');
      this.setState({active1:true},function(){
      console.log('active1sfvsc',this.state.active1);
      })
      }
}
  showFront() {
    this.setState({isFlipped: false});
  }

  component() {
    this.setState({componentModal: true});
this.penalty();
  }
  closeModal() {
    this.setState({componentModal: false});
  }
  updatesearchQueryDomain(e, a) {
    this.findScenarios(e, a);
  }
  getAllDomain() {
    let context = this;
    let arrOfComponent = [];
    let arrayadd = [];
    $.ajax({
      url: '/admin/getAllDomain',
      type: 'GET',
      success: function(res) {
        for (let i = 0; i < res.records.length; i = i + 1) {
          arrOfComponent.push({content: res.records[i]._fields[0].properties.name});
        }
        for (let k = 0; k < arrOfComponent.length; k = k + 1) {
          arrayadd.push({key: arrOfComponent[k].content, value: arrOfComponent[k].content, text: arrOfComponent[k].content});
        }
        context.setState({domainArray: arrayadd});
        console.log('domain', context.state.domainArray);
      },
      error: function(err) {}
    });
  }
  findScenarios(e, a) {
    let context = this;
    this.setState({scenario: []});
    let empId = cookies.get('empId');
    let scenarioArray = [];
    let displayScenario = [];
    $.ajax({
      url: '/users/findScenarios',
      type: 'POST',
      data: {
        domain: a.value,
        empId: empId
      },
      success: function(data) {
        console.log('userdata', data);
        for (let i in data) {
          if (i !== null) {
            scenarioArray.push({key: data[i].scenarioName, value: data[i].scenarioName, text: data[i].scenarioName});
            displayScenario.push({name: data[i].scenarioName, sequence: data[i].sequence, description: data[i].scenarioDescription});
          }
        }
        console.log('inside for displayScenario', displayScenario);
        context.setState({
          displayScenario: displayScenario,
          scenarioDropdown: scenarioArray
        }, function() {
          console.log('find Scenarios displayScenario', context.state.displayScenario);
          console.log('userstory sequence', context.state.scenarioDropdown);
        });

      }.bind(this),
      error: function(err) {}.bind(this)
    });
  }

  updatesearchQueryScenario(e, a) {
    let res = a.value;
    this.setState({
      searchQueryScenario: res
    }, function() {
      this.getCorrectSequence();
    });
  }
  updatesearchQueryComponent(e, a) {
    let res = a.value;
    let componentsequence = [];
// let componentsequence1 = [];
    console.log(res);
    // var arr = this.state.correctSequence.filter(function(el){
    // if(componentsequence1.indexOf(el.id) == -1){
    // componentsequence1.push(el.id);
    // }
    // });
    // console.log('array flipCardStructure',arr);
    for (let i in this.state.correctSequence) {
      console.log('aswini',this.state.correctSequence[i].category);
      if (res == this.state.correctSequence[i].category) {
        componentsequence.push(this.state.correctSequence[i].name)
console.log('aswini componentsequence',componentsequence);
      }

else if(res =='userstory'){
console.log('userstory component',res);
      componentsequence.push(this.state.correctSequence[i].name)
       }
    }
    console.log('sequence array aswini', componentsequence);
    this.setState({componentsequence: componentsequence})
  }
  getCorrectSequence() {
    console.log('in get coo sew\e');
    let context = this;
    this.setState({compArray: []});
    let sequence = [];
    let a = [];
    let arr1 = [
      []
    ];
    console.log('displayScenario', this.state.displayScenario);
    if (this.state.displayScenario != undefined) {
      for (let i in this.state.displayScenario) {
        if (this.state.searchQueryScenario === this.state.displayScenario[i].name) {
          sequence = this.state.displayScenario[i].sequence;
          break;
        }

      }
    }
    // console.log('sequence',sequence[0]);
    for (let i in sequence) {
      if (a != undefined) {
        a = sequence[i].split('-');
        arr1.push(a);
        // console.log('array',a[0]);
      }
    }
    arr1.shift();
    let components = arr1;
    let oneArr = [];
    let corrSeq = [];
    let twoD = [
      []
    ];
    let samplearr = [];
    console.log('component', components[0]);
    for (let i in components[0]) {
      if (i < 1) {
        for (let j in components[0]) {
          samplearr[j] = parseInt(components[i][j])

        }
      }
    }
    console.log('inside samoe arrfjgkhrg', samplearr);
    $.ajax({
      url: '/helpDesk/getComponentByID',
      type: 'POST',
      traditional: true,
      data: {
        arrays: samplearr
      },
      success: function(data) {
        console.log('ajax component', data);

        context.setState({
          correctSequence: data
        }, function() {
          console.log('correctSequence', this.state.correctSequence);
        });

      }.bind(this),
      error: function(err) {}.bind(this)
    });
  }
penalty(){
let sequencecost= parseInt(this.props.cost);
let penaltyscore = parseInt(this.props.score);
let totalscore= penaltyscore + sequencecost;
console.log('flipCardStructure sequencecost',this.props.cost);
console.log('flipCardStructure teamscore',this.props.score);
console.log('totalscore in flip card structure',totalscore);
$.ajax({
url:'/helpDesk/totalscore',
type:'POST',
async:false,
data:{team:cookies.get('teamName'),totalscore:totalscore},
success: function(data1){
console.log('penalty ajax', data1);
}.bind(this),
error: function(err){

}.bind(this)
});

}
  render() {
    //console.log('code', this.state.componentsequence);
const { active1 } = this.state;
    let options = [
      {
        key: 0,
        value: 'code',
        text: 'Sequence Information - Code'
      }, {
        key: 1,
        value: 'test',
        text: 'Sequence Information - Test'
      }, {
        key: 2,
        value: 'infra',
        text: 'Sequence Information - Infra'
      }, {
        key: 3,
        value: 'devops',
        text: 'Sequence Information - DevOps'
      }, {
        key: 4,
        value: 'userstory',
        text: 'User Story Full Sequence'
      }
    ];
    console.log("inside sequenceCard");
    var context = this;
    return (
      <div>
        {this.state.componentModal
          ? <ComponentModal componentsequence={this.state.componentsequence} serviceName={this.props.serviceName} searchQueryScenario={this.state.searchQueryScenario} closeModal={this.closeModal.bind(this)}/>
          : null}
        <div style={{
          height: '425px',
          marginLeft: '30%'
        }}>
          <FlipCard disabled={true} flipped={this.state.isFlipped} onFlip={this.handleOnFlip} onKeyDown={this.handleKeyDown}>
            <div>
              <Card raised style={{
                height: '400.25px',
                border: '1px solid #eeeeee',
                borderRadius: '3px',
                padding: '15px',
                width: '250px'
              }}>
                <Label as='a' ribbon style={{backgroundColor:'#5abcf4'}}>{this.props.serviceName}</Label>
                <Card.Content>
                  <Card.Description style={{
                    fontSize: '15px',
                    marginTop: '25px'
                  }}>
                    {this.props.description}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  Cost : {this.props.cost}

                  <Button circular primary disabled={active1} icon='arrow right' ref="backButton" onClick={this.showBack.bind(this)} floated='right'/>

                </Card.Content>

              </Card>
            </div>
            <div>
              <Card raised style={{
                height: '400.25px',
                border: '1px solid #eeeeee',
                borderRadius: '3px',
                padding: '15px',
                width: '250px'
              }}>
                <div style={{
                  marginLeft: '20%',
                  marginRight: '20%',
                  marginTop: '2%'
                }}>
                  <Header as='h3'>Domain</Header>
                  <Dropdown onChange={this.updatesearchQueryDomain.bind(this)} fluid placeholder='Select Domain' selection options={this.state.domainArray}/>
                  <Header as='h3'>User Story</Header>
                  <Dropdown onChange={this.updatesearchQueryScenario.bind(this)} fluid placeholder='Select User story' selection options={this.state.scenarioDropdown}/>
{(this.props.serviceName == 'Sequence Ordered' || this.props.serviceName == 'Sequence Unordered') ?
<div style={{
  marginTop: '15%'}}>
                  <Header as='h3'>Service Type</Header>
                  <Dropdown onChange={this.updatesearchQueryComponent.bind(this)} fluid placeholder='Select Service Type' selection options={options}/>
</div>: null}
                  <Button color='green' primary onClick={this.component.bind(this)} style={{
                    marginTop: '10%',
                    marginLeft: '25%'
                  }}>Submit</Button>
                </div>

                <Card.Content>
                  <Button circular primary icon='arrow left' ref="backButton" onClick={this.showFront.bind(this)}/>
                </Card.Content>
              </Card>
            </div>
          </FlipCard>
        </div>
      </div>
    );
  }
};

module.exports = flipCardStructure;
