import React, {Component} from 'react';
const {Link} = require('react-router');
const {hashHistory} = require('react-router');
import {Dropdown, Button, Dimmer, Card, Grid, Loader, Header} from 'semantic-ui-react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
var logoSize = {
  width: '40%'
}
class MenuExampleContentProp extends Component {
  constructor() {
    super();
    this.state = {
      domain: '',
      deployCodeModal: false,
      sprint1DisabledStatus: true,
      sprint2DisabledStatus: true,
      sprint3DisabledStatus: true,
      sprint4DisabledStatus: true,
      pushed:[],
      theCheatCode:'madhu',
      cheatCode:'',
      active:false,
      activeLoader:false
    }
    this.logOut = this.logOut.bind(this);
    this.changeDomain = this.changeDomain.bind(this);
    this.DeployCode = this.DeployCode.bind(this);
    this.checkforCodeDeployement = this.checkforCodeDeployement.bind(this);
    this.handlePressedKey = this.handlePressedKey.bind(this);
    this.handleOpenLoader = this.handleOpenLoader.bind(this);
    this.handleCloseLoader = this.handleCloseLoader.bind(this);
  }

  componentWillMount() {
    this.getSprintDetails();
    let loc = window.location.hash.substring(2);
// //console.log(loc);
    window.addEventListener("keypress", this.handlePressedKey);
  }
  handleOpenLoader() {
    this.setState({activeLoader: true});
  }
  // function to close loader after fetching data
  handleCloseLoader() {
    this.setState({activeLoader: false});
  }
  handleClose = () => {
    this.setState({active: false});
  }
  handlePressedKey(e) {
    let code = this.state.theCheatCode;
    //console.log(code,"    ddddd");
    //console.log("pushed array status: ", this.state.pushed);
    let pushedArray = this.state.pushed;
    let val = this.state.cheatCode + e.key;
      this.setState({cheatCode: val})
      //console.log(this.state.cheatCode);
    if(val == code) {
      let lastPushed = pushedArray.lastIndexOf(true);
      if(lastPushed == -1){
        this.setState({sprint1DisabledStatus: false});
      }
      if(lastPushed == 0){
        this.setState({sprint2DisabledStatus: false});
      }
      if(lastPushed == 1){
        this.setState({sprint3DisabledStatus: false});
      }
      if(lastPushed == 2){
        this.setState({sprint4DisabledStatus: false});
      }
      this.setState({cheatCode: ''});
    }else{
      this.setState({sprint1DisabledStatus: true,sprint2DisabledStatus: true,sprint3DisabledStatus: true,sprint4DisabledStatus: true});
    }
    if(e.key == 'z') {
      this.setState({cheatCode:''});
    }
  }


  checkforCodeDeployement() {
    //console.log("inside checkforCodeDeployement");
    let context = this;
    this.refs.asd.success(
      'Your code will get deployed in some time. Please check Git and Jenkins to see the deployment process.',
      '', {
      timeOut: 3000,
      extendedTimeOut: 3000
    }
  );
  }

