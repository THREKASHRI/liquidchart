import React from 'react';
import {Card, Image, Label, Grid, Button, Dimmer, Header, Icon} from 'semantic-ui-react';
import DependencyModal from './dependencyModal.jsx';
import Cookies from 'universal-cookie';
import Cookie from 'react-cookie';
const cookies = new Cookies();
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
class serviceCardStructure extends React.Component {
  constructor() {
    super();
    this.state = {
cancelModal:false,
depedencyModal: false,
active1:false
    }
this.penalty = this.penalty.bind(this);
  }
componentWillMount(){
this.scoreCheck();
}
scoreCheck(){
  console.log('showback',this.props.totalteamscore);
  let seqcost = parseInt(this.props.cost);
  console.log('showback sequence',seqcost);
  if(this.props.totalteamscore < seqcost)
  {
  console.log('setstate');
  this.setState({active1:true},function(){
  console.log('active1sfvsc',this.state.active1);
  })
  }
}
openDependencyModal(){
this.setState({depedencyModal: true});
}
  closeModal() {
    this.setState({cancelModal: false,
depedencyModal:false});
  }
  openstaticcard() {
      this.setState({cancelModal: true});
    }
    penalty(){
    let sequencecost= parseInt(this.props.cost);
    let penaltyscore = parseInt(this.props.score);
    let totalscore= penaltyscore + sequencecost;
    console.log('flipCardStructure sequencecost',this.props.cost);
    console.log('flipCardStructure teamscore',this.props.score);
    console.log('totalscore in flip card structure',totalscore);
    $.ajax({
    url:'/helpDesk/totalscore',
    type:'POST',
    async:false,
    data:{team:cookies.get('teamName'),totalscore:totalscore},
    success: function(data1){
    console.log('penalty ajax', data1);
    }.bind(this),
    error: function(err){

    }.bind(this)
    });
    }

    checkForaddedNewServiceAlert() {
      this.refs.asd.success(
        'Service request added successfully',
        '', {
          timeOut: 5000,
          extendedTimeOut: 5000
        }
      );
    }
serviceaccepted(){
location.reload();
this.checkForaddedNewServiceAlert();
this.penalty();

}
  render() {
const { active1 } = this.state;
    let price = this.props.cost
    return (
      <div>

{this.state.depedencyModal ?
<DependencyModal closeModal={this.closeModal.bind(this)} score={this.props.score} cost={this.props.cost}/> : null}
          <Dimmer active={this.state.cancelModal} onClickOutside={this.closeModal.bind(this)} page style={{
                    fontSize: '130%'
                  }}>
                    <p style={{
                      marginRight: '3.2%'
                    }}>Are you sure you want to use the Service?</p>
                    <Button color='red' inverted onClick={this.closeModal.bind(this)} style={{
                      marginLeft: '10%',
                      marginRight: '1%'
                    }}>
                      <Icon name='remove'/>
                      No
                    </Button>
                    <Button color='green' inverted onClick={this.serviceaccepted.bind(this)}>
                      <Icon name='checkmark'/>
                      Yes
                    </Button>

                  </Dimmer>
        <div style={{
          height: '425px',
          marginLeft: '20%'
        }}>
          <Card raised style={{
            height: '400.25px',
            border: '1px solid #eeeeee',
            borderRadius: '3px',
            padding: '15px',
            width: '310px'
          }}>

              <Label as='a' ribbon style={{backgroundColor:'#5abcf4'}}>{this.props.serviceName}</Label>
<Card.Content>
              <Card.Description style={{
                fontSize: '15px',
                marginTop: '25px'
              }}>
                {this.props.description}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              Cost :{this.props.cost}
              {(this.props.serviceName != 'Architecture Support') ?
                          <Button primary disabled={active1} onClick={this.openstaticcard.bind(this)} style={{marginLeft:'30%'}}>Select</Button> : null}
                          {(this.props.serviceName == 'Architecture Support') ?
                          <Button primary disabled={active1} onClick={this.openDependencyModal.bind(this)} style={{marginLeft:'30%'}}>Select</Button>
                           : null}
            </Card.Content>


          </Card>
          <ToastContainer ref='asd'
                    toastMessageFactory={ToastMessageFactory}
                    className='toast-top-center' style={{marginTop:'8%'}} />
        </div>
      </div>
    )
  }
}
module.exports = serviceCardStructure;
