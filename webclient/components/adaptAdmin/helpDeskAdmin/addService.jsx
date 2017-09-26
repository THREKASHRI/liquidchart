import React from 'react';
import {Form, Grid, Button, Divider} from 'semantic-ui-react';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

class addService extends React.Component{
  constructor(){
    super()
    this.validateData = this.validateData.bind(this);
    this.addNewService = this.addNewService.bind(this);
    this.checkForEmptyAlert = this.checkForEmptyAlert.bind(this);
    this.checkForonlyAlphabetsAlert = this.checkForonlyAlphabetsAlert.bind(this);
    this.checkForaddedNewServiceAlert = this.checkForaddedNewServiceAlert.bind(this);
    this.checkForEnterProperDescriptionAlert = this.checkForEnterProperDescriptionAlert.bind(this);
  }
  //  @aswini.h : Alert for empty fields
  checkForEmptyAlert() {
    this.refs.asd.error(
      'Please fill all the fields',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }
  checkForonlyAlphabetsAlert() {
    this.refs.asd.error(
      'Only alphabets allowed in Employee name',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }
  checkForaddedNewServiceAlert() {
    this.refs.asd.success(
      'New service added successfully',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }
  checkForEnterProperDescriptionAlert() {
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
    let name = this.refs.newServiceN.value;
    let description = this.refs.newServiceD.value;
    if(name === '' || description === '' ) {
      this.checkForEmptyAlert();
    }
    else{
      this.addNewService(name, description);
    }
  }


  //  @aswini.h : Adding a new service
  addNewService(name, description) {
    let context = this;
    $.ajax({
      url: '/helpDeskAdmin/adminAddService',
      type: 'POST',
      data: {name: name, description: description},
      success: function(response)
      {
        context.checkForaddedNewServiceAlert();
        this.refs.newServiceN.value = '';
        this.refs.newServiceD.value = '';
      }.bind(this),
      error: function(err)
      {
      }.bind(this)
    });
  }

  render(){
    return(
      <div>

        <Grid>
          <Grid.Row>
            <Grid.Column width={1}/>
            <Grid.Column width={14}>
              <p style={{fontSize: '16px', fontFamily: 'arial'}}><b>Add new service</b></p>
              <Form>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Name</p>
                  </label>
                  <input autoComplete='off' type='text' ref='newServiceN' placeholder='Name' required/>
                </Form.Field>

                <label>
                  <p style={{fontSize: '14px', fontFamily: 'arial'}}>Description</p>
                  <textarea style={{width: '960px'}} ref='newServiceD' placeholder='Service Description' required/>
                </label>
              </Form>
              <Grid.Column width={6}><Button style={{marginTop: '10px'}} fluid color='green' onClick={this.validateData}>Add</Button></Grid.Column>
              <Divider/>
            </Grid.Column>
            <Grid.Column width={1}/>
          </Grid.Row>
        </Grid>
        <ToastContainer ref='asd'
          toastMessageFactory={ToastMessageFactory}
          className='toast-top-center' style={{marginTop: '8%'}}/>
        </div>


    );
  }
}

module.exports = addService;
