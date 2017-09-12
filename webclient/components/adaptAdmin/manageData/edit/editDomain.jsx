import React from 'react';
import {Form, Grid, Button, Icon, Divider, TextArea, Dropdown} from 'semantic-ui-react';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
export default class EditDomain extends React.Component {
  constructor(props) {
    super();
    this.state = {
      domainArray: [],
      searchComponent: [],
      searchQuery: '',
      modifiedDoaminN: '',
      video: '',
      modifiedDomainD: '',
      domainId: '',
    }
    this.updateComponent = this.updateComponent.bind(this);
    this.updateProperty = this.updateProperty.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updatevideo = this.updatevideo.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.checkForDomainUpdatedSuccessfullyAlert = this.checkForDomainUpdatedSuccessfullyAlert.bind(this);
  };

  updateName(e) {
    //console.log("inside name change", e);
    this.setState({name: e.target.value});
  }
  updatevideo(e) {
    //console.log("inside successmsg change", e);
    this.setState({video: e.target.value});
  }
  updateDescription(e) {
    //console.log("inside description change", e);
    this.setState({description: e.target.value});
  }
  checkForDomainUpdatedSuccessfullyAlert() {
    //console.log("inside check for Customer journey updated succesfully alert");
    let context = this;
    this.refs.asd.success(
      'Customer Journey updated succesfully',

      '', {
      timeOut: 3000,
      extendedTimeOut: 3000
    }
  );
  }

  updateProperty() {

    var data = {
      description : this.state.description,
      name : this.state.name,
      video : this.state.video,
      domainId : this.state.domainId
    }
    let context = this;
    $.ajax({
      url:"/admin/updateDomain",
      type:'POST',
      data:data,
      success: function(data) {
        //console.log(data);
        // alert("domain updated succesfully");
        context.checkForDomainUpdatedSuccessfullyAlert();
        context.setState({description : '',
        name : '',
        video : '',
        componentId : ''});
        context.getAllDomain();
      }.bind(this),
      error: function(err)
      {
        //console.log('error occurred on AJAX');
      }.bind(this)
    });
  }
  componentWillMount(){
    this.getAllDomain();
  }
  getAllDomain() {
    let context = this;
    let arrOfComponent = [];
    let arrayadd = [];
    $.ajax({
      url: '/admin/getAllDomain',
      type: 'GET',
      success: function(res) {
        for (let i = 0; i < res.records.length; i++) {
          arrOfComponent.push({content: res.records[i]._fields[0].properties.name});
        }
        for (var k = 0; k < arrOfComponent.length; k++) {
          arrayadd.push({key: arrOfComponent[k].content, value: arrOfComponent[k].content, text: arrOfComponent[k].content});
        }
        //console.log(" from second for ",arrayadd);
        context.setState({domainArray: arrayadd});
      },
      error: function(err) {
        //console.log('error is ', err);
      }
    });
  }

  updateComponent(e, a) {

    if (a.value != null) {
      let res = a.value;
      let arr1 = [];
      let result = [];
      let ress = [];
      let context= this;
      this.setState({searchQuery: res});
      $.ajax({
        url:"/admin/viewDomainDetails",
        type:'POST',
        data:{searchQuery:res},
        success: function(dataDB)
        {
          var data = dataDB.records[0]._fields[0].properties;
          //console.log('The data is :',dataDB.records[0]._fields[0].identity.low);
          context.setState({domainId:dataDB.records[0]._fields[0].identity.low})
          context.setState({name:data.name,description:data.description,video:data.video});
        }.bind(this),
        error: function(err)
        {
          //console.log('error occurred on AJAX');
        }.bind(this)
      });
    }
  }


  render() {
    //console.log('in add Scenario');
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}/>
            <Grid.Column width={14}>
              <p style={{fontSize:"16px",fontFamily:"arial"}}><b>Modify existing customer journey</b></p>
              <Form>
                <Form.Field>
                  <label>
                    <p style={{fontSize:"14px",fontFamily:"arial"}}>Customer journey</p>
                  </label>
                  <Dropdown onChange={this.updateComponent} placeholder='Select the Customer journey to be changed' fluid search selection options={this.state.domainArray}/>
                </Form.Field>
                <Form.Field>
                  <label>

                    <p style={{fontSize:"14px",fontFamily:"arial"}}>Customer journey name</p>

                  </label>
                  <input autoComplete='off' type='text' value={this.state.name} onChange={this.updateName} ref='modifiedDomainN' placeholder='New Name' required/>
                </Form.Field>
                <Form.Field>
                  <label>
                    <p style={{fontSize:"14px",fontFamily:"arial"}}>Video</p>
                  </label>
                  <input autoComplete='off' type='text' value={this.state.video} onChange={this.updatevideo} ref='video' placeholder='video link' required/>
                </Form.Field>
                <label>
                  <p style={{fontSize:"14px",fontFamily:"arial"}}>Description</p>
                  <textarea ref='modifiedDomainD' style={{width:'960px'}} onChange={this.updateDescription} placeholder='Type new Component Description' value={this.state.description} required/>
                </label>
              </Form>

              <Grid.Column width={8}><Button style={{marginTop:"10px"}} fluid color='green'  onClick={this.updateProperty}>Modify</Button></Grid.Column>
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
