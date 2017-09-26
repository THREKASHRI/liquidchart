// import React from 'react';
// import {Form, Grid, Button, Divider, Dropdown} from 'semantic-ui-react';
// const ReactToastr = require('react-toastr');
// const {ToastContainer} = ReactToastr;
// const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
//
// class ArchiveService extends React.Component{
//   constructor(){
//     super();
//     this.state ={
//       sessionArray:[],
//       serviceArray:[],
//       serviceDescription :[],
//       searchQuerySession:'',
//       searchQueryService:[],
//       selectedAccount:[],
//       currentFlag: ''
//     }
//   //  this.checkForSuccessAlert = this.checkForSuccessAlert.bind(this);
//   //  this.checkForErrorAlert = this.checkForErrorAlert.bind(this);
//   }
//   componentWillMount(){
//     this.getSessions();
//     this.getServices();
//   }
//   getSessions(){
//     let context = this;
//     let sessions = [];
//     let sesionsKeyPair = [];
//     $.ajax({
//       url:'helpDeskAdmin/getAllSessions',
//       type:'GET',
//       success:function(data){
//         console.log('getSessions',data);
//         data.map((item)=>{
//           sessions.push({content:item.name});
//         })
//         sessions.map((item)=>{
//           sesionsKeyPair.push({key:item.content,value:item.content,text:item.content})
//         })
//         context.setState({sessionArray:sesionsKeyPair}, function(){
//           console.log('sessionArray',this.state.sessionArray);
//         })
//       }
//     })
//   }
//   getServices(){
//   let context = this;
//   let servicesNames = [];
//   let serviceDes =[];
//   let keyPair =[];
//   $.ajax({
//     url:'helpDeskAdmin/adminViewServiceDetails',
//     type:'GET',
//     success:function(data){
//       console.log('getServicesCost',data);
//       data.map((item)=>{
//
//          servicesNames.push({content:item.name});
//          serviceDes.push({name:item.name, description:item.description})
//       })
//       servicesNames.map((item)=>{
//         keyPair.push({key:item.content,value:item.content,text:item.content});
//       }
//     )
//       context.setState({serviceArray:keyPair}, function(){
//         console.log('serviceArray',this.state.serviceArray);
//       });
//       context.setState({serviceDescription:serviceDes},function(){
//         console.log('serviceDescription',this.state.serviceDescription);
//       })
//
//     }
//   })
//   }
//   updateSearchQuerySession(e,a) {
//     console.log("bye");
//     console.log('sssssss',a.value);
//     let context = this;
//     if(a.value!=null){
//       let res = a.value;
//       console.log('res printed', res);
//       let arr = Object.keys(res).map(function(key) {
//         return res[key];
//       });
//       console.log('arr', arr);
//       context.setState({searchQuerySession: res});
//     }
//     }
//     updateSearchQueryService(e, a) {
//       let res = a.value;
//       console.log('res value in service',res);
//       let arr = Object.keys(res).map(function(key) {
//         console.log('res key is printed in service',res[key]);
//         return (res[key]);
//       });
//       this.setState({searchQueryService: arr, selectedAccount: arr}, function() {
//         console.log('searchQueryService',this.state.searchQueryService);
//         console.log('selectedAccount',this.state.selectedAccount);
//       });
//     }
//   render(){
//     return(
//       <div>
//       <Grid>
//         <Grid.Row>
//           <Grid.Column width={1}/>
//           <Grid.Column width={14}>
//             <p style={{fontSize: '14px', fontFamily: 'arial'}}><b>Toggle Services For  Sessions </b></p>
//             <Form>
//               <Form.Field>
//                 <label>
//                   <p style={{fontSize: '14px', fontFamily: 'arial'}}>Session</p>
//                 </label>
//                 <Dropdown onChange={this.updateSearchQuerySession.bind(this)} placeholder='Select the session' fluid search selection options={this.state.sessionArray} required/>
//               </Form.Field>
//               <Form.Field>
//                 <label>
//                   <p style={{fontSize: '14px', fontFamily: 'arial'}}>Service</p>
//                 </label>
//                 <Dropdown onChange ={this.updateSearchQueryService.bind(this)} value = {this.state.selectedAccount} placeholder='Select Service to be linked to Session' fluid multiple search selection options={this.state.serviceArray} required/>
//               </Form.Field>
//
//             </Form>
//
//           {(this.state.currentFlag == '' ) ?   <Grid.Column width={8}>
//               <Button style={{marginTop: '10px'}} color='green' fluid >{statusFlag}</Button>
//             </Grid.Column>}
//             <Divider/>
//           </Grid.Column>
//           <Grid.Column width={1}/>
//         </Grid.Row>
//       </Grid>
//       <ToastContainer ref='asd'
//         toastMessageFactory={ToastMessageFactory}
//         className='toast-top-center' style={{marginTop: '8%'}}/>
//
//       </div>
//     )
//   }
// }
// module.exports = ArchiveService;
