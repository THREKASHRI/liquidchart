// requiring the needed packages
const React = require('react');
const ReactDOM = require('react-dom');
const { hashHistory, Route, Router} = require('react-router');
const NavBar = require('./components/js/NavBar.jsx');
const login = require('./components/login/login.jsx');
const dnd = require('./components/dnd/index.jsx').default;
const AdminLandingPage = require('./components/adaptAdmin/adminLandingPage/adminLandingPage.jsx');
const ContactAdmin = require('./components/login/contactAdmin.jsx');
const home = require('./components/js/landingPage.jsx');
const landing = require('./components/js/landing.jsx');
const credits = require('./components/js/creditsPage.jsx');
const profile = require('./components/profile/profilenew.jsx');
const tools = require('./components/tools/tools.jsx');
const upload = require('./components/adaptAdmin/manageData/add/csvUpload.jsx');
const userDashboard = require('./components/userDashboard/mainPage/userDashboard.jsx').default;
const helpDesk = require('./components/helpDeskUser/helpDesk.jsx');

const MainComp = React.createClass({
    render: function() {
        return (
            <div>
                <NavBar/>
                <br/>
                <br/>
                <br/>
                <br/>
                {this.props.children}
            </div>
        );
    }
});
ReactDOM.render(
    <Router history={hashHistory}>
    <Route path="/" component={login}/>
    <Route path="/contactAdmin" component={ContactAdmin}/>
    <Route component={MainComp}>
        <Route path="/home" component={home}/>
        <Route path="/landingPage" component={landing}/>
        <Route path="/adminHome" component={AdminLandingPage}/>
        <Route path="/dnd" component={dnd}/>
        <Route path="/credits" component={credits}/>
        <Route path="/profile" component={profile}/>
        <Route path="/tools" component={tools}/>
        <Route path="/uploadSuccess" component={upload}/>
        <Route path="/userDashboard" component={userDashboard}/>
<Route path="/helpDesk" component={helpDesk}/>
    </Route>
</Router>, document.getElementById('app'));
