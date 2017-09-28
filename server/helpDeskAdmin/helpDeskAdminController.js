'use strict';
let driver = require('../config/neo4j');
let session = driver.session();
//route to add service in admin Helpdesk
var adminAddService = function(req, res) {
  let session = driver.session();
  let name = req.body.name;
  let description = req.body.description;
  let query = 'CREATE (n:services{name: "' + name + '",description: "' + description + '",flag:1}) return n';
  session.run(query).then(() => {
    res.send('Successfully added service');
    session.close();
  }).catch(function(error) {
    console.log(error);
  });
};
//route to get all service details
var adminViewServiceDetails = function(req, res) {
  let arr = [];
  console.log("inside getServices controller");
  let session = driver.session();
  let query = 'MATCH (n:services) RETURN n';
  session.run(query).then(function(result) {
    console.log("ggggggggggggggggggggg");
    // console.log(result.records);
    result.records.map((item) => {
      arr.push({'id': item._fields[0].identity.low, "name": item._fields[0].properties.name, "description": item._fields[0].properties.description});
    });
    res.send(arr);
    session.close();
  });
};
//route to edit the service in admin helpdesk
var adminEditService = function(req, res) {
  console.log('adminedit');
  let session = driver.session();
  let name = req.body.name;
  let newname = req.body.newname;
  let description = req.body.description;
  let array = [];
  console.log('name', name);
  console.log('newname', newname);
  console.log('description', description);
  let query = 'match (n:services) where n.name ="' + name + '" set n.name="' + newname + '",n.description="' + description + '" return n'
  session.run(query).then(function(result) {
    result.records.map((item) => {
      array.push({'id': item._fields[0].identity.low, "name": item._fields[0].properties.name, "description": item._fields[0].properties.description});
    })
    res.send(array);
    session.close();
  });
};
//route to delete the service in admin helpdesk
var adminDeleteService = function(req, res) {
  let session = driver.session();
  let name = req.body.name;
  let query = 'Match (n:services) where n.name="' + name + '" detach delete n'
  session.run(query).then(function(result) {
    res.send('ddeleted');
    session.close();
  });
};
//route to link the service to the session
var linkServices = function(req, res) {
  let sessionName = req.body.nameSession;
  let name = req.body.name;
  let cost = req.body.cost;
  console.log(sessionName, name, cost, 'hhhhhh');
  let query;
  let bb = JSON.stringify(name);
  console.log("df", bb);
  if (typeof(name) != 'string') {
    query = 'unwind ' + bb + ' as r match (m:session {name:"' + sessionName + '"}) match (n:services) where n.name=r merge (m)<-[z:cost{value:"' + cost + '"}]-(n) return m,n,z '
  } else {
    query = 'match (m:session {name:"' + sessionName + '"}) match (n:services) where n.name="' + name + '" merge (m)<-[r:cost{value:"' + cost + '"}]-(n) return m,n,r';
  }
  session.run(query).then(function(result) {
    res.send('linked');
    session.close();
  });
};
//route to delink  the service
var delinkServices = function(req, res) {
  let sessionName = req.body.nameSession;
  let name = req.body.name;
  let result1 = [];
  console.log(sessionName, name, 'delink data received');
  let session = driver.session();
  let query;
  let bb = JSON.stringify(name);
  console.log('bb', bb);
  if (typeof(name) != 'string') {
    query = 'unwind ' + bb + ' as r match (n:services) where n.name = r match(m:session{name:"' + sessionName + '"})<-[z:cost]-(n) detach delete z'
  } else {
    query = 'match (n:services)  where n.name="' + name + '" match (m:session {name:"' + sessionName + '"})<-[z:cost]-(n) detach delete z';
  }
  console.log("cvasd", query);
  session.run(query).then(function(result) {
    for (let i of result.records) {
      result1.push({
        'serviceId': (i._fields[0].identity.low),
        'serviceName': (i._fields[0].properties.name),
        'description': (i._fields[0].properties.description)
      });
    }
    console.log('result delinked', result1);
    res.send(result1);
    session.close();
  });
}
//route to  toggle service for the domain
var toggleService = function(req, res) {
  let sessionName = req.body.nameSession;
  let name = req.body.name;
  let flagStatus = req.body.flag;
  let query;
  let bb = JSON.stringify(name);
  console.log('bb', bb,'sessionName',sessionName,'flagStatus',flagStatus);
  if (typeof(name) != 'string') {
    query = 'unwind ' + bb + 'as r match(n:services) where n.name = r match (m.session{name:"' + sessionName + '"}) set n.flag = "'+flagStatus+'" return r.flag';
  } else {
    query = 'match (m:session {name:"' + sessionName + '"}) match (n:services) where n.name="' + name + '"  set n.flag = "'+flagStatus+'" return n.flag'
  }
  session.run(query).then(function(result){
    res.send('done');
  }).catch(function(error){
console.log();
  });
}
  //route to get all the session
  var getAllSessions = function(req, res) {
  let array = [];
  let session = driver.session();
  let query = 'MATCH (n:session) RETURN n';
  session.run(query).then(function(result) {
    result.records.map((item) => {
      array.push({"name": item._fields[0].properties.name});
    })
    res.send(array);
    session.close();
  });
}
  //route to find the services for the session
  var findlinkServices = function(req, res) {
  let array = [];
  let sessionName = req.body.name;
  let session = driver.session();
  let query = 'match (n:session {name:"' + sessionName + '"})<-[]-(m:services) return m';
  session.run(query).then(function(result) {
    result.records.map((item) => {
      console.log(item);
      array.push({"name": item._fields[0].properties.name, "description": item._fields[0].properties.description,"flag":item._fields[0].properties.flag});
      console.log(array);
    });
    console.log(array);
    res.send(array);
    session.close();
  });
}
  module.exports = {
    adminAddService,
    adminViewServiceDetails,
    adminEditService,
    adminDeleteService,
    getAllSessions,
    linkServices,
    delinkServices,
    findlinkServices,
    toggleService
  }
