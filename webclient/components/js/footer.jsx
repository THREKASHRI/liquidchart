import React, {Component} from 'react';
const {Link} = require('react-router');
const {hashHistory} = require('react-router');
import { Dropdown, Button } from 'semantic-ui-react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
var logoSize = {
 width : '40%'
}
class MenuExampleContentProp extends Component {
  constructor () {
        super();
    }
  logOut(){
    cookies.remove('username');
      cookies.remove('userType');
        cookies.remove('empId');
          cookies.remove('loginId');
        hashHistory.push('/');
  }
  profile(){
    hashHistory.push('/profile');
  }
  userDashboard(){
    hashHistory.push('/userDashboard');}
    clickChange(){
        this.props.restaurantData(this.state.domain);
    }
    render() {
      let footerpage;
      // let welcomeUser ="";
      // let footer;
      // let profileLink;
      // let userDashboardLink;
      // let logOutLink;
      // let greeting = '';
      // if(cookies.get('userType') == "User" || cookies.get('userType') == "Pair"){
      //   welcomeUser = "";
      // greeting=  <p id="welcomecolor" className="navbar-text" ><span>Welcome&nbsp;&nbsp;</span><b>{cookies.get('username')+welcomeUser}</b>
      //   </p>
      //   profileLink = (<li id="profilelink">
      //     <button id= "pro" type="button" className="btn btn-link" onClick={this.profile}>Profile</button>
      //   </li>);
      // }else if(cookies.get('userType') == "Admin"){
      //   welcomeUser = ' (Admin)';
      //   greeting=<p id="welcomecolor" className="navbar-text" ><span>Welcome&nbsp;&nbsp;</span><b>{cookies.get('username')+welcomeUser}</b>
      //   </p>
      //   profileLink="";
      // }
      // else if(cookies.get('userType') == undefined){
      //   greeting=<p id="welcomecolor" className="navbar-text" ><span>Welcome&nbsp;&nbsp;</span></p>
      //
      // }
      // //User Dashboard Link
      // if(cookies.get('userType') == "User" || cookies.get('userType') == "Pair"){
      //   userDashboardLink = (<li id="dashboard">
      //     <button id= "pro" type="button" className="btn btn-link" onClick={this.userDashboard}>Dashboard</button>
      //   </li>);
      // }
      //
      // // Logout Link
      // if(cookies.get('userType') == "User" || cookies.get('userType') == "Pair" ||  cookies.get('userType') == "Admin"){
      //   logOutLink = (<li id="logout">
      //     <button id= "pro" type="button" className="btn btn-link" onClick={this.logOut}>Logout</button>
      //   </li>);
      // }
      // if(cookies.get('userType') == "User" || cookies.get('userType') == "Admin"){
        footerpage = (


           <div>


          {/* <p id="footerTextAllignment" className="footer">All Rights Reserved. &copy; Wipro Limited
        <Link to="/credits" > <a id="creditPage">Credits</a></Link></p> */}
      <nav className="navbar" id="footer" >
       <div id = "ribbon" className="row footer-brand-colour">
             <div className="fbc-elem fbc-pink col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
             <div className="fbc-elem fbc-yellow col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
             <div className="fbc-elem fbc-blue col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
         </div>
            <p id="footerTextAllignment" >All Rights Reserved. &copy; Wipro Digital
          <Link to="/credits" > <a id="creditPage">Credits</a></Link></p>
        </nav>
        {/* <img className="navbar-fixed-bottom navbar-inverse"  src="./img/backgroundland.jpg" id="backgroundland"/> */}
        </div>
      );

        return (
          <div>
            {footerpage}
          </div>
        )
    }
}

module.exports = MenuExampleContentProp;
