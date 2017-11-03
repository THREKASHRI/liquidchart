// requiring the needed packages
const React = require('react');
const ReactDOM = require('react-dom');
const { hashHistory, Route, Router} = require('react-router');
const temp = require('./components/js/temp.jsx');

const MainComp = React.createClass({
    render: function() {
        return (
            <div>
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
    <Route path="/" component={temp}/>

</Router>, document.getElementById('app'));
