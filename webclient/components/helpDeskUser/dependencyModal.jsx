import React from 'react';
import {
  Dimmer,
  Header,
  Icon,
  Segment,
  Grid,
  Image,
  Card,
  Label,
  Button,
  Form,
  Dropdown
} from 'semantic-ui-react';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
import Cookies from 'universal-cookie';
// import Cookie from 'react-cookie';
const cookies = new Cookies();
class ComponentModal extends React.Component {
  constructor() {
    super();
this.state = {
domainArray:[],
active:true,
active1:true,
dependencyStatus: false
}
this.showDependencies = this.showDependencies.bind(this);
this.penalty = this.penalty.bind(this);
  }
  handleOpen = () => this.setState({active: true})

    handleClose = () => {
      this.setState({active: false});
      this.props.closeModal();
    }
    componentWillMount() {
      this.getAllDomain();
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
  penalty(){
  let sequencecost= parseInt(this.props.cost);
  let penaltyscore = parseInt(this.props.score);
  let totalscore= penaltyscore + sequencecost;
  console.log('flipCardStructure sequencecost',this.props.cost);
  console.log('flipCardStructure teamscore',penaltyscore);
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
      this.getPreConditions();
this.setState({active1: false})
    });
  }
  getPreConditions() {
console.log('precondition',this.state.searchQueryScenario);
    let context = this;
    $.ajax({
      url: '/users/findScenarioData',
      type: 'POST',
      data: {scenario: this.state.searchQueryScenario},
      success: function(dataDB)
      {
        let data = dataDB.records[0]._fields[0].properties;
        context.setState({precondition: data.precondition});
      }.bind(this),
      error: function(err)
      {
      }.bind(this)
    });
  }
showDependencies() {
  this.setState({dependencyStatus:true});
this.penalty();
this.setState({active1: true});
}
render() {
const { active1 } = this.state;
    const {active} = this.state;
    console.log('inside render',this.state.precondition);
    let dependencyData = '';
    if(this.state.dependencyStatus == true) {
          dependencyData = this.state.precondition;
    }
    return(
    <div>
    <Dimmer active={active} page>
    <Card style={{marginLeft:'45%'}}>
    <Icon name='cancel' style={{float:'left'}} onClick={this.handleClose.bind(this)} style={{marginTop:'-5%',color:'orange',marginLeft:'100%',cursor:'pointer'}}/>
    <div>
    <Header as='h3' style={{marginTop:'5%'}}>Domain</Header>
    <Dropdown onChange={this.updatesearchQueryDomain.bind(this)} compact placeholder='Select Domain' selection options={this.state.domainArray}/>
    <Header as='h3' style={{marginTop:'5%'}}>User Story</Header>
    <Dropdown onChange={this.updatesearchQueryScenario.bind(this)} compact placeholder='Select User story' selection options={this.state.scenarioDropdown}/>

    </div>
<h4 style={{color:'black'}}>{dependencyData}</h4>
<Card.Content>
    <Button primary disabled={active1} onClick={this.showDependencies} style={{marginTop:'5%'}}>Submit</Button>
</Card.Content>
    </Card>
    </Dimmer>
    </div>
    )
  }

}

module.exports = ComponentModal;
