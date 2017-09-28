import React from 'react';
import {
  Dimmer,
  Header,
  Icon,
  Segment,
  Grid,
  Image,
  Card,
  Label,
  Button,
  Form,
  Dropdown
} from 'semantic-ui-react';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
import Cookies from 'universal-cookie';
import Cookie from 'react-cookie';
const cookies = new Cookies();
class ComponentModal extends React.Component {
  constructor() {
    super();
this.state = {
active:true
}
this.userStory = this.userStory.bind(this);
  }
  handleOpen = () => this.setState({active: true})

    handleClose = () => {
      this.setState({active: false});
      this.props.closeModal();
    }
userStory(){
let context = this;
console.log('userstorhgiugiukbnkhy',this.props.searchQueryScenario,cookies.get('empId'));
$.ajax({
  url: '/helpDesk/userStoryClosure',
  type: 'POST',
data:{loginid:cookies.get('empId'),scenario:this.props.searchQueryScenario},
  success: function(res) {
console.log('jhhjjkjhh',res);
context.checkForUserStory();
    },
  error: function(err) {}
});
}
checkForUserStory(){
    console.log("inside checkForRescheduledAlert");
    let context = this;
    this.refs.asd.success(
      'User story closed successfully',
      '', {
      timeOut: 2000,
      extendedTimeOut: 2000
    }
  );
  }
  render() {
let context = this;
if(this.props.serviceName == 'Sequence Ordered'){
console.log(this.props.serviceName+'aswini service name');
console.log(this.props.componentsequence+"@@@@@");
let correctSequence = this.props.componentsequence;
let componentsequence = correctSequence.filter(function(elem,index,self){
return index == self.indexOf(elem)
})
    const {active} = this.state;
let listData = componentsequence.map(function(item, key) {
return(<li>{item}</li>);
})
    return (
<div>
      <Dimmer active={active} page>
<Card style={{color:'black',marginLeft:'40%'}}>
<Icon name='cancel' onClick={this.handleClose.bind(this)} style={{float:'left'}} style={{marginTop:'-5%',color:'orange',marginLeft:'100%',cursor:'pointer'}}/>

<Card.Content>
<Header as='h2'>Sequence</Header>
<ol>
<div style={{textAlign:'left'}}>
{listData}
</div>
</ol>
</Card.Content>
</Card>
      </Dimmer>
</div>
    );
  }
  else if(this.props.serviceName == 'Sequence Unordered'){
    console.log(this.props.serviceName+'aswini service name');
    console.log(this.props.componentsequence+"@@@@@");
        const {active} = this.state;

let componentunordered = this.props.componentsequence.sort();
console.log('sorted array',componentunordered);
let uncorrectSequence = componentunordered.filter(function(elem,index,self){
return index == self.indexOf(elem)
})
    let listData = uncorrectSequence.map(function(item, key) {
    return(<li>{item}</li>);
    })
        return (
    <div>
          <Dimmer active={active} page>
    <Card style={{color:'black',marginLeft:'40%'}}>
    <Icon name='cancel' onClick={this.handleClose.bind(this)} style={{float:'left'}} style={{marginTop:'-5%',color:'orange',marginLeft:'100%',cursor:'pointer'}}/>

    <Card.Content>
    <Header as='h2'>Sequence </Header>
    <ol>
    <div style={{textAlign:'left'}}>
    {listData}
    </div>
    </ol>
    </Card.Content>
    </Card>
          </Dimmer>
    </div>
        );
      }
else if(this.props.serviceName == 'UserStory Closure'){
context.userStory();
return(
<div>
<ToastContainer ref='asd'
          toastMessageFactory={ToastMessageFactory}
          className='toast-top-center' style={{marginTop:'8%'}} />
</div>

)}
  }

}

module.exports = ComponentModal;
