import React from 'react';
import ReactTable from 'react-table';
import { Container } from 'semantic-ui-react';

import 'react-table/react-table.css';
// import Progress from 'react-progressbar';
export default class UserScenarioStatus extends React.Component{
  constructor(props) {
    super(props);
  };
  render() {

    let UserStatus = [];
    for(let i in this.props.SavedUserStats){
      UserStatus.push(this.props.SavedUserStats[i]);
    }
    let data = [];
    let SampleData = [];
    let length = 0;
    if(this.props.LiveUserStats != ''){
      for(let i in this.props.LiveUserStats ){
        UserStatus.push(this.props.LiveUserStats[i]);
      }
    }
    let Userdata = []
    UserStatus.map(function(item, key) {
      //console.log("item.userId ",item.userId);
      Userdata.push({
        "scenario_name":item.scenario_name,
        "domain_name":item.domain_name,
        "status":item.status,
        "assigned_to":item.userId,
        "team_name":item.team_name
      });
    })
    const columns = [{
      Header: 'User Stories',
      accessor: 'scenario_name' // String-based value accessors!
    }, {
      Header: 'Customer Journey',
      accessor: 'domain_name',
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
    {
      Header: 'Owned By',
      accessor: 'assigned_to',
    },
    {
      Header: 'Team',
      accessor: 'team_name',
    },
  ]
  return(
    <Container style={{width: "100%",height:"100%",float:"left",marginLeft:"0%"}}>
      <div style={{fontSize:'13px'}}>
        <ReactTable
          data={Userdata}
          columns={columns}
          defaultPageSize = {5}
        />
      </div>
    </Container>
  );
}}



// WEBPACK FOOTER //
// ./webclient/components/adaptAdmin/adminDashboard/userScenarioStatus/userScenarioStatus.jsx
