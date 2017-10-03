import React from 'react';
import {Form, Grid, Button, Divider, Dropdown} from 'semantic-ui-react';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
class LinkService extends React.Component {
  constructor()
  {
    super();
    this.state ={
      sessionArray:[],
      serviceArray:[],
      serviceDescription :[],
      searchQuerySession:'',
      searchQueryService:[],
      selectedAccount:[],
      costValue:''
    },
    this.LinkSessionAndService = this.LinkSessionAndService.bind(this);
   this.updatecostValue = this.updatecostValue.bind(this);
   this.checkForSuccessAlert = this.checkForSuccessAlert.bind(this);
  this.checkForErrorAlert = this.checkForErrorAlert.bind(this);
  }
componentWillMount(){
  this.getSessions();
  this.getServices();
}
updatecostValue(e){
  this.setState({costValue:e.target.value});
}
checkForSuccessAlert() {
  this.refs.asd.success(
    'Service linked successfully',
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

LinkSessionAndService(){
console.log('inside linkimg');
  let description = '';
  // let servicesN ='';
  let context =this;
  console.log('searchQuerySession',this.state.searchQuerySession);
  console.log('service got',this.state.searchQueryService);
  console.log('array i need',this.state.serviceDescription);
  let cost = this.state.costValue;
  // for (let i in this.state.serviceDescription) {
  //   if (this.state.searchQueryService[i] === this.state.serviceDescription[i].name){
  //     description = this.state.serviceDescription[i].description;
  //
  //
  //     break;
  //   }
  // }
 console.log('arraay gt for services',this.state.searchQueryService);
    // if(this.state.searchQuerySession==''||servicesN==''||cost==''){
  //   this.checkForErrorAlert();
  // }
  let data = {
    nameSession:this.state.searchQuerySession,
  name:this.state.searchQueryService,
    cost:cost
  }
    console.log('my data for linking',data);
  if(data.nameSession === '' || data.cost === ''||data.name==='' ) {
    this.checkForErrorAlert();
  }
else{
  $.ajax({
    url:'/helpDeskAdmin/linkServices',
    type:'POST',
    traditional: true,
    data:data,
    success:function(data){
      context.checkForSuccessAlert();
      context.setState({searchQuerySession:''});
      context.setState({serviceArray: [], selectedAccount: []});
      context.setState({searchQueryService:[]},function(){console.log('empty',this.state.searchQueryService);})
      context.setState({costValue:''})
      context.getSessions();
      context.getServices();
    }.bind(this),
    error:function(err){
      console.log(err);
    }.bind(this)
  });
}
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
  url:'helpDeskAdmin/findSessionServices',
  type:'POST',
  success:function(data){
    console.log('getServicesCost',data);
    data.map((item)=>{
       servicesNames.push({content:item.name});
      //  serviceDes.push({name:item.name, description:item.description})
    })
    servicesNames.map((item)=>{
      keyPair.push({key:item.content,value:item.content,text:item.content});
    }
  )
    context.setState({serviceArray:keyPair}, function(){
      console.log('serviceArray',this.state.serviceArray);
    });
    // context.setState({serviceDescription:serviceDes},function(){
    //   console.log('serviceDescription',this.state.serviceDescription);
    // })
  }
})
}
updateSearchQuerySession(e,a) {
  console.log("bye");
  console.log('sssssss',a.value);
  let context = this;
  if(a.value!=null){
    let res = a.value;
    console.log('res printed', res);
    let arr = Object.keys(res).map(function(key) {
      return res[key];
    });
    console.log('arr', arr);
    context.setState({searchQuerySession: res});
  }
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
  render()
  {
    return(
      <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={1}/>
          <Grid.Column width={14}>
            <p style={{fontSize: '14px', fontFamily: 'arial'}}><b>Add Service And Session Link</b></p>
            <Form>
              <Form.Field>
                <label>
                  <p style={{fontSize: '14px', fontFamily: 'arial'}}>Session</p>
                </label>
                <Dropdown onChange={this.updateSearchQuerySession.bind(this)} placeholder='Select the session' fluid search selection options={this.state.sessionArray} required/>
              </Form.Field>
              <Form.Field>
                <label>
                  <p style={{fontSize: '14px', fontFamily: 'arial'}}>Service</p>
                </label>
                <Dropdown value={this.state.selectedAccount} onChange ={this.updateSearchQueryService.bind(this)}  placeholder='Select Service to be linked to Session' fluid multiple search selection options={this.state.serviceArray} required/>
              </Form.Field>
              <Form.Field>
                <label>
                  <p style={{fontSize: '14px', fontFamily: 'arial'}}>Service Cost</p>
                </label>
                <input autoComplete='off' type='number' value={this.state.costValue} onChange={this.updatecostValue} ref='modifiedServiceCost' placeholder='Service Cost' required/>
              </Form.Field>
            </Form>
            <Grid.Column width={8}>
              <Button style={{marginTop: '10px'}} color='green' fluid onClick={this.LinkSessionAndService.bind(this)}>Add</Button>
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
module.exports = LinkService ;
 
