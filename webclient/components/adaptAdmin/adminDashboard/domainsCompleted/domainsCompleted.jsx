import React from 'react';
import DonutChart from 'react-donut-chart';
import {Segment} from 'semantic-ui-react';
export default class DomainsComplete extends React.Component {
  constructor() {
    super();
  }
  render() {
//  Calculating the no. of completed Customer journeys
    let DomainsCompleted = 1;
    let Pending = this.props.Total;
    DomainsCompleted = this.props.SavedCount;
//  Assigning the completed count to a donut chart
    return (
      <Segment compact>
        <h4>Customer journey</h4>
        <DonutChart height={220} width={330} colors={['#e67333', '#2ecc71']}
          data={[{
            label: 'Pending',
            value: Pending
          },
          {
            label: 'Completed',
            value: DomainsCompleted
          }]} />
        </Segment>
      );
    }
  }
