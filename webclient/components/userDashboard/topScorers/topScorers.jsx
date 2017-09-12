import React from 'react';
import ReactTable from 'react-table';
import { Table, Segment } from 'semantic-ui-react';
import 'react-table/react-table.css';
// import Progress from 'react-progressbar';
export default class UserScenarioStatus extends React.Component{
  constructor(props) {
    super(props);

  };
  render() {
    // let TopScorers = [];
    // if(this.props.Scores != ''){
    //   for(let i in this.props.Scores){
    //     TopScorers.push(this.props.Scores[i]);
    //   }
    // }
    // //console.log('topscore then'+JSON.stringify(TopScorers));
    // let temp = {};
    // for(let i = 0; i <TopScorers.length ; i++){
    //   for(let j = 0; j <TopScorers.length ; j++){
    //     if(TopScorers[i].score > TopScorers[j].score){
    //       temp = TopScorers[i];
    //       TopScorers[i] = TopScorers[j];
    //       TopScorers[j] = temp;
    //     }
    //   }
    // }
    // //console.log('the score table data is : ', this.props.Scores);
    let scoreTable = this.props.Scores.map(function(item, key) {
      // //console.log('item', item);
      //   //console.log('key', key);
        if(key<3){
      return (
        <Table.Row key = {key}>
          <Table.Cell>{item.teamName} </Table.Cell>
          <Table.Cell>{item.score}</Table.Cell>
        </Table.Row>
      )
    }
    });
    // //console.log('topscore now'+JSON.stringify(TopScorers));
    return (
    <Segment id="topscoreposition" style={{marginTop:"-31%",paddingLeft:'10%'}}>
        <Table basic='very' celled collapsing >
          <Table.Header><h3>Team Score Status</h3>
          <Table.Row>
            <Table.HeaderCell>Team</Table.HeaderCell>
            <Table.HeaderCell>Score</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body> {scoreTable}
      </Table.Body>
    </Table>
  </Segment>
);
}
}
