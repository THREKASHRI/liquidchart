let express = require('express');
let router = express.Router();
let dashboard = require('./userDashboardController');
console.log("inside user dashboard router");
router.post('/userDashboardTotalScenario', dashboard.userDashboardTotalScenario);
router.post('/userDashboardCompletedScenario', dashboard.userDashboardCompletedScenario);
router.post('/teamScores', dashboard.teamScores);
router.post('/userDashboardScenarioStatus', dashboard.userDashboardScenarioStatus);
router.post('/teamProgress', dashboard.teamProgress);
router.post('/totalDomain', dashboard.totalDomain);
router.post('/getTeamScores', dashboard.getTeamScores);
router.post('/getTeamSc', dashboard.getTeamSc);

// router.post('/viewTeamName', dashboard.viewTeamName);
// router.post('/getTeamMembers', dashboard.getTeamMembers);

module.exports = router;
