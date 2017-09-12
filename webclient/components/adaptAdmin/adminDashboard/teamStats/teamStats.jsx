import React from 'react';
import { Line } from 'rc-progress';
import { Container } from 'semantic-ui-react';
export default class TeamStats extends React.Component{
  constructor(props) {
    super(props);
  };
  render() {
    let TeamStatus = [];
    let Temp = [];
    let finalData = {};
    let ProgressCount = 0;
    let CompletedCount = 0;
    let Teams = []
    let FinalArray = [];
    ////console.log('saved stats'+JSON.stringify(this.props.SavedTeamStats));
    for(let i in this.props.SavedTeamStats){
      TeamStatus.push(this.props.SavedTeamStats[i]);
    }
    // if(this.props.LiveTeamStats != ''){
    //   for(let i in this.props.LiveTeamStats ){
    //     TeamStatus.push(this.props.LiveTeamStats[i]);
    //   }
    // }
    for(let i = 0; i < TeamStatus.length; i++){
      for(let j = 0; j < TeamStatus.length; j++){
        if(TeamStatus[i].team_name === TeamStatus[j].team_name){
          Temp.push(TeamStatus[j].scenario_name,TeamStatus[j].status);
          Teams[i] = TeamStatus[i].team_name;
        }
      }
      finalData[TeamStatus[i].team_name] = Temp;
      Temp = [];
    }
    const uniqueTeams = Teams.filter((val,id,array) => array.indexOf(val) == id);
    let arr  = [];
    let dummy = [];
    let percentage = 0;
    for(let i in finalData){
      FinalArray.push(finalData[i]);
    }
    for(let i in FinalArray){
      arr  = FinalArray[i];
      for(let j in arr){
        if(arr[j] == "Completed"){
          CompletedCount++;
        }
        else if(arr[j] == "In progress"){
          ProgressCount++;
        }
        percentage = (CompletedCount/(ProgressCount+CompletedCount))*100;
      }//dummy.push({"team_name":uniqueTeams[i],"inprogress":ProgressCount,"completed":CompletedCount});
      dummy.push({"team_name":uniqueTeams[i],"percent":parseInt(percentage)});
      CompletedCount = 0;
      ProgressCount = 0;
      percentage = 0;
    }
    // //console.log(JSON.stringify(finalData));
    //console.log('dummmmy arrrrray'+JSON.stringify(dummy));
    return(
        <div style={{fontSize:'13px'}}>
          <h4>Team Stats</h4>
          {dummy.map(function(item, key) {
            return (
              <div style={{marginTop: "2%"}}>
                {item.team_name}: {item.percent}%
                <Line percent={item.percent} strokeWidth="1.5" strokeColor="#2ecc71" />
              </div>
            );
          })}
        </div>
    );
  }
}
