const {users} = require('../users/userEntity');
let driver = require('../config/neo4j');
const logger = require('./../../systemAppLogger');
let session = driver.session();
let dashboard = {
  userDashboardTotalScenario: function(req, res) {
    //console.log("userDashboardTotalScenario");
    let session = driver.session();
    let query = 'match (:scenario)-[r:dashboardscenario]->(:loginid)-[]->(n:team{name:"'+req.body.teamName+'"}) return count(r)';
    //////console.log("query to find user dashboard total scenario: ", query);
    session.run(query).then(function(result) {

      session.close();
      res.send(result);
    }).catch(function(error) {
      ////////console.log('promise error: ', error);
      session.close();
      res.send(error);
    });
  },
  userDashboardCompletedScenario: function(req, res) {
    let session = driver.session();
    let query = 'match (m:scenario)-[r:dashboardscenario]->(:loginid)-[]->(n:team{name:"'+req.body.teamName+'"}) WHERE r.status="Completed" return count(m)';
    //console.log("query to find user dashboard total scenario: ", query);
    session.run(query).then(function(result) {
      session.close();
      res.send(result);
    }).catch(function(error) {
      session.close();
      res.send(error);
    });
  },
  teamScores: function(req, res) {
    //console.log('in team scores route');
  let session = driver.session();
  let teamNames = [];
  let query1 = 'match(n:team) return n.name';
  session.run(query1).then(function(result1) {
    result1.records.map(function(item){
      teamNames.push(item._fields[0]);
    })
    res.send(teamNames);
  }).catch(function(error) {
    session.close();
    res.send(error);
  });
},
getTeamScores: function (req,res) {
  //console.log('ínside getteamscores',req.body.teamNames);
  // second map to get scores
  let finalObjArray = [];
  req.body.teamNames.map(function(item,key){
    //console.log('ínside  map getteamscores',item)
    let aa = {};
    let penalty;
    aa.teamName = item;
    let queryTeam = 'match(n:team{name:"'+item+'"}) return n.score';
    session.run(queryTeam).then(function(result3) {
      penalty = result3.records[0]._fields[0].low;
      let query = 'match(n:team{name:"'+item+'"})<-[]-(m:loginid) return sum(m.score)';
      session.run(query).then(function(result2) {
        aa.score = result2.records[0]._fields[0].low - penalty;
        finalObjArray.push(aa);
        if((key+1) == req.body.teamNames.length){
          res.send(finalObjArray);
        }
      }).catch(function(error) {
      });
    }).catch(function(error) {
    });
  });
},
getTeamSc: function (req,res) {
  // second map to get scores
  //console.log("in getteamscore ",req.body.team);
  let finalObjArray = [];

  let aa = {};
  // aa.team = item;
  let query = 'match(n:team{name:"'+req.body.team+'"})<-[]-(m:loginid) return sum(m.score)';
  //console.log("query to find teamScores: ", query);
  session.run(query).then(function(result2) {
    //console.log("result2", result2.records[0]._fields[0].low);
    res.send(result2.records[0]._fields[0].low+"");
  }).catch(function(error) {
    ////////console.log('promise error: ', error);
    // session.close();
    // res.send(error);
  });

  },
  userDashboardScenarioStatus: function(req, res) {
    //console.log("userDashboardScenarioStatus");
    let session = driver.session();
    let result1 = [];
    logger.info(req.body.userType+" - "+req.body.userName+" - select - userDashBoard");
    let query = 'match (e:domain)<-[]-(n:scenario)-[r:dashboardscenario]->(q:loginid)-[]->(m:team{name:"'+req.body.teamName+'"}) return r,n,q,e';
    session.run(query).then(function(result) {
      for (var x of result.records) {
        result1.push({
          "scenarioName":(x._fields[1].properties.name),
          "userId":(x._fields[2].properties.username),
          "domainName": (x._fields[3].properties.name),
          "status":(x._fields[0].properties.status)
        });
        //console.log('resultant data to send: ', result1);
        if(result.records.length == result1.length) {
        res.send(result1);
      }
    }
  }).catch(function(error) {
    session.close();
    res.send(error);
  });
},

  teamProgress: function(req, res) {
    let session = driver.session();
    let sizeOfArray = 0;
    let resultObjArray = [];
    //console.log('The domain names are: +++++++++++++', req.body.domainNames);
    // console.log('The domain names are: __________', typeof req.body.domainNames);
    if(typeof req.body.domainNames === "string") {
      let resultObj = {};
      resultObj.domainName = req.body.domainNames;
      sizeOfArray = 1;
      let query = 'match(e:domain{name:"'+req.body.domainNames+'"})<-[]-(n:scenario)-[r:dashboardscenario{status:"Completed"}]->(q:loginid)-[]->(m:team{name:"'+req.body.teamName+'"}) return count(distinct id(n))';
      session.run(query).then(function(result) {
        resultObj.completedScenarios = result.records[0]._fields[0].low;
        let query1 = 'match (n:domain{name:"'+resultObj.domainName+'"})<-[]-(a:scenario) return count(a)';
        session.run(query1).then(function(resultData) {
          resultObj.actualScenarios = resultData.records[0]._fields[0].low;
          resultObjArray.push(resultObj);
          // if(resultObjArray.length == req.body.domainNames.length){
            res.send(resultObjArray);
          // }
        })
      }).catch(function(error) {
      });
    }
    else if(typeof req.body.domainNames === "object") {
      sizeOfArray = req.body.domainNames.length;
      for (var i = 0; i < req.body.domainNames.length; i++) {
      let resultObject = {};
        resultObject.domainName = req.body.domainNames[i];
        console.log('inside for...',req.body.domainNames[i]);
        let query = 'match(e:domain{name:"'+req.body.domainNames[i]+'"})<-[]-(n:scenario)-[r:dashboardscenario{status:"Completed"}]->(q:loginid)-[]->(m:team{name:"'+req.body.teamName+'"}) return count(distinct id(n))';
        session.run(query).then(function(result) {
          resultObject.completedScenarios = result.records[0]._fields[0].low;
          let query1 = 'match (n:domain{name:"'+resultObject.domainName+'"})<-[]-(a:scenario) return count(a)';
          session.run(query1).then(function(result) {
            resultObject.actualScenarios = result.records[0]._fields[0].low;
            resultObjArray.push(resultObject);
              if(resultObjArray.length == req.body.domainNames.length){
                    res.send(resultObjArray);
                  }
          })
        }).catch(function(error) {
        });
      }
  }
   },
  totalDomain: function(req, res) {
    let session = driver.session();
    let arr = [];
    let query = 'match (n:team{name:"'+req.body.teamName+'"})<-[]-(:loginid)<-[]-(:scenario)-[]->(m:domain) return distinct m.name';
    //////console.log("query to find team progress status: ", query);
    session.run(query).then(function(result) {
      // console.log('comp',JSON.stringify(result));
      for (var i = 0; i < result.records.length; i++) {
        // console.log("totaldomain ",result.records[i]._fields[0]);
        arr.push(result.records[i]._fields[0]);
      }
      res.send(arr);
      session.close();
    }).catch(function(error) {
      ////////console.log('promise error: ', error);
      session.close();
      res.send(error);
    });
  }
};
module.exports = dashboard;
