'use strict';
const logger = require('./../../applogger');
const {users} = require('../users/userEntity');
let driver = require('../config/neo4j');
let session = driver.session();

var addUser=(req, res) => {
  let newUser = new users();
  //////console.log('in adduser'+JSON.stringify(req.body));
  if(req.body.usertype == 'Admin'){
    newUser.empId = req.body.employeeid;
    newUser.userName = req.body.name;
    newUser.emailId = req.body.email;
    newUser.userType = req.body.usertype;
    newUser.loginId = req.body.loginId;
    newUser.teamName = "Admin Team";
    newUser.save(function(err) {
      if (err) {
        //////console.log(err);
        return res.send('Error in registration');
      } else {
        return res.send('Successfully registered');
      }
    });

  } else{
    //console.log('admin skipped');
    newUser.empId = req.body.employeeid;
    newUser.userName = req.body.name;
    newUser.emailId = req.body.email;
    newUser.userType = req.body.usertype;
    newUser.teamName = req.body.teamname;
    newUser.loginId = req.body.loginId;
    let count = 0;
    newUser.save(function(err) {
      if (err) {
        //console.log(err);
        return res.send('Error in registration');
      } else {
        let session = driver.session();
        let query ='match (n:team{name:"'+newUser.teamName+'"}) return n';
        //console.log("query ",query);
        session.run(query).then(function(result) {
          if(result.records.length){
             let query =  'match (n:team{name:"'+newUser.teamName+'"}) merge (n)<-[:user_of]-(a:loginid{name:"'+newUser.loginId+'",username:"'+newUser.userName+'"}) return n';
            session.run(query).then(function(result) {
              ////console.log("success", result);
              return res.send('Successfully registered');
            }).catch(function(error) {
              ////console.log('promise error: ', error);
            });
          }else{
           let query =  'merge (n:team{name:"'+newUser.teamName+'"})<-[:user_of]-(a:loginid{name:"'+newUser.loginId+'",username:"'+newUser.userName+'"}) return n';
          session.run(query).then(function(result) {
            ////console.log("success", result);
            return res.send('Successfully registered');
          }).catch(function(error) {
            ////console.log('promise error: ', error);
          });
          }
        }).catch(function(error) {
          ////console.log('promise error: ', error);
        });
      }
    });
  }
}
var getUsers=(req, res) => {
  users.find(
    function(err, alldetails) {
      if (err) {
        //////console.log(err);
      } else {
        //////console.log('databaseee'+alldetails);
      }
      res.send(alldetails);  });
    }
    //  : Adding a new customer journey
    var addNewDomain = (req, res) => {
      let session = driver.session();
      let name = req.body.domainName;
      let description = req.body.domainDescription;
      let video = req.body.video;
      let query = 'CREATE (n:domain{name: "'+name+'",description: "'+description+'",video: "'+video+'",flag:1})';
      session.run(query).then(() =>{
        res.send('done');
        session.close();
      }).catch(function(error) {
      });
    };

    var getusertype=(req, res) => {
      let loginid = req.body.loginid;
      //console.log("login in getusertype",loginid);
      users.findOne({loginId: loginid}).then((docs) => {
        if (docs != null) {
          //console.log(docs.userType + "    " +docs);
          res.send(docs);
        } else {
          res.send("invalid_data");
        }
      }, (err) => {
        ////console.log(err);
        res.send("invalid_data");
      });
    }

    var deleteUser=(req, res) => {
      let empid = req.body.empid;
      users.remove({
        'empId': empid
      },
      function(err) {
        if (err) {
          //////console.log(err);
        } else {
          //////console.log('done');
        }
        res.send('done');
      });
    }

    var masterReset=(req, res) => {
      users.remove({
        'userType': "Pair"
      },
      function(err) {
        if (err) {
          //console.log(err);
        } else {
          users.remove({
            'userType': "User"
          },
          function(err) {
            if (err) {
              //console.log(err);
            } else {
              let session = driver.session();
              let query = 'match (n:scenario)-[r:dashboardscenario]->(a:loginid) detach delete r';
              session.run(query).then(() =>{
                session.close();
                let sessionx = driver.session();
                let query = 'Match (n:loginid) detach delete n';
                sessionx.run(query).then(() =>{
                  sessionx.close();
                  let sessiony = driver.session();
                  let query = 'Match (n:team) detach delete n';
                  sessiony.run(query).then(() =>{
                    res.send("Done");
                    sessiony.close();
                  }).catch(function(error) {
                    //////console.log(' error: ', error);
                  });

                }).catch(function(error) {
                  //////console.log(' error: ', error);
                });

              }).catch(function(error) {
                //////console.log(' error: ', error);
              });
              //console.log('done');
            }
          });
        }
      });
    };

    var resetPassword=(req, res) => {
      let loginId = req.body.loginid;
      users.update({
        'loginId': loginId
      }, {
        '$set': {
          'password': 'wipro@123'
        }
      },
      function(err) {
        if (err) {
          //console.log(err);
        } else {
          //console.log('done in reset password');
        }
        res.send('done');
      });
    }

    var deleteDomain  =(req, res) => {
      let name = req.body.domainName;
      //////console.log(name," name");
      let query = 'Match (n:domain{name: "'+name+'"}) detach delete n';
      session.run(query).then(() =>{
        res.send('done');
        session.close();
      }).catch(function(error) {
        //////console.log(' error: ', error);
      });
    };
    var addDomain  =(req, res) => {
      let session = driver.session();
      let name = req.body.domainName;
      let description = req.body.domainDescription;
      //////console.log('name and desc'+name+description);
      let query = 'Match (n:domain{name: "'+name+'",description: "'+description+'"})';
      session.run(query).then(() =>{
        res.send('done');
        session.close();
      }).catch(function(error) {
        //////console.log(' error: ', error);
      });
    };
    var findAllScenarios =(req, res) => {
      var Allscenarios =[];
      let session = driver.session();
      let query = 'match (n:scenario) return n';
      session.run(query).then(function(result) {
        for (var x of result.records) {
          Allscenarios.push({"Scenario":x._fields[0].properties.description});
        }
        res.send(result1);
        session.close();
      }).catch(function(error) {
        //////console.log(' error: ', error);
      });
    };
    var addNewComponent =(req, res) => {
      let session = driver.session();
      let name = req.body.componentName;
      let category = req.body.componentCategory;
      let description = req.body.componentDescription;
      let errormsg = req.body.componentErrorMsg;
      let query = 'create (n:component{name: "'+name+'",category: "'+category+'",description: "'+description+'",errormsg: "'+errormsg+'"})';
      session.run(query).then(() =>{
        res.send('done');
        session.close();
      }).catch(function(error) {
        //////console.log(' error: ', error);
      });
    };
    var deleteComponent  =(req, res) => {
      let name = req.body.componentName;
      //////console.log("name "+name);
      let query = 'match (n:component{name: "'+name+'"}) detach delete n';
      session.run(query).then(() =>{
        res.send('done');
        session.close();
      }).catch(function(error) {
        //////console.log(' error: ', error);
      });
    };


    var getAllDomain =(req, res)=> {
      //////console.log("in controller");
      let query = 'match(n:domain) return n';
      session.run(query).then(function(result) {
        //////console.log(result);
        session.close();
        res.send(result);
      }).catch(function(error) {
        //////console.log('promise error: ', error);
        session.close();
        res.send(error);
      });
    };

    var viewDomainDetails =(req, res)=> {
      let domainName = req.body.searchQuery;
      var result = [] ;
      let query = 'match (n:domain{name: "'+domainName+'"})  return n';
      session.run(query).then(function(result) {
        res.send(result);

      });
    };
    var updateDomain =(req, res)=> {
      var updatedData = req.body;
      let session = driver.session();
      //////console.log("id ", updatedData.domainId);
      let query = 'match (n:domain) where id(n)='+updatedData.domainId+' set n.name="'+updatedData.name+'",n.description="'+updatedData.description+'",n.video="'+updatedData.video+'" return n ';
      //////console.log("query ",query);
      session.run(query).then(function(result) {
        //////console.log("in update neo");
        res.send(result);
      }).catch(function(error) {
        //////console.log('promise error: ', error);
      });
    };
    var viewComponentDetails =(req, res)=> {
      let componentName = req.body.searchQuery;
      var result = [] ;
      let query = 'match (n:component{name: "'+componentName+'"}) return n';
      session.run(query).then(function(result) {
        res.send(result);
      });
    };
    //  : Fetching the sequence information of a user story
    var getCorrectSequence = (req, res)=> {
      if(req.body.length == 1){
        let oneArr = [];
        let components = [];
        let query = '';
        oneArr = req.body.components;
        query = 'unwind ['+oneArr+'] as id match (n:component) where ID(n) = id return n';
        session.run(query).then(function(result) {
          for (var x of result.records) {
            components.push({"header": x._fields[0].properties.name});
          }
          res.send(components)
        }).catch(function(error) {
        });
      }
      else{
        let componentArray = [[]];
        let count = 0;
        componentArray = req.body.components;
        let tem2 = [];
        let temp = new Array();
        let tem2Length = 0;
        if(componentArray != undefined) {
          if(componentArray.length == 1) {
            temp.push(componentArray);
          }
          else{
            for(let i = 0; i <componentArray.length; i = i + 1) {
              temp = componentArray[i].split(',');
              temp =  JSON.parse("[" + temp + "]");
              if(temp != undefined){
                tem2.push(temp);
                count++;
                tem2Length += temp.length;
              }
            }
          }
        }
        let components =[];
        let resultArray = [];
        let flag = 0;
        components = [];
        let query = '';
        query = 'unwind ['+tem2+'] as id match (n:component) where ID(n) = id return n';
        session.run(query).then(function(result) {
          for (var x of result.records) {
            components.push({"header":x._fields[0].properties.name});
            flag += 1;
          }
          resultArray.push(components);
          res.send(resultArray)
        }).catch(function(error) {
        });
      }
    };
    var updateUser=(req, res)=> {
      users.update({'empId': req.body.empId},
      {'$set': {
        'userName': req.body.name,
        'emailId': req.body.email,
        'userType': req.body.userType,
        'teamName': req.body.team
      }},function(err){
        if (err) {
          res.send(err);
        } else {
          res.send('success');
        }
      }
    );
  };
  var findUserData=(req, res)=> {
    users.find({
      'empId': req.body.empId
    },
    function(err, alldetails) {
      if (err) {
        //////console.log(err);
      } else {
        //////console.log('databaseee'+alldetails);
      }
      res.send(alldetails);
    });
  };
  var updateComponent =(req, res)=> {
    var updatedData = req.body;
    let session = driver.session();
    let query = 'match (n:component) where id(n)='+updatedData.componentId+' set n.name="'+updatedData.name+'",n.description="'+updatedData.description+'",n.category="'+updatedData.category+'",n.errormsg="'+updatedData.errormsg+'" return n ';
    session.run(query).then(function(result) {
      //////console.log("in update neo");
      res.send(result);
    }).catch(function(error) {
      //////console.log('promise error: ', error);
    });
  };
  var findDomainScenario =(req, res) => {
    var result1 = [];
    var domainDescription ='';
    var scenario =[];
    let session = driver.session();
    //////console.log();
    let query = 'MATCH (n:scenario) WHERE not( (n:scenario)-[:scenario_of]-() ) return  n';
    session.run(query).then(function(result) {
      for (var x of result.records) {
        result1.push({
          "scenarioId":(x._fields[0].identity.low),
          "scenarioName": (x._fields[0].properties.name),
          "scenarioDescription":(x._fields[0].properties.problemstatement)
        });
      }
      //////console.log("in control ",result1);
      res.send(result1);
    }).catch(function(error) {
      //////console.log('promise error: ', error);
    });
  };
  var linkScenario =(req, res) => {
    let name = req.body.scenarioName;
    let domainname = req.body.domainName;
    let description = req.body.domainDescription;
    let session = driver.session();
    let result1 = [];
    // //console.log("ajax ",name);

    // //console.log("b is: ",b);
    let aa = JSON.stringify(name);
    let query ;
    // //console.log(typeof(req.body.scenarioName)+" value "+aa);
    if(typeof(req.body.scenarioName)!='string'){
      var b = req.body.scenarioName.map(Number);
      query = 'unwind ['+b+'] as name1 match (m:domain {name:"'+domainname+'"}) match (n:scenario) where id(n)=name1 merge (m)<-[r:scenario_of]-(n) return m,n,r';
      // //console.log("scenario in link"+query);
    }
    else{
      query = 'match (m:domain {name:"'+domainname+'"}) match (n:scenario) where id(n)='+name+' merge (m)<-[r:scenario_of]-(n) return m,n,r'
      // //console.log("query in link ",query);
    }
    session.run(query).then(function(result) {
      for (var x of result.records) {
        result1.push({
          "scenarioId":(x._fields[0].identity.low),
          "scenarioName": (x._fields[0].properties.name),
          "scenarioDescription":(x._fields[0].properties.problemstatement)
        });
      }
      //////console.log("in control ",result1);
      res.send(result1);
    }).catch(function(error) {
      //////console.log('promise error: ', error);
    });
  };

  var findDelinkScenario =(req, res) => {
    var result1 = [];
    var domainDescription ='';
    var scenario =[];
    let session = driver.session();
    let domain = req.body.domain;
    //////console.log("domain");
    let query = 'match (n:domain{name:"'+domain+'"})<-[]-(m:scenario) return m';
    //////console.log(query);
    session.run(query).then(function(result) {
      //////console.log("result");
      for (var x of result.records) {
        result1.push({
          "scenarioId":(x._fields[0].identity.low),
          "scenarioName": (x._fields[0].properties.name),
          "scenarioDescription":(x._fields[0].properties.problemstatement)
        });
      }
      //////console.log("in control ",result1);
      res.send(result1);
    }).catch(function(error) {
      //////console.log('promise error: ', error);
    });
  };


  var delinkScenario =(req, res) => {
    let name = req.body.scenarioName;
    let domainname = req.body.domainName;
    let description = req.body.domainDescription;
    let session = driver.session();
    let result1 = [];
    //console.log("ajax ",name);

    let aa = JSON.stringify(name);
    let query ;
    // //console.log(typeof(req.body.scenarioName)+" value "+aa);
    if(typeof(req.body.scenarioName)!='string'){
      var b = req.body.scenarioName.map(Number);
      query = 'unwind ['+b+'] as name1 match (m:domain {name:"'+domainname+'"}) match (n:scenario) where id(n)=name1 match (m)<-[r:scenario_of]-(n) detach delete r return m,n,r';
      // //console.log("scenario "+query);
    }
    else{
      query = 'match (m:domain {name:"'+domainname+'"}) match (n:scenario) where id(n)='+name+' match (m)<-[r:scenario_of]-(n) detach delete r return m,n,r'

      // //console.log("delink ",query);
    }
    session.run(query).then(function(result) {
      for (var x of result.records) {
        result1.push({
          "scenarioId":(x._fields[0].identity.low),
          "scenarioName": (x._fields[0].properties.name),
          "scenarioDescription":(x._fields[0].properties.problemstatement)
        });
      }
      //////console.log("in control ",result1);
      res.send(result1);
    }).catch(function(error) {
    });
  };
  //  : Fetching the  distinct customer journeys with status, 'Inprogress'
  var adminDashboardTotalDomain =(req, res) => {
    let status = "'In progress'";
    let result1 = [];
    let query = 'match (m:domain)<-[]-(n:scenario)-[r:dashboardscenario]->(a:loginid) where r.status='+status+' return distinct m.name';
    session.run(query).then(function(result) {
      for (var x of result.records) {////console.log('in controller'+JSON.stringify(x._fields[0]));
      result1.push({
        "count":(x._fields[0]),
      });
    }
    res.send(result1);
  }).catch(function(error) {
  });
};
//  : Fetching the  distinct dashboard user stories with status, 'Completed'
var adminDashboardCompletedScenario =(req, res) => {
  let status = "'Completed'";
  let result1 = [];
  let query = 'match (n:team)<-[]-(w:loginid)<-[r:dashboardscenario]-(m:scenario)-[]->(q:domain) where r.status ='+status+' return n.name, m.name,r.status,q.name,w.name,w.username';
  // let query = 'match (n:team)<-[]-()<-[]-(m:dashboardscenario) where m.status ="completed" return n.name, m.name,m.status,m.domain,m.loginid';
  session.run(query).then(function(result) {
    for (var x of result.records) {
      result1.push({
        "team_name": (x._fields[0]),
        "scenario_name":(x._fields[1]),
        "domain_name": (x._fields[3]),
        "userId":(x._fields[5]),
      });
      if(result.records.length == result1.length) {
        res.send(result1);
      }
    }
    session.close();
  }).catch(function(error) {
  });
}
//  : Fetching the all user stories started by the user
var adminDashboardTotalScenario = (req, res) => {
  let result1 = [];
  let query = 'match (q:loginid)<-[r:dashboardscenario]-(w:scenario)-[]->(e:domain) return q,w,e';
  session.run(query).then(function(result) {
    for (var x of result.records) {
      result1.push({
        "name":(x._fields[1].properties.name),
        "loginid":(x._fields[0].properties.name),
        "domain": (x._fields[2].properties.name)
      });
    }
    res.send(result1);
  }).catch(function(error) {
  });
}
//  : Archiving the selected customer journeys
var toggleDomain =(req, res) => {
  let domainName = req.body.name;
  let flagStatus = req.body.flag;
  let query = "match (n:domain) where n.name='"+domainName+"' set n.flag = "+flagStatus+" return n.flag";
  session.run(query).then(function(result) {
    res.send("done");
  }).catch(function(error) {
  });
}
// Fetching the count of customer journeys completed
var fetchCompletedDomain =(req, res) => {
  let domainarray = [];
  let domaintotal = [];
  let domaincompleted = [];
  let domainpend = [];
  let completedcount = 0;
  let pendingcount = 0;
  let donutdomain = [];
let query = 'match (n:domain) return n.name';
session.run(query).then(function(result) {
  result.records.map(function(item){
    domainarray.push(item._fields[0]);
  })
  domainarray=JSON.stringify(domainarray);
  // console.log("resul");
  let query1 = 'unwind ' + domainarray + ' as id match (n:domain{name:id})<-[]-(m:scenario) return count(m),id';
  let sessionx = driver.session();
  sessionx.run(query1).then(function(result1) {
    // console.log("result1");
    result1.records.map(function(item){
      domaintotal.push({"domainname":(item._fields[1]),"scenariocount":(item._fields[0].low)});
    })
    let query2 = 'unwind ' + domainarray + ' as id match (n:domain{name:id})<-[]-(m:scenario)-[r:dashboardscenario{status:"Completed"}]->() return count(m),id';
    let sessiony = driver.session();
    sessiony.run(query2).then(function(result2) {
      // console.log("result2");
      result2.records.map(function(item){
        domaincompleted.push({"domainname":(item._fields[1]),"scenariocount":(item._fields[0].low)});
      })
      let query3 = 'unwind ' + domainarray + ' as id match (n:domain{name:id})<-[]-(m:scenario)-[r:dashboardscenario{status:"In progress"}]->() return count(m),id';
      let sessionr = driver.session();
      // console.log("query ",query3);
      sessionr.run(query3).then(function(result3) {
        // console.log("result3 ",result3);
        result3.records.map(function(item){
          // console.log("item ",domainpend);
          let b = false;
          domaincompleted.map((item1,index1)=>{
            if(item1.domainname == item._fields[1]){
              b = true;
            }
          })
          if(!b){
            domainpend.push({"domainname":(item._fields[1]),"scenariocount":(item._fields[0].low)});
          }
        })
              for(let i = 0; i < domaintotal.length; i++){
        for(let j = 0; j < domaincompleted.length; j++){
          if(domaintotal[i].domainname === domaincompleted[j].domainname)
          {
            if(domaintotal[i].scenariocount == domaincompleted[j].scenariocount){
              completedcount++;
            }
            else {
              pendingcount++;
            }
          }
        }
      }
      pendingcount = pendingcount + domainpend.length;
      donutdomain.push({"completed":(completedcount),"pending":(pendingcount)});
      // console.log("donut ",donutdomain);
      res.send(donutdomain);
    }).catch(function(error) {
    });
  }).catch(function(error) {
  });
}).catch(function(error) {
console.log('promise error: ', error);
});
})
};


