import React from 'react';
import {Form, Grid, Button, Icon, Divider, TextArea, Dropdown} from 'semantic-ui-react';
import Axios from 'axios';
import Snackbar from 'material-ui/Snackbar';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
export default class AddDomain extends React.Component {
  constructor(props) {
    super();
    this.validateData = this.validateData.bind(this);
    this.addNewDomain = this.addNewDomain.bind(this);
    this.checkForEmptyAlert = this.checkForEmptyAlert.bind(this);
    this.checkForonlyAlphabetsAlert = this.checkForonlyAlphabetsAlert.bind(this);
    this.checkForaddedNewDomainAlert = this.checkForaddedNewDomainAlert.bind(this);
    this.checkForEnterProperDescriptionAlert = this.checkForEnterProperDescriptionAlert.bind(this);

  };
  checkForEmptyAlert() {
    //console.log("inside check for Empty alert");
    let context = this;
    this.refs.asd.error(
      'Please fill all the fields',
      '', {
      timeOut: 3000,
      extendedTimeOut: 3000
    }
  );
  }

  checkForonlyAlphabetsAlert() {
    //console.log("inside check for only alphabets alert");
    let context = this;
    this.refs.asd.error(
      'Only alphabets allowed in Employee name',
      '', {
      timeOut: 3000,
      extendedTimeOut: 3000
    }
  );
  }

  checkForaddedNewDomainAlert() {
    //console.log("inside check for added new domain alert");
    let context = this;
    this.refs.asd.success(
      'New Customer Journey added successfully',
      '', {
      timeOut: 3000,
      extendedTimeOut: 3000
    }
  );
  }

  checkForEnterProperDescriptionAlert() {
    //console.log("inside check for Enter proper description alert");
    let context = this;
    this.refs.asd.error(
      'Enter the right description',
      '', {
      timeOut: 3000,
      extendedTimeOut: 3000
    }
  );
  }
  validateData(e) {
    e.preventDefault();
    let name = this.refs.newDomainN.value;
    let description =this.refs.newDomainD.value;
    let video = this.refs.video.value;
    if(name === '' || description ==='' || video ===''){
      // alert('Empty fields');
      this.checkForEmptyAlert();
    }
    else{
      this.addNewDomain(name, description, video);
    }
  }
  addNewDomain(name, description, video){
    let context = this;
    let DomainName = this.refs.newDomainN.value;
    let desc = this.refs.newDomainD.value;
    $.ajax({
      url:"/admin/addNewDomain",
      type: 'POST',
      data:{domainName :name,domainDescription:description,video:video},
      success: function(response)
      {
        // alert('Added new Domain');
        context.checkForaddedNewDomainAlert();
        this.refs.newDomainN.value = '';
        this.refs.newDomainD.value = '';
        this.refs.video.value = '';
      }.bind(this),
      error: function(err)
      {
        //console.log('error occurred on AJAX');
      }.bind(this)
    });
}

render() {//console.log('in add domain');
return (
  <div>
    <Grid>
      <Grid.Row>
        <Grid.Column width={1}/>
        <Grid.Column width={14}>
            <p style={{fontSize:"16px",fontFamily:"arial"}}><b>Add new customer journey</b></p>
          <Form>
            <Form.Field>
              <label>
                <p style={{fontSize:"14px",fontFamily:"arial"}}>Name</p>
              </label>
              <input autoComplete='off' type='text' ref='newDomainN' placeholder='Name' required/>
            </Form.Field>
            <Form.Field>
              <label>
                <p style={{fontSize:"14px",fontFamily:"arial"}}>Video link</p>
              </label>
              <input autoComplete='off' type='text' ref='video' placeholder='video link' required/>
            </Form.Field>
            <label>
              <p style={{fontSize:"14px",fontFamily:"arial"}}>Description</p>
              <textarea style={{width:'960px'}} ref='newDomainD' placeholder='customer journey Brief' required/>
            </label>
          </Form>
          <Grid.Column width={6}><Button style={{marginTop:"10px"}} fluid color='green' onClick={this.validateData}>Add</Button></Grid.Column>
          <Divider/>
        </Grid.Column>
        <Grid.Column width={1}/>
      </Grid.Row>
    </Grid>
    <ToastContainer ref='asd'
      toastMessageFactory={ToastMessageFactory}
      className='toast-top-center' style={{marginTop:'8%'}}/>
  </div>
);
}
}
