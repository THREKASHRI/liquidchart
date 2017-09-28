import React from 'react';
import {Form, Grid, Button, Divider, Dropdown} from 'semantic-ui-react';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
 class ArchiveService extends React.Component{
   constructor(){
     super();
     this.state ={
       sessionArray:[],
       serviceArray:[],
       serviceDescription :[],
       searchQuerySession:'',
       searchQueryService:[],
       selectedAccount:[],
       currentFlag:[],
       hideStatus:''
     },
     this.checkForSuccessAlert = this.checkForSuccessAlert.bind(this);
     this.checkForErrorAlert = this.checkForErrorAlert.bind(this);
     this.toggleService = this.toggleService.bind(this);
   }
   componentWillMount(){
     this.getSessions();
     this.getServices();
   }
   checkForSuccessAlert() {
     this.refs.asd.success(
       'successfully toggled',
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
           console.log('sessionArray all my sessions in db',this.state.sessionArray);
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
          // serviceDes.push({name:item.name, description:item.description,flag:item.flag})
       })
       servicesNames.map((item, key)=>{
         keyPair.push({key: key,value:item.content,text:item.content});
       }
     )
       context.setState({serviceArray:keyPair}, function(){
         console.log('serviceArray',this.state.serviceArray);
       });
      //  context.setState({serviceDescription:serviceDes},function(){
      //    console.log('serviceDescription',this.state.serviceDescription);
      //  })
     }
   })
   }
   updateSearchQuerySession(e,a) {
   let res = a.value;
   console.log('pinky',res);
   let sessionLinkedArray = [];
   let flagStatusArray = [];
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
       console.log('flagStatus data',data);
       for (let i in data) {
         if (i !== null) {
           sessionLinkedArray.push({key: data[i].name, value: data[i].name, text: data[i].name});
          flagStatusArray.push({name:data[i].name,flag:data[i].flag});
         }
       }
       this.setState({serviceArray:sessionLinkedArray});
       console.log('flagStatusaaaaaaaaaa',flagStatusArray);
       this.setState({currentFlag:flagStatusArray})
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
       console.log('currentFlag',this.state.currentFlag);
  for(let i in this.state.currentFlag){
    if(this.state.searchQueryService == this.state.currentFlag[i].name){
      let selectedServiceFlag = this.state.currentFlag[i].flag;
      console.log('selectedServiceFlag',selectedServiceFlag);
      if(selectedServiceFlag == 1){
        this.setState({hideStatus:'Enabled'});
break;
      }
      else{
        this.setState({hideStatus:'Disabled'});
break;
      }
    }
  }
     });
   }
   toggleService(){
     let context = this;
     console.log('ggggga'+this.state.searchQuerySession);
      let nameSession = this.state.searchQuerySession;
      let name = this.state.searchQueryService;
      console.log('name ',name);
    let flag = 0;
    if(context.state.hideStatus == 'Enabled'){
      flag = 0;
      context.setState({hideStatus: 'Disabled'});
    }
    else if(context.state.hideStatus == 'Disabled'){
      flag = 1;
      context.setState({hideStatus:'Enabled'})
    }
    $.ajax({
      url:'/helpDeskAdmin/toggleService',
      type:'POST',
      traditional:true,
      data:{name:name,nameSession:nameSession,flag:flag},
      success:function(res){
        context.setState({currentFlag:[]});
        context.setState({searchQueryService:''});
        context.setState({selectedAccount:[]});
        context.setState({hideStatus:''});
        context.getSessions();
        context.getServices();
        context.checkForSuccessAlert();
      },
      error: function(err) {
      }
    });
   }
   render(){
     let FlagStatus = '';
     let statusFlag = '';
     if(this.state.hideStatus != '' && this.state.searchQueryService != '') {
       FlagStatus = (<div><p style={{fontSize: '12px', fontFamily: 'arial'}}><strong>{this.state.searchQueryService} : {this.state.hideStatus}</strong></p></div>);
       if(this.state.hideStatus == 'Enabled') {
         statusFlag = 'Disable';
       } else if(this.state.hideStatus == 'Disabled') {
         statusFlag = 'Enable';
       }
     }
     else{
       FlagStatus = '';
     }
     console.log('hhidestata',this.state.hideStatus);
     return(
       <div>
       <Grid>
         <Grid.Row>
           <Grid.Column width={1}/>
           <Grid.Column width={14}>
             <p style={{fontSize: '16px', fontFamily: 'arial'}}><b>Enable/Disable The Service</b></p>
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
                 <Dropdown onChange ={this.updateSearchQueryService.bind(this)} value = {this.state.selectedAccount} placeholder='Select Service to be archived for Session' fluid multiple search selection options={this.state.serviceArray} required/>
               </Form.Field>
               </Form.Field>
             {FlagStatus}
             <p style={{fontSize: '12px', fontFamily: 'arial'}}>Press Toggle to enable/disable a Service</p>
        </Form>
           {(this.state.hideStatus == '' ) ? <Grid.Column width={1}><Button style={{marginTop: '10px'}} fluid color='green'  onClick={this.toggleService}>Toggle</Button></Grid.Column>:
           <Grid.Column width={1}><Button style={{marginTop:'10px'}} fluid color='green'  onClick={this.toggleService}>{statusFlag}</Button></Grid.Column>}
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
module.exports = ArchiveService;
 