  getSprintDetails() {
    let context = this;
    $.ajax({
      url: "/users/getSprintDetails",
      type: 'GET',
      success: function(data) {
        //console.log("in get sprint",data.records[0]._fields[0].properties);
        context.setState({pushed:data.records[0]._fields[0].properties.pushed
          // ,sprint1DisabledStatus: data.records[0]._fields[0].properties.sprint1, sprint2DisabledStatus: data.records[0]._fields[0].properties.sprint2, sprint3DisabledStatus: data.records[0]._fields[0].properties.sprint3, sprint4DisabledStatus: data.records[0]._fields[0].properties.sprint4
        });
      },
      error: function(err) {
        //console.log('error occurred on AJAX');
      }
    });
  }
  changeDomain(e) {
    this.setState({domain: e.target.value});
  }
  logOut() {
    cookies.remove('username');
    cookies.remove('userType');
    cookies.remove('empId');
    cookies.remove('loginId');
    hashHistory.push('/');
    // location.reload();
  }
  profile() {
    hashHistory.push('/profile');
  }
  tools() {
    hashHistory.push('/tools');
  }
  userDashboard() {
    hashHistory.push('/userDashboard');
  }
  clickChange() {
    this.props.restaurantData(this.state.domain);
  }
  DeployCode() {
    // //console.log('dddddddddddd');
    // this.state.sprint1DisabledStatus 2 3 4
    let context = this;
    $.ajax({
      url: '/users/getAllSprints',
      type: 'GET',
      success: function(data) {
        //console.log('dddddddddddd',data);
        data.map((item, index) => {

          //console.log("length ", item);
          //console.log("index ", index);
          if (index == 0) {
            //console.log("pushed ",item.length, context.state.pushed[0]);
            if (item.length == 12 && !context.state.pushed[0]) {
              //console.log('insisde');
              context.setState({sprint1DisabledStatus: false});
            } else {
              context.setState({sprint1DisabledStatus: true});
            }
          }
          else if (index == 1) {
            if (item.length == 13 && context.state.pushed[0] && !context.state.pushed[1]) {
              //console.log("lengthssadsads ", item.length);
              context.setState({sprint2DisabledStatus: false});
            } else {
              context.setState({sprint2D2sabledStatus: true});
            }
          }
          if (index == 2) {
            if (item.length == 12 && context.state.pushed[0] && context.state.pushed[1] && !context.state.pushed[2]) {
              context.setState({sprint3DisabledStatus: false});
            } else {
              context.setState({sprint3DisabledStatus: true});
            }
          }
          if (index == 3) {
            if (item.length == 11 && context.state.pushed[0] && context.state.pushed[1] && context.state.pushed[2] && !context.state.pushed[3]) {
              context.setState({sprint4DisabledStatus: false});
            } else {
              context.setState({sprint4DisabledStatus: true});
            }
          }
          // context.setSprintDetails();
        });
      },
      error: function(err) {
        //console.log("Error occured", err);
      }
    });
    this.setState({deployCodeModal: !this.state.deployCodeModal});
  }
  // setSprintDetails() {
  //   let data = {
  //     sprint1: this.state.sprint1DisabledStatus,
  //     sprint2: this.state.sprint2DisabledStatus,
  //     sprint3: this.state.sprint3DisabledStatus,
  //     sprint4: this.state.sprint4DisabledStatus
  //   };
  //   $.ajax({
  //     url: "/users/setSprintDetails",
  //     type: 'POST',
  //     data: data,
  //     success: function(data) {
  //       //console.log("aaaaeqrqw", data);
  //     },
  //     error: function(err) {
  //       //console.log('error occurred on AJAX');
  //     }
  //   });
  // }
  handleNodeployCodeModalClick() {
    this.setState({deployCodeModal: false});
  }
  handleOpen = () => {
    this.setState({active: true});
  }
  sprintDeploy(sprint) {
    this.setState({deployCodeModal: false});
    this.handleOpenLoader();
    let context = this;
    let url;
    //console.log(sprint);
    if(sprint == 'Sprint1'){
      url = '/trial/sprintOneDeploy';
    }
    else if(sprint == 'Sprint2'){
      url = '/trial/sprintTwoDeploy';
    }
    else if(sprint == 'Sprint3'){
      url = '/trial/sprintThreeDeploy';
    }
    else if(sprint == 'Sprint4'){
      url = '/trial/sprintFourDeploy';
    }
    $.ajax({
      url: url,
      type: 'GET',
      success: function(data) {
        //console.log("pushed successfully",data);
        context.handleCloseLoader();
        context.handleOpen();
        // context.checkforCodeDeployement();
      },
      error: function(err) {
        //console.log("Error occured", err);
      }
    });
  }
  redirectToTools() {
    this.setState({active:false,deployCodeModal:false});
    hashHistory.push("/tools");
  }
  render() {
    let welcomeUser = "";
    let landingPage;
    let profileLink;
    let userDashboardLink;
    let logOutLink;
    let greeting = '';
    let toolsLink;
    let DeployCodeLink;
    const {activeLoader} = this.state
    const {active} = this.state
    if (cookies.get('userType') == "User" || cookies.get('userType') == "Pair") {
      welcomeUser = "";
      greeting = <p id="welcomecolor" className="navbar-text">
        <span>Welcome&nbsp;&nbsp;</span>
        <b>{cookies.get('username') + welcomeUser}</b>
      </p>
      profileLink = (
        <li id="profilelink">
          <button id="pro" type="button" className="btn btn-link b1" onClick={this.profile}>Profile</button>
        </li>
      );
      toolsLink = (
        <li id="toolslink">
          <button id="pro" type="button" className="btn btn-link b1" onClick={this.tools}>Tools</button>
        </li>
      );
      DeployCodeLink = (
        <li>
          <button id="pro" type="button" className="btn btn-link b1" onClick={this.DeployCode}>DeployCode</button>
        </li>
      );
    } else if (cookies.get('userType') == "Admin") {
      welcomeUser = ' (Admin)';
      greeting = <p id="welcomecolor" className="navbar-text">
        <span>Welcome&nbsp;&nbsp;</span>
        <b>{cookies.get('username') + welcomeUser}</b>
      </p>
      profileLink = "";
    }
    // else if(cookies.get('userType') == undefined){
    //   greeting=<p id="welcomecolor" className="navbar-text" ><span>Welcome&nbsp;&nbsp;</span></p>
    //
    // }
    //User Dashboard Link
    if (cookies.get('userType') == "User" || cookies.get('userType') == "Pair") {
      userDashboardLink = (
        <li id="dashboard">
          <button id="pro" type="button" className="btn btn-link b1" onClick={this.userDashboard}>Dashboard</button>
        </li>
      );
    }

    // Logout Link
    if (cookies.get('userType') == "User" || cookies.get('userType') == "Pair" || cookies.get('userType') == "Admin") {
      logOutLink = (
        <li id="logout">
          <button id="pro" type="button" className="btn btn-link b1" onClick={this.logOut}>Logout</button>
        </li>
      );
    }
    let navInLanding = '';
    let headerLogo = (
    <div>
      <a className="navbar-brand" href="#">
        <img src="./img/adapt.png" id="logoSize"/></a>
      <a className="nav navbar-nav navbar-right" href="#">
        <img src="./img/wipro_digital.png" id="digitallogoSize"/></a>
    </div>);
    if(window.location.hash.substring(2) == "landingPage") {
      headerLogo = (
      <div>
        <span className="navbar-brand" href="#">
          <img src="./img/adapt.png" id="logoSize"/></span>
        <span className="nav navbar-nav navbar-right" href="#">
          <img src="./img/wipro_digital.png" id="digitallogoSize"/></span>
      </div>);

      navInLanding = (<div><ul className="nav navbar-nav" id="position"><li id="logout">
        {logOutLink}
        {/* <button type="button" className="btn btn-link" id="logout" onClick={this.logOut}>Logout</button> */}
      </li></ul></div>);
    } else {
      navInLanding = (<div><ul className="nav navbar-nav" id="position">
        <li id="welcome">
          {greeting}
          {/* <p id="welcomecolor" className="navbar-text" ><span>Welcome&nbsp;&nbsp;</span><b>{cookies.get('username')+welcomeUser}</b></p> */}
        </li>
        <li id="logout">
          {logOutLink}
          {/* <button type="button" className="btn btn-link" id="logout" onClick={this.logOut}>Logout</button> */}
        </li>
        <li id="profilelink">
          {profileLink}
        </li>
        <li id="dashboard">
          {userDashboardLink}
          {/* <button type="button" className="btn btn-link" id="logout" onClick={this.logOut}>Dashboard</button> */}
        </li>
        <li id="tools">
          {toolsLink}
          {/* <button type="button" className="btn btn-link" id="logout" onClick={this.logOut}>Dashboard</button> */}
        </li>
        <li id="deploycode">
          {DeployCodeLink}
        </li>
      </ul></div>);
    }
    // if(cookies.get('userType') == "User" || cookies.get('userType') == "Admin"){
    landingPage = (

      <div>
        <Dimmer active={this.state.deployCodeModal} onClickOutside={this.handleNodeployCodeModalClick.bind(this)} page>
          <Grid>
            <Grid.Column width={5}/>
            <Grid.Column width={6}>
              <Card style={{
                color: 'black',
                width: '100%'
              }}>
                <table style={{
                  width: '100%',
                  marginTop: '4%',
                  marginBottom: '4%'
                }}>
                  <tr>
                    <td style={{
                      padding: '3%'
                    }}>
                      <Button size='massive' disabled={this.state.sprint1DisabledStatus} onClick={this.sprintDeploy.bind(this,'Sprint1')} color='green'>Sprint1</Button>
                    </td>
                    <td style={{
                      padding: '3%'
                    }}>
                      <Button size='massive' disabled={this.state.sprint2DisabledStatus} onClick={this.sprintDeploy.bind(this,'Sprint2')} color='green'>Sprint2</Button>
                    </td>
                  </tr>
                  <tr>
                    <td style={{
                      padding: '3%'
                    }}>
                      <Button size='massive' disabled={this.state.sprint3DisabledStatus} onClick={this.sprintDeploy.bind(this,'Sprint3')} color='green'>Sprint3</Button>
                    </td>
                    <td style={{
                      padding: '3%'
                    }}>
                      <Button size='massive' disabled={this.state.sprint4DisabledStatus} onClick={this.sprintDeploy.bind(this,'Sprint4')} color='green'>Sprint4</Button>
                    </td>
                  </tr>

                </table>
                {/* <button type="button">Sprint1</button>
                      <button type="button">Sprint2</button>
                      <button type="button">Sprint3</button>
                      <button type="button">Sprint4</button> */}
              </Card>
            </Grid.Column>
            <Grid.Column width={5}/>
          </Grid>
        </Dimmer>
        <nav className="navbar navbar-fixed-top" id="headerfixed">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              {headerLogo}
            </div>
          </div>
        </nav>
        <nav className="navbar navbar-inverse  navbar-fixed-top" id="welcomecontainer">
          <div className="container-fluid">
            {/* <div className="navbar-header"> */}
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <div>
              <div className="collapse navbar-collapse" id="myNavbar">
                {navInLanding}
              </div>
            </div>
          </div>
        </nav>

        {/* <p id="footerTextAllignment" className="footer">All Rights Reserved. &copy; Wipro Limited<a href="./components/js/logPage.html" id="logpage" >Change Log</a>
        <Link to="/credits" > <a id="creditPage">Credits</a></Link></p> */}
        {/* <nav className="navbar navbar-fixed-bottom" id="footer" >
       <div id = "ribbon" className="row footer-brand-colour">
             <div className="fbc-elem fbc-pink col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
             <div className="fbc-elem fbc-yellow col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
             <div className="fbc-elem fbc-blue col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
         </div>
            <p id="footerTextAllignment" >All Rights Reserved. &copy; Wipro Digital<a href="./components/js/logPage.html" id="logpage" >Change Log</a>
          <Link to="/credits" > <a id="creditPage">Credits</a></Link></p>
        </nav> */}
        <img className="navbar-fixed-bottom navbar-inverse" src="./img/backgroundland.jpg" id="backgroundland"/>
      </div>
    );

    return (
      <div>
        <Dimmer active = {activeLoader} page>
          <Loader>We're deploying your code. Please Wait.</Loader>
        </Dimmer>
        <Dimmer
          active={active}
          page>
          <Header as='h2' icon inverted>
            <p style={{textAlign:"center"}}>Your code has been successfully deployed. <a onClick={this.redirectToTools.bind(this)}><br/><br/>Click here</a> to view the deployment in Tools</p>
          </Header>
        </Dimmer>
        {landingPage}
      </div>
    )
  }
}

module.exports = MenuExampleContentProp;
