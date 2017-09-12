  import React from 'react';
import ButtonComponentStatus from './ButtonComponentStatus.jsx';
import {DefaultPlayer as Video} from 'react-html5video';
import Cookies from 'universal-cookie';
import Cookie from 'react-cookie';
const cookies = new Cookies();
import {
  Button,
  Dimmer,
  Header,
  Icon,
  Segment,
  Grid,
  Image,
  Card
} from 'semantic-ui-react'
class Component2 extends React.Component {
  constructor() {
    super();
    this.state = {
      active: true,
      score: 0,
      negativescore: 0,
      preconditionNames:[],
      newDependencies:[]
    }
  }
  componentWillMount() {
    //console.log("inside compoinent");
    let context;
    context = this;
    $.ajax({
      url: '/dnd/getScenarioDetails/' + context.props.scenarioId,
      type: 'GET',
      success: function(res) {
        //console.log("..." + res.precondition);
        //console.log("array of precondition names ",res);
        context.setState({score: res.score.low, negativescore: res.negativescore.low, preConditions: res.precondition});
        context.getPreconditionNames();
      },
      error: function(err) {
        //console.log(err);
      }
    });
    context.getNewDependencies();
  }

  getNewDependencies(){
    let context = this;
    let data={
      scenarioId: this.props.scenarioId
    };
    $.ajax({
      url: '/dnd/getNewDependencies',
      type: 'POST',
      data: data,
      success: function(res) {
          context.setState({newDependencies:res});
      },
      error: function(err) {
        //console.log(err);
      }
    });
  }
  getPreconditionNames() {
    let preconditionData = this.state.preConditions;
    let context = this;
    let result1 = [];
    //console.log("in model design ",this.state.preConditions);
    let datax = {
      preconditionData: context.state.preConditions
    };
    //console.log("in model design before ajax  ",preconditionData);
    $.ajax({
      url: '/dnd/getPreconditionNames',
      type: 'POST',
      traditional:true,
      data:{preconditionData:preconditionData},
      success: function(res) {
        //console.log('names are ', JSON.stringify(res));
        // //console.log("precondition names ",res[0].properties.name);
        res.map(function(item){
          result1.push(item.properties.name);
        })
        //console.log("array of precondition names ",result1);
        context.setState({
          preconditionNames: result1
        }, function() {
          // //console.log('getPreconditionNames', res[0].properties.name);
        });
      }.bind(this),
      error: function(err) {}.bind(this)
    });
  }

  handleOpen = () => this.setState({active: true})
  handleClose = () => {
    this.setState({active: false});
    this.props.closeViewAllScenariodata();
  }
  render() {
    //console.log("/////////////////////////"+this.props.domainName)
        //console.log("------------video"+this.props.loginid+".........."+this.props.status);
    const {active} = this.state
    var context = this;
    var dep =  'No dependencies';
    // if(this.state.preconditionNames.length != 0){
    //   dep = this.state.preconditionNames.map((item,index)=>{
    //    return <li>{item}</li>
    // })}
    if(this.state.newDependencies.length != 0){
      dep = this.state.newDependencies.map((item,index)=>{
       return <li>{item}</li>
    })}

    var displayname ='';

    if(this.props.status == 'wip'){
      displayname = (  <p style={{paddingLeft:"1px",paddingRight:"10px",paddingBottom:"3px",color:'#6ce4f9',fontWeight:'600'}}>Selected by:{this.props.name}</p>);
    }else if(this.props.status == 'Completed'){
      displayname = (  <p style={{paddingLeft:"1px",paddingRight:"10px",paddingBottom:"3px",color:'#6ce4f9',fontWeight:'600'}}>Completed by:{this.props.name}</p>);
    }
    return (
      <Dimmer active={active} onClickOutside={this.handleClose} page>
        <Grid>
          <Grid.Column width={3}></Grid.Column>
          <Grid.Column width={10}>
            <Card fluid id="txtalign" style={{padding:'20px',background: 'linear-gradient(to right, #1c567b, #080949)'}}>
              <Header as='h1' style={{color:'white'}}>
                {this.props.scenarioName}
              </Header>
              <Grid id="txtclr">
                <Grid.Column width={15} id="txtclr">
                  <h4 style={{color:'#6ce4f9'}}>User story Description</h4>
                  <p style={{paddingLeft:"2px",paddingBottom:"3px",color:'white'}}>{this.props.scenarioDescription}</p>
                  <h4 style={{color:'#6ce4f9'}}>Dependencies</h4>
                  <p style={{paddingLeft:"2px",paddingRight:"10px",paddingBottom:"3px",color:'white'}}>
                    {dep}
                  </p>
                  <div style={{color:'rgb(108, 228,249 )',fontWeight:'300',padding:'1.5%',borderRadius:'5px',margin:'-7% 1% 1% 45%',width:'31%'}}>MAXIMUM SCORE:  <span style={{color:'white'}}>{this.state.score}</span></div>
                  <div style={{color:'rgb(108, 228,249 )',fontWeight:'300',paddingLeft: '1.5%',borderRadius:'5px',margin:' 2% 1% 1% 45%',width:'31%'}}>NEGATIVE SCORE:  <span style={{color:'white'}}>{this.state.negativescore}</span></div>
                  <p style={{paddingLeft:"2px",paddingRight:"10px",paddingBottom:"3px",color:'#6ce4f9',fontWeight:'600'}}>ID : {this.props.scenarioId}</p>
                  <div>{displayname}</div>
                </Grid.Column>
                <Grid.Column width={1} style={{height:"100%"}}>
                  {/* <div><video style={{width:"286px",marginTop:"-12%",marginLeft:"-15%"}} controls><source src={this.props.video} type="video/mp4"/></video></div> */}
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column width={13}></Grid.Column>
                <Grid.Column width={3}>
                <ButtonComponentStatus scenarioId={this.props.scenarioId} scenarioName={this.props.scenarioName} scenarioDescription={this.props.scenarioDescription} video={this.props.video} status={this.props.status} loginid={this.props.loginid} domainName={this.props.domainName}/>
              </Grid.Column>
            </Grid>

          </Card>
        </Grid.Column>
        <Grid.Column width={3}></Grid.Column>

      </Grid>

    </Dimmer>
  );
}
}

module.exports = Component2;
