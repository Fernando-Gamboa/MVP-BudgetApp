const controllers = require('./controllers/index.js');
const router = require('express').Router();

// products
router.get('/info', controllers.requests.getData);


module.exports = router;