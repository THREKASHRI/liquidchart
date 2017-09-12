import React from 'react';
import {Form, Input, Button, Grid, Icon} from 'semantic-ui-react';
import FileUploadProgress  from './fileUpload';
import {CSVLink, CSVDownload} from 'react-csv';

class IndexComponent extends React.Component {
  constructor() {
     super();
     this.state = {
       checkfile: true
     }
     this.checkfile = this.checkfile.bind(this);
 }
 checkfile(sender) {
   //console.log(sender.target.value);
    var validExts = new Array(".csv");
    var fileExt = sender.target.value;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
    if (validExts.indexOf(fileExt) < 0) {
      alert("Invalid file selected, valid files are of " +
               validExts.toString() + " types.");
               sender.target.value = "";
               this.setState({checkfile:true});
      return false;
    }
    else {
      this.setState({checkfile:false});
      return true;
    }
}

 render() {
const csvData = [['Emp ID','Login ID','userName','userType',	'Team Name',	'Email ID'],
            ['351984','351984','Madhu Madhanan', 'Admin',	'mountain',	'madhu@wipro.com'],
            ['559115','559115',	'Rituparna Ghosh','Admin',	'mountain',	'ritu@wipro.com'],
            ['351985','351985',	'admin',	'User',	'mountain',	'arun@wipro.com'],
            ['353560','353560',	'admin',	'User',	'mountain',	'arun@wipro.com'],
            ['353560&123456','123456',	'Arun&Mohan',	'Pair',	'Digital',	'arun@wipro.com&mohan&wipro.com'],
            ['353560&234567','234567',	'Ram&Sita',	'Pair',	'Digital',	'ram@wipro.com&sita@wipro.com']
          ];

       return (
         <div style={{marginLeft:'5%'}}>
            <p>Add a .csv file to bulk upload component.</p><p>To download sample template <CSVLink data={csvData} filename={"UserTemplate.csv"}>click here</CSVLink></p>

           <div style={{'marginLeft': '30%', 'marginTop': '5%'}}>
               {/* <Form method='post' encType='multipart/form-data' action="/upload">
                 <Input type='file' name='uploadedFile' accept='.csv' onChange={this.checkfile}/>
                  <Button color = 'red' type = 'submit' disabled={this.state.checkfile}><Icon name='upload'/>Upload</Button>
                </Form> */}
                <FileUploadProgress key='ex1' url='/upload' accept='.csv'
                   onProgress={(e, request, progress) => {
                     //console.log('progress', e, request, progress);
                   }}
                   onLoad={ (e, request) => {
                     //console.log('load', e, request);
                   }}
                   onError={ (e, request) => {
                     //console.log('error', e, request);
                   }}
                   onAbort={ (e, request) => {
                     //console.log('abort', e, request);
                   }}
                   onClick = {this.checkfile}
                   />
           </div>
            </div>
       );
   }
}
module.exports = IndexComponent;
