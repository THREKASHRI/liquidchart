import React from 'react';
import DonutChart from 'react-donut-chart';
import { Segment } from 'semantic-ui-react'
export default class DomainsCompleted extends React.Component {
  constructor(props) {
    super();
  };
  render() {
    let DomainsCompleted = 0;
    // if(this.props.LiveCount != ''){
    //   DomainsCompleted = this.props.LiveCount;
    // }
    let Pending = this.props.Total;
    DomainsCompleted += this.props.SavedCount;
    Pending = Pending - DomainsCompleted;
    return (
      <Segment compact>
        <h4>Customer journey</h4>
        <DonutChart height={220} width={330} colors={['#e67333','#2ecc71']}
          data={[{
            label: 'Pending',
            value: Pending,
          },
          {
            label: 'Completed',
            value: DomainsCompleted,
          }]} />
        </Segment>
      )
    }
  }
