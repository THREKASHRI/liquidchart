import React from 'react';
import ReactTable from 'react-table';
import { Table } from 'semantic-ui-react';
import { Segment } from 'semantic-ui-react'
import 'react-table/react-table.css';
// import Progress from 'react-progressbar';
export default class TopScorers extends React.Component{
  constructor(props) {
    super(props);

  };
  render() {//console.log('topscore now'+JSON.stringify(TopScorers));
  let TopScorers = [];
  for(let i in this.props.SavedScores){
    TopScorers.push(this.props.SavedScores[i]);
  }
  // if(this.props.LiveScores != ''){
  //   for(let i in this.props.LiveScores){
  //     TopScorers.push(this.props.LiveScores[i]);
  //   }
  // }
  let temp = {};
  for(let i = 0; i <TopScorers.length ; i++){
    for(let j = 0; j <TopScorers.length ; j++){
      if(TopScorers[i].score > TopScorers[j].score){
        temp = TopScorers[i];
        TopScorers[i] = TopScorers[j];
        TopScorers[j] = temp;
      }
    }
  }
  TopScorers = TopScorers.slice(0,3);
  //console.log('topscore then'+JSON.stringify(TopScorers));
  //  //console.log('topscore now'+JSON.stringify(TopScorers));
  return (
    <Segment>
        <Table basic='very' celled collapsing style={{paddingLeft:'10%'}}>
        <Table.Header><h4>Top Scorers</h4>
        <Table.Row>
          <Table.HeaderCell>Topper</Table.HeaderCell>
          <Table.HeaderCell>Score</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body> {TopScorers.map(function(item, key) {if(item.score != 0){
        return (
          <Table.Row key = {key}>
            <Table.Cell>{item.userID} </Table.Cell>
            <Table.Cell>{item.score}</Table.Cell>
          </Table.Row>
        )}
      })}
    </Table.Body>
  </Table>
</Segment>
);
}
}



// WEBPACK FOOTER //
// ./webclient/components/adaptAdmin/adminDashboard/topscorers/topscorers.jsx
