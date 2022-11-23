const controllers = require('./controllers/index.js');
const router = require('express').Router();

// balance
router.get('/login', controllers.requests.getBal);
router.put('/login', controllers.requests.updateBal);
// transactions
router.get('/trans', controllers.requests.getTrans);
router.post('/trans', controllers.requests.addTrans);
// goals
router.get('/goals', controllers.requests.getGoals);
router.post('/goals', controllers.requests.addGoals);

module.exports = router;