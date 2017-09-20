import React from 'react';
import ReactTable from 'react-table';
import { Table, Segment } from 'semantic-ui-react';
import 'react-table/react-table.css';
import {Scrollbars} from 'react-custom-scrollbars';
// import Progress from 'react-progressbar';
export default class UserScenarioStatus extends React.Component{
  constructor(props) {
    super(props);

  };
  render() {
        let scoreTable = this.props.Scores.map(function(item, key) {
      return (
        <Table.Row key = {key}>
          <Table.Cell>{item.teamName} </Table.Cell>
          <Table.Cell>{item.score}</Table.Cell>
        </Table.Row>
      )
    });
      return (
    <Segment id="topscoreposition" style={{marginTop:"-31%",paddingLeft:'10%'}}>
      <h3>Team Score Status</h3>
        <Table basic='very' fixed style={{marginBottom:'0%'}}>
          <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Team</Table.HeaderCell>
            <Table.HeaderCell>Score</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
        <Scrollbars renderTrackHorizontal={props => <div {...props} className="track-horizontal" style={{
          display: 'none',
          position: 'right'
        }}/>} autoHide autoHeight autoHeightMax={185}>
      <Table basic='very' fixed style={{marginTop:'0%'}}>
        <Table.Body>
          {scoreTable}
      </Table.Body>
    </Table>
  </Scrollbars>
  </Segment>
);
}
}
