 import React from 'react';
import {
  Form,
  Grid,
  Button,
  Icon,
  Divider,
  TextArea,
  Dropdown,
  Dimmer,
  Header
} from 'semantic-ui-react';
import Axios from 'axios';
import Snackbar from 'material-ui/Snackbar';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
export default class DeleteComponent extends React.Component {
  constructor(props) {
    super();
    this.state = {
      componentArray: [],
      searchComponent: [],
      description: '',
      dcModal:false
    }
    this.deleteComponent = this.deleteComponent.bind(this);
    this.updateComponent = this.updateComponent.bind(this);
    this.checkForRemovedComponentAlert = this.checkForRemovedComponentAlert.bind(this);
    this.checkForNoComponentAlert = this.checkForNoComponentAlert.bind(this);
  };

  componentWillMount(){
    this.getAllComponents();
  }
  checkForRemovedComponentAlert() {
    //console.log("inside check for Removed component alert");
    let context = this;
    this.refs.asd.success(
      'Removed component successfully',
      '', {
      timeOut: 3000,
      extendedTimeOut: 3000
    }
  );
  }
  checkForNoComponentAlert() {
    //console.log("inside check for No Removed component alert");
    let context = this;
    this.refs.asd.warning(
      'No component to delete',
      '', {
      timeOut: 3000,
      extendedTimeOut: 3000
    }
  );
  }
  getAllComponents() {
    let context = this;
    let arrOfComponent = [];
    let arrayadd = [];
    $.ajax({
      url: '/component/getAllComponents',
      type: 'GET',
      success: function(res) {
        //console.log('data from neo ', res);
        for (let i = 0; i < res.records.length; i++) {
          arrOfComponent.push({content: res.records[i]._fields[0].properties.name});
        }
        for (var k = 0; k < arrOfComponent.length; k++) {
          arrayadd.push({key: arrOfComponent[k].content, value: arrOfComponent[k].content, text: arrOfComponent[k].content});
        }
        if(arrayadd.length == 0){
          // alert("no component");
          context.checkForNoComponentAlert();
        }
        else{
        context.setState({componentArray: arrayadd});
        }
      },
      error: function(err) {
        //console.log('error is ', err);
      }
    });
  }

  deleteComponent() {
    this.setState({dcModal:true});
  }
  handleNoDeleteComponentClick() {
    this.setState({dcModal:false});
  }
  handleYesDeleteComponentClick() {
    let context = this;
    context.setState({dcModal:false});
    //console.log("component set state" + this.state.searchQuery);
    if (this.state.searchQuery) {
      $.ajax({
        url: "/admin/deleteComponent",
        type: 'POST',
        data: {
          componentName: this.state.searchQuery
        },
        success: function(response) {
          // alert('Removed component');
          context.checkForRemovedComponentAlert();

          this.setState({
            description: ''
          });
          context.getAllComponents();

          this.setState({description:''});
          this.getAllComponents();

        }.bind(this),
        error: function(err) {
          //console.log('error occurred on AJAX');
        }.bind(this)
      });
    }
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
         url:"/admin/viewComponentDetails",
         type:'POST',
         data:{searchQuery:res},
        success: function(dataDB)
        {
          var data = dataDB.records[0]._fields[0].properties;
          //console.log('The data is :',data.category);
          context.setState({description:data.description});
        }.bind(this),
        error: function(err)
        {
          //console.log('error occurred on AJAX');
        }.bind(this)
      });
    }
  }

  render() {
    //console.log('in del com');
    let desc = '';
    if(this.state.description != '') {
      desc = (<div><p style={{fontSize:"12px",fontFamily:"arial"}}><strong>Description:</strong></p><p style={{fontSize:"12px",fontFamily:"arial",marginLeft:"10px"}}>{this.state.description}</p></div>);
    }
    //  const optionSample = [{ key: 'one', value: 'One',text:'one' },{ key: 'two', value: 'Two',text:'one'},{ key: 'three', value: 'Three',text:'one'}];
    // const defaultOption = optionSample[0];
    return (
      <div>
        <Dimmer active={this.state.dcModal} onClickOutside={this.handleNoDeleteComponentClick.bind(this)} page style={{fontSize:'130%'}}>
          <Header icon='trash outline' content='Delete component' style={{color:'white',marginLeft:'35%'}}/>
          <p style={{marginRight:'3.2%'}}>Are you sure you want to delete the selected component?</p>
          <Button color='red' inverted onClick={this.handleNoDeleteComponentClick.bind(this)} style={{marginLeft:'10%',marginRight:'1%'}}>
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
              <p style={{fontSize:"16px",fontFamily:"arial"}}><b>Delete Component</b></p>
              <Form>
                <Form.Field>
                  <label>
                    <p style={{fontSize:"14px",fontFamily:"arial"}}>Component</p>
                  </label>
                  <Dropdown onChange={this.updateComponent} placeholder='Select the component to be removed' fluid search selection options={this.state.componentArray} required/>
                </Form.Field>
                {desc}
              </Form>

              <Grid.Column width={8}>
                <Button color='green' style={{marginTop:"10px"}} fluid onClick={this.deleteComponent}>Delete</Button>
              </Grid.Column>
              <Divider/>
            </Grid.Column>
            <Grid.Column width={1}/>
          </Grid.Row>
        </Grid>
        <ToastContainer ref='asd'
          toastMessageFactory={ToastMessageFactory}
          className='toast-top-center' style={{marginTop:'8%'}} />
      </div>
    );
  }
}
