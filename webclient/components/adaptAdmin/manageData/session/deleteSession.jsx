import React from 'react';
import {Form, Grid, Button, Icon, Divider, Dropdown, Dimmer, Header} from 'semantic-ui-react';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
export default class DeleteComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      componentArray: [],
      searchComponent: [],
      description: '',
      dcModal: false
    };
    this.deleteComponent = this.deleteComponent.bind(this);
    this.updateComponent = this.updateComponent.bind(this);
    this.checkForRemovedComponentAlert = this.checkForRemovedComponentAlert.bind(this);
    this.checkForNoComponentAlert = this.checkForNoComponentAlert.bind(this);
  }
  componentWillMount() {
    this.getAllComponents();
  }
  checkForRemovedComponentAlert() {
    this.refs.asd.success(
      'Removed component successfully',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }
  checkForNoComponentAlert() {
    this.refs.asd.warning(
      'No component to delete',
      '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
  }
  getAllComponents() {
    let domainArray = [];
    $.ajax({
      url: '/admin/sessionNames',
      type: 'GET',
      success: function(data) {
          // console.log("session ",data);
        for (let i in data) {
          domainArray.push({key: data[i], value: data[i], text: data[i]});
        }
        this.setState({componentArray: domainArray});
      }.bind(this),
      error: function(err) {
      }.bind(this)
    });
  }
  deleteComponent() {
    this.setState({dcModal: true});
  }
  handleNoDeleteComponentClick() {
    this.setState({dcModal: false});
  }
  handleYesDeleteComponentClick() {
    let context = this;
    context.setState({dcModal: false});
    if (this.state.searchQuery) {
      $.ajax({
        url: '/admin/deletesession',
        type: 'POST',
        data: {
          sessionName: this.state.searchQuery
        },
        success: function(response) {
          context.checkForRemovedComponentAlert();
          this.setState({
            description: ''
          });
          context.getAllComponents();
          this.setState({description: ''});
          this.getAllComponents();
        }.bind(this),
        error: function(err) {
        }.bind(this)
      });
    }
  }
  updateComponent(e, a) {
    if (a.value !== null) {
      let res = a.value;
      let context = this;
      this.setState({searchQuery: res});
      $.ajax({
        url: '/admin/viewComponentDetails',
        type: 'POST',
        data: {searchQuery: res},
        success: function(dataDB)
        {
          let data = dataDB.records[0]._fields[0].properties;
          context.setState({description: data.description});
        }.bind(this),
        error: function(err)
        {
        }.bind(this)
      });
    }
  }
  render() {
    let desc = '';
    if(this.state.description !== '') {
      desc = (<div><p style={{fontSize:'12px',fontFamily:'arial'}}><strong>Description:</strong></p><p style={{fontSize:'12px',fontFamily:'arial',marginLeft:'10px'}}>{this.state.description}</p></div>);
    }
    return (
      <div>
        <Dimmer active={this.state.dcModal} onClickOutside={this.handleNoDeleteComponentClick.bind(this)} page style={{fontSize: '130%'}}>
          <Header icon='trash outline' content='Delete component' style={{color: 'white', marginLeft: '35%'}}/>
          <p style={{marginRight: '3.2%'}}>Are you sure you want to delete the selected session?</p>
          <Button color='red' inverted onClick={this.handleNoDeleteComponentClick.bind(this)} style={{marginLeft: '10%', marginRight: '1%'}}>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' inverted onClick={this.handleYesDeleteComponentClick.bind(this)}>
            <Icon name='checkmark' /> Yes
          </Button>
        </Dimmer>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}/>
            <Grid.Column width={14}>
              <p style={{fontSize: '16px', fontFamily: 'arial'}}><b>Delete Session</b></p>
              <Form>
                <Form.Field>
                  <label>
                    <p style={{fontSize: '14px', fontFamily: 'arial'}}>Session</p>
                  </label>
                  <Dropdown onChange={this.updateComponent} placeholder='Select the session to be removed' fluid search selection options={this.state.componentArray} required/>
                </Form.Field>
                {desc}
              </Form>
              <Grid.Column width={8}>
                <Button color='green' style={{marginTop: '10px'}} fluid onClick={this.deleteComponent}>Delete</Button>
              </Grid.Column>
              <Divider/>
            </Grid.Column>
            <Grid.Column width={1}/>
          </Grid.Row>
        </Grid>
        <ToastContainer ref='asd'
          toastMessageFactory={ToastMessageFactory}
          className='toast-top-center' style={{marginTop: '8%'}} />
        </div>
      );
    }
  }
