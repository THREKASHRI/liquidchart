import React from 'react';
import {Form, Grid, Button, Icon, Divider, Dropdown, Dimmer, Header} from 'semantic-ui-react';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
class DeleteService extends React.Component {
  constructor()
  {
    super();
    this.state ={
      serviceArray: [],
      ddModal:false
    };
    this.deleteService = this.deleteService.bind(this);
    this.updateService = this.updateService.bind(this);
    this.checkForRemovedServiceAlert = this.checkForRemovedServiceAlert.bind(this);
   this.checkForServiceDeleteErrorAlert =this.checkForServiceDeleteErrorAlert.bind(this);
  };
  checkForServiceDeleteErrorAlert() {
    this.refs.asd.warning(
      'select the service to delete',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }
  checkForRemovedServiceAlert() {
    this.refs.asd.success(
      'Removed service successfully',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }
  deleteService() {
    this.setState({ddModal: true});
  }
  handleNoDeleteServiceClick() {
    this.setState({ddModal: false});
  }

componentWillMount(){
  this.adminViewServiceDetails();
}


  adminViewServiceDetails(){
    console.log('ffff');
    let context = this;
    let array = [];
    let  arrayadd =[];
    let des = []
    $.ajax({
      url:'/helpDeskAdmin/adminViewServiceDetails',
      type:'GET',
      success: function(data){
        console.log('delete',data);
        for (let i = 0; i < data.length; i = i + 1) {
          array.push({content: data[i].name});
          console.log('contnt of array',array);
          des.push({name:data[i].name,description:data[i].description});
        }
        for (let k = 0; k < array.length; k = k + 1) {
          arrayadd.push({key: array[k].content, value: array[k].content, text:array[k].content});

        }
      context.setState({serviceArray:arrayadd},function(){
        if(this.state.serviceArray.length == 0){
            context.checkForServiceDeleteErrorAlert();
        }
        console.log('serviceArray',this.state.serviceArray);
              })
              context.setState({desData:des});
    }.bind(this),
    error:function(err){
      console.log(err);
    }.bind(this)
  });
  }




  handleYesDeleteServiceClick() {
    let context = this;
    context.setState({ddModal: false});
    let sucessFlag = 0;
    if(this.state.searchQuery == ''){
        context.checkForServiceDeleteErrorAlert();
    }
    else if(this.state.searchQuery) {
      $.ajax({
        url: '/helpDeskAdmin/adminDeleteService',
        type: 'POST',
        data: {name: this.state.searchQuery},
        success: function(response)
        {
          context.checkForRemovedServiceAlert();
          sucessFlag = 1;
          this.setState({
            name: '',
            description: ''
          });
          context.updateService();
        }.bind(this),
        error: function(err)
        {
        }.bind(this)
      });
    }
  }
  updateService(e,a){

  if(a!= null) {
    let res = a.value;
   this.setState({name: res});
   this.setState({searchQuery: res});
       for(let i in this.state.desData){
         if( res == this.state.desData[i].name){
       this.setState({latestDesc:this.state.desData[i].description});
           console.log(this.state.desData[i].description);
         }
       }
  }
  console.log('inside upda  te service',this.state.searchQuery);
  }
  render()
  {
    return(
      <div>
      <Dimmer active={this.state.ddModal} onClickOutside={this.handleNoDeleteServiceClick.bind(this)} page style={{fontSize: '130%'}}>
        <Header icon='trash outline' content='Delete customer journey' style={{color: 'white', marginLeft: '35%'}}/>
        <p style={{marginRight: '3.2%'}}>Are you sure you want to delete the selected customer journey?</p>
        <Button color='red' inverted onClick={this.handleNoDeleteServiceClick.bind(this)} style={{marginLeft: '10%', marginRight: '1%'}}>
          <Icon name='remove' /> No
        </Button>
        <Button color='green' inverted onClick={this.handleYesDeleteServiceClick.bind(this)}>
          <Icon name='checkmark' /> Yes
        </Button>
      </Dimmer>
      <Grid>
        <Grid.Row>
          <Grid.Column width={1}/>
          <Grid.Column width={14}>
            <p style={{fontSize: '16px', fontFamily: 'arial'}}><b>Delete service</b></p>
            <Form>
              <Form.Field>
                <label>
                  <p style={{fontSize: '14px', fontFamily: 'arial'}}>Services Available</p>
                </label>
                <Dropdown onChange={this.updateService.bind(this)} placeholder='Select the Domain to be removed' fluid search selection options={this.state.serviceArray} required/>
              </Form.Field>
            </Form>
            <Grid.Column width={8}><Button style={{marginTop: '10px'}} fluid color='green' onClick={this.deleteService.bind(this)}>Delete</Button></Grid.Column>
            <Divider/>
          </Grid.Column>
          <Grid.Column width={1}/>
        </Grid.Row>
      </Grid>
      <ToastContainer ref='asd'
        toastMessageFactory={ToastMessageFactory}
        className='toast-top-center' style={{marginTop: '8%'}}/>
      </div>
    )
  }
}

module.exports = DeleteService;