var fetchScores =(req, res) => {
  let Result = [];
  let query = 'match (n:loginid) return n'
  session.run(query).then(function(result) {
    for (var x of result.records){
      Result.push({
        "userID":(x._fields[0].properties.username),
        "score": (x._fields[0].properties.score),
      });
    }
    res.send(Result);
  }).catch(function(error) {
  });
};
//  Fetching the team wise details of user stories
var teamStats =(req, res) => {
  let session = driver.session();
  let result1 = [];
  let query = 'match (n:team)<-[]-(e:loginid)<-[r:dashboardscenario]-(m:scenario)-[]->(w:domain)  return n.name, m.name,w.name,e.name,r.status,e.username'
  session.run(query).then(function(result) {
    for (var x of result.records) {
      result1.push({
        "team_name": (x._fields[0]),
        "scenario_name":(x._fields[1]),
        "domain_name": (x._fields[2]),
        "userId":(x._fields[5]),
        "status":x._fields[4]
      });
      if(result.records.length == result1.length) {
        // console.log("result1 ",result1);
        res.send(result1);
      }
    }
    session.close();
  }).catch(function(error) {
  });
};
var getAllTeams = (req, res) => {
  let query='match (n:team) return n';
  let session = driver.session();
  session.run(query).then(function(result) {
    // console.log("ecd ",JSON.stringify(result));
    res.send(result.records);
  });
}
//  : Identifying who did what(userstories)
var UserPickedScenarios = (req, res) => {
let SessionName = req.body.session;
  let query = 'match (k:session{name:"'+SessionName+'"})<-[]-(a:team)<-[]-(n:loginid)<-[r:dashboardscenario]-(m:scenario) return n.username,m.name,n.name,a.name';
  let session = driver.session();
  session.run(query).then(function(result) {
    res.send(result.records);
  });
};
//  : get the names of the session
var sessionNames = (req, res) => {
  let session = driver.session();
  let SessionNames = [];
  let query1 = 'match(n:session) return n.name';
  session.run(query1).then(function(result1) {
    result1.records.map(function(item){
      SessionNames.push(item._fields[0]);
    })
    res.send(SessionNames);
  }).catch(function(error) {
    session.close();
    res.send(error);
  });
};

