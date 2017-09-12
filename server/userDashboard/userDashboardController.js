const {users} = require('../users/userEntity');
let driver = require('../config/neo4j');
const logger = require('./../../systemAppLogger');
let session = driver.session();
let dashboard = {
  userDashboardTotalScenario: function(req, res) {
    //console.log("userDashboardTotalScenario");
    let session = driver.session();
    let query = 'match (m:dashboardscenario)-[]->()-[]->(n:team{name:"'+req.body.teamName+'"}) return count(m)';
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
    let query = 'match (m:dashboardscenario)-[]->()-[]->(n:team{name:"'+req.body.teamName+'"}) WHERE m.status="Completed" return count(m)';
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
  teamScores: function(req, res) {
    let session = driver.session();
    let teamNames = [];
    let query1 = 'match(n:team) return n.name';
    //////console.log("query to find teamScores: ", query1);
    session.run(query1).then(function(result1) {
      //////console.log("result1", JSON.stringify(result1));
      // for (var x of result1.records) {
      //   teamNames.push(x._fields[0]);
      // }
      // map to get teamNames
      result1.records.map(function(item){
        teamNames.push(item._fields[0]);
      })
      //////console.log('-------------------------',teamNames);
      res.send(teamNames);
    }).catch(function(error) {
      //////console.log('promise error: ', error);
      session.close();
      res.send(error);
    });
  },
  getTeamScores: function (req,res) {
      // second map to get scores
      let finalObjArray = [];
    req.body.teamNames.map(function(item,key){
      let aa = {};
      let penalty;
      aa.teamName = item;
      let queryTeam = 'match(n:team{name:"'+item+'"}) return n.score';
      // let query = 'match(n:team{name:"'+item+'"}) return n.score';
      //////console.log("query to find teamScores: ", query);
      session.run(queryTeam).then(function(result3) {
      penalty = result3.records[0]._fields[0].low;
      let query = 'match(n:team{name:"'+item+'"})<-[]-(m:loginid) return sum(m.score)';
      // let query = 'match(n:team{name:"'+item+'"}) return n.score';
      //////console.log("query to find teamScores: ", query);
      session.run(query).then(function(result2) {
        //////console.log("result2", JSON.stringify(result2));
        aa.score = result2.records[0]._fields[0].low - penalty;
        //////console.log("aaaaa:",aa);
        //////console.log("++++++++++++++++",finalObjArray);
        finalObjArray.push(aa);
        //////console.log((key+1)+"-------length-----------"+req.body.teamNames.length);
        if((key+1) == req.body.teamNames.length){
        res.send(finalObjArray);
        }
      }).catch(function(error) {
        ////////console.log('promise error: ', error);
        // session.close();
        // res.send(error);
      });
      }).catch(function(error) {
        ////////console.log('promise error: ', error);
        // session.close();
        // res.send(error);
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
    let query = 'match(n:dashboardscenario)-[]->()-[]->(m:team{name:"'+req.body.teamName+'"}) return n';
    session.run(query).then(function(result) {
      for (var x of result.records) {
        result1.push({
          "scenarioName":(x._fields[0].properties.name),
          "userId":(x._fields[0].properties.username),
          "domainName": (x._fields[0].properties.domain),
          "status":(x._fields[0].properties.status)
        });
        //console.log('resultant data to send: ', result1);
        if(result.records.length == result1.length) {
        res.send(result1);
        }
      }
      // session.close();
      // ////console.log("aaa ",result.records[0]._fields[0].properties.loginid);
      // let query2 = 'match (n:loginid) where n.name="'+result.records[0]._fields[0].properties.loginid+'" return n.username';
      // ////console.log('query to get username: ', query2);
      //   let sessionx = driver.session();
      // sessionx.run(query2).then(function(result3) {
      //   ////console.log('success in getting name', JSON.stringify(result3));
      //   for (var x of result.records) {
      //     result1.push({
      //       "scenarioName":(x._fields[0].properties.name),
      //       "userId":(result3.records[0]._fields[0]),
      //       "domainName": (x._fields[0].properties.domain),
      //       "status":(x._fields[0].properties.status)
      //     });
      //     ////console.log('resultant data to send: ', result1);
      //     if(result.records.length == result1.length) {
      //     res.send(result1);
      //     }
      //   }
      //   sessionx.close();
      // }).catch(function(error) {
      //   ////console.log('promise error: ', error);
      //   // res.send(error);
      // });

      //////console.log("user dashboard ",JSON.stringify(result1));
    }).catch(function(error) {
      ////////console.log('promise error: ', error);
      session.close();
      res.send(error);
    });
  },
  teamProgress: function(req, res) {
    let session = driver.session();
    let sizeOfArray = 0;
    let resultObjArray = [];
    //console.log('The domain names are: +++++++++++++', req.body.domainNames);
    //console.log('The domain names are: __________', typeof req.body.domainNames);
    if(typeof req.body.domainNames === "string") {
      ////console.log('string here');
      let resultObj = {};
      resultObj.domainName = req.body.domainNames;
      ////console.log('object after domain name',resultObj);
      sizeOfArray = 1;
      let query = 'match(n:dashboardscenario)-[]->()-[]->(m:team{name:"'+req.body.teamName+'"}) where n.domain="'+req.body.domainNames+'" AND n.status="Completed" return count(distinct n.scenarioId)';
      ////console.log("query to find team progress status: ", query);
      session.run(query).then(function(result) {
        ////console.log('The result is: ',JSON.stringify(result));
        resultObj.completedScenarios = result.records[0]._fields[0].low;
        let query1 = 'match (n:domain{name:"'+req.body.domainNames+'"})<-[]-(a:scenario) return count(a)';
        ////console.log('query1 : ', query1);
        session.run(query1).then(function(resultData) {
          ////console.log('______________________________',JSON.stringify(resultData));
            resultObj.actualScenarios = resultData.records[0]._fields[0].low;
            resultObjArray.push(resultObj);
          ////console.log("Ihe resultant array is: ",resultObjArray);
          res.send(resultObjArray);
        }).catch(function(error) {
          ////console.log('promise error: ', error);
          // res.send(error);
        });
        // res.send(resultObjArray);
      }).catch(function(error) {
        //////console.log('promise error: ', error);
        // session.close();
        // res.send(error);
      });


    }
    else if(typeof req.body.domainNames === "object") {
      // //console.log('Object here');
      sizeOfArray = req.body.domainNames.length;
      // //console.log("array length is: ",sizeOfArray);
      for (var i = 0; i < req.body.domainNames.length; i++) {
      let resultObject = {};
        resultObject.domainName = req.body.domainNames[i];
        // //console.log('inside for...',req.body.domainNames[i]);
        let query = 'match(n:dashboardscenario)-[]->()-[]->(m:team{name:"'+req.body.teamName+'"}) where n.domain="'+req.body.domainNames[i]+'" AND n.status="Completed" return count(distinct n.scenarioId)';
        // //console.log("query to find team progress status: ", query);
        session.run(query).then(function(result) {

          // //console.log('after for...',req.body.domainNames[i]);
          resultObject.completedScenarios = result.records[0]._fields[0].low;
          let query1 = 'match (n:domain{name:"'+resultObject.domainName+'"})<-[]-(a:scenario) return count(a)';
          // //console.log("query to get all scenarios: ",query1);
          session.run(query1).then(function(result) {
            // //console.log(JSON.stringify(result));
            // //console.log("(((((((((())))))))))",result.records[0]._fields[0].low);
            resultObject.actualScenarios = result.records[0]._fields[0].low;
            resultObjArray.push(resultObject);
            // //console.log("The obj is: ",resultObject);
            // //console.log("The Array is: ",resultObjArray);
              if(resultObjArray.length == req.body.domainNames.length){
                    res.send(resultObjArray);
                  }
          })
          // //console.log('comp',JSON.stringify(result));
          // res.send(result);
          // session.close();
        }).catch(function(error) {
          ////console.log('promise error: ', error);
          // session.close();
          // res.send(error);
        });
      }

    }
  //////console.log("The Final resultant array is: ",resultObjArray);
    //////console.log('inside team progress: ', req.body);
    //////console.log('sizeOfArray ', sizeOfArray);

    //////console.log('typeof',typeof req.body.domainNames);
    //////console.log('inside team progress: ', req.body.domainNames.length);
    // let result1 = [];

  },
  totalDomain: function(req, res) {
    let session = driver.session();
    let arr = [];
    let query = 'match (n:team{name:"'+req.body.teamName+'"})<-[]-()<-[]-(m:dashboardscenario) return distinct m.domain';
    //////console.log("query to find team progress status: ", query);
    session.run(query).then(function(result) {
      //////console.log('comp',JSON.stringify(result));
      for (var i = 0; i < result.records.length; i++) {
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
