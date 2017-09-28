import React from 'react';
import {Form, Grid, Button, Divider, Dropdown} from 'semantic-ui-react';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

class DelinkService extends React.Component{
  constructor(){
    super();
    this.state ={
      sessionArray:[],
      serviceArray:[],
      serviceDescription :[],
      searchQuerySession:'',
      searchQueryService:[],
      selectedAccount:[]
    },
    this.checkForSuccessAlert = this.checkForSuccessAlert.bind(this);
    this.checkForErrorAlert = this.checkForErrorAlert.bind(this);
  }
  componentWillMount(){
    this.getSessions();
    this.getServices();
  }
  checkForSuccessAlert() {
    this.refs.asd.success(
      'Service delinked successfully',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }
  checkForErrorAlert() {
    this.refs.asd.warning(
      'select all the fields',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }
  getSessions(){
    let context = this;
    let sessions = [];
    let sesionsKeyPair = [];
    $.ajax({
      url:'helpDeskAdmin/getAllSessions',
      type:'GET',
      success:function(data){
        console.log('getSessions',data);
        data.map((item)=>{
          sessions.push({content:item.name});
        })
        sessions.map((item)=>{
          sesionsKeyPair.push({key:item.content,value:item.content,text:item.content})
        })
        context.setState({sessionArray:sesionsKeyPair}, function(){
          console.log('sessionArray',this.state.sessionArray);
        })
      }
    })
  }
  getServices(){
  let context = this;
  let servicesNames = [];
  let serviceDes =[];
  let keyPair =[];
  $.ajax({
    url:'helpDeskAdmin/adminViewServiceDetails',
    type:'GET',
    success:function(data){
      console.log('getServicesCost',data);
      data.map((item)=>{

         servicesNames.push({content:item.name});
         serviceDes.push({name:item.name, description:item.description})
      })
      servicesNames.map((item)=>{
        keyPair.push({key:item.content,value:item.content,text:item.content});
      }
    )
      context.setState({serviceArray:keyPair}, function(){
        console.log('serviceArray',this.state.serviceArray);
      });
      context.setState({serviceDescription:serviceDes},function(){
        console.log('serviceDescription',this.state.serviceDescription);
      })

    }
  })
  }
  updateSearchQuerySession(e,a) {
  let res = a.value;
  console.log('pinky',res);
  let sessionLinkedArray = [];
  console.log('asadaddad',this.state.searchQuerySession);
  this.setState({searchQuerySession:res},function(){
    console.log('rose',this.state.searchQuerySession);
  });
  let   data ={
      name:res
    }
    console.log('data in delink',data);
  $.ajax({
    url:'/helpDeskAdmin/findlinkServices',
    type:'POST',
    data:data,
    success:function(data){
      for (let i in data) {
        if (i !== null) {
          sessionLinkedArray.push({key: data[i].name, value: data[i].name, text: data[i].name});
        }
      }
      this.setState({serviceArray:sessionLinkedArray});
    }.bind(this),
    error:function(err){
    }.bind(this)
  });
    }



    updateSearchQueryService(e, a) {
      let res = a.value;
      console.log('res value in service',res);
      let arr = Object.keys(res).map(function(key) {
        console.log('res key is printed in service',res[key]);
        return (res[key]);
      });
      this.setState({searchQueryService: arr, selectedAccount: arr}, function() {
        console.log('searchQueryService',this.state.searchQueryService);
        console.log('selectedAccount',this.state.selectedAccount);
      });
    }

    DeleteSessionServiceLink(){
      console.log('inside linkimg');
        let context =this;
        let sessionName = this.state.searchQuerySession;
        console.log('searchQuerySession in delink',this.state.searchQuerySession);
        console.log('service got in delink',this.state.searchQueryService);
        let data = {
          nameSession:this.state.searchQuerySession,
          name:this.state.searchQueryService
        }
          console.log('my delink data', data);
        console.log(data,'delinkdata');
        if(data.nameSession === ''||data.name==='' ) {
          this.checkForErrorAlert();
        }
else{
        $.ajax({
          url:'/helpDeskAdmin/delinkServices',
          type:'POST',
          traditional:true,
          data:data,
          success:function(data){
            context.checkForSuccessAlert();
            context.setState({sessionArray:[],searchQuerySession:'',searchQueryService:[]},function(){
              console.log('sessionArray',this.state.sessionArray);
            })
            context.setState({serviceArray: [], selectedAccount: []});
            context.getSessions();
            context.getServices();

          }.bind(this),
          error:function(err){
            console.log(err);
          }.bind(this)
        });
        }
}
  render(){
    return(
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}/>
            <Grid.Column width={14}>
              <p style={{fontSize: '16px', fontFamily: 'arial'}}><b>Remove session service Link</b></p>
              <Form>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Session</p>
                  </label>
                  <Dropdown onChange={this.updateSearchQuerySession.bind(this)} placeholder='Select the session' fluid search selection options={this.state.sessionArray} required/>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Service</p>
                  </label>
                  <Dropdown onChange ={this.updateSearchQueryService.bind(this)} value = {this.state.selectedAccount} placeholder='Select Service to be linked to Session' fluid multiple search selection options={this.state.serviceArray} required/>
                </Form.Field>
                </Form.Field>
              </Form>
              <Grid.Column width={8}>
                <Button style={{marginTop: '10px'}} color='green' fluid onClick={this.DeleteSessionServiceLink.bind(this)}>Remove</Button>
              </Grid.Column>
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
module.exports = DelinkService
