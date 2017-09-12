import React from 'react';
import {Form, Grid, Button, Icon, Divider, TextArea, Dropdown, Snackbar, Dimmer, Header} from 'semantic-ui-react';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
class DeleteUser extends React.Component {
  constructor(props) {
    super(props);
    this.deleteUser = this.deleteUser.bind(this);
    this.updatesearchQueryUser = this.updatesearchQueryUser.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.checkForDeletedUserAlert = this.checkForDeletedUserAlert.bind(this);
    this.state = {
      users : [],
      searchQueryUser:'',
      duModal: false
    }
  }
  componentWillMount(){
    this.getAllUsers();
  }
  updatesearchQueryUser(e,a) {
    if(a.value != null){
      let res = a.value;
      this.setState({
        searchQueryUser: res
      });//console.log("searchquerdomain"+this.state.searchQueryUser+'ncjdcbhd'+res);
    }
  }
  getAllUsers(){
    let context = this;
    let arr = [];
    $.ajax({
      url:"/admin/getUsers",
      type:'GET',
      success: function(data)
      {
        //console.log('in delete user'+Object.keys(data));
        //console.log(JSON.stringify(data));
        for(let k=0;k<data.length;k++) {
          //console.log("xxxx ",data[k].userName);
          if(k !== null) {
            arr.push({key: data[k].empId, value: data[k].empId, text: data[k].userName});
          }
        }
        context.setState({users: arr});
      }.bind(this),
      error: function(err)
      {
        //console.log('error occurred on AJAX');
      }.bind(this)
    });
  }
  checkForDeletedUserAlert() {
    //console.log("inside check for deleted user alert");
    let context = this;
    this.refs.asd.success(
      'User deleted',
      '', {
      timeOut: 3000,
      extendedTimeOut: 3000
    }
  );
  }
  deleteUser(){
    this.setState({duModal:true});
  }
  handleNoDeleteUserClick(){
    this.setState({duModal:false});
  }
  handleYesDeleteUserClick() {
    let context = this;
    context.setState({duModal:false});
    $.ajax({
      url:"/admin/deleteUser",
      type:'POST',
      data:{empid:this.state.searchQueryUser},
      success: function(data)
      {
        // alert('deleted user');
        context.checkForDeletedUserAlert();
        context.setState({
          searchQueryUser: ''
        });
        context.getAllUsers();
      }.bind(this),
      error: function(err)
      {
        //console.log('error occurred on AJAX');
      }.bind(this)
    });
  }
  render() {
    return(
      <div>
        <Dimmer active={this.state.duModal} onClickOutside={this.handleNoDeleteUserClick.bind(this)} page style={{fontSize:'130%'}}>
          <Header icon='trash outline' content='Delete user' style={{color:'white',marginLeft:'35%'}}/>
          <p style={{marginRight:'3.2%'}}>Do you want to delete this user?</p>
          <Button color='red' inverted onClick={this.handleNoDeleteUserClick.bind(this)} style={{marginLeft:'10%',marginRight:'1%'}}>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' inverted onClick={this.handleYesDeleteUserClick.bind(this)}>
            <Icon name='checkmark' /> Yes
          </Button>
        </Dimmer>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}/>
            <Grid.Column width={14}>
              <p style={{fontSize:"16px",fontFamily:"arial"}}><b>Delete User</b></p>
              <Form>
                <Form.Field>
                  <label>
                    <p style={{fontSize:"14px",fontFamily:"arial"}}>Select User</p>
                  </label>
                  <Dropdown onChange={this.updatesearchQueryUser.bind(this)} placeholder='Select the user to be removed'  fluid search selection options={this.state.users}/>
                </Form.Field>
              </Form>
              <Grid.Column width={8}><Button style={{marginTop:"10px"}} fluid color='green' onClick={this.deleteUser}>Delete</Button></Grid.Column>
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
module.exports = DeleteUser;