//  : get the team participating in the respective session
var sessionWiseTeams = (req, res) => {
  let session = driver.session();
  let SessionName = req.body.session;
  let teamNames = [];
  let query = 'match (m:team)-[]->(n:session{name:"'+SessionName+'"}) return m.name';
  session.run(query).then(function(result1) {
    result1.records.map(function(item){
      teamNames.push(item._fields[0]);
    })
    res.send(teamNames);
  }).catch(function(error) {
    session.close();
    res.send(error);
  });
};
//   get the  scores of the team participating in a respective session
var sessionWiseTeamScores = (req, res) => {
  let session = driver.session();
  let teams = req.body.teams;
  let teamNames = [];
  let query = 'unwind  '+teams+' as teamname match(n:team{name:teamname})<-[:user_of]-(m:loginid) return sum(m.score), n.name';
  session.run(query).then(function(result1) {
    result1.records.map(function(item){
      teamNames.push({'team': item._fields[1], 'score': item._fields[0]});
    })
    res.send(teamNames);
  }).catch(function(error) {
    session.close();
    res.send(error);
  });
};

var addNewSession =(req, res) => {
  let session = driver.session();
  let name = req.body.SessionName;
  let query = 'create (n:session{name: "'+name+'",pushed:[false,false,false,false],flag:1}) return n';
  // console.log("dsc",query);
  session.run(query).then(() =>{
    res.send('done');
    session.close();
  }).catch(function(error) {
    //////console.log(' error: ', error);
  });
};

