'use strict';
const router = require('express').Router();
const HelpDeskCtrl = require('./helpDeskController');

router.get('/getServices',HelpDeskCtrl.getServices);
router.post('/getServicesCost',HelpDeskCtrl.getServicesCost);
router.post('/getComponentByID',HelpDeskCtrl.getComponentByID);
router.post('/totalscore',HelpDeskCtrl.totalscore);
router.post('/userStoryClosure',HelpDeskCtrl.userStoryClosure);

module.exports = router;
