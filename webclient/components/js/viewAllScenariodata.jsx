import React from 'react'
const {hashHistory} = require('react-router');
import {Icon, Button, Segment, Grid, Card, Dimmer} from 'semantic-ui-react'
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import ViewAll from './viewAllScenario.jsx';
import {Scrollbars} from 'react-custom-scrollbars';
import ColoredScrollbars from '../dnd/ColoredScrollbars';
import _ from 'lodash'
class Component3 extends React.Component {
  constructor() {
    super();
    this.state = {
      scenarioName: '',
      scenarioDescription: '',
      active: true,
      value:0
    }
  }
  handleOpen = () => this.setState({active: true})
  handleClose = () => {
    this.setState({active: false});
    this.props.closeViewAllScenariodata();
  }
  abc(){
    this.setState({value:1})
  }

  render() {
    const {active} = this.state
    var context = this;
    let cards = context.props.resultall.map((item,index)=>{
      //console.log("this.props.status in view all scnario status ",item.loginid);
      return (<ViewAll domainName={context.props.domainName} scenarioName={item.scenarioName} scenarioId={item.scenarioId} scenarioDescription={item.scenarioDescription} video={item.video} status={item.status} name={item.name} loginid={item.loginid}/>
  );
 });
    return (
      <Dimmer active={active} onClickOutside={this.handleClose} page>
        <Grid>
    <Grid.Column width={3}>
    </Grid.Column>
      <Grid.Column width={10}>
        <ColoredScrollbars>
    {/* <Scrollbars renderTrackHorizontal={props => <div {...props} className="track-horizontal" style={{
      display: 'none',
      position: 'right',
      backgroundColor: 'rgba(255, 255, 255, 0.498039)'
    }}/>} autoHide autoHeight autoHeightMin={350}> */}

  <Card.Group itemsPerRow={4} style={{marginLeft:'3%'}}>
      {cards}
    </Card.Group>

{/* // </Scrollbars> */}
</ColoredScrollbars>
  </Grid.Column>
<Grid.Column width={3}>

</Grid.Column>

</Grid>

  </Dimmer>
    )
  }
}



module.exports = Component3