var linkTeam =(req, res) => {
  let teamname = req.body.TeamName;
  let sessionname = req.body.sessionName;
  let session = driver.session();
  let result1 = [];
  let aa = JSON.stringify(teamname);
  let query ;
  // console.log("cwd ",typeof(req.body.TeamName));
  // console.log("cds ",req.body.TeamName," ",aa);
  if(typeof(req.body.TeamName)!='string'){
    query = 'unwind '+aa+' as name1 match (m:session {name:"'+sessionname+'"}) match (n:team) where n.name=name1 merge (m)<-[r:team_of]-(n) return m,n,r';
    // console.log("scenario in link"+query);
  }
  else{
    query = 'match (m:session {name:"'+sessionname+'"}) match (n:team) where n.name="'+teamname+'" merge (m)<-[r:team_of]-(n) return m,n,r';
    // console.log("query in link ",query);
  }
  session.run(query).then(function(result) {
    for (var x of result.records) {
      result1.push({
        "sessionid":(x._fields[0].identity.low),
      });
    }
    // console.log("in control ",result1);
    res.send(result1);
  }).catch(function(error) {
    //////console.log('promise error: ', error);
  });
};

var getAllTeamstoLink = (req, res) => {
  let query='MATCH (n:team) WHERE not( (n:team)-[:team_of]-() ) return  n';
  let session = driver.session();
  session.run(query).then(function(result) {
    // console.log("ecd ",JSON.stringify(result));
    res.send(result.records);
  });
};

