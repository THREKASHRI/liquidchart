'use strict';
let driver = require('../config/neo4j');
let session = driver.session();

//route to add service in admin Helpdesk
var adminAddService = function (req, res){
 let session = driver.session();
 let name = req.body.name;
 let description = req.body.description;
 let query = 'CREATE (n:services{name: "'+name+'",description: "'+description+'",flag:1}) return n';
 session.run(query).then(()=>
{
  res.send('Successfully added service');
  session.close();
}).catch(function(error){
  console.log(error);
});
};



//route to get all service details
var adminViewServiceDetails = function(req,res){
    let arr=[];
    console.log("inside getServices controller");
      let session = driver.session();
      let query = 'MATCH (n:services) RETURN n';
      session.run(query).then(function(result){
  console.log("ggggggggggggggggggggg");
      // console.log(result.records);
      result.records.map((item)=>{
        arr.push(
          {             'id':item._fields[0].identity.low,
              "name":item._fields[0].properties.name,
              "description":item._fields[0].properties.description
          }
        );
    });
    res.send(arr);
    session.close();
    });
  };



//route to edit the service in admin helpdesk
var adminEditService = function(req,res){
  console.log('adminedit');
  let session = driver.session();
  let name = req.body.name;
  let newname = req.body.newname;
  let description = req.body.description;
  let array = [];
  console.log('name',name);
  console.log('newname',newname);
  console.log('description',description);

let query = 'match (n:services) where n.name ="'+name+'" set n.name="'+newname+'",n.description="'+description+'" return n'

   session.run(query).then(function(result){

     result.records.map((item)=>{
       array.push({
       'id':item._fields[0].identity.low,
           "name":item._fields[0].properties.name,
           "description":item._fields[0].properties.description
    });
   })
 res.send(array);
 session.close();
   });
 };

//route to delete the service in admin helpdesk
var adminDeleteService = function(req,res){
    let session = driver.session();
  let name = req.body.name;
  let query = 'Match (n:services) where n.name="'+name+'" detach delete n'
   session.run(query).then(function(result){
     res.send('ddeleted');
     session.close();
   });
};

//route to link the service to the session
 var linkServices = function(req, res){
   let sessionName = req.body.nameSession;
  let name = req.body.name;
   let cost = req.body.cost;
   console.log(sessionName,name,cost,'hhhhhh');
   let query = 'match (m:session {name:"'+sessionName+'"}) match (n:services) where n.name="'+name+'" merge (m)<-[r:cost{value:"'+cost+'"}]-(n) return m,n,r';
session.run(query).then(function(result){
  res.send('linked');
  session.close();
});
 };
 //route to delink  the service
 var delinkServices = function(req,res){
   let sessionName = req.body.nameSession;
   let name = req.body.name;
   console.log(sessionName,name,'delink data received');
let session = driver.session();
let query ='match (n:services)  where n.name="'+name+'" match (m:session {name:"'+sessionName+'"})<-[r:cost]-(n) detach delete r';
 session.run(query).then(function(result){
   res.send('delinked');
   session.close();
 });
 }

//route to get all the session
var getAllSessions = function(req,res){
  let array = [];
    let session = driver.session();
    let query = 'MATCH (n:session) RETURN n';
    session.run(query).then(function(result){
      result.records.map((item)=>{
        array.push({
          "name":item._fields[0].properties.name
        });
      })
      res.send(array);
      session.close();
    });
}

// //route to toggle services
// var toggleService = function(req,res){
// let serviceName = req.body.name;
//   let flagStatus = req.body.flag;
//   let query ="match (n:services) where n.name='"+serviceName+"' set n.flag = "+flagStatus+" return n.flag";
//   let session = driver.session();
//   session.run(query).then(function(result){
//     res.send('done');
//     session.close();
//   });
// }


module.exports = {
  adminAddService,
  adminViewServiceDetails,
  adminEditService,
  adminDeleteService,
  getAllSessions,
  linkServices,
  delinkServices
}
