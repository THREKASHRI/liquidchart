import React from 'react';
import {Form, Grid, Button, Divider, Dropdown} from 'semantic-ui-react';
import 'react-table/react-table.css';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
export default class AddComponent extends React.Component {
  constructor() {
    super();
    this.createNewConcept = this.createNewConcept.bind(this);
    this.state = {
      flag: 0
    };
    this.addNewComponent = this.addNewComponent.bind(this);
    this.checkForEmptyAlert = this.checkForEmptyAlert.bind(this);
    this.checkForAddNewComponentAlert = this.checkForAddNewComponentAlert.bind(this);
  }
  checkForEmptyAlert() {
    this.refs.asd.error(
      'Please fill all the fields',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }
  checkForAddNewComponentAlert() {
    this.refs.asd.success(
      'New session added successfully',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }
  category(e, a) {
    let res = a.value;
    this.setState({Category: res});
  }
  createNewConcept(e) {
    let name = this.refs.newComponentName.value;
    if(name === '') {
      this.checkForEmptyAlert();
      name = '';
    }
    else{
      this.addNewComponent(name);}
    }
    addNewComponent(name) {
      let context = this;
      $.ajax({
        url: '/admin/addNewSession',
        type: 'POST',
        data: {SessionName: name},
        success: function(response)
        {
          context.checkForAddNewComponentAlert();
          this.refs.newComponentName.value = '';
        }.bind(this),
        error: function(err)
        {
        }.bind(this)
      });
    }
    render() {
      return (
        <div>
          <Grid>
            <Grid.Row>
              <Grid.Column width={1}/>
              <Grid.Column width={14}>
                <p style={{fontSize:'16px',fontFamily:'arial'}}><b>Add new session</b></p>
                <Form>
                  <Form.Field>
                    <label>
                      <p style={{fontSize:'14px',fontFamily:'arial'}}>Name</p>
                    </label>
                    <input autoComplete='off' type='text' ref='newComponentName' placeholder='session Name' required/>
                  </Form.Field>
                </Form>
                <Grid.Column width={8}><Button style={{marginTop: '10px'}} fluid color='green' onClick={this.createNewConcept}>Add</Button></Grid.Column>
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
