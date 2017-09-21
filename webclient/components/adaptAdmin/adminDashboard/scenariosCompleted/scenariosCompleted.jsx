import React from 'react';
import DonutChart from 'react-donut-chart';
import {Segment} from 'semantic-ui-react';
export default class ScenariosCompleted extends React.Component {
  constructor(props) {
    super();
  };
  render() {
    // console.log(" in scenario completed ",this.props.TotalScenarios);
    let ScenariosCompleted = 0;
    if(this.props.DBCompletedCount != ''){
      ScenariosCompleted = this.props.DBCompletedCount.length;
    }
    let Pending = Math.abs(this.props.TotalScenarios-ScenariosCompleted);//console.log('pending',Pending);
    // if(this.props.LiveCompletedScenarios != ''){
    //   LiveLength = this.props.LiveCompletedScenarios.length-1;
    //   if(this.props.LiveCompletedScenarios[LiveLength].status == 'inprogress'){
    //     Pending += 1;
    //   }
    //   else if(this.props.LiveCompletedScenarios[LiveLength].status == 'completed'){
    //     ScenariosCompleted += 1;
    //   }
    //   Pending = Math.abs(Pending - ScenariosCompleted);
    // }
    // //console.log('pending after live',Pending);;
    // //console.log('the live stats'+JSON.stringify(this.props.LiveCompletedScenarios[LiveLength]));
    return (
        <Segment compact>
        <h4>User story</h4>
        <DonutChart height={220} width={330} colors={['#e67333','#2ecc71']}
          data={[{
            label: 'Pending',
            value: Pending,
          },
          {
            label: 'Completed',
            value: ScenariosCompleted,
          }]} />
        </Segment>
      )
    }
  }
