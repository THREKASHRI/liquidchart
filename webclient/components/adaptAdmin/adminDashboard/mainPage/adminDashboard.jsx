import React from 'react';
import {Segment} from 'semantic-ui-react';
import {Grid} from 'semantic-ui-react';
import Axios from 'axios';
import Snackbar from 'material-ui/Snackbar';
import DomainCompleted from '../domainsCompleted/domainsCompleted';
import ScenarioCompleted from '../scenariosCompleted/scenariosCompleted';
import TopScorers from '../topscorers/topscorers';
import UserScenarioStatus from '../userScenarioStatus/userScenarioStatus';
import TeamStats from '../teamStats/teamStats';
import {Component} from 'react';
const {Link} = require('react-router');
const {hashHistory} = require('react-router');
import {Dropdown} from 'semantic-ui-react';
export default class adminDashboard extends React.Component {
  constructor(props) {
    super();
    this.state = {
      LiveUserStats: [],
      count:0,
      Total:0,
      SavedUserStats:[],
      DomainTotal:0,
      DomainCompleted:0,
      LiveScores:[],
      LiveTeamStats:[],
      CompletedDomain:0,
      UserDetails:[],
      SavedScores:[],
      SavedTeamStats:[]
    };
    this.totalScenarios = this.totalScenarios.bind(this);
  };
  componentWillMount(){
    let data = [];
    let context = this;
    let Score = [];
    $.ajax({
      url:'/admin/adminDashboardCompletedScenario',
      type:'GET',
      success: function(result)
      {
        //console.log('result',result);
        result.map((item, index) => {
          //console.log("item index ",item.userId);
          data.push({scenario_name:item.scenario_name,domain_name:item.domain_name,
              status:'Completed',assigned_to:item.userId,team_name:item.team_name});
        })

          context.setState({
            count: data
          },function() {
            //console.log("sssssss",context.state.count);
          });
        }.bind(this),
        error: function(err)
        {
          //console.log('error occurred on AJAX');
        }.bind(this)
      });
      $.ajax({
        url:'/admin/adminDashboardTotalScenario',
        type:'GET',
        success: function(data)
        {
          ////console.log('data length'+data.length);
          this.setState({
            Total: data.length
          });

        }.bind(this),
        error: function(err)
        {
          //console.log('error occurred on AJAX');
        }.bind(this)
      });
      $.ajax({
        url:'/admin/adminDashboardTotalDomain',
        type:'GET',
        success: function(data)
        {//console.log('domain total'+JSON.stringify(data));
        this.setState({
          DomainTotal: data.length
        });
      }.bind(this),
      error: function(err)
      {
        //console.log('error occurred on AJAX');
      }.bind(this)
    });
    $.ajax({
      url:'/admin/fetchCompletedDomain',
      type:'GET',
      success: function(data)
      {
        this.setState({
          CompletedDomain: data.records[0]._fields[0].low
        });
      }.bind(this),
      error: function(err)
      {
        //console.log('error occurred on AJAX');
      }.bind(this)
    });
    $.ajax({
      url:'/admin/fetchScores',
      type:'GET',
      success: function(data)
      {
        for(let i in data){
          if(data[i].score != undefined){
            Score.push({'userID':data[i].userID,'score':data[i].score.low})
          }
          else{
            Score.push({'userID':data[i].userID,'score':0});
          }
        }
        //console.log('scoressssssssssss'+JSON.stringify(Score));
        this.setState({
          SavedScores: Score
        });
      }.bind(this),
      error: function(err)
      {
        //console.log('error occurred on AJAX');
      }.bind(this)
    });
    $.ajax({
      url:'/admin/teamStats',
      type:'GET',
      success: function(data)
      {
        //console.log('scoressssssssssss'+JSON.stringify(data));
      this.setState({
        SavedTeamStats: data
      });
      this.setState({
        SavedUserStats: data
      });
    }.bind(this),
    error: function(err)
    {
      //console.log('error occurred on AJAX');
    }.bind(this)
  });
}
totalScenarios() {
  $.ajax({
    url:'/admin/adminDashboardTotalScenario',
    type:'GET',
    success: function(data)
    {
      ////console.log('data length'+data.length);
      this.setState({
        Total: data.length
      });
    }.bind(this),
    error: function(err)
    {
      //console.log('error occurred on AJAX');
    }.bind(this)
  });
}
// componentDidMount(){
//   let socket = io();
//   let data     = [];
//   let context = this;
//   let ScoreData = [];
//   let Tstats = [];
//   socket.on('userStats', function(result){
//     context.setState({LiveUserStats:[]}, function(){
//       this.totalScenarios();
//     });
//     data.push({scenario_name:result.scenarioName,domain_name:result.domainName,
//       status:result.status,userId:result.userId,team_name:result.teamName,score:result.score});//console.log('love stas data+'+JSON.stringify(data));
//       //console.log('data from socket'+JSON.stringify(data));
//       ScoreData.push({userID:result.userId,score:result.score});
//       Tstats.push({scenario_name:result.scenarioName,team_name:result.teamName,status:result.status});
//       //console.log('tsttats'+Tstats);
//       context.setState({LiveUserStats: data});
//       context.setState({LiveScores:ScoreData});
//       context.setState({LiveTeamStats:Tstats});
//     });
//     socket.on('domainStats', function(result){
//       context.setState({DomainCompleted:result.length});
//       //  //console.log('got data from socket'+JSON.stringify(result));
//     });
//   }
  render() {
    return (
      <Grid style={{marginTop:'5%',marginLeft:'2%'}}>
 <Grid.Row columns={3}>
   <Grid.Column width={6}>
     <DomainCompleted Total={this.state.DomainTotal} /*LiveCount={this.state.DomainCompleted}*/ SavedCount={this.state.CompletedDomain}/>
   </Grid.Column>
   <Grid.Column width={6}>
     <ScenarioCompleted /*LiveCompletedScenarios={this.state.LiveUserStats}*/ DBCompletedCount={this.state.count} TotalScenarios={this.state.Total}/>
   </Grid.Column>
   <Grid.Column width={4}>
     <TopScorers /*LiveScores={this.state.LiveScores}*/ SavedScores={this.state.SavedScores}/>
   </Grid.Column>
 </Grid.Row>
 <Grid.Row columns={2}>
   <Grid.Column width={10}>
     <UserScenarioStatus /*LiveUserStats={this.state.LiveUserStats}*/ SavedUserStats={this.state.SavedUserStats}/>
   </Grid.Column>
   <Grid.Column width={6}>
     <TeamStats  /*LiveTeamStats={this.state.LiveTeamStats}*/ SavedTeamStats={this.state.SavedTeamStats}/>
   </Grid.Column>
 </Grid.Row>
</Grid>
  )
}
}



// WEBPACK FOOTER //
// ./webclient/components/adaptAdmin/adminDashboard/mainPage/adminDashboard.jsx
