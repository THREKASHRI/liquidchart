'use strict';
const router = require('express').Router();
const HelpDeskAdminCtrl = require('./helpDeskAdminController');


router.get('/getAllSessions',HelpDeskAdminCtrl.getAllSessions);
router.post('/adminAddService',HelpDeskAdminCtrl.adminAddService);
router.get('/adminViewServiceDetails',HelpDeskAdminCtrl.adminViewServiceDetails);
router.post('/adminEditService',HelpDeskAdminCtrl.adminEditService);
router.post('/adminDeleteService',HelpDeskAdminCtrl.adminDeleteService);
router.post('/linkServices',HelpDeskAdminCtrl.linkServices);
router.post('/delinkServices',HelpDeskAdminCtrl.delinkServices);
// router.post('/toggleService',HelpDeskAdminCtrl.toggleService);
module.exports = router;