var getAllTeamstoDelink =(req, res) => {
  let session = driver.session();
  let domain = req.body.session;
  //////console.log("domain");
  let query = 'match (n:session{name:"'+domain+'"})<-[:team_of]-(m:team) return m';
  //////console.log(query);
  session.run(query).then(function(result) {
    res.send(result);
  }).catch(function(error) {
    //////console.log('promise error: ', error);
  });
};

var delinkTeam =(req, res) => {
  let teamname = req.body.TeamName;
  let sessionname = req.body.sessionName;
  let session = driver.session();
  let aa = JSON.stringify(teamname);
  let query ;
  if(typeof(req.body.TeamName)!='string'){
    query = 'unwind '+aa+' as name1 match (m:session {name:"'+sessionname+'"}) match (n:team) where n.name=name1 match (m)<-[r:team_of]-(n) detach delete r return m,n,r';
    // //console.log("scenario "+query);
  }
  else{
    query = 'match (m:session {name:"'+sessionname+'"}) match (n:team) where n.name="'+teamname+'" match (m)<-[r:team_of]-(n) detach delete r return m,n,r'

    // //console.log("delink ",query);
  }
  session.run(query).then(function(result) {
    res.send(result);
  }).catch(function(error) {
  });
};

var deletesession  =(req, res) => {
  let name = req.body.sessionName;
  //////console.log("name "+name);
  let query = 'match (n:session{name: "'+name+'"}) detach delete n';
  session.run(query).then(() =>{
    res.send('done');
    session.close();
  }).catch(function(error) {
    //////console.log(' error: ', error);
  });
};

