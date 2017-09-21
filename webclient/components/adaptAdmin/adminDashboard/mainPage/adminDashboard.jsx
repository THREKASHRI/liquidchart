import React from 'react';
import {Grid} from 'semantic-ui-react';
import DomainCompleted from '../domainsCompleted/domainsCompleted';
import ScenarioCompleted from '../scenariosCompleted/scenariosCompleted';
import TopScorers from '../topscorers/topscorers';
import UserScenarioStatus from '../userScenarioStatus/userScenarioStatus';
import TeamStats from '../teamStats/teamStats';
export default class adminDashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      LiveUserStats: [],
      count: 0,
      Total: 0,
      SavedUserStats: [],
      DomainTotal: 0,
      DomainCompleted: 0,
      LiveScores: [],
      LiveTeamStats: [],
      CompletedDomain: 0,
      UserDetails: [],
      SavedScores: [],
      SavedTeamStats: []
    };
    this.totalScenarios = this.totalScenarios.bind(this);
  }
  //   Fetching user stories and customer journey data from database
  componentWillMount() {
    let data = [];
    let context = this;
    let Score = [];
    $.ajax({
      url: '/admin/adminDashboardCompletedScenario',
      type: 'GET',
      success: function(result)
      {
        result.map((item) => {
          data.push({scenario_name: item.scenario_name, domain_name: item.domain_name,
            status: 'Completed', assigned_to: item.userId, team_name: item.team_name});
          });
          context.setState({
            count: data
          }, function() {
          });
        }.bind(this),
        error: function(err)
        {
        }.bind(this)
      });
      $.ajax({
        url: '/admin/adminDashboardTotalScenario',
        type: 'GET',
        success: function(data)
        {
          this.setState({
            Total: data.length
          });
        }.bind(this),
        error: function(err)
        {
        }.bind(this)
      });
      $.ajax({
        url: '/admin/adminDashboardTotalDomain',
        type: 'GET',
        success: function(data)
        {//console.log('domain total'+JSON.stringify(data));
        this.setState({
          DomainTotal1: data.length
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
      success: function(data){
      // {console.log("donut ",data[0].pending);
        this.setState({
          CompletedDomain: data[0].completed,
          DomainTotal: data[0].pending
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
        console.log("fetch ",data);
        for(let i in data){
          if(data[i].score != undefined){
            Score.push({'userID':data[i].userID,'score':data[i].score.low})
          }
          else{
            Score.push({'userID':data[i].userID,'score':0});
          }
          this.setState({
            SavedScores: Score
          });
        }
      }
      });
      $.ajax({
        url: '/admin/teamStats',
        type: 'GET',
        success: function(data)
        {
          this.setState({
            SavedTeamStats: data
          });
          this.setState({
            SavedUserStats: data
          });
        }
  });
}
totalScenarios() {
  $.ajax({
    url:'/admin/adminDashboardTotalScenario',
    type:'GET',
    success: function(data)
    {
      this.setState({
        Total: data.length
      });
    }
  });
  }
    render() {
      //  Designing system level dashboard to view status of the the application
      return (
        <Grid style={{marginTop: '5%', marginLeft: '2%'}}>
          <Grid.Row columns={3}>
            <Grid.Column width={6}>
              <DomainCompleted Total={this.state.DomainTotal} SavedCount={this.state.CompletedDomain}/>
            </Grid.Column>
            <Grid.Column width={6}>
              <ScenarioCompleted DBCompletedCount={this.state.count} TotalScenarios={this.state.Total}/>
            </Grid.Column>
            <Grid.Column width={4}>
              <TopScorers SavedScores={this.state.SavedScores}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column width={10}>
              <UserScenarioStatus SavedUserStats={this.state.SavedUserStats}/>
            </Grid.Column>
            <Grid.Column width={6}>
              <TeamStats SavedTeamStats={this.state.SavedTeamStats}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    }
  }
