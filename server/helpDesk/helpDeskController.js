'use strict';
let driver = require('../config/neo4j');
let session = driver.session();
// route to get all the services offered
let getServices = function(req, res) {
  let arr = [];
  console.log("inside getServices controller");
  let session = driver.session();
  let query = 'MATCH (n:services) RETURN n';
  session.run(query).then(function(result) {
    console.log("ggggggggggggggggggggg");
    // console.log(result.records);
    result.records.map((item) => {
      console.log("ghhhjj" + item._fields[0].properties.name);
      console.log(item._fields[0].properties.description);
      arr.push({"title": item._fields[0].properties.name, "description": item._fields[0].properties.description});
    });
    res.send(arr);
  });
};
let getServicesCost = function(req, res) {
  let array = [];

  let session = driver.session();
  let query = 'MATCH (n:session{name:"' + req.body.name + '"})<-[r:cost]-(m:services) return m.name,m.description ,r.value';
  session.run(query).then(function(result) {

    result.records.map((item) => {

      array.push({'serviceName': item._fields[0], 'cost': item._fields[2], 'description': item._fields[1]});
    });
console.log('array service',array);
    res.send(array);
  });
};
let getComponentByID = function(req, res) {
  console.log('in controller', req.body.arrays);
  let arr = req.body.arrays;
  let result1 = [];
  let session = driver.session();
  let query = 'unwind [' + arr + '] as id match (n:component) where ID(n)=id return id,n.category,n.name';
  console.log('controller', query);
  session.run(query).then(function(result) {
    for (var x of result.records) {
      result1.push({
        "id": (x._fields[0].low),
        "category": (x._fields[1]),
        "name": (x._fields[2])
      });
}
      res.send(result1);
    }).catch(function(error) {});

  };
let totalscore = function(req,res){
console.log('in controller',req.body.team);
console.log('in controller team score',req.body.totalscore);
  let session = driver.session();
let query = 'match (n:team) where n.name="'+req.body.team+'" set n.score='+req.body.totalscore+''
console.log('query',query);
session.run(query).then(function(result){
console.log('result',result);
res.send(result)
}).catch(function(error){

})
}
let userStoryClosure = function(req,res){
console.log("inside controller");
console.log('loginid',req.body.loginid);
console.log('scenario',req.body.scenario);
  let session = driver.session();
let query = 'match (n:loginid{name:"'+req.body.loginid+'"})<-[m:dashboardscenario]-(a:scenario{name:"'+req.body.scenario+'"}) set m.status="Completed"'
console.log('query',query);
session.run(query).then(() =>{
console.log("success");
  res.send('done');
  session.close();
}).catch(function(error) {
});
}

  module.exports = {
    getServices,
    getServicesCost,
    getComponentByID,
totalscore,
userStoryClosure
  };