var sessionDetails  =(req, res) => {
  // let name = req.body.sessionName;
  //////console.log("name "+name);
  let query = 'match (n:session) return n';
  session.run(query).then(function(result) {
    res.send(result);
    session.close();
  }).catch(function(error) {
    //////console.log(' error: ', error);
  });
};

var toggleSession =(req, res) => {
  let domainName = req.body.name;
  let flagStatus = req.body.flag;
  let query = "match (n:session) where n.name='"+domainName+"' set n.flag = "+flagStatus+" return n.flag";
  console.log("cfgdchv",query);
  session.run(query).then(function(result) {
    console.log("hgvh",result);
    res.send("done");
  }).catch(function(error) {
  });
};

var sessionNameswithFlag = (req, res) => {
  let session = driver.session();
  let SessionNames = [];
  let query1 = 'match(n:session{flag:1}) return n.name';
  session.run(query1).then(function(result1) {
    result1.records.map(function(item){
      SessionNames.push(item._fields[0]);
    })
    res.send(SessionNames);
  }).catch(function(error) {
    session.close();
    res.send(error);
  });
};

module.exports = {
  findAllScenarios,
  addNewDomain,
  deleteDomain,
  addNewComponent,
  deleteComponent,
  viewComponentDetails,
  addUser,
  deleteUser,
  getUsers,
  getAllDomain,
  viewDomainDetails,
  addDomain,
  updateComponent,
  updateDomain,
  findUserData,
  updateUser,
  getCorrectSequence,
  findDomainScenario,
  linkScenario,
  findDelinkScenario,
  delinkScenario,
  toggleDomain,
  adminDashboardTotalScenario,
  adminDashboardCompletedScenario,
  adminDashboardTotalDomain,
  fetchCompletedDomain,
  fetchScores,
  teamStats,
  masterReset,
  resetPassword,
  getusertype,
  getAllTeams,
  UserPickedScenarios,
  sessionNames,
  sessionWiseTeams,
  sessionWiseTeamScores,
  addNewSession,
  linkTeam,
  getAllTeamstoLink,
  getAllTeamstoDelink,
  delinkTeam,
  deletesession,
  sessionDetails,
  toggleSession,
  sessionNameswithFlag
};
