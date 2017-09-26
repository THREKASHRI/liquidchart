import React from 'react';
import {Form, Grid, Button, Divider, Dropdown} from 'semantic-ui-react';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

class EditService extends React.Component {
  constructor()
  {
    super();
    this.state = {
      serviceArray :[],
  modifiedServiceN: '',
    modifiedServiceD:'',
    desData:[],
    latestDesc:'',
    name : '',
    searchedQuery : ''
    }
      this.updateName = this.updateName.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
    this.adminViewServiceDetails = this.adminViewServiceDetails.bind(this);
  this.updateService =  this.updateService.bind(this);
  };
  checkForServiceUpdatedSuccessfullyAlert() {
    this.refs.asd.success(
      'service updated successfully',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }
  checkForServiceUpdatedErrorAlert() {
    this.refs.asd.warning(
      'empty fields',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }
  updateName(e) {
    this.setState({name: e.target.value});
  }
  updateDescription(e) {
    this.setState({latestDesc: e.target.value});
  }



editService(){

  console.log('in edit service peacock');
  let context = this;
  console.log('in edit service',context.state.latestDesc);
  if(this.state.searchedQuery == '' ||  this.refs.modifiedServiceN.value == '' || this.state.latestDesc == ''){
    context.checkForServiceUpdatedErrorAlert();
  }
else{
  $.ajax({
    url:'/helpDeskAdmin/adminEditService',
    type:'POST',
    data:{name:this.state.searchedQuery, newname: this.refs.modifiedServiceN.value, description: this.state.latestDesc},
    success: function(res){
        context.checkForServiceUpdatedSuccessfullyAlert();
      context.setState({
        id:'',
        name:'',
        description:''
      });
      context.adminViewServiceDetails();
    }.bind(this),
    error:function(err){
      console.log('err');
    }.bind(this)
  });
}
}

  componentWillMount(){
    console.log("inside edit service !!!!!!!!!!!");
    this.adminViewServiceDetails();
  // this.updatService();
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
        console.log('editservicffffe',data);
        for (let i = 0; i < data.length; i = i + 1) {
          array.push({content: data[i].name});
          console.log('contnt of array',array);
          des.push({name:data[i].name,description:data[i].description});
        }
        for (let k = 0; k < array.length; k = k + 1) {
          arrayadd.push({key: array[k].content, value: array[k].content, text:array[k].content});

        }
      context.setState({serviceArray:arrayadd},function(){
        console.log('serviceArray',this.state.serviceArray);
              })
              context.setState({desData:des});
    }.bind(this),
    error:function(err){
      console.log(err);
    }.bind(this)
  });
  }

updateService(e,a){

if(a.value!= null) {
  let res = a.value;
 this.setState({name: res});
 this.setState({searchedQuery: res});
     for(let i in this.state.desData){
       if( res == this.state.desData[i].name){
     this.setState({latestDesc:this.state.desData[i].description});
         console.log(this.state.desData[i].description);
       }
     }
}
console.log('inside upda  te service',this.state.searchedQuery);
}
  render()
  {console.log('set desccccccccccccc'+this.state.searchedQuery);
    return(

      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}/>
            <Grid.Column width={14}>
              <p style={{fontSize: '16px', fontFamily: 'arial'}}><b>Modify Existing Service</b></p>
              <Form>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Service to be modified</p>
                  </label>
                  <Dropdown onChange={this.updateService} placeholder='Select the Service to be modified' fluid search selection options={this.state.serviceArray}/>
                </Form.Field>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Service name</p>
                  </label>
                  <input autoComplete='off' type='text' value={this.state.name} onChange={this.updateName} ref='modifiedServiceN' placeholder='New Name' required/>
                </Form.Field>


                <label>
                  <p style={{fontSize: '14px', fontFamily: 'arial'}}>Description</p>
                  <textarea ref='modifiedServiceD' style={{width: '960px'}} value={this.state.latestDesc} onChange={this.updateDescription}  placeholder='Type New Service Description' required/>
                </label>
              </Form>
              <Grid.Column width={8}><Button style={{marginTop: '10px'}} fluid color='green' onClick={this.editService.bind(this)}>Modify</Button></Grid.Column>
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

module.exports = EditService;
