import React from 'react';
import {Form, Grid, Button, Divider, Dropdown} from 'semantic-ui-react';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

 class ArchiveService extends React.Component{
   constructor(){
     super();
   }
   render(){
     return(
       <div>
       ji
       </div>
     )
   }
 }
module.exports = ArchiveService;
